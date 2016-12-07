export interface IFormatter {
    format: (obj: any) => string;
}

export class JsonFormatter implements IFormatter {
    public format(obj: any): string {
        return JSON.stringify(obj);
    }
}

/* tslint:disable: forin */
export class TextFormatter implements IFormatter {
    public format(obj: any): string {
        let result: string[] = [];
        let pad = 0;
        for (let prop in obj)
            pad = pad > prop.length ? pad : prop.length;
        pad += 2;
        for (let prop in obj) {
            let line = this.padEnd(prop + ":", pad);
            if (typeof obj[prop] === "string")
                line += obj[prop];
            else {
                for (let i = 0; i < obj[prop].length; ++i) {
                    if (i === 0)
                        line += obj[prop][i];
                    else
                        line += this.padStart(obj[prop][i], pad + obj[prop][i].length);
                    if (i !== obj[prop].length - 1)
                        line += "\n";
                }
            }
            result.push(line);
        }
        return result.join("\n");
    }

    private padEnd(str: string, len: number): string {
        for (let i = str.length; i < len; ++i)
            str += " ";
        return str;
    }

    private padStart(str: string, len: number): string {
        for (let i = str.length; i < len; ++i)
            str = " " + str;
        return str;
    }
}
