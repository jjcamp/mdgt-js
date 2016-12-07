import { Providers } from "../src/providers";
import * as chai from "chai";
import "mocha";

const assert = chai.assert;

const testProvPath = "./test/providers";

describe("providers", () => {
    it("should list test providers", () => {
        const providers = new Providers(testProvPath);
        const list: string[] = providers.list();
        assert.equal(list.length , 1);
        assert.equal(list[0], "test");
    });

    it("should throw file not found exception", () => {
        try {
            const providers = new Providers("NotARealFolder");
        }
        catch (e) {
            assert.equal(e.code, "ENOENT");
        }
    });

    it("should throw not a valid directory exception", () => {
        let existingFile = "package.json";
        try {
            const providers = new Providers(existingFile);
        }
        catch (e) {
            assert.equal(e, `${existingFile} is not a valid directory`);
        }
    });

    it("should return null for absent provider", () => {
        const providers = new Providers(testProvPath);
        const noExist = providers.find("non-existant");
        assert.isNull(noExist);
    });
});

describe("JsonProvider", () => {
    it("#name & #path", () => {
        const test = (new Providers(testProvPath).find("test"));
        assert.equal(test.name, "test");
        assert.equal(test.path, testProvPath + "/test.json");
    });

    it("#read()", () => {
        const test = (new Providers(testProvPath).find("test"));
        assert.equal(test.read().search.uriRoot, "https://en.wikipedia.org");
    });
});
