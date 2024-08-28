const fs = require("fs");
const path = require("path");

module.exports = (directory, folderOnly = false) => {
  let fileNames = [];

  const files = fs.readdirSync(directory, { withFileTypes: true });

  files.forEach(file => {
    const filePath = path.join(directory, file.name);

    if (folderOnly) {
      if (file.isDirectory()) {
        fileNames.push(filePath);
      }
    } else {
      if (file.isFile()) {
        fileNames.push(filePath);
      }
    }
  });

  return fileNames;
};