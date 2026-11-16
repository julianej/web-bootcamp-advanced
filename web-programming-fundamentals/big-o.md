// snippet 1 // O(n)
function first(arr: number[]) {
  return arr[0];
}


// snippet 2
function second(arr: number[]) {
  let total = 0;
  for (const value of arr) {
    total += value;
  }
  return total;
}

// snippet 3
function third(arr: number[]) {
  for (const a of arr) {
    for (const b of arr) {
      if (a === b) console.log(a);
    }
  }
}

// snippet 4
function fourth(arr: number[]) {
  for (const value of arr) {
    for (let i = 0; i < 10; i++) {
      console.log(value, i);
    }
  }
}

// snippet 5
function fifth(a: number[], b: number[]) {
  return a.filter((value) => b.includes(value));
}

// snippet 6
function sixth(a: number[], b: number[]) {
  const lookup = new Set(b);
  return a.filter((value) => lookup.has(value));
}

// snippet 7: arr is sorted in ascending order
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
function eighth(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  return [...eighth(arr.slice(0, mid)), ...eighth(arr.slice(mid))];
}
