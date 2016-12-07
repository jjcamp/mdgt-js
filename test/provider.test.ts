import { IProvider, JsonProvider } from "../src/provider";
import { ProviderLocator } from "../src/providerlocator";
import * as chai from "chai";
import "mocha";

const assert = chai.assert;

const testProvPath = "./test/providers";
const testProv = "test";

describe("JsonProvider", () => {
    it("#name & #path", () => {
        const test = (new ProviderLocator(testProvPath).find("test"));
        assert.equal(test.name, "test");
        assert.equal(test.path, testProvPath + "/test.json");
    });

    it("#read()", () => {
        const test = (new ProviderLocator(testProvPath).find("test"));
        assert.equal(test.read().search.uriRoot, "https://en.wikipedia.org");
    });
});
