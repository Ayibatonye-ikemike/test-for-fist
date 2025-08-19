/**
 * Tests for mathematical problem search functionality
 */

const { search } = require('./search');
const { mathematicalProblems } = require('./math-problems');

console.log('TESTING MATHEMATICAL PROBLEM SEARCH FUNCTIONALITY');
console.log('=' .repeat(55));

// Test 1: Basic search functionality
console.log('\nTest 1: Basic quadratic equation search');
console.log('-'.repeat(40));
const quadraticResults = search(mathematicalProblems, 'quadratic', { 
  keys: ['category', 'keywords'], 
  threshold: 0.7 
});
console.log(`Expected: 2 quadratic problems, Found: ${quadraticResults.length}`);
console.log(`Test 1: ${quadraticResults.length === 2 ? 'PASS' : 'FAIL'}`);

// Test 2: Fuzzy matching with typos
console.log('\nTest 2: Fuzzy matching with typo "algebre" -> "algebra"');
console.log('-'.repeat(55));
const typoResults = search(mathematicalProblems, 'algebre', { 
  keys: ['keywords'], 
  threshold: 0.6 
});
console.log(`Expected: Multiple algebra problems, Found: ${typoResults.length}`);
console.log(`Test 2: ${typoResults.length > 0 ? 'PASS' : 'FAIL'}`);

// Test 3: Search by difficulty
console.log('\nTest 3: Search by difficulty level');
console.log('-'.repeat(35));
const basicProblems = search(mathematicalProblems, 'Basic', { 
  keys: ['difficulty'], 
  threshold: 0.9 
});
const intermediateProblems = search(mathematicalProblems, 'Intermediate', { 
  keys: ['difficulty'], 
  threshold: 0.9 
});
const advancedProblems = search(mathematicalProblems, 'Advanced', { 
  keys: ['difficulty'], 
  threshold: 0.9 
});

console.log(`Basic problems found: ${basicProblems.length}`);
console.log(`Intermediate problems found: ${intermediateProblems.length}`);
console.log(`Advanced problems found: ${advancedProblems.length}`);
console.log(`Test 3: ${(basicProblems.length > 0 && intermediateProblems.length > 0 && advancedProblems.length > 0) ? 'PASS' : 'FAIL'}`);

// Test 4: Word problem search
console.log('\nTest 4: Word problem search');
console.log('-'.repeat(25));
const wordProblems = search(mathematicalProblems, 'word problem', { 
  keys: ['type', 'keywords'], 
  threshold: 0.8 
});
console.log(`Word problems found: ${wordProblems.length}`);
console.log(`Test 4: ${wordProblems.length >= 2 ? 'PASS' : 'FAIL'}`);

// Test 5: Category-specific search
console.log('\nTest 5: Category-specific searches');
console.log('-'.repeat(35));
const categories = ['Linear Equations', 'Quadratic Equations', 'Systems of Equations'];
let categoryTestPass = true;

categories.forEach(category => {
  const results = search(mathematicalProblems, category, { 
    keys: ['category'], 
    threshold: 0.9 
  });
  console.log(`${category}: ${results.length} problems`);
  if (results.length === 0) categoryTestPass = false;
});
console.log(`Test 5: ${categoryTestPass ? 'PASS' : 'FAIL'}`);

// Test 6: Multi-field search
console.log('\nTest 6: Multi-field search for "solve"');
console.log('-'.repeat(40));
const solveResults = search(mathematicalProblems, 'solve', { 
  keys: ['problem', 'keywords'], 
  threshold: 0.4 
});
console.log(`Problems containing "solve": ${solveResults.length}`);
console.log(`Test 6: ${solveResults.length > 5 ? 'PASS' : 'FAIL'}`);

// Test 7: Low threshold for broad search
console.log('\nTest 7: Broad search with low threshold');
console.log('-'.repeat(40));
const broadResults = search(mathematicalProblems, 'math', { 
  keys: ['keywords', 'category'], 
  threshold: 0.3 
});
console.log(`Broad "math" search results: ${broadResults.length}`);
console.log(`Test 7: ${broadResults.length >= 3 ? 'PASS' : 'FAIL'}`);

// Test 8: Specific concept search
console.log('\nTest 8: Specific concept searches');
console.log('-'.repeat(35));
const concepts = ['factoring', 'substitution', 'formula'];
let conceptTestPass = true;

concepts.forEach(concept => {
  const results = search(mathematicalProblems, concept, { 
    keys: ['keywords', 'steps'], 
    threshold: 0.6 
  });
  console.log(`${concept}: ${results.length} problems`);
  if (results.length === 0) conceptTestPass = false;
});
console.log(`Test 8: ${conceptTestPass ? 'PASS' : 'FAIL'}`);

// Test 9: Empty and invalid searches
console.log('\nTest 9: Edge cases - empty and invalid searches');
console.log('-'.repeat(50));
const emptyResults = search(mathematicalProblems, '', { keys: ['category'] });
const invalidResults = search(mathematicalProblems, 'xyzzzzz', { 
  keys: ['category'], 
  threshold: 0.9 
});
console.log(`Empty search results: ${emptyResults.length}`);
console.log(`Invalid search results: ${invalidResults.length}`);
console.log(`Test 9: ${(emptyResults.length === mathematicalProblems.length && invalidResults.length === 0) ? 'PASS' : 'FAIL'}`);

// Test 10: Validate problem structure
console.log('\nTest 10: Validate mathematical problem data structure');
console.log('-'.repeat(55));
let structureValid = true;
const requiredFields = ['id', 'category', 'difficulty', 'problem', 'solution', 'steps', 'keywords', 'type'];

mathematicalProblems.forEach((problem, index) => {
  requiredFields.forEach(field => {
    if (!problem.hasOwnProperty(field)) {
      console.log(`Problem ${index + 1} missing field: ${field}`);
      structureValid = false;
    }
  });
});

console.log(`All problems have required fields: ${structureValid}`);
console.log(`Total problems in database: ${mathematicalProblems.length}`);
console.log(`Test 10: ${structureValid ? 'PASS' : 'FAIL'}`);

// Summary
console.log('\n' + '=' .repeat(55));
console.log('TEST SUMMARY');
console.log('=' .repeat(55));

const testResults = [
  quadraticResults.length === 2,
  typoResults.length > 0,
  (basicProblems.length > 0 && intermediateProblems.length > 0 && advancedProblems.length > 0),
  wordProblems.length >= 2,
  categoryTestPass,
  solveResults.length > 5,
  broadResults.length >= 3,
  conceptTestPass,
  (emptyResults.length === mathematicalProblems.length && invalidResults.length === 0),
  structureValid
];

const passedTests = testResults.filter(result => result).length;
const totalTests = testResults.length;

console.log(`Tests passed: ${passedTests}/${totalTests}`);
console.log(`Overall result: ${passedTests === totalTests ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED'}`);

if (passedTests === totalTests) {
  console.log('\n✅ Mathematical problem search functionality is working correctly!');
  console.log('✅ All data structures are valid');
  console.log('✅ Fuzzy matching works with mathematical terms');
  console.log('✅ Search capabilities cover all problem categories');
} else {
  console.log('\n❌ Some tests failed. Please review the implementation.');
}

console.log('\nMathematical problem database ready for use!');