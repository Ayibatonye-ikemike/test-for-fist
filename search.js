/**
 * Search utility module with fuzzy matching capability
 */

/**
 * Calculate the Levenshtein distance between two strings
 * @param {string} a - First string
 * @param {string} b - Second string
 * @returns {number} - The edit distance between the strings
 */
function levenshteinDistance(a, b) {
  // Create a matrix of size (a.length + 1) x (b.length + 1)
  const matrix = Array(a.length + 1).fill().map(() => Array(b.length + 1).fill(0));

  // Initialize first row and column
  for (let i = 0; i <= a.length; i++) {
    matrix[i][0] = i;
  }
  for (let j = 0; j <= b.length; j++) {
    matrix[0][j] = j;
  }

  // Fill the matrix
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[a.length][b.length];
}

/**
 * Calculate the similarity ratio between two strings based on Levenshtein distance
 * @param {string} a - First string
 * @param {string} b - Second string
 * @returns {number} - Similarity ratio (0 to 1)
 */
function similarityRatio(a, b) {
  if (!a.length && !b.length) return 1; // Both empty strings are identical
  if (!a.length || !b.length) return 0; // One empty string means no similarity
  
  const distance = levenshteinDistance(a, b);
  const maxLength = Math.max(a.length, b.length);
  
  // Use a more accurate formula that takes into account the lengths of both strings
  return (maxLength - distance) / maxLength;
}

/**
 * Search function with fuzzy matching
 * @param {Array<Object>} items - Array of items to search in
 * @param {string} query - The search query
 * @param {Object} options - Search options
 * @param {string|Array<string>} options.keys - The keys to search in (if items are objects)
 * @param {number} options.threshold - Similarity threshold (0 to 1, default: 0.6)
 * @returns {Array<Object>} - Array of matching items with scores
 */
function search(items, query, options = {}) {
  const threshold = options.threshold || 0.6;
  const keys = options.keys || [];

  if (!items || !Array.isArray(items) || items.length === 0) {
    return [];
  }

  if (!query || typeof query !== 'string') {
    return items;
  }

  const searchKeys = Array.isArray(keys) ? keys : [keys];
  const queryLower = query.toLowerCase();
  
  return items
    .map(item => {
      let highestScore = 0;
      let matchedKey = '';

      // If the item is a string, compare directly
      if (typeof item === 'string') {
        highestScore = similarityRatio(item.toLowerCase(), queryLower);
        matchedKey = '';
      } 
      // If the item is an object, search in specified keys
      else if (typeof item === 'object' && item !== null) {
        // If no keys specified, search in all keys
        const itemKeys = searchKeys.length ? searchKeys : Object.keys(item);
        
        for (const key of itemKeys) {
          if (item.hasOwnProperty(key) && typeof item[key] === 'string') {
            const fieldValue = item[key].toLowerCase();
            
            // Direct field comparison
            const directScore = similarityRatio(fieldValue, queryLower);
            
            // Check for word matches within the field (for partial matches in longer text)
            const words = fieldValue.split(/\s+/);
            let wordScore = 0;
            
            for (const word of words) {
              const score = similarityRatio(word, queryLower);
              if (score > wordScore) {
                wordScore = score;
              }
            }
            
            // Use the better of the two scoring methods
            const score = Math.max(directScore, wordScore);
            
            if (score > highestScore) {
              highestScore = score;
              matchedKey = key;
            }
          }
        }
      }

      return {
        item,
        score: highestScore,
        matchedKey
      };
    })
    .filter(result => result.score >= threshold)
    .sort((a, b) => b.score - a.score);
}

/**
 * Reverse a string using a stack data structure
 * @param {string} input_string - The string to reverse
 * @returns {string} - The reversed string
 */
function reverse_string(input_string) {
  const stack = [];
  
  // Push all characters of the string onto the stack
  for (const char of input_string) {
    stack.push(char);
  }
  
  let reversed_str = "";
  
  // Pop them off to build the reversed string
  while (stack.length > 0) {
    reversed_str += stack.pop();
  }
  
  return reversed_str;
}

module.exports = {
  search,
  levenshteinDistance,
  similarityRatio,
  reverse_string
};