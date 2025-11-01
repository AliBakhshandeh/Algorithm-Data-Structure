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

console.log(generateBinary("10011"));

const generateData = (s) => {
  let lastBinary = new Array(s.split("?").length).fill("0").join(""); // Create a binary string based on the number of "?".
  const data = new Set();

  while (true) {
    const generateBin = generateBinary(lastBinary); // Generate the next binary string.
    if (generateBin[1]) {
      break; // Stop if no more binary strings can be generated.
    }

    lastBinary = generateBin[0]; // Update the binary string for the next iteration.

    let res = "";
    let binaryIndex = 0;

    for (let i = 0; i < s.length; i++) {
      if (s[i] === "?") {
        res += lastBinary[binaryIndex]; // Replace "?" with the next binary digit.
        binaryIndex++;
      } else {
        res += s[i]; // Keep the character as it is.
      }
    }

    data.add(res); // Add the generated string to the data array.
  }

  console.log([...data]);
};

generateData("?1???");
