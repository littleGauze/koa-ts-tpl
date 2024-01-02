const PROMPT = {
  NAME: 'NAME',
  LANG: 'LANG',
  LIB: 'LIB',
  MOBX: 'MOBX',
  ROUTER: 'ROUTER',
  EASY_ROUTER: 'EASY_ROUTER',
  LINTER: 'LINTER'
}
const ENUMS = {
  [PROMPT.LANG]: {
    JavaScript: 'JavaScript',
    TypeScript: 'TypeScript'
  },
  [PROMPT.ROUTER]: {
    Hash: 'Hash',
    History: 'History'
  }
}
const YES = 'Y'
const DEPS = {
  ANTD: {
    key: 'antd',
    version: '^5.9.0'
  },
  DAYJS: {
    key: 'dayjs',
    version: '^1.11.9'
  },
  AXIOS: {
    key: 'axios',
    version: '^1.5.0'
  },
  LODASH: {
    key: 'lodash',
    version: '^4.17.21'
  },
  MOBX: {
    key: 'mobx',
    version: '^6.12.0',
    extra: {
      "mobx-react-lite": "^4.0.5"
    }
  }
}
module.exports = {
  PROMPT,
  YES,
  DEPS,
  ENUMS
}