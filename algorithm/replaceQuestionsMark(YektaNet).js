const generateBinary = (s) => {
  let hasSeenZero = false;
  const str = s.split("");

  for (let i = s.length - 1; i >= 0; i--) {
    if (str[i] === "0") {
      str[i] = "1";
      hasSeenZero = true;
      break;
    } else {
      str[i] = "0";
    }
  }
  return [str.join(""), !hasSeenZero];
};

const generateData = (s) => {
  let lastBinary = new Array(s.split("?").length).fill("0").join("");
  while (true) {
    const generateBin = generateBinary(lastBinary);
    if (generateBin[1]) {
      break;
    }
    lastBinary = generateBin[0];
    console.log(lastBinary);
  }
};

generateData("?11111???");
