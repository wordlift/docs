const fs = require("fs");
const path = require("path");

function loadSidebar(relativePathBase) {
  const jsPath = `${relativePathBase}.js`;
  const tsPath = `${relativePathBase}.ts`;
  const absJsPath = path.resolve(__dirname, "..", jsPath);
  const absTsPath = path.resolve(__dirname, "..", tsPath);

  if (fs.existsSync(absJsPath)) {
    const mod = require(absJsPath);
    return mod.default ?? mod;
  }

  if (fs.existsSync(absTsPath)) {
    const mod = require(absTsPath);
    return mod.default ?? mod;
  }

  throw new Error(
    `Sidebar module not found. Tried ${absJsPath} and ${absTsPath}.`
  );
}

module.exports = {
  loadSidebar,
};
