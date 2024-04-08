module.exports = (str) => {
  const regex = /^([-+])?\$?([\d.,]+)(K|M|%)?$/;
  const match = str.match(regex);

  if (match) {
    const sign = match[1] === "-" ? -1 : 1;
    const numberStr = match[2].replace(/,/g, "");
    const suffix = match[3];
    let number = parseFloat(numberStr);
    if (suffix === "K") {
      number *= 1000;
    } else if (suffix === "M") {
      number *= 1000000;
    }
    return sign * number;
  }
  return 0;
};
