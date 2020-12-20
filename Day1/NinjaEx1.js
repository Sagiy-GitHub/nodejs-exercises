const { promises: fs } = require("fs");
const path = require("path");

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true }).catch((err) => {
    console.log("Unable to Create Destination");
    return;
  });
  let entries = await fs.readdir(src, { withFileTypes: true }, (err) => {
    console.log("Unable to read source Dir");
    return;
  });

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);

    entry.isDirectory()
      ? await copyDir(srcPath, destPath)
      : await fs.copyFile(srcPath, destPath);
  }
}
copyDir("./ServerPages", "./Ninja1");
