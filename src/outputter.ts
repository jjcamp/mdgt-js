import { Console } from "console";

export interface IOutputter {
    writeFormatted: (formattedData: string) => void;
    writeList: (list: string[], header?: string, footer?: string) => void;
}

export class OutputterLocator {
    private table = new Map<string, () => IOutputter>();

    constructor() {
        this.table.set("console", () => new ConsoleOutputter());
    }

    public get(name: string): IOutputter {
        if (!this.table.has(name))
            throw Error(`Outputter ${name} not found`);
        return this.table.get(name)();
    }
}

export class ConsoleOutputter implements IOutputter {
    private con: Console;
    private bullet: string;

    constructor(out = process.stdout, bullet: string = "* ") {
        this.con = new Console(out);
        this.bullet = bullet;
    }

    public writeFormatted(formattedData: string): void {
        this.con.log(formattedData);
    }

    public writeList(list: string[], header?: string, footer?: string): void {
        if (header)
            this.con.log(header);
        for (let s of list)
            this.con.log(this.bullet + s);
        if (footer)
            this.con.log(footer);
    }
}
