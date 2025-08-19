# Fuzzy Search Utility

Always follow these instructions first and only fallback to additional search and context gathering if the information in these instructions is incomplete or found to be in error.

This is a pure Node.js fuzzy search utility that implements Levenshtein distance-based fuzzy matching. The project requires no dependencies, no build process, and no package management - it uses only Node.js core modules.

## Working Effectively

### Prerequisites and Setup
- Node.js v20.19.4 or later is required and already available at `/usr/local/bin/node`
- No installation, build, or dependency management required
- Project uses CommonJS modules with `require()` and `module.exports`
- No package.json, no npm install needed

### Core Commands (All complete in under 0.1 seconds)
- Run tests: `node search.test.js` -- takes ~0.06 seconds
- Run examples: `node example.js` -- takes ~0.05 seconds  
- Test basic functionality: `echo 'const { search } = require("./search"); console.log(search(["apple"], "aple"));' | node`
- Test individual functions: `echo 'const { levenshteinDistance } = require("./search"); console.log(levenshteinDistance("hello", "helo"));' | node`

### Performance Characteristics
- Small datasets (< 100 items): Completes instantly (~0.05 seconds)
- Medium datasets (1000 items): Completes in ~0.09 seconds
- No build or compilation time - scripts run immediately
- Memory usage is minimal for typical datasets

## Validation

### Manual Validation Requirements
After making any changes to search.js, ALWAYS validate functionality by running these scenarios:

1. **Basic fuzzy matching test**:
   ```bash
   echo 'const { search } = require("./search"); console.log("Test 1:", search([{name: "Apple iPhone"}], "iPhon", {keys: ["name"]}).length > 0 ? "PASS" : "FAIL");' | node
   ```

2. **Multi-field search test**:
   ```bash
   echo 'const { search } = require("./search"); const data = [{name: "Phone", desc: "Apple device"}]; console.log("Test 2:", search(data, "Apple", {keys: ["name", "desc"]}).length > 0 ? "PASS" : "FAIL");' | node
   ```

3. **Threshold test**:
   ```bash
   echo 'const { search } = require("./search"); console.log("Test 3:", search(["hello"], "helo", {threshold: 0.7}).length > 0 ? "PASS" : "FAIL");' | node
   ```

4. **Performance test with larger dataset**:
   ```bash
   echo 'const { search } = require("./search"); const large = Array.from({length: 1000}, (_, i) => ({name: `Item ${i}`})); console.log("Test 4:", search(large, "Item 500", {keys: ["name"]}).length > 0 ? "PASS" : "FAIL");' | node
   ```

5. **Run the complete test suite**:
   ```bash
   node search.test.js
   ```
   Expected output: All tests should show "PASS" status

6. **Run the complete example suite**:
   ```bash
   node example.js
   ```
   Expected output: Should display search results for various fuzzy matching scenarios

### Expected Validation Results
- All manual tests should output "PASS"
- Test suite should complete with all tests passing
- Example suite should show realistic search results with scores
- No error messages or exceptions should occur

## Repository Structure

### Key Files
```
/home/runner/work/test-for-fist/test-for-fist/
├── search.js          # Main fuzzy search utility (4,255 bytes)
├── search.test.js     # Comprehensive test suite (3,788 bytes)  
├── example.js         # Usage examples and demonstrations (2,593 bytes)
├── README.md          # User documentation (1,719 bytes)
├── makefile.md        # Legacy file (22 bytes, ignore)
├── issues/            # Documentation directory
└── [csv files]        # Data files (unrelated to search functionality)
```

### search.js - Main Module
Exports three functions:
- `search(items, query, options)` - Main fuzzy search function
- `levenshteinDistance(a, b)` - Calculate edit distance between strings
- `similarityRatio(a, b)` - Calculate similarity ratio (0-1)

Key parameters:
- `items`: Array of strings or objects to search
- `query`: Search term (string)
- `options.keys`: Array of object keys to search in (default: all keys)
- `options.threshold`: Minimum similarity score (default: 0.6)

## Common Development Tasks

### Testing Changes
Always run both test files after making changes:
```bash
node search.test.js && node example.js
```

### Adding New Test Cases
Add test cases to `search.test.js` following the existing pattern:
```javascript
const testCase = { a: 'input1', b: 'input2', expected: expectedResult };
// Add to appropriate test array
```

### Performance Testing
For performance-critical changes, test with larger datasets:
```bash
echo 'const { search } = require("./search"); console.time("perf"); const data = Array.from({length: 5000}, (_, i) => ({name: `Item ${i}`})); search(data, "test", {keys: ["name"]}); console.timeEnd("perf");' | node
```

### Code Style
- Use JSDoc comments for all functions
- Follow existing naming conventions (camelCase)
- Include parameter validation in public functions
- Return consistent data structures

## Troubleshooting

### Common Issues
1. **"Cannot find module" error**: Ensure you're in the correct directory (`/home/runner/work/test-for-fist/test-for-fist`)
2. **No search results**: Check threshold value (lower values return more results)
3. **Performance issues**: Profile with console.time() for datasets > 10,000 items

### Debugging Search Results
```bash
echo 'const { search } = require("./search"); const results = search([{name: "test"}], "query", {keys: ["name"]}); console.log("Debug:", JSON.stringify(results, null, 2));' | node
```

### File Locations
- Never modify CSV files or `ban` file - these are unrelated to search functionality
- Core logic is in `search.js` only
- Tests demonstrate expected behavior patterns
- Examples show realistic usage scenarios

## Important Notes
- No linting, building, or CI/CD processes exist
- No dependencies to manage or update
- Files are small and load instantly
- All timing measurements are from a standard development environment
- The utility is production-ready and requires no compilation