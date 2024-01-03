#!/usr/bin/env node

const { PROMPT } = require("../src/constants");
const { copyFolderSync,format } = require("../src/exec");
const { getPrompt } = require("../src/interactive")
const path = require('path');
const run = async () => {
  const prompts = await getPrompt()
  //获取目录
  const projectName = prompts[PROMPT.NAME]
  const projectPath = path.join(process.cwd(), projectName)
  //生成模版
  copyFolderSync(path.join(__dirname, "../template"), projectPath, prompts)
  // 代码美化
  await format(projectPath)
  console.log(`🚀 项目地址:${projectPath}`)
}

run()