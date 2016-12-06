import { ConsoleFormatter, IFormatter, JsonFormatter } from "../src/formatter";
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

describe("ConsoleFormatter", () => {
    it("should format to console", () => {
        const testObj = { a: "asd", bc: [ "asd", "asd" ]};
        const fmt: IFormatter = new ConsoleFormatter();
        const actOutput = fmt.format(testObj);
        const expOutput = "a:  asd\nbc: asd\n    asd";
        assert.equal(actOutput, expOutput);
    })
});
