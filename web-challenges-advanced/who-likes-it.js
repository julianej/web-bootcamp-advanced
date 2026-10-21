// Who likes it?
// You probably know the “like” system from Facebook and other pages. People can “like” blog posts, pictures or other items. 
// We want to create the text that should be displayed next to such an item.

// Implement the function which takes an array containing the names of people that like an item. 
//It must return the display text as shown in the examples:



// []                                -->  "no one likes this"         // names[0] = empty
// ["Peter"]                         -->  "Peter likes this"          // names[0] =  1
// ["Jacob", "Alex"]                 -->  "Jacob and Alex like this"  // names[0]  + names[1]
// ["Max", "John", "Mark"]           -->  "Max, John and Mark like this"
// ["Alex", "Jacob", "Mark", "Max"]  -->  "Alex, Jacob and 2 others like this
// Note: For 4 or more names, the number in “and 2 others” simply increases.


// const names = ["Peter", "Alex", "Jacob"];
// console.log(names[0]); // "Peter"


// const array = [" ", "Peter", "Alex", "Jacob"];
// console.log(array.slice(1));
// ["Peter", "Alex", "Jacob"]


function whoLikesIt(names) {
  const count = names.length;

  const templates = {
    0: "no one likes this",
    1: `${names[0]} likes this`,
    2: `${names[0]} and ${names[1]} like this`,
    3: `${names[0]}, ${names[1]} and ${names[2]} like this`
  };

  return count > 3
    ? `${names[0]}, ${names[1]} and ${count - 2} others like this`
    : templates[count];
}

console.log(whoLikesIt([]));
// "no one likes this"

console.log(whoLikesIt(["Peter"]));
// "Peter likes this"

console.log(whoLikesIt(["Jacob", "Alex"]));
// "Jacob and Alex like this"

console.log(whoLikesIt(["Max", "John", "Mark"]));
// "Max, John and Mark like this"

console.log(whoLikesIt(["Alex", "Jacob", "Mark", "Max"]));
// "Alex, Jacob // ..and 2 others like this"


////////////////////////////////////////////////////////

// function whoLikesIt(array) {
//   if (array.length === 0) {
//     return "no one likes this";
//   } else if (array.length === 1) {
//     return array[0] + " likes this";
//   } else if (array.length === 2) {
//     return array[0] + " and " + array[1] + " like this";
//   } else if (array.length === 3) {
//     return array[0] + ", " + array[1] + " and " + array[2] + " like this";
//   } else {
//     return array[0] + ", " + array[1] + " and " + (array.length - 2) + " others like this";
//   }
// }

// console.log(whoLikesIt([]));
// console.log(whoLikesIt(["Peter"]));
// console.log(whoLikesIt(["Jacob", "Alex"]));
// console.log(whoLikesIt(["Max", "John", "Mark"]));
// console.log(whoLikesIt(["Alex", "Jacob", "Mark", "Max"]));



/////

// function whoLikesIt(array) {
//   const count = array.length;

//   if (count === 0) return "no one likes this";
//   if (count === 1) return `${array[0]} likes this`;
//   if (count === 2) return `${array.join(" and ")} like this`;
//   if (count === 3) {
//     return `${array.slice(0, 2).join(", ")} and ${array[2]} like this`;
//   }

//   return `${array.slice(0, 2).join(", ")} and ${count - 2} others like this`;
// }