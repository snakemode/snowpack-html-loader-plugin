  const fs = require("fs");

  module.exports = function (snowpackConfig, pluginOptions) {
    return {
      name: '@snakemode/snowpack-html-loader-plugin',
      resolve: {
        input: ['.template.html' ],
        output: ['.js'],
      },
      async load({filePath}) {
        const result = fs.readFileSync(filePath, { encoding: "utf-8"});
        const asString = JSON.stringify(result);
        const asJs = [
            `const markup = ${asString};`, 
            `const container = document.createElement("div");`,
            `container.innerHTML = markup;`,
            `const template = container.childNodes[0];`,
            `export { markup, template };`,
            `export default template;`,
        ];
        return asJs.join('\n').trim();
      },
    };
  };