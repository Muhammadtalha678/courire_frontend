export function numberToWords(num) {
  const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  const units = ["", "thousand", "million", "billion", "trillion"]; // Extend as needed for larger numbers

  if (num === 0) {
    return "zero";
  }

  function convertBelowThousand(n) {
    if (n < 20) {
      return ones[n];
    }
    if (n < 100) {
      return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? "-" + ones[n % 10] : "");
    }
    return ones[Math.floor(n / 100)] + " hundred" + (n % 100 !== 0 ? " and " + convertBelowThousand(n % 100) : "");
  }

  let words = "";
  let i = 0;

  while (num > 0) {
    const chunk = num % 1000;
    if (chunk !== 0) {
      let chunkWords = convertBelowThousand(chunk);
      if (units[i]) {
        chunkWords += " " + units[i];
      }
      words = chunkWords + (words ? " " + words : "");
    }
    num = Math.floor(num / 1000);
    i++;
  }

  return words.trim();
}

// Example usage:
console.log(numberToWords(123));     // Output: one hundred and twenty-three
console.log(numberToWords(7890));    // Output: seven thousand eight hundred and ninety
console.log(numberToWords(1000000)); // Output: one million
console.log(numberToWords(543210987)); // Output: five hundred forty-three million two hundred ten thousand nine hundred eighty-seven
console.log(numberToWords(0));       // Output: zero