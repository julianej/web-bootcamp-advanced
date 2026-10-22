// Usually when you buy something, you’re asked whether your credit card number, 
// phone number or answer to your most secret question is still correct. 
// However, since someone could look over your shoulder, you don’t want that shown on your screen. Instead, we mask it.

// Your task is to write a function maskify, which changes all but the last four characters into ‘#’. 
// Examples (input –> output):

// "4556364607935616" --> "############5616"
//      "64607935616" -->      "#######5616"
//                "1" -->                "1" 
//                 "" -->                 ""
// What was the name of your first pet?

// "Skippy" --> "##ippy"
// "Nananananananananananananananana Batman!" --> "####################################man!"



// replace DATA INPUT ["###4321"]
// input.length >=4 

function MaskifyChars(input) {
    const visible = input.substring(input.length - 4); 
    
//// const lastFour = input.slice(-4);
//// input.length >=4 // replace DATA INPUT ["###4321"]

    const masked = "#".repeat(input.length - visible.length);
//// const maskedChars = "#".repeat(Math.max(0, input.length - 4))   
//// const maskedChars = "#".repeat(input.length -4);  -->  // repeat(count)
//// 1 - 4 = -3

  return masked + visible;
}


console.log(MaskifyChars("4556364607935616"));
console.log(MaskifyChars("Skippy"));
console.log(MaskifyChars("1"));



////////////////////////////////////////////////////////


// function maskify(input) {
//   return input.replace(/.(?=.{4})/g, "#");
// }

// console.log(maskify("4556364607935616"));
// // "############5616"

// console.log(maskify("Skippy"));
// // "##ippy"

// console.log(maskify("1"));
// // "1"

// console.log(maskify(""));
// ""