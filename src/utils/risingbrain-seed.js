// Complete 370+ problems from risingbrain.org/sheet
// Organized by pattern/topic with LeetCode numbers and difficulty

const SEED_PROBLEMS = [
  // ===== ARRAY: Two Pointers =====
  { leetcodeNumber: 167, name: 'Two Sum II - Input Array Is Sorted', difficulty: 'Medium', topic: 'Array', patterns: ['Two Pointers'], category: 'Array: Two Pointers' },
  { leetcodeNumber: 15, name: '3Sum', difficulty: 'Medium', topic: 'Array', patterns: ['Two Pointers'], category: 'Array: Two Pointers' },
  { leetcodeNumber: 75, name: 'Sort Colors', difficulty: 'Medium', topic: 'Array', patterns: ['Two Pointers'], category: 'Array: Two Pointers' },
  { leetcodeNumber: 283, name: 'Move Zeroes', difficulty: 'Easy', topic: 'Array', patterns: ['Two Pointers'], category: 'Array: Two Pointers' },
  { leetcodeNumber: 11, name: 'Container With Most Water', difficulty: 'Medium', topic: 'Array', patterns: ['Two Pointers'], category: 'Array: Two Pointers' },
  { leetcodeNumber: 42, name: 'Trapping Rain Water', difficulty: 'Hard', topic: 'Array', patterns: ['Two Pointers', 'Stack'], category: 'Array: Two Pointers' },

  // ===== ARRAY: Sliding Window =====
  { leetcodeNumber: 485, name: 'Max Consecutive Ones', difficulty: 'Easy', topic: 'Array', patterns: ['Sliding Window'], category: 'Array: Sliding Window' },
  { leetcodeNumber: 1004, name: 'Max Consecutive Ones III', difficulty: 'Medium', topic: 'Array', patterns: ['Sliding Window'], category: 'Array: Sliding Window' },
  { leetcodeNumber: 713, name: 'Subarray Product Less Than K', difficulty: 'Medium', topic: 'Array', patterns: ['Sliding Window'], category: 'Array: Sliding Window' },
  { leetcodeNumber: 239, name: 'Sliding Window Maximum', difficulty: 'Hard', topic: 'Array', patterns: ['Sliding Window', 'Heap'], category: 'Array: Sliding Window' },
  { leetcodeNumber: 992, name: 'Subarrays with K Different Integers', difficulty: 'Hard', topic: 'Array', patterns: ['Sliding Window', 'HashMap'], category: 'Array: Sliding Window' },
  { leetcodeNumber: 904, name: 'Fruit Into Baskets', difficulty: 'Medium', topic: 'Array', patterns: ['Sliding Window'], category: 'Array: Sliding Window' },
  { leetcodeNumber: 209, name: 'Minimum Size Subarray Sum', difficulty: 'Medium', topic: 'Array', patterns: ['Sliding Window'], category: 'Array: Sliding Window' },

  // ===== ARRAY: Prefix Sum =====
  { leetcodeNumber: 560, name: 'Subarray Sum Equals K', difficulty: 'Medium', topic: 'Array', patterns: ['HashMap'], category: 'Array: Prefix Sum' },
  { leetcodeNumber: 1314, name: 'Matrix Block Sum', difficulty: 'Medium', topic: 'Array', patterns: ['Dynamic Programming'], category: 'Array: Prefix Sum' },
  { leetcodeNumber: 238, name: 'Product of Array Except Self', difficulty: 'Medium', topic: 'Array', patterns: ['HashMap'], category: 'Array: Prefix Sum' },
  { leetcodeNumber: 523, name: 'Continuous Subarray Sum', difficulty: 'Medium', topic: 'Array', patterns: ['HashMap'], category: 'Array: Prefix Sum' },
  { leetcodeNumber: 974, name: 'Subarray Sums Divisible by K', difficulty: 'Medium', topic: 'Array', patterns: ['HashMap'], category: 'Array: Prefix Sum' },
  { leetcodeNumber: 724, name: 'Find Pivot Index', difficulty: 'Easy', topic: 'Array', patterns: ['HashMap'], category: 'Array: Prefix Sum' },

  // ===== ARRAY: Kadane's Algorithm =====
  { leetcodeNumber: 53, name: 'Maximum Subarray', difficulty: 'Medium', topic: 'Array', patterns: ['Dynamic Programming', 'Greedy'], category: 'Array: Kadane\'s Algorithm' },
  { leetcodeNumber: 152, name: 'Maximum Product Subarray', difficulty: 'Medium', topic: 'Array', patterns: ['Dynamic Programming'], category: 'Array: Kadane\'s Algorithm' },
  { leetcodeNumber: 918, name: 'Maximum Sum Circular Subarray', difficulty: 'Medium', topic: 'Array', patterns: ['Dynamic Programming'], category: 'Array: Kadane\'s Algorithm' },
  { leetcodeNumber: 1749, name: 'Maximum Absolute Sum of Any Subarray', difficulty: 'Medium', topic: 'Array', patterns: ['Dynamic Programming'], category: 'Array: Kadane\'s Algorithm' },

  // ===== STRINGS: Two Pointers (Palindrome) =====
  { leetcodeNumber: 344, name: 'Reverse String', difficulty: 'Easy', topic: 'String', patterns: ['Two Pointers'], category: 'Strings: Palindromes' },
  { leetcodeNumber: 125, name: 'Valid Palindrome', difficulty: 'Easy', topic: 'String', patterns: ['Two Pointers'], category: 'Strings: Palindromes' },
  { leetcodeNumber: 680, name: 'Valid Palindrome II', difficulty: 'Easy', topic: 'String', patterns: ['Two Pointers'], category: 'Strings: Palindromes' },
  { leetcodeNumber: 5, name: 'Longest Palindromic Substring', difficulty: 'Medium', topic: 'String', patterns: ['Two Pointers', 'Dynamic Programming'], category: 'Strings: Palindromes' },
  { leetcodeNumber: 647, name: 'Palindromic Substrings', difficulty: 'Medium', topic: 'String', patterns: ['Dynamic Programming'], category: 'Strings: Palindromes' },

  // ===== STRINGS: Sliding Window =====
  { leetcodeNumber: 438, name: 'Find All Anagrams in a String', difficulty: 'Medium', topic: 'String', patterns: ['Sliding Window', 'HashMap'], category: 'Strings: Sliding Window' },
  { leetcodeNumber: 3, name: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', topic: 'String', patterns: ['Sliding Window', 'HashMap'], category: 'Strings: Sliding Window' },
  { leetcodeNumber: 76, name: 'Minimum Window Substring', difficulty: 'Hard', topic: 'String', patterns: ['Sliding Window', 'HashMap'], category: 'Strings: Sliding Window' },
  { leetcodeNumber: 567, name: 'Permutation in String', difficulty: 'Medium', topic: 'String', patterns: ['Sliding Window'], category: 'Strings: Sliding Window' },
  { leetcodeNumber: 1763, name: 'Longest Nice Substring', difficulty: 'Easy', topic: 'String', patterns: ['Sliding Window'], category: 'Strings: Sliding Window' },

  // ===== BINARY SEARCH: Classic =====
  { leetcodeNumber: 704, name: 'Binary Search', difficulty: 'Easy', topic: 'Array', patterns: ['Binary Search'], category: 'Binary Search: Classic' },
  { leetcodeNumber: 69, name: 'Sqrt(x)', difficulty: 'Easy', topic: 'Array', patterns: ['Binary Search'], category: 'Binary Search: Classic' },
  { leetcodeNumber: 35, name: 'Search Insert Position', difficulty: 'Easy', topic: 'Array', patterns: ['Binary Search'], category: 'Binary Search: Classic' },
  { leetcodeNumber: 33, name: 'Search in Rotated Sorted Array', difficulty: 'Medium', topic: 'Array', patterns: ['Binary Search'], category: 'Binary Search: Classic' },
  { leetcodeNumber: 153, name: 'Find Minimum in Rotated Sorted Array', difficulty: 'Medium', topic: 'Array', patterns: ['Binary Search'], category: 'Binary Search: Classic' },
  { leetcodeNumber: 162, name: 'Find Peak Element', difficulty: 'Medium', topic: 'Array', patterns: ['Binary Search'], category: 'Binary Search: Classic' },

  // ===== BINARY SEARCH: Lower/Upper Bound =====
  { leetcodeNumber: 34, name: 'Find First and Last Position of Element in Sorted Array', difficulty: 'Medium', topic: 'Array', patterns: ['Binary Search'], category: 'Binary Search: Bounds' },
  { leetcodeNumber: 189, name: 'Rotate Array', difficulty: 'Medium', topic: 'Array', patterns: ['Binary Search'], category: 'Binary Search: Bounds' },

  // ===== BINARY SEARCH: On Answers =====
  { leetcodeNumber: 875, name: 'Koko Eating Bananas', difficulty: 'Medium', topic: 'Array', patterns: ['Binary Search'], category: 'Binary Search: On Answers' },
  { leetcodeNumber: 1011, name: 'Capacity To Ship Packages Within D Days', difficulty: 'Medium', topic: 'Array', patterns: ['Binary Search'], category: 'Binary Search: On Answers' },
  { leetcodeNumber: 1870, name: 'Minimum Speed to Arrive on Time', difficulty: 'Medium', topic: 'Array', patterns: ['Binary Search'], category: 'Binary Search: On Answers' },
  { leetcodeNumber: 1482, name: 'Minimum Number of Days to Make m Bouquets', difficulty: 'Medium', topic: 'Array', patterns: ['Binary Search'], category: 'Binary Search: On Answers' },
  { leetcodeNumber: 1552, name: 'Magnetic Force Between Two Balls', difficulty: 'Medium', topic: 'Array', patterns: ['Binary Search'], category: 'Binary Search: On Answers' },
  { leetcodeNumber: 410, name: 'Split Array Largest Sum', difficulty: 'Hard', topic: 'Array', patterns: ['Binary Search', 'Dynamic Programming'], category: 'Binary Search: On Answers' },

  // ===== BINARY SEARCH: 2D Matrix =====
  { leetcodeNumber: 74, name: 'Search a 2D Matrix', difficulty: 'Medium', topic: 'Matrix', patterns: ['Binary Search'], category: 'Binary Search: 2D Matrix' },
  { leetcodeNumber: 240, name: 'Search a 2D Matrix II', difficulty: 'Medium', topic: 'Matrix', patterns: ['Binary Search'], category: 'Binary Search: 2D Matrix' },

  // ===== STACK: Monotonic Stack =====
  { leetcodeNumber: 496, name: 'Next Greater Element I', difficulty: 'Easy', topic: 'Stack', patterns: ['Stack'], category: 'Stack: Monotonic Stack' },
  { leetcodeNumber: 503, name: 'Next Greater Element II', difficulty: 'Medium', topic: 'Stack', patterns: ['Stack'], category: 'Stack: Monotonic Stack' },
  { leetcodeNumber: 739, name: 'Daily Temperatures', difficulty: 'Medium', topic: 'Stack', patterns: ['Stack'], category: 'Stack: Monotonic Stack' },
  { leetcodeNumber: 901, name: 'Online Stock Span', difficulty: 'Medium', topic: 'Stack', patterns: ['Stack'], category: 'Stack: Monotonic Stack' },
  { leetcodeNumber: 84, name: 'Largest Rectangle in Histogram', difficulty: 'Hard', topic: 'Stack', patterns: ['Stack'], category: 'Stack: Monotonic Stack' },
  { leetcodeNumber: 85, name: 'Maximal Rectangle', difficulty: 'Hard', topic: 'Stack', patterns: ['Stack', 'Dynamic Programming'], category: 'Stack: Monotonic Stack' },
  { leetcodeNumber: 735, name: 'Asteroid Collision', difficulty: 'Medium', topic: 'Stack', patterns: ['Stack'], category: 'Stack: Monotonic Stack' },

  // ===== STACK: Expression Evaluation =====
  { leetcodeNumber: 224, name: 'Basic Calculator', difficulty: 'Hard', topic: 'Stack', patterns: ['Stack'], category: 'Stack: Expression Evaluation' },
  { leetcodeNumber: 227, name: 'Basic Calculator II', difficulty: 'Medium', topic: 'Stack', patterns: ['Stack'], category: 'Stack: Expression Evaluation' },
  { leetcodeNumber: 150, name: 'Evaluate Reverse Polish Notation', difficulty: 'Medium', topic: 'Stack', patterns: ['Stack'], category: 'Stack: Expression Evaluation' },
  { leetcodeNumber: 394, name: 'Decode String', difficulty: 'Medium', topic: 'Stack', patterns: ['Stack', 'Recursion'], category: 'Stack: Expression Evaluation' },

  // ===== STACK: Simulation =====
  { leetcodeNumber: 844, name: 'Backspace String Compare', difficulty: 'Easy', topic: 'Stack', patterns: ['Stack', 'Two Pointers'], category: 'Stack: Simulation' },
  { leetcodeNumber: 20, name: 'Valid Parentheses', difficulty: 'Easy', topic: 'Stack', patterns: ['Stack'], category: 'Stack: Simulation' },
  { leetcodeNumber: 155, name: 'Min Stack', difficulty: 'Medium', topic: 'Stack', patterns: ['Stack'], category: 'Stack: Simulation' },

  // ===== LINKED LIST =====
  { leetcodeNumber: 206, name: 'Reverse Linked List', difficulty: 'Easy', topic: 'Linked List', patterns: ['Linked List'], category: 'Linked List' },
  { leetcodeNumber: 21, name: 'Merge Two Sorted Lists', difficulty: 'Easy', topic: 'Linked List', patterns: ['Linked List'], category: 'Linked List' },
  { leetcodeNumber: 141, name: 'Linked List Cycle', difficulty: 'Easy', topic: 'Linked List', patterns: ['Linked List', 'Two Pointers'], category: 'Linked List' },
  { leetcodeNumber: 142, name: 'Linked List Cycle II', difficulty: 'Medium', topic: 'Linked List', patterns: ['Linked List', 'Two Pointers'], category: 'Linked List' },
  { leetcodeNumber: 19, name: 'Remove Nth Node From End of List', difficulty: 'Medium', topic: 'Linked List', patterns: ['Linked List', 'Two Pointers'], category: 'Linked List' },
  { leetcodeNumber: 2, name: 'Add Two Numbers', difficulty: 'Medium', topic: 'Linked List', patterns: ['Linked List'], category: 'Linked List' },
  { leetcodeNumber: 138, name: 'Copy List with Random Pointer', difficulty: 'Medium', topic: 'Linked List', patterns: ['Linked List', 'HashMap'], category: 'Linked List' },
  { leetcodeNumber: 23, name: 'Merge k Sorted Lists', difficulty: 'Hard', topic: 'Linked List', patterns: ['Linked List', 'Heap'], category: 'Linked List' },
  { leetcodeNumber: 25, name: 'Reverse Nodes in k-Group', difficulty: 'Hard', topic: 'Linked List', patterns: ['Linked List'], category: 'Linked List' },
  { leetcodeNumber: 148, name: 'Sort List', difficulty: 'Medium', topic: 'Linked List', patterns: ['Linked List', 'Divide & Conquer'], category: 'Linked List' },
  { leetcodeNumber: 160, name: 'Intersection of Two Linked Lists', difficulty: 'Easy', topic: 'Linked List', patterns: ['Linked List', 'Two Pointers'], category: 'Linked List' },
  { leetcodeNumber: 234, name: 'Palindrome Linked List', difficulty: 'Easy', topic: 'Linked List', patterns: ['Linked List', 'Two Pointers'], category: 'Linked List' },
  { leetcodeNumber: 143, name: 'Reorder List', difficulty: 'Medium', topic: 'Linked List', patterns: ['Linked List', 'Two Pointers'], category: 'Linked List' },
  { leetcodeNumber: 61, name: 'Rotate List', difficulty: 'Medium', topic: 'Linked List', patterns: ['Linked List'], category: 'Linked List' },
  { leetcodeNumber: 86, name: 'Partition List', difficulty: 'Medium', topic: 'Linked List', patterns: ['Linked List'], category: 'Linked List' },
  { leetcodeNumber: 82, name: 'Remove Duplicates from Sorted List II', difficulty: 'Medium', topic: 'Linked List', patterns: ['Linked List'], category: 'Linked List' },
  { leetcodeNumber: 24, name: 'Swap Nodes in Pairs', difficulty: 'Medium', topic: 'Linked List', patterns: ['Linked List', 'Recursion'], category: 'Linked List' },

  // ===== HEAP: Top-K =====
  { leetcodeNumber: 215, name: 'Kth Largest Element in an Array', difficulty: 'Medium', topic: 'Heap', patterns: ['Heap'], category: 'Heap: Top-K' },
  { leetcodeNumber: 973, name: 'K Closest Points to Origin', difficulty: 'Medium', topic: 'Heap', patterns: ['Heap'], category: 'Heap: Top-K' },
  { leetcodeNumber: 347, name: 'Top K Frequent Elements', difficulty: 'Medium', topic: 'Heap', patterns: ['Heap', 'HashMap'], category: 'Heap: Top-K' },
  { leetcodeNumber: 230, name: 'Kth Smallest Element in a BST', difficulty: 'Medium', topic: 'Heap', patterns: ['Tree', 'DFS'], category: 'Heap: Top-K' },
  { leetcodeNumber: 295, name: 'Find Median from Data Stream', difficulty: 'Hard', topic: 'Heap', patterns: ['Heap'], category: 'Heap: Top-K' },
  { leetcodeNumber: 1046, name: 'Last Stone Weight', difficulty: 'Easy', topic: 'Heap', patterns: ['Heap'], category: 'Heap: Top-K' },

  // ===== HEAP: Merge K Sorted =====
  { leetcodeNumber: 632, name: 'Smallest Range Covering Elements from K Lists', difficulty: 'Hard', topic: 'Heap', patterns: ['Heap', 'Sliding Window'], category: 'Heap: Merge K Sorted' },

  // ===== HEAP: Huffman / Scheduling =====
  { leetcodeNumber: 1167, name: 'Minimum Cost to Connect Sticks', difficulty: 'Medium', topic: 'Heap', patterns: ['Heap', 'Greedy'], category: 'Heap: Scheduling' },
  { leetcodeNumber: 621, name: 'Task Scheduler', difficulty: 'Medium', topic: 'Heap', patterns: ['Heap', 'Greedy'], category: 'Heap: Scheduling' },
  { leetcodeNumber: 703, name: 'Kth Largest Element in a Stream', difficulty: 'Easy', topic: 'Heap', patterns: ['Heap'], category: 'Heap: Scheduling' },
  { leetcodeNumber: 373, name: 'Find K Pairs with Smallest Sums', difficulty: 'Medium', topic: 'Heap', patterns: ['Heap'], category: 'Heap: Scheduling' },

  // ===== RECURSION =====
  { leetcodeNumber: 509, name: 'Fibonacci Number', difficulty: 'Easy', topic: 'Array', patterns: ['Recursion', 'Dynamic Programming'], category: 'Recursion' },
  { leetcodeNumber: 50, name: 'Pow(x, n)', difficulty: 'Medium', topic: 'Array', patterns: ['Recursion', 'Math'], category: 'Recursion' },
  { leetcodeNumber: 169, name: 'Majority Element', difficulty: 'Easy', topic: 'Array', patterns: ['Divide & Conquer'], category: 'Recursion' },
  { leetcodeNumber: 22, name: 'Generate Parentheses', difficulty: 'Medium', topic: 'Array', patterns: ['Recursion', 'Backtracking'], category: 'Recursion' },
  { leetcodeNumber: 784, name: 'Letter Case Permutation', difficulty: 'Medium', topic: 'Array', patterns: ['Recursion', 'Backtracking'], category: 'Recursion' },
  { leetcodeNumber: 341, name: 'Flatten Nested List Iterator', difficulty: 'Medium', topic: 'Array', patterns: ['Recursion', 'Stack'], category: 'Recursion' },

  // ===== TREE: DFS Traversals =====
  { leetcodeNumber: 94, name: 'Binary Tree Inorder Traversal', difficulty: 'Easy', topic: 'Tree', patterns: ['Tree', 'DFS'], category: 'Tree: DFS' },
  { leetcodeNumber: 144, name: 'Binary Tree Preorder Traversal', difficulty: 'Easy', topic: 'Tree', patterns: ['Tree', 'DFS'], category: 'Tree: DFS' },
  { leetcodeNumber: 145, name: 'Binary Tree Postorder Traversal', difficulty: 'Easy', topic: 'Tree', patterns: ['Tree', 'DFS'], category: 'Tree: DFS' },
  { leetcodeNumber: 104, name: 'Maximum Depth of Binary Tree', difficulty: 'Easy', topic: 'Tree', patterns: ['Tree', 'DFS'], category: 'Tree: DFS' },
  { leetcodeNumber: 111, name: 'Minimum Depth of Binary Tree', difficulty: 'Easy', topic: 'Tree', patterns: ['Tree', 'DFS'], category: 'Tree: DFS' },
  { leetcodeNumber: 112, name: 'Path Sum', difficulty: 'Easy', topic: 'Tree', patterns: ['Tree', 'DFS'], category: 'Tree: DFS' },
  { leetcodeNumber: 113, name: 'Path Sum II', difficulty: 'Medium', topic: 'Tree', patterns: ['Tree', 'DFS', 'Backtracking'], category: 'Tree: DFS' },
  { leetcodeNumber: 124, name: 'Binary Tree Maximum Path Sum', difficulty: 'Hard', topic: 'Tree', patterns: ['Tree', 'DFS'], category: 'Tree: DFS' },
  { leetcodeNumber: 129, name: 'Sum Root to Leaf Numbers', difficulty: 'Medium', topic: 'Tree', patterns: ['Tree', 'DFS'], category: 'Tree: DFS' },
  { leetcodeNumber: 257, name: 'Binary Tree Paths', difficulty: 'Easy', topic: 'Tree', patterns: ['Tree', 'DFS'], category: 'Tree: DFS' },
  { leetcodeNumber: 543, name: 'Diameter of Binary Tree', difficulty: 'Easy', topic: 'Tree', patterns: ['Tree', 'DFS'], category: 'Tree: DFS' },
  { leetcodeNumber: 110, name: 'Balanced Binary Tree', difficulty: 'Easy', topic: 'Tree', patterns: ['Tree', 'DFS'], category: 'Tree: DFS' },
  { leetcodeNumber: 100, name: 'Same Tree', difficulty: 'Easy', topic: 'Tree', patterns: ['Tree', 'DFS'], category: 'Tree: DFS' },
  { leetcodeNumber: 226, name: 'Invert Binary Tree', difficulty: 'Easy', topic: 'Tree', patterns: ['Tree', 'DFS'], category: 'Tree: DFS' },
  { leetcodeNumber: 572, name: 'Subtree of Another Tree', difficulty: 'Easy', topic: 'Tree', patterns: ['Tree', 'DFS'], category: 'Tree: DFS' },
  { leetcodeNumber: 101, name: 'Symmetric Tree', difficulty: 'Easy', topic: 'Tree', patterns: ['Tree', 'DFS'], category: 'Tree: DFS' },

  // ===== TREE: BFS / Level-Order =====
  { leetcodeNumber: 102, name: 'Binary Tree Level Order Traversal', difficulty: 'Medium', topic: 'Tree', patterns: ['Tree', 'BFS'], category: 'Tree: BFS' },
  { leetcodeNumber: 103, name: 'Binary Tree Zigzag Level Order Traversal', difficulty: 'Medium', topic: 'Tree', patterns: ['Tree', 'BFS'], category: 'Tree: BFS' },
  { leetcodeNumber: 637, name: 'Average of Levels in Binary Tree', difficulty: 'Easy', topic: 'Tree', patterns: ['Tree', 'BFS'], category: 'Tree: BFS' },
  { leetcodeNumber: 199, name: 'Binary Tree Right Side View', difficulty: 'Medium', topic: 'Tree', patterns: ['Tree', 'BFS'], category: 'Tree: BFS' },

  // ===== TREE: LCA =====
  { leetcodeNumber: 236, name: 'Lowest Common Ancestor of a Binary Tree', difficulty: 'Medium', topic: 'Tree', patterns: ['Tree', 'DFS'], category: 'Tree: LCA' },
  { leetcodeNumber: 235, name: 'Lowest Common Ancestor of a BST', difficulty: 'Medium', topic: 'Tree', patterns: ['Tree', 'DFS'], category: 'Tree: LCA' },

  // ===== TREE: Serialization / Construction =====
  { leetcodeNumber: 297, name: 'Serialize and Deserialize Binary Tree', difficulty: 'Hard', topic: 'Tree', patterns: ['Tree', 'BFS', 'DFS'], category: 'Tree: Construction' },
  { leetcodeNumber: 105, name: 'Construct Binary Tree from Preorder and Inorder Traversal', difficulty: 'Medium', topic: 'Tree', patterns: ['Tree', 'Recursion'], category: 'Tree: Construction' },
  { leetcodeNumber: 106, name: 'Construct Binary Tree from Inorder and Postorder Traversal', difficulty: 'Medium', topic: 'Tree', patterns: ['Tree', 'Recursion'], category: 'Tree: Construction' },
  { leetcodeNumber: 114, name: 'Flatten Binary Tree to Linked List', difficulty: 'Medium', topic: 'Tree', patterns: ['Tree', 'DFS'], category: 'Tree: Construction' },

  // ===== BST =====
  { leetcodeNumber: 700, name: 'Search in a Binary Search Tree', difficulty: 'Easy', topic: 'BST', patterns: ['Tree'], category: 'BST' },
  { leetcodeNumber: 701, name: 'Insert into a Binary Search Tree', difficulty: 'Medium', topic: 'BST', patterns: ['Tree'], category: 'BST' },
  { leetcodeNumber: 450, name: 'Delete Node in a BST', difficulty: 'Medium', topic: 'BST', patterns: ['Tree'], category: 'BST' },
  { leetcodeNumber: 98, name: 'Validate Binary Search Tree', difficulty: 'Medium', topic: 'BST', patterns: ['Tree', 'DFS'], category: 'BST' },
  { leetcodeNumber: 173, name: 'Binary Search Tree Iterator', difficulty: 'Medium', topic: 'BST', patterns: ['Tree', 'Stack'], category: 'BST' },
  { leetcodeNumber: 99, name: 'Recover Binary Search Tree', difficulty: 'Hard', topic: 'BST', patterns: ['Tree', 'DFS'], category: 'BST' },
  { leetcodeNumber: 938, name: 'Range Sum of BST', difficulty: 'Easy', topic: 'BST', patterns: ['Tree', 'DFS'], category: 'BST' },
  { leetcodeNumber: 1448, name: 'Count Good Nodes in Binary Tree', difficulty: 'Medium', topic: 'BST', patterns: ['Tree', 'DFS'], category: 'BST' },
  { leetcodeNumber: 653, name: 'Two Sum IV - Input is a BST', difficulty: 'Easy', topic: 'BST', patterns: ['Tree', 'HashMap'], category: 'BST' },

  // ===== GRAPH: BFS =====
  { leetcodeNumber: 200, name: 'Number of Islands', difficulty: 'Medium', topic: 'Graph', patterns: ['Graph', 'BFS', 'DFS'], category: 'Graph: BFS' },
  { leetcodeNumber: 994, name: 'Rotting Oranges', difficulty: 'Medium', topic: 'Graph', patterns: ['Graph', 'BFS'], category: 'Graph: BFS' },
  { leetcodeNumber: 1091, name: 'Shortest Path in Binary Matrix', difficulty: 'Medium', topic: 'Graph', patterns: ['Graph', 'BFS'], category: 'Graph: BFS' },
  { leetcodeNumber: 127, name: 'Word Ladder', difficulty: 'Hard', topic: 'Graph', patterns: ['Graph', 'BFS'], category: 'Graph: BFS' },
  { leetcodeNumber: 286, name: 'Walls and Gates', difficulty: 'Medium', topic: 'Graph', patterns: ['Graph', 'BFS'], category: 'Graph: BFS' },

  // ===== GRAPH: DFS =====
  { leetcodeNumber: 133, name: 'Clone Graph', difficulty: 'Medium', topic: 'Graph', patterns: ['Graph', 'DFS'], category: 'Graph: DFS' },
  { leetcodeNumber: 959, name: 'Regions Cut By Slashes', difficulty: 'Medium', topic: 'Graph', patterns: ['Graph', 'DFS'], category: 'Graph: DFS' },
  { leetcodeNumber: 207, name: 'Course Schedule', difficulty: 'Medium', topic: 'Graph', patterns: ['Graph', 'DFS'], category: 'Graph: DFS' },
  { leetcodeNumber: 785, name: 'Is Graph Bipartite?', difficulty: 'Medium', topic: 'Graph', patterns: ['Graph', 'BFS', 'DFS'], category: 'Graph: DFS' },
  { leetcodeNumber: 323, name: 'Number of Connected Components in an Undirected Graph', difficulty: 'Medium', topic: 'Graph', patterns: ['Graph', 'DFS'], category: 'Graph: DFS' },
  { leetcodeNumber: 952, name: 'Largest Component Size by Common Factor', difficulty: 'Hard', topic: 'Graph', patterns: ['Graph'], category: 'Graph: DFS' },
  { leetcodeNumber: 797, name: 'All Paths From Source to Target', difficulty: 'Medium', topic: 'Graph', patterns: ['Graph', 'DFS', 'Backtracking'], category: 'Graph: DFS' },
  { leetcodeNumber: 417, name: 'Pacific Atlantic Water Flow', difficulty: 'Medium', topic: 'Graph', patterns: ['Graph', 'DFS'], category: 'Graph: DFS' },
  { leetcodeNumber: 329, name: 'Longest Increasing Path in a Matrix', difficulty: 'Hard', topic: 'Graph', patterns: ['Graph', 'DFS', 'Dynamic Programming'], category: 'Graph: DFS' },

  // ===== GRAPH: Topological Sort =====
  { leetcodeNumber: 210, name: 'Course Schedule II', difficulty: 'Medium', topic: 'Graph', patterns: ['Graph', 'DFS'], category: 'Graph: Topological Sort' },
  { leetcodeNumber: 269, name: 'Alien Dictionary', difficulty: 'Hard', topic: 'Graph', patterns: ['Graph'], category: 'Graph: Topological Sort' },
  { leetcodeNumber: 444, name: 'Sequence Reconstruction', difficulty: 'Medium', topic: 'Graph', patterns: ['Graph'], category: 'Graph: Topological Sort' },

  // ===== GRAPH: Union-Find / MST =====
  { leetcodeNumber: 547, name: 'Number of Provinces', difficulty: 'Medium', topic: 'Graph', patterns: ['Graph', 'DFS'], category: 'Graph: Union-Find / MST' },
  { leetcodeNumber: 684, name: 'Redundant Connection', difficulty: 'Medium', topic: 'Graph', patterns: ['Graph'], category: 'Graph: Union-Find / MST' },
  { leetcodeNumber: 947, name: 'Most Stones Removed with Same Row or Column', difficulty: 'Medium', topic: 'Graph', patterns: ['Graph'], category: 'Graph: Union-Find / MST' },

  // ===== GRAPH: Dijkstra =====
  { leetcodeNumber: 743, name: 'Network Delay Time', difficulty: 'Medium', topic: 'Graph', patterns: ['Graph'], category: 'Graph: Dijkstra' },
  { leetcodeNumber: 1631, name: 'Path With Minimum Effort', difficulty: 'Medium', topic: 'Graph', patterns: ['Graph', 'Binary Search'], category: 'Graph: Dijkstra' },
  { leetcodeNumber: 847, name: 'Shortest Path Visiting All Nodes', difficulty: 'Hard', topic: 'Graph', patterns: ['Graph', 'BFS'], category: 'Graph: Dijkstra' },
  { leetcodeNumber: 787, name: 'Cheapest Flights Within K Stops', difficulty: 'Medium', topic: 'Graph', patterns: ['Graph', 'Dynamic Programming'], category: 'Graph: Dijkstra' },
  { leetcodeNumber: 752, name: 'Open the Lock', difficulty: 'Medium', topic: 'Graph', patterns: ['Graph', 'BFS'], category: 'Graph: Dijkstra' },

  // ===== BACKTRACKING =====
  { leetcodeNumber: 46, name: 'Permutations', difficulty: 'Medium', topic: 'Array', patterns: ['Backtracking', 'Recursion'], category: 'Backtracking' },
  { leetcodeNumber: 77, name: 'Combinations', difficulty: 'Medium', topic: 'Array', patterns: ['Backtracking', 'Recursion'], category: 'Backtracking' },
  { leetcodeNumber: 78, name: 'Subsets', difficulty: 'Medium', topic: 'Array', patterns: ['Backtracking', 'Recursion'], category: 'Backtracking' },
  { leetcodeNumber: 90, name: 'Subsets II', difficulty: 'Medium', topic: 'Array', patterns: ['Backtracking', 'Recursion'], category: 'Backtracking' },
  { leetcodeNumber: 39, name: 'Combination Sum', difficulty: 'Medium', topic: 'Array', patterns: ['Backtracking', 'Recursion'], category: 'Backtracking' },
  { leetcodeNumber: 40, name: 'Combination Sum II', difficulty: 'Medium', topic: 'Array', patterns: ['Backtracking', 'Recursion'], category: 'Backtracking' },
  { leetcodeNumber: 216, name: 'Combination Sum III', difficulty: 'Medium', topic: 'Array', patterns: ['Backtracking'], category: 'Backtracking' },
  { leetcodeNumber: 17, name: 'Letter Combinations of a Phone Number', difficulty: 'Medium', topic: 'Array', patterns: ['Backtracking', 'Recursion'], category: 'Backtracking' },
  { leetcodeNumber: 131, name: 'Palindrome Partitioning', difficulty: 'Medium', topic: 'Array', patterns: ['Backtracking', 'Dynamic Programming'], category: 'Backtracking' },
  { leetcodeNumber: 51, name: 'N-Queens', difficulty: 'Hard', topic: 'Array', patterns: ['Backtracking'], category: 'Backtracking' },
  { leetcodeNumber: 79, name: 'Word Search', difficulty: 'Medium', topic: 'Array', patterns: ['Backtracking'], category: 'Backtracking' },
  { leetcodeNumber: 212, name: 'Word Search II', difficulty: 'Hard', topic: 'Array', patterns: ['Backtracking', 'Trie'], category: 'Backtracking' },
  { leetcodeNumber: 37, name: 'Sudoku Solver', difficulty: 'Hard', topic: 'Array', patterns: ['Backtracking'], category: 'Backtracking' },
  { leetcodeNumber: 93, name: 'Restore IP Addresses', difficulty: 'Medium', topic: 'Array', patterns: ['Backtracking'], category: 'Backtracking' },
  { leetcodeNumber: 282, name: 'Expression Add Operators', difficulty: 'Hard', topic: 'Array', patterns: ['Backtracking', 'Recursion'], category: 'Backtracking' },
  { leetcodeNumber: 47, name: 'Permutations II', difficulty: 'Medium', topic: 'Array', patterns: ['Backtracking', 'Recursion'], category: 'Backtracking' },
  { leetcodeNumber: 489, name: 'Robot Room Cleaner', difficulty: 'Hard', topic: 'Array', patterns: ['Backtracking'], category: 'Backtracking' },
  { leetcodeNumber: 401, name: 'Binary Watch', difficulty: 'Easy', topic: 'Array', patterns: ['Backtracking'], category: 'Backtracking' },
  { leetcodeNumber: 89, name: 'Gray Code', difficulty: 'Medium', topic: 'Array', patterns: ['Backtracking', 'Math'], category: 'Backtracking' },

  // ===== GREEDY: Intervals & Reach =====
  { leetcodeNumber: 56, name: 'Merge Intervals', difficulty: 'Medium', topic: 'Intervals', patterns: ['Greedy'], category: 'Greedy: Intervals' },
  { leetcodeNumber: 57, name: 'Insert Interval', difficulty: 'Hard', topic: 'Intervals', patterns: ['Greedy'], category: 'Greedy: Intervals' },
  { leetcodeNumber: 55, name: 'Jump Game', difficulty: 'Medium', topic: 'Intervals', patterns: ['Greedy'], category: 'Greedy: Intervals' },
  { leetcodeNumber: 45, name: 'Jump Game II', difficulty: 'Medium', topic: 'Intervals', patterns: ['Greedy'], category: 'Greedy: Intervals' },
  { leetcodeNumber: 452, name: 'Minimum Number of Arrows to Burst Balloons', difficulty: 'Medium', topic: 'Intervals', patterns: ['Greedy'], category: 'Greedy: Intervals' },
  { leetcodeNumber: 1024, name: 'Video Stitching', difficulty: 'Medium', topic: 'Intervals', patterns: ['Greedy'], category: 'Greedy: Intervals' },
  { leetcodeNumber: 134, name: 'Gas Station', difficulty: 'Medium', topic: 'Intervals', patterns: ['Greedy'], category: 'Greedy: Intervals' },
  { leetcodeNumber: 435, name: 'Non-overlapping Intervals', difficulty: 'Medium', topic: 'Intervals', patterns: ['Greedy'], category: 'Greedy: Intervals' },

  // ===== GREEDY: Sorting / Local Choice =====
  { leetcodeNumber: 455, name: 'Assign Cookies', difficulty: 'Easy', topic: 'Array', patterns: ['Greedy'], category: 'Greedy: Sorting' },
  { leetcodeNumber: 179, name: 'Largest Number', difficulty: 'Medium', topic: 'Array', patterns: ['Greedy'], category: 'Greedy: Sorting' },
  { leetcodeNumber: 332, name: 'Reconstruct Itinerary', difficulty: 'Hard', topic: 'Array', patterns: ['Greedy', 'Graph'], category: 'Greedy: Sorting' },
  { leetcodeNumber: 860, name: 'Lemonade Change', difficulty: 'Easy', topic: 'Array', patterns: ['Greedy'], category: 'Greedy: Sorting' },
  { leetcodeNumber: 881, name: 'Boats to Save People', difficulty: 'Medium', topic: 'Array', patterns: ['Greedy', 'Two Pointers'], category: 'Greedy: Sorting' },
  { leetcodeNumber: 253, name: 'Meeting Rooms II', difficulty: 'Medium', topic: 'Array', patterns: ['Greedy', 'Heap'], category: 'Greedy: Sorting' },
  { leetcodeNumber: 121, name: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', topic: 'Array', patterns: ['Greedy'], category: 'Greedy: Sorting' },
  { leetcodeNumber: 122, name: 'Best Time to Buy and Sell Stock II', difficulty: 'Medium', topic: 'Array', patterns: ['Greedy'], category: 'Greedy: Sorting' },
  { leetcodeNumber: 763, name: 'Partition Labels', difficulty: 'Medium', topic: 'Array', patterns: ['Greedy', 'Two Pointers'], category: 'Greedy: Sorting' },

  // ===== DP: 1D / Linear =====
  { leetcodeNumber: 70, name: 'Climbing Stairs', difficulty: 'Easy', topic: 'Array', patterns: ['Dynamic Programming'], category: 'DP: Linear' },
  { leetcodeNumber: 198, name: 'House Robber', difficulty: 'Medium', topic: 'Array', patterns: ['Dynamic Programming'], category: 'DP: Linear' },
  { leetcodeNumber: 213, name: 'House Robber II', difficulty: 'Medium', topic: 'Array', patterns: ['Dynamic Programming'], category: 'DP: Linear' },
  { leetcodeNumber: 322, name: 'Coin Change', difficulty: 'Medium', topic: 'Array', patterns: ['Dynamic Programming'], category: 'DP: Linear' },
  { leetcodeNumber: 139, name: 'Word Break', difficulty: 'Medium', topic: 'Array', patterns: ['Dynamic Programming'], category: 'DP: Linear' },

  // ===== DP: 2D / Grid =====
  { leetcodeNumber: 62, name: 'Unique Paths', difficulty: 'Medium', topic: 'Matrix', patterns: ['Dynamic Programming'], category: 'DP: Grid' },
  { leetcodeNumber: 63, name: 'Unique Paths II', difficulty: 'Medium', topic: 'Matrix', patterns: ['Dynamic Programming'], category: 'DP: Grid' },
  { leetcodeNumber: 64, name: 'Minimum Path Sum', difficulty: 'Medium', topic: 'Matrix', patterns: ['Dynamic Programming'], category: 'DP: Grid' },
  { leetcodeNumber: 174, name: 'Dungeon Game', difficulty: 'Hard', topic: 'Matrix', patterns: ['Dynamic Programming'], category: 'DP: Grid' },
  { leetcodeNumber: 304, name: 'Range Sum Query 2D - Immutable', difficulty: 'Medium', topic: 'Matrix', patterns: ['Dynamic Programming'], category: 'DP: Grid' },
  { leetcodeNumber: 221, name: 'Maximal Square', difficulty: 'Medium', topic: 'Matrix', patterns: ['Dynamic Programming'], category: 'DP: Grid' },

  // ===== DP: Strings =====
  { leetcodeNumber: 300, name: 'Longest Increasing Subsequence', difficulty: 'Medium', topic: 'String', patterns: ['Dynamic Programming', 'Binary Search'], category: 'DP: Strings' },
  { leetcodeNumber: 1143, name: 'Longest Common Subsequence', difficulty: 'Medium', topic: 'String', patterns: ['Dynamic Programming'], category: 'DP: Strings' },
  { leetcodeNumber: 72, name: 'Edit Distance', difficulty: 'Hard', topic: 'String', patterns: ['Dynamic Programming'], category: 'DP: Strings' },
  { leetcodeNumber: 115, name: 'Distinct Subsequences', difficulty: 'Hard', topic: 'String', patterns: ['Dynamic Programming'], category: 'DP: Strings' },
  { leetcodeNumber: 97, name: 'Interleaving String', difficulty: 'Hard', topic: 'String', patterns: ['Dynamic Programming'], category: 'DP: Strings' },
  { leetcodeNumber: 44, name: 'Wildcard Matching', difficulty: 'Hard', topic: 'String', patterns: ['Dynamic Programming'], category: 'DP: Strings' },
  { leetcodeNumber: 10, name: 'Regular Expression Matching', difficulty: 'Hard', topic: 'String', patterns: ['Dynamic Programming', 'Recursion'], category: 'DP: Strings' },
  { leetcodeNumber: 583, name: 'Delete Operation for Two Strings', difficulty: 'Medium', topic: 'String', patterns: ['Dynamic Programming'], category: 'DP: Strings' },
  { leetcodeNumber: 712, name: 'Minimum ASCII Delete Sum for Two Strings', difficulty: 'Medium', topic: 'String', patterns: ['Dynamic Programming'], category: 'DP: Strings' },

  // ===== DP: Intervals =====
  { leetcodeNumber: 132, name: 'Palindrome Partitioning II', difficulty: 'Hard', topic: 'Intervals', patterns: ['Dynamic Programming'], category: 'DP: Intervals' },
  { leetcodeNumber: 312, name: 'Burst Balloons', difficulty: 'Hard', topic: 'Intervals', patterns: ['Dynamic Programming'], category: 'DP: Intervals' },
  { leetcodeNumber: 546, name: 'Remove Boxes', difficulty: 'Hard', topic: 'Intervals', patterns: ['Dynamic Programming'], category: 'DP: Intervals' },
  { leetcodeNumber: 1000, name: 'Minimum Cost to Merge Stones', difficulty: 'Hard', topic: 'Intervals', patterns: ['Dynamic Programming'], category: 'DP: Intervals' },

  // ===== DP: Trees =====
  { leetcodeNumber: 337, name: 'House Robber III', difficulty: 'Medium', topic: 'Tree', patterns: ['Dynamic Programming', 'Tree', 'DFS'], category: 'DP: Trees' },

  // ===== DP: Knapsack / Subset Sum =====
  { leetcodeNumber: 416, name: 'Partition Equal Subset Sum', difficulty: 'Medium', topic: 'Array', patterns: ['Dynamic Programming'], category: 'DP: Knapsack' },
  { leetcodeNumber: 518, name: 'Coin Change II', difficulty: 'Medium', topic: 'Array', patterns: ['Dynamic Programming'], category: 'DP: Knapsack' },
  { leetcodeNumber: 494, name: 'Target Sum', difficulty: 'Medium', topic: 'Array', patterns: ['Dynamic Programming', 'Backtracking'], category: 'DP: Knapsack' },

  // ===== TRIE =====
  { leetcodeNumber: 208, name: 'Implement Trie (Prefix Tree)', difficulty: 'Medium', topic: 'Trie', patterns: ['Trie'], category: 'Trie' },
  { leetcodeNumber: 211, name: 'Design Add and Search Words Data Structure', difficulty: 'Medium', topic: 'Trie', patterns: ['Trie', 'DFS'], category: 'Trie' },
  { leetcodeNumber: 720, name: 'Longest Word in Dictionary', difficulty: 'Medium', topic: 'Trie', patterns: ['Trie'], category: 'Trie' },
  { leetcodeNumber: 642, name: 'Design Search Autocomplete System', difficulty: 'Hard', topic: 'Trie', patterns: ['Trie'], category: 'Trie' },
  { leetcodeNumber: 140, name: 'Word Break II', difficulty: 'Hard', topic: 'Trie', patterns: ['Trie', 'Dynamic Programming', 'Backtracking'], category: 'Trie' },
  { leetcodeNumber: 472, name: 'Concatenated Words', difficulty: 'Hard', topic: 'Trie', patterns: ['Trie', 'Dynamic Programming'], category: 'Trie' },
  { leetcodeNumber: 421, name: 'Maximum XOR of Two Numbers in an Array', difficulty: 'Medium', topic: 'Trie', patterns: ['Trie', 'Math'], category: 'Trie' },
  { leetcodeNumber: 1707, name: 'Maximum XOR With an Element From Array', difficulty: 'Hard', topic: 'Trie', patterns: ['Trie'], category: 'Trie' },

  // ===== BIT MANIPULATION =====
  { leetcodeNumber: 136, name: 'Single Number', difficulty: 'Easy', topic: 'Bit Manipulation', patterns: ['Math'], category: 'Bit Manipulation' },
  { leetcodeNumber: 137, name: 'Single Number II', difficulty: 'Medium', topic: 'Bit Manipulation', patterns: ['Math'], category: 'Bit Manipulation' },
  { leetcodeNumber: 260, name: 'Single Number III', difficulty: 'Medium', topic: 'Bit Manipulation', patterns: ['Math'], category: 'Bit Manipulation' },
  { leetcodeNumber: 268, name: 'Missing Number', difficulty: 'Easy', topic: 'Bit Manipulation', patterns: ['Math'], category: 'Bit Manipulation' },
  { leetcodeNumber: 287, name: 'Find the Duplicate Number', difficulty: 'Medium', topic: 'Bit Manipulation', patterns: ['Two Pointers', 'Binary Search'], category: 'Bit Manipulation' },
  { leetcodeNumber: 338, name: 'Counting Bits', difficulty: 'Easy', topic: 'Bit Manipulation', patterns: ['Math', 'Dynamic Programming'], category: 'Bit Manipulation' },
  { leetcodeNumber: 191, name: 'Number of 1 Bits', difficulty: 'Easy', topic: 'Bit Manipulation', patterns: ['Math'], category: 'Bit Manipulation' },
  { leetcodeNumber: 190, name: 'Reverse Bits', difficulty: 'Easy', topic: 'Bit Manipulation', patterns: ['Math'], category: 'Bit Manipulation' },
  { leetcodeNumber: 231, name: 'Power of Two', difficulty: 'Easy', topic: 'Bit Manipulation', patterns: ['Math'], category: 'Bit Manipulation' },
  { leetcodeNumber: 2429, name: 'Minimize XOR', difficulty: 'Medium', topic: 'Bit Manipulation', patterns: ['Math'], category: 'Bit Manipulation' },

  // ===== HASHMAP =====
  { leetcodeNumber: 1, name: 'Two Sum', difficulty: 'Easy', topic: 'Array', patterns: ['HashMap'], category: 'HashMap' },
  { leetcodeNumber: 49, name: 'Group Anagrams', difficulty: 'Medium', topic: 'Array', patterns: ['HashMap'], category: 'HashMap' },
  { leetcodeNumber: 128, name: 'Longest Consecutive Sequence', difficulty: 'Medium', topic: 'Array', patterns: ['HashMap'], category: 'HashMap' },
  { leetcodeNumber: 146, name: 'LRU Cache', difficulty: 'Medium', topic: 'Array', patterns: ['HashMap', 'Linked List'], category: 'HashMap' },
  { leetcodeNumber: 380, name: 'Insert Delete GetRandom O(1)', difficulty: 'Medium', topic: 'Array', patterns: ['HashMap'], category: 'HashMap' },
  { leetcodeNumber: 73, name: 'Set Matrix Zeroes', difficulty: 'Medium', topic: 'Array', patterns: ['HashMap'], category: 'HashMap' },
  { leetcodeNumber: 36, name: 'Valid Sudoku', difficulty: 'Medium', topic: 'Array', patterns: ['HashMap'], category: 'HashMap' },
  { leetcodeNumber: 242, name: 'Valid Anagram', difficulty: 'Easy', topic: 'Array', patterns: ['HashMap'], category: 'HashMap' },
  { leetcodeNumber: 383, name: 'Ransom Note', difficulty: 'Easy', topic: 'Array', patterns: ['HashMap'], category: 'HashMap' },
  { leetcodeNumber: 290, name: 'Word Pattern', difficulty: 'Easy', topic: 'Array', patterns: ['HashMap'], category: 'HashMap' },
  { leetcodeNumber: 205, name: 'Isomorphic Strings', difficulty: 'Easy', topic: 'Array', patterns: ['HashMap'], category: 'HashMap' },

  // ===== MATH / MATRIX =====
  { leetcodeNumber: 48, name: 'Rotate Image', difficulty: 'Medium', topic: 'Matrix', patterns: ['Math'], category: 'Math / Matrix' },
  { leetcodeNumber: 54, name: 'Spiral Matrix', difficulty: 'Medium', topic: 'Matrix', patterns: ['Math'], category: 'Math / Matrix' },
  { leetcodeNumber: 7, name: 'Reverse Integer', difficulty: 'Medium', topic: 'Matrix', patterns: ['Math'], category: 'Math / Matrix' },
  { leetcodeNumber: 9, name: 'Palindrome Number', difficulty: 'Easy', topic: 'Matrix', patterns: ['Math'], category: 'Math / Matrix' },
  { leetcodeNumber: 66, name: 'Plus One', difficulty: 'Easy', topic: 'Matrix', patterns: ['Math'], category: 'Math / Matrix' },
  { leetcodeNumber: 204, name: 'Count Primes', difficulty: 'Medium', topic: 'Matrix', patterns: ['Math'], category: 'Math / Matrix' },
  { leetcodeNumber: 371, name: 'Sum of Two Integers', difficulty: 'Medium', topic: 'Matrix', patterns: ['Math'], category: 'Math / Matrix' },
  { leetcodeNumber: 43, name: 'Multiply Strings', difficulty: 'Medium', topic: 'Matrix', patterns: ['Math'], category: 'Math / Matrix' },
  { leetcodeNumber: 67, name: 'Add Binary', difficulty: 'Easy', topic: 'Matrix', patterns: ['Math'], category: 'Math / Matrix' },
  { leetcodeNumber: 166, name: 'Fraction to Recurring Decimal', difficulty: 'Medium', topic: 'Matrix', patterns: ['Math', 'HashMap'], category: 'Math / Matrix' },

  // ===== INTERVALS =====
  { leetcodeNumber: 252, name: 'Meeting Rooms', difficulty: 'Easy', topic: 'Intervals', patterns: ['Greedy'], category: 'Intervals' },
  { leetcodeNumber: 228, name: 'Summary Ranges', difficulty: 'Easy', topic: 'Intervals', patterns: ['Two Pointers'], category: 'Intervals' },
  { leetcodeNumber: 986, name: 'Interval List Intersections', difficulty: 'Medium', topic: 'Intervals', patterns: ['Two Pointers'], category: 'Intervals' },

  // ===== DESIGN =====
  { leetcodeNumber: 225, name: 'Implement Stack using Queues', difficulty: 'Easy', topic: 'Design', patterns: ['Stack'], category: 'Design' },
  { leetcodeNumber: 232, name: 'Implement Queue using Stacks', difficulty: 'Easy', topic: 'Design', patterns: ['Stack'], category: 'Design' },
  { leetcodeNumber: 355, name: 'Design Twitter', difficulty: 'Medium', topic: 'Design', patterns: ['Heap', 'HashMap'], category: 'Design' },
  { leetcodeNumber: 588, name: 'Design In-Memory File System', difficulty: 'Hard', topic: 'Design', patterns: ['Trie', 'HashMap'], category: 'Design' },
  { leetcodeNumber: 381, name: 'Insert Delete GetRandom O(1) - Duplicates allowed', difficulty: 'Hard', topic: 'Design', patterns: ['HashMap'], category: 'Design' },

  // ===== EXTRA CLASSICS =====
  { leetcodeNumber: 4, name: 'Median of Two Sorted Arrays', difficulty: 'Hard', topic: 'Array', patterns: ['Binary Search'], category: 'Classics' },
  { leetcodeNumber: 8, name: 'String to Integer (atoi)', difficulty: 'Medium', topic: 'Array', patterns: ['Math'], category: 'Classics' },
  { leetcodeNumber: 12, name: 'Integer to Roman', difficulty: 'Medium', topic: 'Array', patterns: ['Math'], category: 'Classics' },
  { leetcodeNumber: 13, name: 'Roman to Integer', difficulty: 'Easy', topic: 'Array', patterns: ['Math', 'HashMap'], category: 'Classics' },
  { leetcodeNumber: 14, name: 'Longest Common Prefix', difficulty: 'Easy', topic: 'Array', patterns: ['Two Pointers'], category: 'Classics' },
  { leetcodeNumber: 26, name: 'Remove Duplicates from Sorted Array', difficulty: 'Easy', topic: 'Array', patterns: ['Two Pointers'], category: 'Classics' },
  { leetcodeNumber: 27, name: 'Remove Element', difficulty: 'Easy', topic: 'Array', patterns: ['Two Pointers'], category: 'Classics' },
  { leetcodeNumber: 28, name: 'Find the Index of the First Occurrence in a String', difficulty: 'Easy', topic: 'Array', patterns: ['Two Pointers'], category: 'Classics' },
  { leetcodeNumber: 88, name: 'Merge Sorted Array', difficulty: 'Easy', topic: 'Array', patterns: ['Two Pointers'], category: 'Classics' },
  { leetcodeNumber: 151, name: 'Reverse Words in a String', difficulty: 'Medium', topic: 'Array', patterns: ['Two Pointers'], category: 'Classics' },
  { leetcodeNumber: 41, name: 'First Missing Positive', difficulty: 'Hard', topic: 'Array', patterns: ['HashMap'], category: 'Classics' },
  { leetcodeNumber: 71, name: 'Simplify Path', difficulty: 'Medium', topic: 'Array', patterns: ['Stack'], category: 'Classics' },
  { leetcodeNumber: 87, name: 'Scramble String', difficulty: 'Hard', topic: 'Array', patterns: ['Dynamic Programming', 'Recursion'], category: 'Classics' },
  { leetcodeNumber: 135, name: 'Candy', difficulty: 'Hard', topic: 'Array', patterns: ['Greedy'], category: 'Classics' },
  { leetcodeNumber: 149, name: 'Max Points on a Line', difficulty: 'Hard', topic: 'Array', patterns: ['Math', 'HashMap'], category: 'Classics' },
  { leetcodeNumber: 164, name: 'Maximum Gap', difficulty: 'Medium', topic: 'Array', patterns: ['Math'], category: 'Classics' },
  { leetcodeNumber: 218, name: 'The Skyline Problem', difficulty: 'Hard', topic: 'Array', patterns: ['Heap'], category: 'Classics' },
  { leetcodeNumber: 273, name: 'Integer to English Words', difficulty: 'Hard', topic: 'Array', patterns: ['Math', 'Recursion'], category: 'Classics' },

  // =============================================================
  // NON-LEETCODE PROBLEMS (GFG, Classic Algorithms, Custom)
  // =============================================================

  // ===== ARRAY: Sliding Window =====
  { leetcodeNumber: 0, name: 'Maximum Sum Subarray of Size K', difficulty: 'Easy', topic: 'Array', patterns: ['Sliding Window'], category: 'Array: Sliding Window' },

  // ===== BINARY SEARCH: Lower/Upper Bound =====
  { leetcodeNumber: 0, name: 'Count Occurrences in Sorted Array', difficulty: 'Easy', topic: 'Array', patterns: ['Binary Search'], category: 'Binary Search: Bounds' },
  { leetcodeNumber: 0, name: 'Ceiling in a Sorted Array', difficulty: 'Easy', topic: 'Array', patterns: ['Binary Search'], category: 'Binary Search: Bounds' },
  { leetcodeNumber: 0, name: 'Floor in a Sorted Array', difficulty: 'Easy', topic: 'Array', patterns: ['Binary Search'], category: 'Binary Search: Bounds' },

  // ===== BINARY SEARCH: On Answers =====
  { leetcodeNumber: 0, name: 'Aggressive Cows', difficulty: 'Medium', topic: 'Array', patterns: ['Binary Search'], category: 'Binary Search: On Answers' },
  { leetcodeNumber: 0, name: 'Allocate Minimum Number of Pages', difficulty: 'Medium', topic: 'Array', patterns: ['Binary Search'], category: 'Binary Search: On Answers' },

  // ===== BINARY SEARCH: 2D Matrix =====
  { leetcodeNumber: 0, name: 'Kth Smallest Element in Sorted Matrix', difficulty: 'Medium', topic: 'Matrix', patterns: ['Binary Search', 'Heap'], category: 'Binary Search: 2D Matrix' },
  { leetcodeNumber: 0, name: 'Matrix Median', difficulty: 'Hard', topic: 'Matrix', patterns: ['Binary Search'], category: 'Binary Search: 2D Matrix' },

  // ===== STRINGS: Sliding Window =====
  { leetcodeNumber: 0, name: 'Longest Substring with At Most K Distinct Characters', difficulty: 'Medium', topic: 'String', patterns: ['Sliding Window', 'HashMap'], category: 'Strings: Sliding Window' },

  // ===== STACK: Expression Evaluation =====
  { leetcodeNumber: 0, name: 'Infix to Prefix Conversion', difficulty: 'Medium', topic: 'Stack', patterns: ['Stack'], category: 'Stack: Expression Evaluation' },
  { leetcodeNumber: 0, name: 'Infix to Postfix Conversion', difficulty: 'Medium', topic: 'Stack', patterns: ['Stack'], category: 'Stack: Expression Evaluation' },
  { leetcodeNumber: 0, name: 'Postfix to Prefix Conversion', difficulty: 'Medium', topic: 'Stack', patterns: ['Stack'], category: 'Stack: Expression Evaluation' },
  { leetcodeNumber: 0, name: 'Postfix to Infix Conversion', difficulty: 'Medium', topic: 'Stack', patterns: ['Stack'], category: 'Stack: Expression Evaluation' },
  { leetcodeNumber: 0, name: 'Prefix to Infix Conversion', difficulty: 'Medium', topic: 'Stack', patterns: ['Stack'], category: 'Stack: Expression Evaluation' },
  { leetcodeNumber: 0, name: 'Prefix to Postfix Conversion', difficulty: 'Medium', topic: 'Stack', patterns: ['Stack'], category: 'Stack: Expression Evaluation' },

  // ===== HEAP: Merge K Sorted =====
  { leetcodeNumber: 0, name: 'Merge K Sorted Arrays', difficulty: 'Hard', topic: 'Heap', patterns: ['Heap'], category: 'Heap: Merge K Sorted' },

  // ===== HEAP: Sliding Window =====
  { leetcodeNumber: 0, name: 'Median of Stream of Integers', difficulty: 'Hard', topic: 'Heap', patterns: ['Heap'], category: 'Heap: Sliding Window' },
  { leetcodeNumber: 0, name: 'Maximum in Subarray of Size K', difficulty: 'Medium', topic: 'Heap', patterns: ['Heap', 'Sliding Window'], category: 'Heap: Sliding Window' },

  // ===== HEAP: Implementation =====
  { leetcodeNumber: 0, name: 'Design Min Heap from Scratch', difficulty: 'Medium', topic: 'Heap', patterns: ['Heap'], category: 'Heap: Implementation' },
  { leetcodeNumber: 0, name: 'Design Max Heap from Scratch', difficulty: 'Medium', topic: 'Heap', patterns: ['Heap'], category: 'Heap: Implementation' },
  { leetcodeNumber: 0, name: 'Heap Sort', difficulty: 'Medium', topic: 'Heap', patterns: ['Heap'], category: 'Heap: Implementation' },

  // ===== HEAP: Huffman =====
  { leetcodeNumber: 0, name: 'Huffman Coding', difficulty: 'Hard', topic: 'Heap', patterns: ['Heap', 'Greedy'], category: 'Heap: Huffman' },

  // ===== RECURSION =====
  { leetcodeNumber: 0, name: 'Sum of Array using Recursion', difficulty: 'Easy', topic: 'Array', patterns: ['Recursion'], category: 'Recursion' },
  { leetcodeNumber: 0, name: 'Merge Sort', difficulty: 'Medium', topic: 'Array', patterns: ['Recursion', 'Divide & Conquer'], category: 'Recursion' },
  { leetcodeNumber: 0, name: 'Quick Sort', difficulty: 'Medium', topic: 'Array', patterns: ['Recursion', 'Divide & Conquer'], category: 'Recursion' },

  // ===== TREE: BFS =====
  { leetcodeNumber: 0, name: 'Left View of Binary Tree', difficulty: 'Medium', topic: 'Tree', patterns: ['Tree', 'BFS'], category: 'Tree: BFS' },

  // ===== TREE: LCA =====
  { leetcodeNumber: 0, name: 'LCA with Parent Pointers', difficulty: 'Medium', topic: 'Tree', patterns: ['Tree'], category: 'Tree: LCA' },

  // ===== TREE: Construction =====
  { leetcodeNumber: 0, name: 'Construct Binary Tree from Level Order', difficulty: 'Medium', topic: 'Tree', patterns: ['Tree', 'BFS'], category: 'Tree: Construction' },

  // ===== BST =====
  { leetcodeNumber: 270, name: 'Closest Binary Search Tree Value', difficulty: 'Easy', topic: 'BST', patterns: ['Tree'], category: 'BST' },

  // ===== GRAPH: BFS =====
  { leetcodeNumber: 0, name: 'Multi-source BFS', difficulty: 'Medium', topic: 'Graph', patterns: ['Graph', 'BFS'], category: 'Graph: BFS' },

  // ===== GRAPH: DFS =====
  { leetcodeNumber: 261, name: 'Graph Valid Tree', difficulty: 'Medium', topic: 'Graph', patterns: ['Graph', 'DFS'], category: 'Graph: DFS' },
  { leetcodeNumber: 0, name: 'Connected Components Count', difficulty: 'Medium', topic: 'Graph', patterns: ['Graph', 'DFS'], category: 'Graph: DFS' },
  { leetcodeNumber: 0, name: 'Detect Cycle in Undirected Graph', difficulty: 'Medium', topic: 'Graph', patterns: ['Graph', 'DFS'], category: 'Graph: DFS' },

  // ===== GRAPH: Topological Sort =====
  { leetcodeNumber: 0, name: 'Topological Sort (Kahn\'s Algorithm)', difficulty: 'Medium', topic: 'Graph', patterns: ['Graph'], category: 'Graph: Topological Sort' },
  { leetcodeNumber: 0, name: 'Build Order', difficulty: 'Medium', topic: 'Graph', patterns: ['Graph'], category: 'Graph: Topological Sort' },
  { leetcodeNumber: 0, name: 'Task Scheduling Order', difficulty: 'Medium', topic: 'Graph', patterns: ['Graph'], category: 'Graph: Topological Sort' },

  // ===== GRAPH: MST / Union-Find =====
  { leetcodeNumber: 0, name: 'Minimum Spanning Tree (Kruskal\'s)', difficulty: 'Medium', topic: 'Graph', patterns: ['Graph'], category: 'Graph: Union-Find / MST' },
  { leetcodeNumber: 0, name: 'Minimum Spanning Tree (Prim\'s)', difficulty: 'Medium', topic: 'Graph', patterns: ['Graph'], category: 'Graph: Union-Find / MST' },
  { leetcodeNumber: 0, name: 'Connecting Cities With Minimum Cost', difficulty: 'Medium', topic: 'Graph', patterns: ['Graph', 'Greedy'], category: 'Graph: Union-Find / MST' },

  // ===== GRAPH: Dijkstra =====
  { leetcodeNumber: 0, name: 'Dijkstra\'s Algorithm', difficulty: 'Medium', topic: 'Graph', patterns: ['Graph'], category: 'Graph: Dijkstra' },
  { leetcodeNumber: 0, name: 'Shortest Path in Weighted Grid', difficulty: 'Medium', topic: 'Graph', patterns: ['Graph'], category: 'Graph: Dijkstra' },

  // ===== GRAPH: Bellman-Ford =====
  { leetcodeNumber: 0, name: 'Bellman-Ford Algorithm', difficulty: 'Medium', topic: 'Graph', patterns: ['Graph'], category: 'Graph: Bellman-Ford' },
  { leetcodeNumber: 0, name: 'Detect Negative Weight Cycle', difficulty: 'Medium', topic: 'Graph', patterns: ['Graph'], category: 'Graph: Bellman-Ford' },
  { leetcodeNumber: 0, name: 'Shortest Path with Negative Weights', difficulty: 'Hard', topic: 'Graph', patterns: ['Graph'], category: 'Graph: Bellman-Ford' },

  // ===== GRAPH: Floyd-Warshall =====
  { leetcodeNumber: 0, name: 'Floyd-Warshall Algorithm', difficulty: 'Medium', topic: 'Graph', patterns: ['Graph'], category: 'Graph: Floyd-Warshall' },
  { leetcodeNumber: 0, name: 'All Pairs Shortest Path', difficulty: 'Hard', topic: 'Graph', patterns: ['Graph'], category: 'Graph: Floyd-Warshall' },
  { leetcodeNumber: 0, name: 'City Pairs Distance', difficulty: 'Medium', topic: 'Graph', patterns: ['Graph'], category: 'Graph: Floyd-Warshall' },

  // ===== BACKTRACKING: Grid / Path =====
  { leetcodeNumber: 0, name: 'Path with Obstacles in Grid', difficulty: 'Medium', topic: 'Matrix', patterns: ['Backtracking'], category: 'Backtracking: Grid' },
  { leetcodeNumber: 0, name: 'All Paths in Matrix', difficulty: 'Hard', topic: 'Matrix', patterns: ['Backtracking'], category: 'Backtracking: Grid' },

  // ===== BACKTRACKING: Decision Tree =====
  { leetcodeNumber: 246, name: 'Strobogrammatic Number', difficulty: 'Medium', topic: 'Array', patterns: ['Backtracking', 'Math'], category: 'Backtracking' },

  // ===== GREEDY =====
  { leetcodeNumber: 0, name: 'Interval Scheduling Maximization', difficulty: 'Medium', topic: 'Array', patterns: ['Greedy'], category: 'Greedy: Intervals' },

  // ===== DP: 1D =====
  { leetcodeNumber: 0, name: 'Paint House', difficulty: 'Medium', topic: 'Array', patterns: ['Dynamic Programming'], category: 'DP: Linear' },

  // ===== DP: 2D / Grid =====
  { leetcodeNumber: 0, name: 'Cherry Pickup', difficulty: 'Hard', topic: 'Matrix', patterns: ['Dynamic Programming'], category: 'DP: Grid' },
  { leetcodeNumber: 0, name: 'Maximum Path Sum in Grid', difficulty: 'Hard', topic: 'Matrix', patterns: ['Dynamic Programming'], category: 'DP: Grid' },

  // ===== DP: Intervals =====
  { leetcodeNumber: 0, name: 'Matrix Chain Multiplication', difficulty: 'Hard', topic: 'Intervals', patterns: ['Dynamic Programming'], category: 'DP: Intervals' },

  // ===== DP: Trees / DAGs =====
  { leetcodeNumber: 0, name: 'Maximum Product Subarray in Tree', difficulty: 'Medium', topic: 'Tree', patterns: ['Dynamic Programming', 'Tree'], category: 'DP: Trees' },
  { leetcodeNumber: 0, name: 'Longest Path in DAG', difficulty: 'Medium', topic: 'Tree', patterns: ['Dynamic Programming', 'Graph'], category: 'DP: Trees' },
  { leetcodeNumber: 0, name: 'Tree DP Counting', difficulty: 'Medium', topic: 'Tree', patterns: ['Dynamic Programming', 'Tree'], category: 'DP: Trees' },
  { leetcodeNumber: 0, name: 'Rerooting DP', difficulty: 'Hard', topic: 'Tree', patterns: ['Dynamic Programming', 'Tree'], category: 'DP: Trees' },
  { leetcodeNumber: 0, name: 'Rerooting Problems', difficulty: 'Hard', topic: 'Tree', patterns: ['Dynamic Programming', 'Tree'], category: 'DP: Trees' },

  // ===== DP: Knapsack =====
  { leetcodeNumber: 0, name: '0-1 Knapsack Problem', difficulty: 'Medium', topic: 'Array', patterns: ['Dynamic Programming'], category: 'DP: Knapsack' },
  { leetcodeNumber: 0, name: 'Unbounded Knapsack', difficulty: 'Medium', topic: 'Array', patterns: ['Dynamic Programming'], category: 'DP: Knapsack' },
  { leetcodeNumber: 0, name: 'Bounded Knapsack', difficulty: 'Medium', topic: 'Array', patterns: ['Dynamic Programming'], category: 'DP: Knapsack' },
  { leetcodeNumber: 0, name: 'Subset Sum Problem', difficulty: 'Medium', topic: 'Array', patterns: ['Dynamic Programming'], category: 'DP: Knapsack' },

  // ===== TRIE: Bitwise / XOR =====
  { leetcodeNumber: 0, name: 'Maximum XOR Pair in Array', difficulty: 'Hard', topic: 'Trie', patterns: ['Trie', 'Math'], category: 'Trie' },

  // ===== BIT MANIPULATION =====
  { leetcodeNumber: 1310, name: 'XOR Queries of a Subarray', difficulty: 'Medium', topic: 'Bit Manipulation', patterns: ['Math'], category: 'Bit Manipulation' },
  { leetcodeNumber: 0, name: 'Bitmask DP', difficulty: 'Hard', topic: 'Bit Manipulation', patterns: ['Dynamic Programming', 'Math'], category: 'Bit Manipulation' },
  { leetcodeNumber: 0, name: 'Sum of XOR of All Pairs', difficulty: 'Hard', topic: 'Bit Manipulation', patterns: ['Math'], category: 'Bit Manipulation' },
  { leetcodeNumber: 0, name: 'Maximum XOR Subarray', difficulty: 'Hard', topic: 'Bit Manipulation', patterns: ['Math', 'Trie'], category: 'Bit Manipulation' },
];

export default SEED_PROBLEMS;
