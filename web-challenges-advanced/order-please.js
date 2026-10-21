// Your order, please
// Your task is to sort a given string. Each word in the string will contain a single number. This number is the position the word should have in the result.

// Note: Numbers can be from 1 to 9. So 1 will be the first word (not 0).

// If the input string is empty, return an empty string. The words in the input String will only contain valid consecutive numbers.

// Examples
// "is2 Thi1s T4est 3a"  -->  "Thi1s is2 3a T4est"
// "4of Fo1r pe6ople g3ood th5e the2"  -->  "Fo1r the2 g3ood 4of th5e pe6ople"
// ""  -->  ""


// const wordNumbers = ["is2 Thi1s T4est 3a"]
// const wordNumberStrings = ["is2", "Thi1s", "T4est", "3a"]


function order() {
  const words = "is2 Thi1s T4est 3a";

  if (words === "") {
    return "";
  }

  const wordArray = words.split(" ");

  // Find the number in each word and sort by it.
  wordArray.sort((a, b) => {
    const numberA = Number(a.match(/\d/)[0]);
    const numberB = Number(b.match(/\d/)[0]);

    return numberA - numberB;
  });

  return wordArray.join(" ");
}

console.log(order());
// "Thi1s is2 3a T4est"


console.log(order("is2 Thi1s T4est 3a"));
console.log(order("4of Fo1r pe6ople g3ood th5e the2"));
console.log(order(""));