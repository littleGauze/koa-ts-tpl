const { PROMPT, ENUMS } = require("../../../src/constants");

const getContent = () => {
  return `
// 封装统一导出的store
import { createContext, useContext } from "react";
// 两个store文件
import counter from "./CounterStore";

// 声明一个 RootStore
class RootStore {
  counter = counter;
}
const store = new RootStore();
// 创建一个上下文对象，用于跨级组件通讯
// 如果createContext提供了默认值，不需要Provider
export const RootStoreContext = createContext(store);
// 自定义hook
export default function useStore() {
  return useContext(RootStoreContext);
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
