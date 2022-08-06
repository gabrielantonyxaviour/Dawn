const fs = require("fs")

const writeToFile = async (name, content) => {
  fs.writeFileSync(`./data/${name}.json`, JSON.stringify(content, null, 2));
}

module.exports = {
  writeToFile
}