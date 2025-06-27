# test-for-fist

## Fuzzy Search Feature

This repository includes a powerful search utility with fuzzy matching capability. The fuzzy search allows you to find relevant results even when the search terms are not an exact match, accounting for typos, different word forms, or similar-sounding words.

### Features

- Fuzzy matching based on Levenshtein distance
- Configurable similarity threshold
- Search in multiple fields
- Case-insensitive searching
- Results ranked by relevance scores
- **Stack Algorithm for String Reversal** - Reverse strings using a stack data structure

### Usage

```javascript
const { search, reverse_string } = require('./search');

// Example data
const data = [
  { id: 1, name: 'Apple iPhone', category: 'Electronics' },
  { id: 2, name: 'Samsung Galaxy', category: 'Electronics' },
  { id: 3, name: 'Running Shoes', category: 'Sports' }
];

// Basic search
const results = search(data, 'iphone', { 
  keys: ['name'], 
  threshold: 0.6 
});

// Search in multiple fields
const multiFieldResults = search(data, 'Electronics', { 
  keys: ['name', 'category'], 
  threshold: 0.7 
});

// Results include the matching score and matched key
console.log(results);
// [
//   {
//     item: { id: 1, name: 'Apple iPhone', category: 'Electronics' },
//     score: 0.8333333333333334,
//     matchedKey: 'name'
//   }
// ]

// Stack Algorithm - String Reversal
const reversed = reverse_string("abcd");
console.log(reversed); // Output: "dcba"
```

### Examples

See `example.js` for more detailed examples of how to use the search functionality.

### Run Tests

```
node search.test.js
```

## Use Cases

- Users who misspell search queries will still receive relevant results
- Users searching for terms with minor variations (e.g., "color" vs. "colour") will find what they need
- Improved user experience due to greater flexibility in search
- Increased likelihood of users finding the information or items they seek
- **String reversal using stack data structure** - Educational demonstration of stack algorithms
