// Who likes it?
// You probably know the “like” system from Facebook and other pages. People can “like” blog posts, pictures or other items. 
// We want to create the text that should be displayed next to such an item.

// Implement the function which takes an array containing the names of people that like an item. 
//It must return the display text as shown in the examples:

// []                                -->  "no one likes this"
// ["Peter"]                         -->  "Peter likes this"
// ["Jacob", "Alex"]                 -->  "Jacob and Alex like this"
// ["Max", "John", "Mark"]           -->  "Max, John and Mark like this"
// ["Alex", "Jacob", "Mark", "Max"]  -->  "Alex, Jacob and 2 others like this
// Note: For 4 or more names, the number in “and 2 others” simply increases.



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
// "Alex, Jacob and 2 others like this"



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