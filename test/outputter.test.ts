import { ConsoleOutputter, IOutputter, OutputterLocator } from "../src/outputter";
import { Writable } from "stream";
import * as chai from "chai";
import "mocha";

const assert = chai.assert;

class TestWriter extends Writable {
    public result: string = "";
    public _write(chunk: Buffer | string, encoding: string, callback: (e?: any) => void) {
        let err: Error = undefined;
        if (typeof chunk === "string")
            this.result += chunk;
        else if (chunk instanceof Buffer)
            this.result += chunk.toString();
        else
            err = new Error("Invalid chunk data");
        callback(err);
    }
}

describe("OutputterLocator", () => {
    it("should throw on invalid outputter", () => {
        const out = (new OutputterLocator()).get("console");
        assert.isTrue(out instanceof ConsoleOutputter);
    });

    it("should not find an outputter", () => {
        assert.throws(() => (new OutputterLocator()).get("doesn't exist"));
    });
});

describe("ConsoleOutputter", () => {
    it("#writeFormatted()", () => {
        const testString = "test string";
        let stream = new TestWriter();
        let out: IOutputter = new ConsoleOutputter(stream);
        out.writeFormatted(testString);
        assert.equal(stream.result, testString + "\n");
    });

    it("#writeList()", () => {
        const list: string[] = [ "1", "2" ];
        const bullet: string = "-";
        let expected: string = "head\n";
        for (let item of list)
            expected += `${bullet}${item}\n`;
        expected += "foot\n";
        let stream = new TestWriter();
        let out: IOutputter = new ConsoleOutputter(stream, bullet);
        out.writeList(list, "head", "foot");
        assert.equal(stream.result, expected);
    });
});
