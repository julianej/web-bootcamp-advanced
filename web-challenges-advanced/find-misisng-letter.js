// Find the missing letter
// Write a method that takes an array of consecutive (increasing) letters as input and that returns the missing letter in the array.

// You will always get an valid array. And it will be always exactly one letter be missing. 
// The length of the array will always be at least 2. The array will always contain letters in only one case.

// Example:
// ['a','b','c','d','f'] -> 'e'
// ['O','Q','R','S'] -> 'P'
// (Use the English alphabet with 26 letters!)


// console.log("a".charCodeAt(0)); // 97
// console.log("b".charCodeAt(0)); // 98
// console.log("c".charCodeAt(0)); // 99

// console.log("Apple".charCodeAt(0)); // 65 (A)
// console.log("Apple".charCodeAt(1)); // 112 (p)



function findMissingLetter(array) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const isUpperCase = array[0] === array[0].toUpperCase();

  const letters = isUpperCase
    ? alphabet.toUpperCase()
    : alphabet;

  const start = letters.indexOf(array[0]);

  const expected = letters
    .slice(start, start + array.length + 1)
    .split("");

  const missing = expected.find(
    letter => !array.includes(letter)
  );

  return missing;
}

console.log(findMissingLetter(["a", "b", "c", "d", "f"]));
// "e"

console.log(findMissingLetter(["O", "Q", "R", "S"]));
// "P"

