const fs = require("fs");
const path = require("path");

const copyFolderSync = (source, target, params) => {
  // 创建目标文件夹
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }

  // 读取源文件夹
  const files = fs.readdirSync(source);

  // 遍历文件并逐一拷贝
  files.forEach((file) => {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);

    // 如果是目录，则递归拷贝
    if (fs.statSync(sourcePath).isDirectory()) {
      copyFolderSync(sourcePath, targetPath, params);
    } else {
      // 如果是文件，则直接拷贝
      const ext = path.extname(sourcePath);
      if (ext.includes("js")) {
        const file = require(sourcePath);
        const { getContent, getExt } = file;
        const content = getContent(params);
        const ext = getExt(params);
        const fileInfo = path.parse(sourcePath);
        const name = `${fileInfo.name}.${ext}`;
        fs.writeFileSync(path.join(source, name), content, {
          encoding: "utf8",
        });
      } else {
        fs.copyFileSync(sourcePath, targetPath);
      }
    }
  });
};

module.exports = {
  copyFolderSync,
};
