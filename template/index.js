const { PROMPT, ENUMS } = require("../src/constants");

const getContent = (params) => {
  return `
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0,viewport-fit=cover"
    />
    <link rel="icon" type="image/jpg" href="/logo.jpg" />
    <title>${params[PROMPT.NAME]}</title>
    <style></style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.${
      params[PROMPT.LANG] === ENUMS[PROMPT.LANG].JavaScript
        ? "jsx"
        : "tsx"
    }"></script>
  </body>
</html>
`;
};
const getExt = () => "html";
module.exports = {
  getContent,
  getExt,
};
