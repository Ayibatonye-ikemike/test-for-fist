/**
 * Tests for search utility with fuzzy matching
 */

const { search, levenshteinDistance, similarityRatio } = require('./search');

// Test data
const testData = [
  { id: 1, name: 'Apple', description: 'A fruit that is typically red, green, or yellow' },
  { id: 2, name: 'Banana', description: 'A long curved fruit with a yellow skin' },
  { id: 3, name: 'Orange', description: 'A round orange-colored fruit with a tough bright reddish-yellow rind' },
  { id: 4, name: 'Strawberry', description: 'A sweet soft red fruit with a seed-studded surface' },
  { id: 5, name: 'Blueberry', description: 'A small sweet blue or blackish berry' }
];

// Levenshtein distance tests
console.log('Testing Levenshtein distance function:');
const distanceTests = [
  { a: 'kitten', b: 'sitting', expected: 3 },
  { a: 'apple', b: 'aple', expected: 1 },
  { a: 'banana', b: 'bananna', expected: 1 },
  { a: 'color', b: 'colour', expected: 1 },
  { a: 'test', b: 'test', expected: 0 }
];

distanceTests.forEach(test => {
  const result = levenshteinDistance(test.a, test.b);
  console.log(`Distance between "${test.a}" and "${test.b}": ${result}, Expected: ${test.expected}, ${result === test.expected ? 'PASS' : 'FAIL'}`);
});
console.log();

// Similarity ratio tests
console.log('Testing similarity ratio function:');
const similarityTests = [
  { a: 'color', b: 'colour', expected: 0.8333333333333334 },
  { a: 'apple', b: 'aple', expected: 0.8 },
  { a: 'test', b: 'test', expected: 1 },
  { a: 'completely different', b: 'not the same at all', expected: 0.1 }
];

similarityTests.forEach(test => {
  const result = similarityRatio(test.a, test.b);
  const pass = Math.abs(result - test.expected) < 0.001;
  console.log(`Similarity between "${test.a}" and "${test.b}": ${result.toFixed(4)}, Expected: ${test.expected.toFixed(4)}, ${pass ? 'PASS' : 'FAIL'}`);
});
console.log();

// Search function tests with exact matches
console.log('Testing search function with exact matches:');
const exactResults = search(testData, 'Apple', { keys: ['name'] });
console.log(`Search for 'Apple': Found ${exactResults.length} result(s)`);
exactResults.forEach(result => {
  console.log(`- ${result.item.name} (Score: ${result.score.toFixed(4)})`);
});
console.log();

// Search function tests with fuzzy matches
console.log('Testing search function with fuzzy matches:');
const fuzzyQueries = ['Aple', 'Bananna', 'Orang', 'Strawbery', 'bluebery'];

fuzzyQueries.forEach(query => {
  const results = search(testData, query, { keys: ['name'], threshold: 0.6 });
  console.log(`Search for '${query}': Found ${results.length} result(s)`);
  results.forEach(result => {
    console.log(`- ${result.item.name} (Score: ${result.score.toFixed(4)})`);
  });
});
console.log();

// Search in multiple fields
console.log('Testing search in multiple fields:');
const descriptionSearch = search(testData, 'red', { keys: ['name', 'description'], threshold: 0.4 });
console.log(`Search for 'red' in name and description: Found ${descriptionSearch.length} result(s)`);
descriptionSearch.forEach(result => {
  console.log(`- ${result.item.name} (matched in ${result.matchedKey}: "${result.item[result.matchedKey].substring(0, 50)}...") (Score: ${result.score.toFixed(4)})`);
});
console.log();

// Edge cases
console.log('Testing edge cases:');
console.log('1. Empty query:', search(testData, '', { keys: ['name'] }).length === testData.length ? 'PASS' : 'FAIL');
console.log('2. Empty data array:', search([], 'Apple', { keys: ['name'] }).length === 0 ? 'PASS' : 'FAIL');
console.log('3. No matching results:', search(testData, 'Pineapple', { keys: ['name'], threshold: 0.8 }).length === 0 ? 'PASS' : 'FAIL');
console.log('4. Case insensitivity:', search(testData, 'aPpLe', { keys: ['name'] }).length > 0 ? 'PASS' : 'FAIL');