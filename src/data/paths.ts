import path from "node:path";

const rootPath = path.resolve(import.meta.dirname, "../../");
const srcPath = path.resolve(rootPath, "src");

export default {
  assets: path.resolve(srcPath, "assets"),
};
