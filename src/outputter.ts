import { Console } from "console";

export interface IOutputter {
    writeFormatted: (formattedData: string) => void;
    writeList: (list: string[], header?: string, footer?: string) => void;
}

export class ConsoleOutputter {
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
