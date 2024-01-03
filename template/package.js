const { PROMPT, ENUMS, DEPS } = require("../src/constants");

const getContent = (params) => {
  const libs = params[PROMPT.LIB] || [];
  const antd = {
    value: libs.includes(DEPS.ANTD.key),
    info: DEPS.ANTD,
  };
  const axios = {
    value: params[DEPS.AXIOS.key],
    info: DEPS.AXIOS,
  };
  const lodash = {
    value: libs.includes(DEPS.LODASH.key),
    info: DEPS.LODASH,
  };

  const ts = {
    value: params[PROMPT.LANG] === ENUMS[PROMPT.LANG].TypeScript,
    info: DEPS.TS,
  };
  const mobx = {
    value: params[DEPS.MOBX.key],
    info: DEPS.MOBX,
  };
  const dayjs = {
    value: libs.includes(DEPS.DAYJS.key),
    info: DEPS.DAYJS,
  };
  const vite = {
    value: true,
    info: DEPS.VITE,
  };
  const react = {
    value: true,
    info: {
      key: "react",
      version: "18.2.0",
      extra: {
        "react-dom": "^18.2.0",
        "react-router": "^6.15.0",
        "react-router-dom": "^6.15.0",
      },
    },
  };
  const reactDev = {
    value: true,
    info: {
      extra: {
        "@types/react": "^18.2.15",
        "@types/react-dom": "^18.2.7",
        "@vitejs/plugin-react": "^4.0.3",
        less: "^4.2.0",
        "less-loader": "^11.1.3",
      },
    },
  };

  const buildDepts = (arr) => {
    let dependencies = arr.map((dep) => {
      const res = [];
      if (dep.value) {
        if (dep.info.key && dep.info.version) {
          res.push(`"${dep.info.key}": "${dep.info.version}"`);
        }
        const extra = dep.info.extra
        if (extra) {
          Object.keys(extra).forEach((extraDep) => {
            res.push(`"${extraDep}": "${extra[extraDep]}"`);
          });
        }
      }
      return res;
    });
    dependencies = dependencies.flat();
    return dependencies;
  };
  const dependencies = buildDepts([antd, axios, lodash, mobx, dayjs, react]);

  const devDependencies = buildDepts([vite, reactDev, ts]);
  return `{
  "name": "${params[PROMPT.NAME]}",
  "version": "1.0.0",
  "description": "项目描述",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    ${dependencies.join(",\n    ")}
  },
  "devDependencies": {
    ${devDependencies.join(",\n    ")}
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
