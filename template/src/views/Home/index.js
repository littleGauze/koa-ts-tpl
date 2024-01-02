const { DEPS, PROMPT, ENUMS } = require("../../../../src/constants");

const getContent = (params) => {
  const button = params[DEPS.ANTD.key] ? "Button" : "button";
  let content = `
  import React from 'react'
  import styles from "./index.module.less"
  ${
    params[DEPS.MOBX.key]
      ? `
  import useStore from "../../store/RootStore"
  import { observer } from "mobx-react-lite"
`
      : ``
  }
  ${
    params[DEPS.ANTD.key]
      ? `
  import { Button } from "antd"
`
      : ""
  }
  const Home = () => {
    ${
      params[DEPS.MOBX.key]
        ? `
    const store = useStore();
    const { count } = store.counter;
    `
        : ""
    }
      return (
        ${
          params[DEPS.MOBX.key]
            ? `<div>
          <div className={styles.count}>{count}</div>
          <${button} onClick={() => store.counter.increment()}>加</${button}>
          <${button} onClick={() => store.counter.decrement()}>减</${button}>
          <${button} onClick={() => store.counter.reset()}>重置</${button}>
          <${button} onClick={() => store.counter.getAsyncCount()}>异步</${button}>
        </div>`
            : `<div>Hello</div>`
        }
      )
  }
  ${
    params[DEPS.MOBX.key]
      ? `export default observer(Home)`
      : "export default Home"
  }
`;
  return content;
};

const getExt = (params) => {
  return params[PROMPT.LANG] === ENUMS[PROMPT.LANG].JavaScript ? "jsx" : "tsx";
};
module.exports = {
  getContent,
  getExt,
};
