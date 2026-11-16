


// Snippet	Complexity	Category
// 1	O(1)	CONSTANT
// 2	O(n)	RISING
// 3	O(n²)	LIFTING
// 4	O(n)	RISING
// 5	O(n × m)	Depends on n and m
// 6	O(n + m)	Linear in combined input
// 7	O(log n)	SLOW
// 8	O(n log n)	FASTER


// snippet 1 // O(1) // // RISING a hash map lookup
// Accesses the first array element directly.
function first(arr: number[]) {
  return arr[0];
}


// snippet 2
// O(n)	Loops through the entire array once.
function second(arr: number[]) {
  let total = 0;
    for (const value of arr) {
        total += value;
    }
  return total;
}

// snippet 3 
// O(n²)	Nested loops iterate over the array.
// ////// LIFTING
function third(arr: number[]) {
  for (const a of arr) {
    for (const b of arr) {
      if (a === b) console.log(a);
    }
  }
}

// snippet 4 // fixed value END 10
// O(n)	Outer loop runs n times; 
// // RISING 
// inner loop always runs 10 times.
function fourth(arr: number[]) {
  for (const value of arr) {
    for (let i = 0; i < 10; i++) {
      console.log(value, i);
    }
  }
}

// snippet 5
// O(n × m)	
// includes() searches array b for every element in a.
function fifth(a: number[], b: number[]) {
  return a.filter((value) => b.includes(value));
}

// snippet 6
// O(n + m)	Creates a Set from b, 
// then checks each element of a.
function sixth(a: number[], b: number[]) {
  const lookup = new Set(b);
  return a.filter((value) => lookup.has(value));
}

// snippet 7: arr is sorted in ascending order
// O(log n)	// SLOW //
// Binary search halves the search range each iteration.
function seventh(arr: number[], target: number) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const value = arr[mid];
    if (value === undefined) return false;
    if (value === target) return true;
    if (value < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return false;
}

// snippet 8
// O(n log n)	
// Recursive splitting creates log n levels, 
// with array copying across each level.
function eighth(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  return [...eighth(arr.slice(0, mid)), ...eighth(arr.slice(mid))];
}
