const { DEPS, PROMPT, ENUMS } = require("../../../../src/constants");

const getContent = (params) => {
  const enableAntd = (params[PROMPT.LIB] || []).includes(DEPS.ANTD.key);
  const enableMobx = params[DEPS.MOBX.key];
  const button = enableAntd ? "Button" : "button";
  let content = `import React from 'react'
  import styles from "./index.module.less"
  ${
    enableMobx
      ? `
  import useStore from "../../store/RootStore"
  import { observer } from "mobx-react-lite"
`
      : ``
  }
  ${
    enableAntd
      ? `
  import { Button } from "antd"
`
      : ""
  }
  const Home = () => {
    ${
      enableMobx
        ? `
    const store = useStore();
    const { count } = store.counter;
    `
        : ""
    }
      return (
        ${
          enableMobx
            ? `<div>
          <div className={styles.count}>{count}</div>
          <${button} onClick={() => store.counter.increment()}>加</${button}>
          <${button} onClick={() => store.counter.decrement()}>减</${button}>
          <${button} onClick={() => store.counter.reset()}>重置</${button}>
          <${button} onClick={() => store.counter.getAsyncCount()}>异步</${button}>
        </div>`
            : `<${button}>Hello</${button}>`
        }
      )
  }
  ${enableMobx ? `export default observer(Home)` : "export default Home"}
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
