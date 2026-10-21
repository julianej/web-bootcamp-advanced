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



// input.length >=4
// input.slice(-4) // "ippy"
// 
// replace DATA INPUT ["###45678"]

function MaskifyChars (input) {

    // const maskedChars = "#".repeat(input.length -4);
    // 1 - 4 = -3

    const maskedChars = "#".repeat(
    // repeat count is never negative.
        Math.max(0, input.length - 4))
    const lastFour = input.slice(-4);
  
    return maskedChars + lastFour;
}

console.log(MaskifyChars("4556364607935616"));
console.log(MaskifyChars("Skippy"));
console.log(MaskifyChars("1"));