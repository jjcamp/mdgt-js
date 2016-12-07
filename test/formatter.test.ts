import { TextFormatter, IFormatter, JsonFormatter } from "../src/formatter";
import * as chai from "chai";
import "mocha";

const assert = chai.assert;

describe("JsonFormatter", () => {
    it("should format to json", () => {
        const testObj = { test: "yes" };
        const fmt: IFormatter = new JsonFormatter();
        const actOutput = fmt.format(testObj);
        const expOutput = JSON.stringify(testObj);
        assert.equal(actOutput, expOutput);
    });
});

describe("TextFormatter", () => {
    it("should format to text", () => {
        const testObj = { a: "asd", bc: [ "asd", "asd" ]};
        const fmt: IFormatter = new TextFormatter();
        const actOutput = fmt.format(testObj);
        const expOutput = "a:  asd\nbc: asd\n    asd";
        assert.equal(actOutput, expOutput);
    })
});
