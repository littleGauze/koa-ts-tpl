const { PROMPT, ENUMS } = require("../../../src/constants");

const getContent = () => {
  return `
  import { makeAutoObservable } from "mobx";

  class Counter {
    constructor() {
      // 参数1：target让对象变成可观察
      // 参数2：排除属性和方法
      // 参数3：指定自动绑定this
      makeAutoObservable(this, {}, { autoBind: true });
    }
    // 当前的初始化状态数据
    count = 0;
    // 操作状态的方法
    increment() {
      this.count++;
    }
    decrement() {
      this.count--;
    }
    reset() {
      this.count = 0;
    }
    async getAsyncCount() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.count = 123;
          resolve('');
        }, 500);
      });
    }
  }
  export default new Counter();
    
`;
};
const getExt = (params) => {
  return params[PROMPT.LANG] === ENUMS[PROMPT.LANG].JavaScript ? "js" : "ts";
};
module.exports = {
  getContent,
  getExt,
};
