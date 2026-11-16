
// insertion SORT
export function insertionSort(numbers: number[]): number[] {

  // export a function insertionSort(numbers) 
  // that returns a copy sorted in ascending order.

  // Copy the Input once so the original array remains unchanged.
  const sorted = [...numbers];

  // Start at index 1 because the first element is already sorted.
  // Empty arrays and arrays with one element need no special case:
  // the loop simply never runs.
  
  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i];
    let j = i - 1;

    // Slide larger elements one position to the right.
    while (j >= 0 && sorted[j] > current) {
      sorted[j + 1] = sorted[j];
      j--;
    }

    // Insert the current element into its correct position.
    sorted[j + 1] = current;
  }

  return sorted;
}
