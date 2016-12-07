import { IFormatter, JsonFormatter, TextFormatter } from "./formatter";
import * as program from "commander";
import * as fs from "fs";

export class Cmd {
    public static version: string = JSON.parse(fs.readFileSync("package.json").toString()).version;

    public outputType: string = "console";
    private providerListFunction: () => void;
    private parseFunction: (providerType: string, query: string) => void;

    public dispatch(args: string[]): Cmd {
        let cmd = new Cmd();

        program
            .version(Cmd.version)
            .option("-p, --providers", "list available providers and exit")
            .arguments("<provider> [query]")
            .action((provider, query) => {
                const opts = <any>program; // alias for easy access of dynamic option properties
                if (opts.providers)
                    this.providerListFunction();
                if (typeof provider === "undefined" || typeof query === "undefined")
                    program.help();
                this.parseFunction(provider, query);
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

    public onParse(callback: (providerType: string, query: string) => void) {
        this.parseFunction = callback;
        return this;
    }
}
