#! /usr/bin/env node

const inquirer = require('inquirer');
const { PROMPT, DEPS, ENUMS } = require('./constants');

const prompts = [
  {
    type: 'input',
    name: PROMPT.NAME,
    message: '项目名称'
  },
  {
    type: 'list',
    name: PROMPT.LANG,
    message: 'JS/TS',
    choices: [ENUMS[PROMPT.LANG].JavaScript, ENUMS[PROMPT.LANG].TypeScript],
  },
  {
    type: 'select',
    name: DEPS.AXIOS.key,
    message: '是否需要axios(y/n)',
  },
  {
    type: 'select',
    name: DEPS.MOBX.key,
    message: '是否需要mobx(y/n)',
  },
  {
    type: 'checkbox',
    name: PROMPT.LIB,
    message: '需要的其他依赖',
    choices: [DEPS.ANTD.key, DEPS.LODASH.key, DEPS.DAYJS.key],
  },
  {
    type: 'select',
    name: PROMPT.LINTER,
    message: '是否需要eslint(y/n)',
  }
]
const getPrompt = async () => {
  try {
    const commandRes = await inquirer.prompt(prompts)
    const map = prompts.reduce((prev, cur) => {
      prev[cur.name] = cur.type
      return prev
    }, {})
    for (const key in commandRes) {
      if (Object.hasOwnProperty.call(commandRes, key)) {
        const type = map[key]
        if (type === 'select') {
          commandRes[key] = commandRes[key].toUpperCase() === 'Y' ? true : false
        }
      }
    }
    if (!commandRes[PROMPT.NAME]) {
      commandRes[PROMPT.NAME] = 'project-name'
    }
    return commandRes
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
}
module.exports = {
  getPrompt,
  prompts
}