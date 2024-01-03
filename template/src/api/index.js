const { PROMPT, ENUMS } = require("../../../src/constants");
const getContent = (params) => {
  return `let _BASE_URL = "/api";
if (import.meta.env.PROD) {
} else {
  _BASE_URL = "/api";
}
import _axios from "axios";

const axiosInstance = _axios.create({
  withCredentials: true, // 是否允许带cookie这些
});
axiosInstance.interceptors.request.use((request) => {
  return request;
});
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。对响应错误时调用。
    console.error("请求错误: ", error);
    return Promise.reject(error);
  }
);

export const BASE_URL = _BASE_URL;
export const axios = axiosInstance;`;
};

const getExt = (params) => {
  return params[PROMPT.LANG] === ENUMS[PROMPT.LANG].JavaScript ? "js" : "ts";
};
module.exports = {
  getContent,
  getExt,
};
