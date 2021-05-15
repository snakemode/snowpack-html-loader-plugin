const fs = require("fs");
const loader = require("./loader");

async function onLoad({ filePath }) {
  const result = fs.readFileSync(filePath, { encoding: "utf-8" });
  const asString = JSON.stringify(result);
  const loaderBody = loader.toString();

  return `
const loader = ${loaderBody};
const markup = ${asString};
const templates = loader(markup);
export default templates;
  `.trim();
}

module.exports = function (snowpackConfig, pluginOptions) {
  return {
    name: '@snakemode/snowpack-html-loader-plugin',
    resolve: {
      input: ['.template.html'],
      output: ['.js'],
    },
    load: onLoad,
  };
};