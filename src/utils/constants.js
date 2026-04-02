export const DEFAULT_PATTERNS = [
  'Two Pointers', 'Sliding Window', 'Binary Search', 'BFS', 'DFS',
  'Dynamic Programming', 'Backtracking', 'Greedy', 'Heap', 'Stack',
  'Trie', 'Graph', 'Linked List', 'Tree', 'Math', 'HashMap',
  'Recursion', 'Divide & Conquer'
];

export const DEFAULT_COMPANIES = [
  'Amazon', 'Google', 'Meta', 'Microsoft', 'Flipkart', 'Adobe', 'Swiggy', 'Uber'
];

// These are now functions that read from localStorage, falling back to defaults
export function getPatterns() {
  try {
    const stored = localStorage.getItem('crackit_custom_patterns');
    return stored ? JSON.parse(stored) : DEFAULT_PATTERNS;
  } catch { return DEFAULT_PATTERNS; }
}

export function setPatterns(patterns) {
  localStorage.setItem('crackit_custom_patterns', JSON.stringify(patterns));
}

export function getCompanies() {
  try {
    const stored = localStorage.getItem('crackit_custom_companies');
    return stored ? JSON.parse(stored) : DEFAULT_COMPANIES;
  } catch { return DEFAULT_COMPANIES; }
}

export function setCompanies(companies) {
  localStorage.setItem('crackit_custom_companies', JSON.stringify(companies));
}

// Keep static references for backward compat in places that need the defaults
export const PATTERNS = DEFAULT_PATTERNS;
export const COMPANIES = DEFAULT_COMPANIES;

export const DEFAULT_TOPICS = [
  'Array', 'String', 'Linked List', 'Stack', 'Queue', 'Tree', 'BST',
  'Graph', 'Heap', 'Trie', 'Matrix', 'Intervals', 'Design', 'Bit Manipulation'
];

export function getTopics() {
  try {
    const stored = localStorage.getItem('crackit_custom_topics');
    return stored ? JSON.parse(stored) : DEFAULT_TOPICS;
  } catch { return DEFAULT_TOPICS; }
}

export function setTopics(topics) {
  localStorage.setItem('crackit_custom_topics', JSON.stringify(topics));
}

export const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];
export const STATUSES = ['Unsolved', 'Attempted', 'Solved', 'Mastered'];
export const CONFIDENCES = ['Shaky', 'Okay', 'Confident'];
export const FELT_DIFFICULTIES = ['Easier than label', 'As expected', 'Harder than label'];

export const STORAGE_KEYS = {
  PROBLEMS: 'crackit_problems',
  REVISIONS: 'crackit_revisions',
  STUDY_PLAN: 'crackit_study_plan',
  MOCK_HISTORY: 'crackit_mock_history',
  NOTES: 'crackit_notes',
  STREAKS: 'crackit_streaks',
  MILESTONES: 'crackit_milestones',
};

export const PATTERN_TEMPLATES = {
  'Two Pointers': '## Two Pointers\n\n**When to use:** Sorted arrays, finding pairs, or when you need two references moving through data.\n\n**Common patterns:**\n- Left and right pointers moving inward\n- Fast and slow pointers\n- One pointer fixed, other scanning\n\n**Key problems:** Two Sum (sorted), 3Sum, Container With Most Water, Remove Duplicates\n\n**Template:**\n```\nlet left = 0, right = arr.length - 1;\nwhile (left < right) {\n  // process\n  if (condition) left++;\n  else right--;\n}\n```\n\n**Your notes:**\n',
  'Sliding Window': '## Sliding Window\n\n**When to use:** Contiguous subarray/substring problems, finding max/min in a window.\n\n**Common patterns:**\n- Fixed size window\n- Variable size window (expand/shrink)\n\n**Key problems:** Max Subarray Sum of size K, Longest Substring Without Repeating Characters\n\n**Template:**\n```\nlet left = 0;\nfor (let right = 0; right < arr.length; right++) {\n  // add arr[right] to window\n  while (window is invalid) {\n    // remove arr[left] from window\n    left++;\n  }\n  // update answer\n}\n```\n\n**Your notes:**\n',
  'Binary Search': '## Binary Search\n\n**When to use:** Sorted data, finding boundaries, optimization problems (min/max that satisfies condition).\n\n**Common patterns:**\n- Classic binary search\n- Binary search on answer\n- Find first/last occurrence\n\n**Template:**\n```\nlet lo = 0, hi = arr.length - 1;\nwhile (lo <= hi) {\n  let mid = Math.floor((lo + hi) / 2);\n  if (arr[mid] === target) return mid;\n  else if (arr[mid] < target) lo = mid + 1;\n  else hi = mid - 1;\n}\n```\n\n**Your notes:**\n',
  'BFS': '## BFS (Breadth-First Search)\n\n**When to use:** Shortest path (unweighted), level-order traversal, finding nearest.\n\n**Common patterns:**\n- Level-order tree traversal\n- Shortest path in grid/graph\n- Multi-source BFS\n\n**Template:**\n```\nconst queue = [start];\nconst visited = new Set([start]);\nwhile (queue.length) {\n  const node = queue.shift();\n  for (const neighbor of getNeighbors(node)) {\n    if (!visited.has(neighbor)) {\n      visited.add(neighbor);\n      queue.push(neighbor);\n    }\n  }\n}\n```\n\n**Your notes:**\n',
  'DFS': '## DFS (Depth-First Search)\n\n**When to use:** Exploring all paths, connected components, cycle detection, topological sort.\n\n**Common patterns:**\n- Recursive DFS\n- Iterative with stack\n- Path finding\n\n**Template:**\n```\nfunction dfs(node, visited) {\n  visited.add(node);\n  for (const neighbor of getNeighbors(node)) {\n    if (!visited.has(neighbor)) {\n      dfs(neighbor, visited);\n    }\n  }\n}\n```\n\n**Your notes:**\n',
  'Dynamic Programming': '## Dynamic Programming\n\n**When to use:** Overlapping subproblems, optimal substructure, counting paths/ways.\n\n**Common patterns:**\n- 1D DP (Fibonacci-style)\n- 2D DP (grid, two sequences)\n- Knapsack variations\n- Interval DP\n\n**Steps:**\n1. Define state\n2. Find recurrence relation\n3. Set base cases\n4. Determine iteration order\n5. Optimize space if needed\n\n**Your notes:**\n',
  'Backtracking': '## Backtracking\n\n**When to use:** Generate all combinations/permutations, constraint satisfaction, puzzle solving.\n\n**Template:**\n```\nfunction backtrack(path, choices) {\n  if (isComplete(path)) {\n    result.push([...path]);\n    return;\n  }\n  for (const choice of choices) {\n    if (isValid(choice)) {\n      path.push(choice);\n      backtrack(path, remaining);\n      path.pop();\n    }\n  }\n}\n```\n\n**Your notes:**\n',
  'Greedy': '## Greedy\n\n**When to use:** Local optimal leads to global optimal, interval scheduling, activity selection.\n\n**Key insight:** Prove greedy choice property — making the locally best choice doesn\'t prevent finding the global optimum.\n\n**Common problems:** Jump Game, Gas Station, Task Scheduler, Interval Scheduling\n\n**Your notes:**\n',
  'Heap': '## Heap (Priority Queue)\n\n**When to use:** K-th largest/smallest, merge K sorted lists, scheduling, median finding.\n\n**Common patterns:**\n- Min heap for K largest elements\n- Max heap for K smallest elements\n- Two heaps for median\n\n**Your notes:**\n',
  'Stack': '## Stack\n\n**When to use:** Matching brackets, monotonic stack, expression evaluation, undo operations.\n\n**Common patterns:**\n- Monotonic stack (next greater/smaller element)\n- Balanced parentheses\n- Calculator/expression parsing\n\n**Your notes:**\n',
  'Trie': '## Trie (Prefix Tree)\n\n**When to use:** Prefix matching, autocomplete, word search, dictionary problems.\n\n**Template:**\n```\nclass TrieNode {\n  constructor() {\n    this.children = {};\n    this.isEnd = false;\n  }\n}\n```\n\n**Your notes:**\n',
  'Graph': '## Graph\n\n**When to use:** Network problems, shortest paths, connectivity, cycle detection.\n\n**Representations:** Adjacency list, adjacency matrix, edge list\n\n**Key algorithms:** Dijkstra, Bellman-Ford, Floyd-Warshall, Union-Find, Topological Sort, Kruskal/Prim\n\n**Your notes:**\n',
  'Linked List': '## Linked List\n\n**When to use:** In-place operations, cycle detection, merging, reversing.\n\n**Common patterns:**\n- Fast/slow pointers (cycle detection)\n- Dummy head node\n- Reverse in groups\n\n**Your notes:**\n',
  'Tree': '## Tree\n\n**When to use:** Hierarchical data, BST operations, tree traversals.\n\n**Traversals:** Inorder, Preorder, Postorder, Level-order\n\n**Common patterns:**\n- Recursive tree processing\n- Path sum problems\n- LCA (Lowest Common Ancestor)\n- BST properties\n\n**Your notes:**\n',
  'Math': '## Math\n\n**When to use:** Number theory, modular arithmetic, combinatorics, bit manipulation.\n\n**Key concepts:** GCD/LCM, prime sieve, modular exponentiation, counting\n\n**Your notes:**\n',
  'HashMap': '## HashMap\n\n**When to use:** Frequency counting, grouping, O(1) lookups, two sum pattern.\n\n**Common patterns:**\n- Frequency map\n- Index map\n- Group by key\n- Sliding window + map\n\n**Your notes:**\n',
  'Recursion': '## Recursion\n\n**When to use:** Self-similar subproblems, divide and conquer, tree/graph traversal.\n\n**Key concepts:**\n- Base case identification\n- Recursive leap of faith\n- Call stack understanding\n- Tail recursion optimization\n\n**Your notes:**\n',
  'Divide & Conquer': '## Divide & Conquer\n\n**When to use:** Problem can be split into independent subproblems of same type.\n\n**Key algorithms:** Merge Sort, Quick Sort, Binary Search, Closest Pair of Points\n\n**Steps:**\n1. Divide into subproblems\n2. Conquer (solve recursively)\n3. Combine results\n\n**Your notes:**\n',
};

export const COMPANY_PROBLEM_SETS = {
  Amazon: [
    { number: 1, name: 'Two Sum' },
    { number: 2, name: 'Add Two Numbers' },
    { number: 3, name: 'Longest Substring Without Repeating Characters' },
    { number: 5, name: 'Longest Palindromic Substring' },
    { number: 15, name: '3Sum' },
    { number: 21, name: 'Merge Two Sorted Lists' },
    { number: 23, name: 'Merge k Sorted Lists' },
    { number: 42, name: 'Trapping Rain Water' },
    { number: 49, name: 'Group Anagrams' },
    { number: 56, name: 'Merge Intervals' },
    { number: 73, name: 'Set Matrix Zeroes' },
    { number: 121, name: 'Best Time to Buy and Sell Stock' },
    { number: 127, name: 'Word Ladder' },
    { number: 146, name: 'LRU Cache' },
    { number: 200, name: 'Number of Islands' },
    { number: 238, name: 'Product of Array Except Self' },
    { number: 295, name: 'Find Median from Data Stream' },
    { number: 297, name: 'Serialize and Deserialize Binary Tree' },
    { number: 380, name: 'Insert Delete GetRandom O(1)' },
    { number: 588, name: 'Design In-Memory File System' },
  ],
  Google: [
    { number: 4, name: 'Median of Two Sorted Arrays' },
    { number: 11, name: 'Container With Most Water' },
    { number: 20, name: 'Valid Parentheses' },
    { number: 31, name: 'Next Permutation' },
    { number: 34, name: 'Find First and Last Position of Element in Sorted Array' },
    { number: 41, name: 'First Missing Positive' },
    { number: 76, name: 'Minimum Window Substring' },
    { number: 84, name: 'Largest Rectangle in Histogram' },
    { number: 124, name: 'Binary Tree Maximum Path Sum' },
    { number: 155, name: 'Min Stack' },
    { number: 218, name: 'The Skyline Problem' },
    { number: 239, name: 'Sliding Window Maximum' },
    { number: 253, name: 'Meeting Rooms II' },
    { number: 329, name: 'Longest Increasing Path in a Matrix' },
    { number: 340, name: 'Longest Substring with At Most K Distinct Characters' },
    { number: 394, name: 'Decode String' },
    { number: 410, name: 'Split Array Largest Sum' },
    { number: 528, name: 'Random Pick with Weight' },
    { number: 843, name: 'Guess the Word' },
    { number: 1235, name: 'Maximum Profit in Job Scheduling' },
  ],
  Meta: [
    { number: 1, name: 'Two Sum' },
    { number: 15, name: '3Sum' },
    { number: 23, name: 'Merge k Sorted Lists' },
    { number: 33, name: 'Search in Rotated Sorted Array' },
    { number: 43, name: 'Multiply Strings' },
    { number: 50, name: 'Pow(x, n)' },
    { number: 56, name: 'Merge Intervals' },
    { number: 67, name: 'Add Binary' },
    { number: 71, name: 'Simplify Path' },
    { number: 88, name: 'Merge Sorted Array' },
    { number: 125, name: 'Valid Palindrome' },
    { number: 138, name: 'Copy List with Random Pointer' },
    { number: 199, name: 'Binary Tree Right Side View' },
    { number: 215, name: 'Kth Largest Element in an Array' },
    { number: 227, name: 'Basic Calculator II' },
    { number: 236, name: 'Lowest Common Ancestor of a Binary Tree' },
    { number: 314, name: 'Binary Tree Vertical Order Traversal' },
    { number: 339, name: 'Nested List Weight Sum' },
    { number: 560, name: 'Subarray Sum Equals K' },
    { number: 987, name: 'Vertical Order Traversal of a Binary Tree' },
  ],
  Microsoft: [
    { number: 1, name: 'Two Sum' },
    { number: 2, name: 'Add Two Numbers' },
    { number: 4, name: 'Median of Two Sorted Arrays' },
    { number: 8, name: 'String to Integer (atoi)' },
    { number: 21, name: 'Merge Two Sorted Lists' },
    { number: 25, name: 'Reverse Nodes in k-Group' },
    { number: 33, name: 'Search in Rotated Sorted Array' },
    { number: 46, name: 'Permutations' },
    { number: 54, name: 'Spiral Matrix' },
    { number: 79, name: 'Word Search' },
    { number: 103, name: 'Binary Tree Zigzag Level Order Traversal' },
    { number: 146, name: 'LRU Cache' },
    { number: 151, name: 'Reverse Words in a String' },
    { number: 200, name: 'Number of Islands' },
    { number: 206, name: 'Reverse Linked List' },
    { number: 212, name: 'Word Search II' },
    { number: 236, name: 'Lowest Common Ancestor of a Binary Tree' },
    { number: 269, name: 'Alien Dictionary' },
    { number: 273, name: 'Integer to English Words' },
    { number: 348, name: 'Design Tic-Tac-Toe' },
  ],
  Flipkart: [
    { number: 1, name: 'Two Sum' },
    { number: 3, name: 'Longest Substring Without Repeating Characters' },
    { number: 11, name: 'Container With Most Water' },
    { number: 15, name: '3Sum' },
    { number: 20, name: 'Valid Parentheses' },
    { number: 42, name: 'Trapping Rain Water' },
    { number: 53, name: 'Maximum Subarray' },
    { number: 56, name: 'Merge Intervals' },
    { number: 62, name: 'Unique Paths' },
    { number: 73, name: 'Set Matrix Zeroes' },
    { number: 78, name: 'Subsets' },
    { number: 94, name: 'Binary Tree Inorder Traversal' },
    { number: 121, name: 'Best Time to Buy and Sell Stock' },
    { number: 141, name: 'Linked List Cycle' },
    { number: 146, name: 'LRU Cache' },
    { number: 198, name: 'House Robber' },
    { number: 200, name: 'Number of Islands' },
    { number: 206, name: 'Reverse Linked List' },
    { number: 322, name: 'Coin Change' },
    { number: 347, name: 'Top K Frequent Elements' },
  ],
};

export const MILESTONES_LIST = [
  { id: 'first_problem', name: 'First Step', description: 'Log your first problem', icon: '🎯' },
  { id: 'solve_10', name: 'Getting Started', description: 'Solve 10 problems', icon: '📝' },
  { id: 'solve_25', name: 'Quarter Century', description: 'Solve 25 problems', icon: '⚡' },
  { id: 'solve_50', name: 'Half Century', description: 'Solve 50 problems', icon: '🔥' },
  { id: 'solve_100', name: 'Centurion', description: 'Solve 100 problems', icon: '💯' },
  { id: 'solve_200', name: 'DSA Machine', description: 'Solve 200 problems', icon: '🏆' },
  { id: 'streak_7', name: 'Week Warrior', description: '7-day solve streak', icon: '📅' },
  { id: 'streak_30', name: 'Month Master', description: '30-day solve streak', icon: '🗓️' },
  { id: 'revision_week', name: 'Revision Champion', description: 'All revisions done for a week', icon: '🔄' },
  { id: 'pattern_master', name: 'Pattern Master', description: 'Master a pattern (5+ mastered)', icon: '🧩' },
];
