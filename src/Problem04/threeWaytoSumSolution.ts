// Implementation 1: Iterative approach

function sum_to_n_iterative(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

// Complexity:
// Time Complexity: O(n) - Linear time complexity as the loop iterates n times.
// Space Complexity: O(1) - Constant space complexity as only a single variable 'sum' is used.
// Efficiency: This is generally the most efficient and straightforward approach for most cases.

// Implementation 2: Recursive approach

function sum_to_n_recursive(n: number): number {
  if (n === 0) {
    return 0;
  } else {
    return n + sum_to_n_recursive(n - 1);
  }
}

// Complexity:
// Time Complexity: O(n) -  Although it looks different, it still performs n recursive calls.
// Space Complexity: O(n) -  Due to the call stack growing with each recursive call. This can become a problem for very large 'n' values, potentially leading to a stack overflow error.
// Efficiency: Less efficient than the iterative approach due to the overhead of function calls and stack management.  Generally avoid recursion for simple linear problems like this.

// Implementation 3: Mathematical approach (using the arithmetic series formula)

function sum_to_n_mathematical(n: number): number {
  return (n * (n + 1)) / 2;
}

// Complexity:
// Time Complexity: O(1) - Constant time complexity.  The calculation is performed in a single step, regardless of the value of 'n'.
// Space Complexity: O(1) - Constant space complexity.
// Efficiency: This is the most efficient approach. It directly calculates the sum using a formula, avoiding loops or recursion.  This is the preferred method for this problem.

// Example usage:
console.log(sum_to_n_iterative(5)); // Output: 15
console.log(sum_to_n_recursive(5)); // Output: 15
console.log(sum_to_n_mathematical(5)); // Output: 15
