const { PROMPT, ENUMS } = require("../../src/constants");

const getContent = () => {
  return `
import React from "react";
import Router from "./Router";
import "./global.less";
function App() {
  return (
    <div className="playlet-container">
      <Router />
    </div>
  );
}

export default App;
`;
};
const getExt = (params) => {
  return params[PROMPT.LANG] === ENUMS[PROMPT.LANG].JavaScript ? "jsx" : "tsx";
};
module.exports = {
  getContent,
  getExt,
};
