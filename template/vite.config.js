const { DEPS, PROMPT, ENUMS } = require("../src/constants");

const getContent = (params) => {
  return `
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
  base: "./", // 这里更改打包相对绝对路径
  minify: true, // 是否压缩代码
  plugins: [
    react(),
  ],
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: "49",
          ios: "10",
        },
      },
    ],
  ],
  ${
    params[DEPS.AXIOS.key]
      ? `
  server: {
    proxy: {
      "/api": {
        target: "http://www.test.com",
      },
    },
    host: '0.0.0.0'
  },
  `
      : ``
  }
});
`;
};
const getExt = (params) => {
  return params[PROMPT.LANG] === ENUMS[PROMPT.LANG].JavaScript ? "js" : "ts";
};
module.exports = {
  getContent,
  getExt,
};
