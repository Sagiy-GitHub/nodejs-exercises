const num = process.argv[2];

const res = Math.pow(num, 2);

if (num >= 1 && num <= 10) {
  function repeatStringNumTimes(str, res) {
    return res > 0 ? str.repeat(res) : "";
  }

  console.log(repeatStringNumTimes("#", res));
} else {
  console.log("Must enter a Number from 1-10");
}

