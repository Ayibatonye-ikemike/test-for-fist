/**
 * Example usage of the fuzzy search functionality
 */

const { search, reverse_string } = require('./search');

// Sample dataset
const products = [
  { id: 1, name: 'iPhone 13', category: 'Electronics', description: 'Latest Apple smartphone with A15 Bionic chip' },
  { id: 2, name: 'Samsung Galaxy S21', category: 'Electronics', description: 'Android smartphone with 120Hz display' },
  { id: 3, name: 'MacBook Pro', category: 'Electronics', description: 'Powerful laptop with Apple M1 chip' },
  { id: 4, name: 'Coffee Maker', category: 'Kitchen', description: 'Automatic drip coffee maker for home use' },
  { id: 5, name: 'Running Shoes', category: 'Sports', description: 'Comfortable athletic shoes for runners' },
  { id: 6, name: 'Yoga Mat', category: 'Sports', description: 'Non-slip exercise mat for yoga practice' },
  { id: 7, name: 'Blender', category: 'Kitchen', description: 'High-speed blender for smoothies and soups' },
  { id: 8, name: 'Wireless Headphones', category: 'Electronics', description: 'Bluetooth headphones with noise cancellation' },
];

/**
 * Perform a search and display the results
 * @param {string} query - Search query
 * @param {Array<string>} keys - Keys to search in
 * @param {number} threshold - Minimum similarity threshold (0-1)
 */
function performSearch(query, keys = ['name'], threshold = 0.6) {
  console.log(`\nSearching for: "${query}" in ${keys.join(', ')} with threshold ${threshold}`);
  console.log('------------------------------------------------');
  
  const results = search(products, query, { keys, threshold });
  
  if (results.length === 0) {
    console.log('No results found.');
    return;
  }
  
  console.log(`Found ${results.length} results:`);
  results.forEach((result, index) => {
    console.log(`\n${index + 1}. ${result.item.name} (${result.item.category})`);
    console.log(`   Match score: ${(result.score * 100).toFixed(1)}%`);
    console.log(`   Description: ${result.item.description}`);
  });
}

// Example searches
console.log('FUZZY SEARCH EXAMPLES');
console.log('====================');

// Exact search
performSearch('iPhone 13');

// Fuzzy search with typo
performSearch('iPhon');

// Fuzzy search in multiple fields
performSearch('Apple', ['name', 'description'], 0.7);

// Search with a lower threshold to get more results
performSearch('coffee', ['name', 'description'], 0.4);

// Search with misspelling
performSearch('Wirelss Headfones', ['name'], 0.6);

// Search by category
performSearch('Sports', ['category'], 0.8);

// Search that matches multiple items
performSearch('Electronics', ['category'], 0.7);

console.log('\n\nSTACK ALGORITHM - STRING REVERSAL EXAMPLES');
console.log('=========================================');

// Demonstrate the Stack Algorithm for String Reversal
console.log('\nDemonstrating Stack Algorithm for String Reversal:');
console.log('Steps: 1. Push all characters onto stack, 2. Pop them off to build reversed string\n');

const examples = ['abcd', 'hello', 'Stack', 'JavaScript', 'Hello World!'];

examples.forEach(str => {
  const reversed = reverse_string(str);
  console.log(`Original: "${str}" → Reversed: "${reversed}"`);
});