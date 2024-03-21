const PROMPT = {
  NAME: "NAME",
  LANG: "LANG",
  LIB: "LIB",
}
const ENUMS = {
  [PROMPT.LANG]: {
    JavaScript: "JavaScript",
    TypeScript: "TypeScript",
  },
}
const YES = "Y"
const DEPS = {
  ANTD: {
    key: "antd",
    version: "^5.9.0",
  },
  DAYJS: {
    key: "dayjs",
    version: "^1.11.9",
  },
  AXIOS: {
    key: "axios",
    version: "^1.5.0",
  },
  LODASH: {
    key: "lodash",
    version: "^4.17.21",
  },
  TS: {
    key: "typescript",
    version: "^5.2.2",
  },
  CRON: {
    key: "node-cron",
    version: "^3.0.2",
  },
  MOMENT: {
    key: "moment",
    version: "^2.29.4",
  },
  MOMENT_TIMEZONE: {
    key: "moment-timezone",
    version: "^0.5.43",
  },
}
module.exports = {
  PROMPT,
  YES,
  DEPS,
  ENUMS,
}
