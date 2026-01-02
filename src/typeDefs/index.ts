import { mergeTypeDefs } from "@graphql-tools/merge";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";

const typeDefsDir = join(process.cwd(), "src/typeDefs");

// Lấy tất cả file .graphql trong thư mục typeDefs và các subfolder
function getGraphqlFiles(dir: string): string[] {
  let results: string[] = [];
  const list = readdirSync(dir, { withFileTypes: true });
  list.forEach((file) => {
    const filePath = join(dir, file.name);
    if (file.isDirectory()) {
      results = results.concat(getGraphqlFiles(filePath));
    } else if (file.name.endsWith(".graphql")) {
      results.push(filePath);
    }
  });
  return results;
}

const schemaFiles = getGraphqlFiles(typeDefsDir);

// Đọc nội dung từng file
const schemas = schemaFiles.map((filePath) =>
  readFileSync(filePath, { encoding: "utf-8" })
);

// Merge tất cả schema lại
export const typeDefs = mergeTypeDefs(schemas);
