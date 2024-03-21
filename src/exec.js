const fs = require("fs")
const path = require("path")
const { PROMPT, DEPS, ENUMS } = require("./constants")
const prettier = require("prettier")
const copyFolderSync = (source, target, params) => {
  // 创建目标文件夹
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target)
  }

  // 读取源文件夹
  const files = fs.readdirSync(source)

  // 遍历文件并逐一拷贝
  files.forEach(file => {
    const sourcePath = path.join(source, file)
    const targetPath = path.join(target, file)
    if (sourcePath.includes("api") && !params[DEPS.AXIOS.key]) {
      return
    }
    if (
      (sourcePath.includes("tsconfig")) &&
      params[PROMPT.LANG] !== ENUMS[PROMPT.LANG].TypeScript
    ) {
      return
    }
    // 如果是目录，则递归拷贝
    if (fs.statSync(sourcePath).isDirectory()) {
      copyFolderSync(sourcePath, targetPath, params)
    } else {
      // 如果是文件，则直接拷贝
      const ext = path.extname(sourcePath)
      if (ext.substring(1) === "js") {
        const file = require(sourcePath)
        const { getContent, getExt } = file
        const content = getContent(params)
        const ext = getExt(params)
        const fileInfo = path.parse(sourcePath)
        const name = `${fileInfo.name}.${ext}`
        fs.writeFileSync(path.join(target, name), content, {
          encoding: "utf8",
        })
      } else {
        fs.copyFileSync(sourcePath, targetPath)
      }
    }
  })
}

const getParser = filePath => {
  const ext = path.extname(filePath)

  // 根据文件后缀名选择解析器
  switch (ext) {
    case ".js":
      return "babel"
    case ".ts":
      return "typescript"
    case ".jsx":
      return "babel"
    case ".tsx":
      return "typescript"
    case ".html":
      return "html"
    case ".json":
      return "json"
    // 添加更多文件后缀名和对应的解析器
    default:
      return null // 如果无法确定解析器，则返回 null
  }
}

const format = async folderPath => {
  const files = fs.readdirSync(folderPath)
  for (const file of files) {
    const filePath = path.join(folderPath, file)
    const isDirectory = fs.statSync(filePath).isDirectory()
    if (isDirectory) {
      await format(filePath)
    } else {
      const fileContent = fs.readFileSync(filePath, "utf-8")
      const parser = getParser(filePath)
      if (parser) {
        const formattedContent = await prettier.format(fileContent, {
          parser,
        })
        fs.writeFileSync(filePath, formattedContent, "utf-8")
      } else {
      }
    }
  }
}

function changePackageName(projectPath, name) {
  const packageJsonPath = path.join(projectPath, "package.json")
  const packageJson = require(packageJsonPath)
  packageJson.name = name
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), {
    encoding: "utf8",
  })
}

module.exports = {
  copyFolderSync,
  format,
  changePackageName,
}
