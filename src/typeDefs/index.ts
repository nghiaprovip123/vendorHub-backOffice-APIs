import { mergeTypeDefs } from "@graphql-tools/merge";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";

// __dirname sẽ là:
// - src/typeDefs khi dev
// - dist/typeDefs khi build
const typeDefsDir = __dirname;

function getGraphqlFiles(dir: string): string[] {
  let results: string[] = [];
  const list = readdirSync(dir, { withFileTypes: true });

  for (const file of list) {
    const filePath = join(dir, file.name);

    if (file.isDirectory()) {
      results = results.concat(getGraphqlFiles(filePath));
    } else if (file.name.endsWith(".graphql")) {
      results.push(filePath);
    }
  }

  return results;
}

const schemaFiles = getGraphqlFiles(typeDefsDir);

const schemas = schemaFiles.map((filePath) =>
  readFileSync(filePath, "utf-8")
);

export const typeDefs = mergeTypeDefs(schemas);
