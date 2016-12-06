import { Parser } from "../src/parser";
import * as chai from "chai";
import "mocha";

const assert = chai.assert;

describe("parser", () => {
    it("should parse html", function(done) {
        const parser = new Parser({ name: "test", path:"./test/providers/test.json"});
        this.timeout(10000);
        this.slow(5000);
        parser.scrape("Node.js", (data) => {
            assert.equal(data.Title, "Node.js");
            done();
        });
    });
});
