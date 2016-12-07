import { Parser } from "../src/parser";
import { Providers } from "../src/providers";
import * as chai from "chai";
import "mocha";

const assert = chai.assert;

describe("parser", () => {
    it("should parse html", function(done) {
        const prov = (new Providers("./test/providers")).find("test");
        const parser = new Parser(prov.read());
        this.timeout(10000);
        this.slow(5000);
        parser.scrape("Node.js", (data) => {
            assert.equal(data.Title, "Node.js");
            done();
        });
    });
});
