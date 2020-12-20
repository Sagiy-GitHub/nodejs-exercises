
const fs = require ("fs")
const msg = "Better to Test Before You Log";

const d = new Date(),
  dFormat =
    [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/") +
    " " +
    [d.getHours(), d.getMinutes(), d.getSeconds()].join(":");


function myLog(dFormat, msg, relativePath) {
  fs.writeFile(
    relativePath,
    dFormat + " " + msg + "\r\n",
    { flag: "a" },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${dFormat}: ${msg} `);
      }
    }
  );
}

myLog(dFormat  , msg, "./post.txt");