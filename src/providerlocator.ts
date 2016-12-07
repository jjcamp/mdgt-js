import { IProvider, JsonProvider } from "./provider";
import * as fs from "fs";

export class ProviderLocator {
    private provDir: string;
    private provList: string[] = [];

    constructor(dir: string) {
        this.provDir = dir;
        if (!fs.statSync(dir).isDirectory())
            throw `${dir} is not a valid directory`;
        let list = fs.readdirSync(dir);
        let glob = /^(.+?)\.json$/i;
        list.forEach((f) => {
            let m = glob.exec(f);
            if (m)
                this.provList.push(m[1]);
        });
    }

    public list(): string[] {
        return this.provList;
    }

    public find(name: string): IProvider | null {
        let index = this.provList.indexOf(name);
        if (index === -1)
            return null;
        // Should deduce provider type eventually
        return new JsonProvider(this.provDir, this.provList[index]);
    }
};
