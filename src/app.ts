#!/usr/bin/env node
import { Cmd } from "./cmd";
import { TextFormatter } from "./formatter";
import { ConsoleOutputter, OutputterLocator } from "./outputter";
import { Parser } from "./parser";
import { Providers } from "./providers";

process.exitCode = main(process.argv);

function main(args: string[]): number {
    let cmd = new Cmd();
    cmd
        .onProviderList(() => {
            const out = (new OutputterLocator()).get(cmd.outputType);
            const providers = new Providers("./providers");
            out.writeList(providers.list(), "Available providers:");
        })
        .onParse((providerType, query) => {
            const providers = new Providers("./providers");
            const provider = providers.find(providerType);
            const parser = new Parser(provider);
            parser.scrape(args[3], (data) => {
                const fmt = new TextFormatter();
                const out = (new OutputterLocator()).get(cmd.outputType);
                out.writeFormatted(fmt.format(data));
            });
        })
        .dispatch(args);

    return 0;
}
