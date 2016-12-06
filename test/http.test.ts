import { Http } from "../src/http";
import * as chai from "chai";
import "mocha";

const assert = chai.assert;

describe("http", () => {
    it("should return status code 200", function(done) {
        this.slow(1000);
        Http.get("https://www.google.com", (resp) => {
            assert.equal(resp.statusCode, 200);
            done();
        });
    });
});