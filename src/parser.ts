import { html2xml } from "./html2xml";
import { Http } from "./http";
import { IItemData, IProviderData } from "./iproviderdata";
import { IProvider } from "./provider";
// tslint:disable-next-line: no-var-requires
const xpath = require("xpath");

export class Parser {
    private provider: IProviderData;

    constructor(providerData: IProviderData) {
        this.provider = providerData;
    }

    public scrape(query: string, callback: (data: any) => void): void {
        const searchParams = this.provider.search;
        const queryPath = searchParams.searchPath.replace("*", query);
        this.getXmlDoc(searchParams.uriRoot + queryPath, (doc) => {
            if (searchParams.firstResultXpath) {
                const resNode = xpath.select(searchParams.firstResultXpath, doc)[0];
                let resUri = resNode.getAttribute("href");
                if (resUri[0] === "/")
                    resUri = searchParams.uriRoot + resUri;
                return this.getXmlDoc(resUri, (doc2) => {
                    this.parseRoot(doc2, this.provider.root, callback);
                });
            }
            this.parseRoot(doc, this.provider.root, callback);
        });
    }

    private parseRoot(doc: Document, rootNode: IItemData, callback: (data: any) => void) {
        let data: any = {};
        this.parseNode(doc, rootNode, data);
        callback(data);
    }

    private parseNode(doc: Document, node: IItemData, data: any) {
        let list: string[] = [];
        let tree: any[] = xpath.select(node.xpath, doc);
        if (!node.repeat) {
            tree = tree.slice(0, 1);
        }
        for (let branch of tree) {
            if (node.value) {
                let val = node.value;
                if (val.type === "text" || val.type === "striptext")
                    list.push(branch.textContent.trim());
                else if (val.type === "attr")
                    list.push(branch.getAttribute(val.attr));
            }
            if (node.items) {
                for (let i of node.items)
                    this.parseNode(branch, i, data);
            }
        }
        if (list.length === 1 && node.value)
            data[node.value.name] = list[0];
        else if (node.value)
            data[node.value.name] = list;
    }

    private getXmlDoc(uri: string, callback: (doc: Document) => void): void {
        Http.get(uri, (resp) => {
            callback(html2xml(resp.body));
        });
    }
}
