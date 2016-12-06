#!/usr/bin/env node
import { ConsoleFormatter } from "./formatter";
import { Parser } from "./parser";
import { Providers } from "./providers";

process.exitCode = main(process.argv);

/* tslint:disable: no-console */
function main(args: string[]): number {
    if (args.length < 4) {
        console.log("Usage: mdgt [provider] [query]");
        return 1;
    }
    const provider = (new Providers("./providers")).find(args[2]);
    const parser = new Parser(provider);
    parser.scrape(args[3], (data) => {
        const fmt = new ConsoleFormatter();
        console.log(fmt.format(data));
    });
    return 0;
}
