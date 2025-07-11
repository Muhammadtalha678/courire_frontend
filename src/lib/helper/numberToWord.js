export function numberToWords(amount) {
  const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  const units = ["", "thousand", "million", "billion"];

  function convertBelowThousand(n) {
    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? "-" + ones[n % 10] : "");
    return ones[Math.floor(n / 100)] + " hundred" + (n % 100 !== 0 ? " and " + convertBelowThousand(n % 100) : "");
  }

  function convertNumberToWords(n) {
    if (n === 0) return "";
    let i = 0;
    let words = "";
    while (n > 0) {
      const chunk = n % 1000;
      if (chunk !== 0) {
        let chunkWords = convertBelowThousand(chunk);
        if (units[i]) chunkWords += " " + units[i];
        words = chunkWords + (words ? " " + words : "");
      }
      n = Math.floor(n / 1000);
      i++;
    }
    return words.trim();
  }

  const safeAmount = parseFloat(amount || 0);

  if (safeAmount === 0) return ""; // ✅ Skip if 0

  const [intPartStr, decimalPartStr] = safeAmount.toFixed(2).split(".");
  const intPart = parseInt(intPartStr);
  const decimalPart = parseInt(decimalPartStr);

  const intWords = convertNumberToWords(intPart);
  const decimalWords = decimalPart > 0 ? ` and ${decimalPart} halalah` : "";

  return `${intWords} Saudi Riyal${decimalWords} only`;
}
