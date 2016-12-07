import { ProviderLocator } from "../src/providerlocator";
import * as chai from "chai";
import "mocha";

const assert = chai.assert;

const testProvPath = "./test/providers";

describe("ProviderLocator", () => {
    it("should list test provider", () => {
        const providers = new ProviderLocator(testProvPath);
        const list: string[] = providers.list();
        assert.equal(list.length , 1);
        assert.equal(list[0], "test");
    });

    it("should throw file not found exception", () => {
        try {
            const providers = new ProviderLocator("NotARealFolder");
        }
        catch (e) {
            assert.equal(e.code, "ENOENT");
        }
    });

    it("should throw not a valid directory exception", () => {
        let existingFile = "package.json";
        try {
            const providers = new ProviderLocator(existingFile);
        }
        catch (e) {
            assert.equal(e, `${existingFile} is not a valid directory`);
        }
    });

    it("should return null for absent provider", () => {
        const providers = new ProviderLocator(testProvPath);
        const noExist = providers.find("non-existant");
        assert.isNull(noExist);
    });
});
