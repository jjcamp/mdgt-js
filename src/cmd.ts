import { IFormatter, JsonFormatter, TextFormatter } from "./formatter";
import * as program from "commander";
import * as fs from "fs";

export class Cmd {
    public static version: string = "0.0.0";

    public outputType: string = "console";
    private providerListFunction: () => void;
    private parseFunction: (fmt: IFormatter, providerType: string, query: string) => void;

    public dispatch(args: string[]): Cmd {
        let cmd = new Cmd();

        program
            .version(Cmd.version)
            .option("-p, --providers", "list available providers and exit")
            .option("-j, --json", "output in JSON")
            .option("--pretty-print", "outputs a formatted table (default)")
            .arguments("<provider> <query>")
            .action((provider, query) => {
                if ((<any>program).providers)
                    this.providerListFunction();
                const opts = this.handleOpts(<any>program);
                if (typeof provider === "undefined" || typeof query === "undefined")
                    program.help();
                this.parseFunction(opts.formatter, provider, query);
            });

        program.parse(args);

        if ((<any>program).providers)
            this.providerListFunction();

        return cmd;
    }

    public onProviderList(callback: () => void) {
        this.providerListFunction = callback;
        return this;
    }

    public onParse(callback: (fmt: IFormatter, providerType: string, query: string) => void) {
        this.parseFunction = callback;
        return this;
    }

    private handleOpts(opts: any) {
        let fmt: IFormatter;
        if (opts.json)
            fmt = new JsonFormatter();
        else
            fmt = new TextFormatter();
        return {
            formatter: fmt
        };
    }
}
