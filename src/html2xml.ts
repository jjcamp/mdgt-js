import * as parse5 from "parse5";
import { DOMParser } from "xmldom";
// tslint:disable-next-line: no-var-requires
const xmlserializer = require("xmlserializer");

export function html2xml(html: string): Document {
    const htmlDom = parse5.parse(html);
    let xmlString: string = xmlserializer.serializeToString(htmlDom);
    xmlString = xmlString.replace(/ xmlns=".*?"/, "");
    return (new DOMParser()).parseFromString(xmlString);
}
