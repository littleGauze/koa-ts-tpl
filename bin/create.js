#!/usr/bin/env node

const { PROMPT } = require("../src/constants");
const { copyFolderSync } = require("../src/exec");
const { getPrompt } = require("../src/interactive")
const { execSync } = require('child_process');
const path = require('path');
const run = async () => {
  const prompts = await getPrompt()
  console.log('prompts', prompts)
  //获取目录
  const projectName = prompts[PROMPT.NAME]
  const projectPath = path.join(process.cwd(), projectName)
  console.log('projectPath', projectPath)
  //生成模版
  copyFolderSync(path.join(__dirname, "../template"), projectPath, prompts)
  //生成ts配置文件
  //生成eslint配置文件
  //生成package.json
}

run()