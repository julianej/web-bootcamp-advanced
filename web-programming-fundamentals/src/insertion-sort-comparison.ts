
export function insertionSort(numbers: number[] ): { sorted: number[]; comparisons: number } {
    
  const sorted = [...numbers];
  let comparisons = 0;

  // Empty arrays and arrays with one element need no special case:
  // the loop never runs because there are no elements to insert.
  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i];
    let j = i - 1;

    while (j >= 0) {
      comparisons++;

      if (sorted[j] > current) {
        sorted[j + 1] = sorted[j];
        j--;
      } else {
        break;
      }
    }

    sorted[j + 1] = current;
  }

  return { sorted, comparisons };
}

// Test results:
//
// insertionSort([1, 2, 3, 4, 5]); 
// comparisons: 4
//
// insertionSort([5, 4, 3, 2, 1]);
// comparisons: 10
//
// insertionSort([42]);
// comparisons: 0
//
// insertionSort([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
// comparisons: 45
//
// Reversed arrays require more comparisons because every new element
// must move past all previously sorted elements.
// Already sorted arrays need only one comparison per element.
// A single-element array needs no comparisons.
