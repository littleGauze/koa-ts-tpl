const { PROMPT, ENUMS, DEPS } = require("../src/constants");

const getContent = params => {
  const dependencies = {};
  const devDependencies = {};
  const antd = params[DEPS.ANTD.key]
  const axios = params[DEPS.AXIOS.key]
  const lodash = params[DEPS.LODASH.key]
  const eslint = params[DEPS.MOBX.key]

  return `{
  "name": "${params[PROMPT.NAME]}",
  "version": "1.0.0",
  "description": "项目描述",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {

  }
}
`;
};
const getExt = () => {
  return "json";
};

module.exports = {
  getContent,
  getExt,
};
