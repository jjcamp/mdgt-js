import * as fs from "fs";

export interface IProvider {
    readonly name: string;
    readonly path: string;
}

export class JsonProvider implements IProvider {
    public readonly name: string;
    public readonly path: string;

    constructor(dir: string, name: string) {
        this.name = name;
        this.path = `${dir}/${name}.json`;
    }
}

export class Providers {
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
