const { PROMPT, ENUMS } = require("../../src/constants");

const getContent = params => {
  return `
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.${
    params[PROMPT.LANG] === ENUMS[PROMPT.LANG].JavaScript ? "jsx" : "tsx"
  }";
import "./global.less";
ReactDOM.createRoot(document.getElementById("root")${
    params[PROMPT.LANG] === ENUMS[PROMPT.LANG].JavaScript ? "" : "!"
  }).render(<App />);
  `;
};
const getExt = params => {
  return params[PROMPT.LANG] === ENUMS[PROMPT.LANG].JavaScript ? "jsx" : "tsx";
};
module.exports = {
  getContent,
  getExt,
};
