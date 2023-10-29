let input = document.querySelector("input");
let p = document.querySelector("p");
input.addEventListener("input", () => {
  if (input.value == "") {
    p.innerText = "";
  } else if (input.value == 0) {
    p.innerText = "Zero";
  } else {
    p.innerText = "Taka : " + convertToWordsBDT(input.value);
  }
});

// Create a function to convert BDT amount to word
function numberToWords(number) {
  const units = ["", "Thousand", "Lakh", "Crore"];
  const toWords = (n) => {
    const ones = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const teens = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "",
      "Ten",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    if (n === 0) return "Zero";
    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 10];
    if (n < 100) {
      const ten = tens[Math.floor(n / 10)];
      const one = ones[n % 10];
      return ten + (one ? "-" + one : "");
    }
    if (n < 1000) {
      const hundred = ones[Math.floor(n / 100)];
      const remainder = n % 100;
      if (remainder === 0) return hundred + " Hundred";
      return hundred + " Hundred " + toWords(remainder);
    }
  };

  const parts = [];
  let i = 0;

  while (number > 0) {
    const chunk = number % 1000;
    if (chunk !== 0) {
      const chunkWords = toWords(chunk);
      parts.unshift(chunkWords + (i > 0 ? " " + units[i] : ""));
    }
    number = Math.floor(number / 1000);
    i++;
  }

  return parts.join(" ");
}

function convertToWordsBDT(amount) {
  const corer = Math.floor(amount / 10000000);
  const lakh = Math.floor((amount % 10000000) / 100000);
  const thousand = Math.floor((amount % 100000) / 1000);
  const hundred = Math.floor((amount % 1000) / 100);
  const tensOnes = Math.floor(amount % 100);
  const paisa = Math.round((amount - Math.floor(amount)) * 100);

  const corerWords = numberToWords(corer);
  const lakhWords = numberToWords(lakh);
  const thousandWords = numberToWords(thousand);
  const hundredWords = numberToWords(hundred);
  const tensOnesWords = numberToWords(tensOnes);
  const paisaText = paisa > 0 ? numberToWords(paisa) + " Paisa " : "";

  const result =
    (corerWords ? corerWords + " Corer " : "") +
    (lakhWords ? lakhWords + " Lakh " : "") +
    (thousandWords ? thousandWords + " Thousand " : "") +
    (hundredWords ? hundredWords + " Hundred " : "") +
    (tensOnesWords ? tensOnesWords + " " : "") +
    (paisaText ? " and " + paisaText : "");

  return result + "Only.";
}
