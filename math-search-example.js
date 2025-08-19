/**
 * Mathematical Problem Search Example
 * Demonstrates how to use the fuzzy search functionality to find mathematical problems and concepts
 */

const { search } = require('./search');
const { mathematicalProblems } = require('./math-problems');

/**
 * Search for mathematical problems and display results with solutions
 * @param {string} query - Search query for mathematical concepts
 * @param {Array<string>} searchFields - Fields to search in
 * @param {number} threshold - Similarity threshold (0-1)
 */
function searchMathProblems(query, searchFields = ['category', 'keywords', 'problem'], threshold = 0.6) {
  console.log(`\nSearching for: "${query}" in ${searchFields.join(', ')} with threshold ${threshold}`);
  console.log('='.repeat(80));
  
  const results = search(mathematicalProblems, query, { keys: searchFields, threshold });
  
  if (results.length === 0) {
    console.log('No mathematical problems found for your search.');
    return;
  }
  
  console.log(`Found ${results.length} mathematical problem(s):\n`);
  
  results.forEach((result, index) => {
    const problem = result.item;
    console.log(`${index + 1}. ${problem.category} - ${problem.difficulty}`);
    console.log(`   Problem: ${problem.problem}`);
    console.log(`   Solution: ${problem.solution}`);
    console.log(`   Match Score: ${(result.score * 100).toFixed(1)}%`);
    console.log(`   Keywords: ${problem.keywords.join(', ')}`);
    console.log(`   Steps:`);
    problem.steps.forEach((step, stepIndex) => {
      console.log(`     ${stepIndex + 1}. ${step}`);
    });
    console.log();
  });
}

/**
 * Search for problems by difficulty level
 * @param {string} difficulty - 'Basic', 'Intermediate', or 'Advanced'
 */
function searchByDifficulty(difficulty) {
  console.log(`\nProblems with difficulty: ${difficulty}`);
  console.log('='.repeat(50));
  
  const results = search(mathematicalProblems, difficulty, { 
    keys: ['difficulty'], 
    threshold: 0.8 
  });
  
  results.forEach((result, index) => {
    const problem = result.item;
    console.log(`${index + 1}. ${problem.category}: ${problem.problem}`);
  });
  console.log();
}

/**
 * Search for problems by type
 * @param {string} type - Problem type (equation, word problem, etc.)
 */
function searchByType(type) {
  console.log(`\nProblems of type: ${type}`);
  console.log('='.repeat(50));
  
  const results = search(mathematicalProblems, type, { 
    keys: ['type'], 
    threshold: 0.7 
  });
  
  results.forEach((result, index) => {
    const problem = result.item;
    console.log(`${index + 1}. ${problem.category}: ${problem.problem}`);
  });
  console.log();
}

/**
 * Get study recommendations based on search query
 * @param {string} topic - Mathematical topic to study
 */
function getStudyRecommendations(topic) {
  console.log(`\nStudy recommendations for: "${topic}"`);
  console.log('='.repeat(60));
  
  const results = search(mathematicalProblems, topic, { 
    keys: ['category', 'keywords'], 
    threshold: 0.5 
  });
  
  if (results.length === 0) {
    console.log('No specific recommendations found. Try searching for related terms.');
    return;
  }
  
  // Group by difficulty
  const byDifficulty = {
    'Basic': [],
    'Intermediate': [],
    'Advanced': []
  };
  
  results.forEach(result => {
    byDifficulty[result.item.difficulty].push(result.item);
  });
  
  Object.keys(byDifficulty).forEach(difficulty => {
    if (byDifficulty[difficulty].length > 0) {
      console.log(`\n${difficulty} Level:`);
      byDifficulty[difficulty].forEach((problem, index) => {
        console.log(`  ${index + 1}. ${problem.category}: ${problem.problem}`);
      });
    }
  });
  console.log();
}

// Example usage and demonstrations
console.log('MATHEMATICAL PROBLEM SEARCH EXAMPLES');
console.log('=' .repeat(50));

// Basic searches
searchMathProblems('quadratic');
searchMathProblems('linear equation');
searchMathProblems('word problem');

// Search with typos (demonstrating fuzzy matching)
searchMathProblems('algebre'); // misspelled "algebra"
searchMathProblems('equaton'); // misspelled "equation"

// Search by specific concepts
searchMathProblems('factoring');
searchMathProblems('age problem');
searchMathProblems('distance rate time');

// Search by difficulty
searchByDifficulty('Basic');
searchByDifficulty('Advanced');

// Search by type
searchByType('word problem');
searchByType('equation');

// Study recommendations
getStudyRecommendations('algebra');
getStudyRecommendations('functions');

// Advanced search examples
console.log('ADVANCED SEARCH EXAMPLES');
console.log('=' .repeat(40));

// Search in specific fields only
searchMathProblems('polynomial', ['category'], 0.8);
searchMathProblems('solve', ['problem'], 0.4);

// Lower threshold for more results
searchMathProblems('math', ['keywords'], 0.3);

// Search for exam preparation
console.log('\nEXAM PREPARATION SEARCH');
console.log('=' .repeat(30));

const examTopics = ['linear', 'quadratic', 'system', 'word problem', 'factoring'];
examTopics.forEach(topic => {
  console.log(`\n--- ${topic.toUpperCase()} PROBLEMS ---`);
  const results = search(mathematicalProblems, topic, { 
    keys: ['keywords', 'category'], 
    threshold: 0.6 
  });
  results.slice(0, 2).forEach((result, index) => {
    console.log(`${index + 1}. ${result.item.problem}`);
    console.log(`   Solution: ${result.item.solution}`);
  });
});

// Tips for using the search
console.log('\n\nTIPS FOR SEARCHING MATHEMATICAL PROBLEMS');
console.log('=' .repeat(45));
console.log('1. Use specific terms like "quadratic", "linear", "word problem"');
console.log('2. Search by difficulty: "basic", "intermediate", "advanced"');
console.log('3. Search by concept: "factoring", "substitution", "formula"');
console.log('4. Use lower thresholds (0.3-0.5) for broader results');
console.log('5. Use higher thresholds (0.7-0.9) for more specific matches');
console.log('6. Combine terms: "quadratic word problem", "linear system"');
console.log('7. Search typos are handled: "algebre" will find "algebra" problems');