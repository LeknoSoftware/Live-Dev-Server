import assert from "assert";
import {getOptions} from "../src/index.js";

const A = ["path/bin/node", "path/to/project/", "path/to/index.html"];
const B = ["path/bin/node", "path/to/project/", "--help"];

describe("getOptions", function () {
    const tests = [
        {arg: A, expected: []},
        {arg: B, expected: [ "--help" ]},
    ];

    tests.forEach(({arg, expected}) => {
        it(`argument: [${arg}], expected: [${expected}]`, function () {
            const res = getOptions(arg);
            assert.deepStrictEqual(res, expected);
        });
    });
});

