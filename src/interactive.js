#! /usr/bin/env node

const inquirer = require("inquirer")
const { PROMPT, DEPS, ENUMS } = require("./constants")

const prompts = [
  {
    type: "input",
    name: PROMPT.NAME,
    message: "Project name",
  },
  {
    type: "select",
    name: DEPS.AXIOS.key,
    message: "Need axios? (y/n)",
  },
  {
    type: "checkbox",
    name: PROMPT.LIB,
    message: "Other libraries",
    choices: [DEPS.CRON.key, DEPS.MOMENT.key, DEPS.MOMENT_TIMEZONE.key],
  },
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
        if (type === "select") {
          commandRes[key] =
            commandRes[key].toUpperCase() === "Y" ? true : false
        }
      }
    }
    if (!commandRes[PROMPT.NAME]) {
      commandRes[PROMPT.NAME] = "project-name"
    }
    return commandRes
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
}
module.exports = {
  getPrompt,
  prompts,
}
