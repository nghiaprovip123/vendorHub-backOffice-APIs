"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const merge_1 = require("@graphql-tools/merge");
const fs_1 = require("fs");
const path_1 = require("path");
// __dirname sẽ là:
// - src/typeDefs khi dev
// - dist/typeDefs khi build
const typeDefsDir = __dirname;
function getGraphqlFiles(dir) {
    let results = [];
    const list = (0, fs_1.readdirSync)(dir, { withFileTypes: true });
    for (const file of list) {
        const filePath = (0, path_1.join)(dir, file.name);
        if (file.isDirectory()) {
            results = results.concat(getGraphqlFiles(filePath));
        }
        else if (file.name.endsWith(".graphql")) {
            results.push(filePath);
        }
    }
    return results;
}
const schemaFiles = getGraphqlFiles(typeDefsDir);
const schemas = schemaFiles.map((filePath) => (0, fs_1.readFileSync)(filePath, "utf-8"));
exports.typeDefs = (0, merge_1.mergeTypeDefs)(schemas);
