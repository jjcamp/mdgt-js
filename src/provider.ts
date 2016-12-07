import { IProviderData } from "./iproviderdata";
import * as fs from "fs";

export interface IProvider {
    readonly name: string;
    readonly path: string;
    read: () => IProviderData;
}

export class JsonProvider implements IProvider {
    public readonly name: string;
    public readonly path: string;

    constructor(dir: string, name: string) {
        this.name = name;
        this.path = `${dir}/${name}.json`;
    }

    public read(): IProviderData {
        const fileData = fs.readFileSync(this.path);
        return JSON.parse(fileData.toString());
    }
}
