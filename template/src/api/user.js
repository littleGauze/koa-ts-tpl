const { PROMPT, ENUMS } = require("../../../src/constants");

const getContent = () => {
  return `
import { BASE_URL, axios } from ".";
export function getUserInfo() {
  return axios.get(
    \`\${BASE_URL}/getUserInfo\`
  )
}
`;
};
const getExt = (params) => {
  return params[PROMPT.LANG] === ENUMS[PROMPT.LANG].JavaScript ? "js" : "ts";
};
module.exports = {
  getContent,
  getExt,
};
