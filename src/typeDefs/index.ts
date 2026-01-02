import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";

const files = loadFilesSync("**/*.graphql", {
  cwd: __dirname,
});


export const typeDefs = mergeTypeDefs(files);
