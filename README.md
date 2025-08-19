# test-for-fist

## Mathematical Problem-Solving Guide

This repository now includes a comprehensive mathematical problem-solving guide focusing on Algebra and Further Mathematics, built upon the existing fuzzy search functionality.

### Mathematical Features

- **Comprehensive Guide**: Step-by-step problem-solving techniques (`math-guide.md`)
- **Problem Database**: 15+ categorized mathematical problems with detailed solutions
- **Smart Search**: Find problems by topic, difficulty, or keywords using fuzzy matching
- **Multiple Categories**: Linear equations, quadratic equations, word problems, systems, polynomials, and more

### Quick Start - Mathematical Search

```javascript
const { search } = require('./search');
const { mathematicalProblems } = require('./math-problems');

// Search for quadratic problems
const quadratics = search(mathematicalProblems, 'quadratic', { 
  keys: ['category', 'keywords'], 
  threshold: 0.7 
});

// Search by difficulty
const basicProblems = search(mathematicalProblems, 'basic', { 
  keys: ['difficulty'], 
  threshold: 0.8 
});

// Search with typos (fuzzy matching)
const algebraProblems = search(mathematicalProblems, 'algebre', { 
  keys: ['keywords'], 
  threshold: 0.6 
});
```

### Mathematical Examples

See `math-search-example.js` for comprehensive examples of:
- Searching by mathematical concepts
- Finding problems by difficulty level
- Getting study recommendations
- Exam preparation searches

### Mathematical Tests

```bash
node math-search.test.js
```

## Fuzzy Search Feature

This repository includes a powerful search utility with fuzzy matching capability. The fuzzy search allows you to find relevant results even when the search terms are not an exact match, accounting for typos, different word forms, or similar-sounding words.

### Features

- Fuzzy matching based on Levenshtein distance
- Configurable similarity threshold
- Search in multiple fields
- Case-insensitive searching
- Results ranked by relevance scores

### Usage

```javascript
const { search } = require('./search');

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
```

### Examples

See `example.js` for more detailed examples of how to use the search functionality.

### Run Tests

```
node search.test.js
```

## Use Cases

### Mathematical Problem Solving
- Students can search for specific types of mathematical problems (e.g., "quadratic equations", "word problems")
- Find problems by difficulty level for progressive learning
- Search for specific concepts like "factoring", "substitution", or "quadratic formula"
- Fuzzy matching helps even when mathematical terms are misspelled
- Get step-by-step solutions and study recommendations

### General Search Applications
- Users who misspell search queries will still receive relevant results
- Users searching for terms with minor variations (e.g., "color" vs. "colour") will find what they need
- Improved user experience due to greater flexibility in search
- Increased likelihood of users finding the information or items they seek
