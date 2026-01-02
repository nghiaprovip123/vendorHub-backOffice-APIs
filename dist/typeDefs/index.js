"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const merge_1 = require("@graphql-tools/merge");
const fs_1 = require("fs");
const path_1 = require("path");
const typeDefsDir = (0, path_1.join)(process.cwd(), "src/typeDefs");
// Lấy tất cả file .graphql trong thư mục typeDefs và các subfolder
function getGraphqlFiles(dir) {
    let results = [];
    const list = (0, fs_1.readdirSync)(dir, { withFileTypes: true });
    list.forEach((file) => {
        const filePath = (0, path_1.join)(dir, file.name);
        if (file.isDirectory()) {
            results = results.concat(getGraphqlFiles(filePath));
        }
        else if (file.name.endsWith(".graphql")) {
            results.push(filePath);
        }
    });
    return results;
}
const schemaFiles = getGraphqlFiles(typeDefsDir);
// Đọc nội dung từng file
const schemas = schemaFiles.map((filePath) => (0, fs_1.readFileSync)(filePath, { encoding: "utf-8" }));
// Merge tất cả schema lại
exports.typeDefs = (0, merge_1.mergeTypeDefs)(schemas);
