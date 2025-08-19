/**
 * Mathematical Problems Database
 * Contains categorized math problems with solutions for search functionality
 */

const mathematicalProblems = [
  // Linear Equations
  {
    id: 1,
    category: 'Linear Equations',
    difficulty: 'Basic',
    problem: 'Solve for x: 3x + 7 = 22',
    solution: 'x = 5',
    steps: [
      '3x + 7 = 22',
      '3x = 22 - 7',
      '3x = 15',
      'x = 15/3',
      'x = 5'
    ],
    keywords: ['linear', 'equation', 'solve', 'basic', 'algebra', 'math', 'mathematics'],
    type: 'equation'
  },
  {
    id: 2,
    category: 'Linear Equations',
    difficulty: 'Intermediate',
    problem: 'Solve for x: (2x - 1)/3 = (x + 4)/2',
    solution: 'x = 14',
    steps: [
      '(2x - 1)/3 = (x + 4)/2',
      '2(2x - 1) = 3(x + 4)',
      '4x - 2 = 3x + 12',
      '4x - 3x = 12 + 2',
      'x = 14'
    ],
    keywords: ['linear', 'equation', 'fractions', 'cross multiply', 'intermediate'],
    type: 'equation'
  },

  // Quadratic Equations
  {
    id: 3,
    category: 'Quadratic Equations',
    difficulty: 'Basic',
    problem: 'Solve: x² + 5x + 6 = 0',
    solution: 'x = -2 or x = -3',
    steps: [
      'x² + 5x + 6 = 0',
      'Find factors of 6 that add to 5: 2 and 3',
      '(x + 2)(x + 3) = 0',
      'x + 2 = 0 or x + 3 = 0',
      'x = -2 or x = -3'
    ],
    keywords: ['quadratic', 'equation', 'factoring', 'basic', 'algebra'],
    type: 'equation'
  },
  {
    id: 4,
    category: 'Quadratic Equations',
    difficulty: 'Intermediate',
    problem: 'Solve: 2x² - 3x - 2 = 0',
    solution: 'x = 2 or x = -0.5',
    steps: [
      '2x² - 3x - 2 = 0',
      'Using quadratic formula: x = (-b ± √(b² - 4ac))/2a',
      'a = 2, b = -3, c = -2',
      'x = (3 ± √(9 + 16))/4',
      'x = (3 ± 5)/4',
      'x = 2 or x = -0.5'
    ],
    keywords: ['quadratic', 'equation', 'quadratic formula', 'intermediate'],
    type: 'equation'
  },

  // Word Problems
  {
    id: 5,
    category: 'Word Problems',
    difficulty: 'Basic',
    problem: 'John is 3 times as old as Mary. In 10 years, John will be twice as old as Mary. How old are they now?',
    solution: 'Mary is 10 years old, John is 30 years old',
    steps: [
      'Let M = Mary\'s age, J = John\'s age',
      'J = 3M (John is 3 times as old)',
      'J + 10 = 2(M + 10) (in 10 years condition)',
      'Substitute: 3M + 10 = 2M + 20',
      'M = 10, so J = 30'
    ],
    keywords: ['word problem', 'age', 'basic', 'algebra', 'real world'],
    type: 'word problem'
  },
  {
    id: 6,
    category: 'Word Problems',
    difficulty: 'Intermediate',
    problem: 'A car travels 240 miles in the same time a truck travels 180 miles. If the car travels 20 mph faster than the truck, find their speeds.',
    solution: 'Truck: 60 mph, Car: 80 mph',
    steps: [
      'Let t = truck speed, c = car speed = t + 20',
      'Same time: 240/c = 180/t',
      '240/(t + 20) = 180/t',
      'Cross multiply: 240t = 180(t + 20)',
      'Solve: t = 60 mph, c = 80 mph'
    ],
    keywords: ['word problem', 'distance', 'rate', 'time', 'intermediate', 'motion'],
    type: 'word problem'
  },

  // Systems of Equations
  {
    id: 7,
    category: 'Systems of Equations',
    difficulty: 'Basic',
    problem: 'Solve the system: x + y = 8, 2x - y = 1',
    solution: 'x = 3, y = 5',
    steps: [
      'x + y = 8',
      '2x - y = 1',
      'From equation 1: y = 8 - x',
      'Substitute: 2x - (8 - x) = 1',
      '3x = 9, so x = 3, y = 5'
    ],
    keywords: ['system', 'equations', 'substitution', 'basic', 'algebra'],
    type: 'system'
  },

  // Polynomials
  {
    id: 8,
    category: 'Polynomials',
    difficulty: 'Intermediate',
    problem: 'Factor: 4x³ - 16x',
    solution: '4x(x + 2)(x - 2)',
    steps: [
      '4x³ - 16x',
      'Factor out GCF: 4x(x² - 4)',
      'Recognize difference of squares: x² - 4 = x² - 2²',
      'Factor: 4x(x + 2)(x - 2)'
    ],
    keywords: ['polynomial', 'factoring', 'difference of squares', 'intermediate'],
    type: 'factoring'
  },

  // Rational Functions
  {
    id: 9,
    category: 'Rational Functions',
    difficulty: 'Intermediate',
    problem: 'Simplify: (x² - 9)/(x² + 6x + 9)',
    solution: '(x - 3)/(x + 3)',
    steps: [
      '(x² - 9)/(x² + 6x + 9)',
      'Factor numerator: x² - 9 = (x + 3)(x - 3)',
      'Factor denominator: x² + 6x + 9 = (x + 3)²',
      'Simplify: (x - 3)/(x + 3)'
    ],
    keywords: ['rational', 'function', 'simplify', 'factoring', 'intermediate'],
    type: 'rational'
  },

  // Exponential Equations
  {
    id: 10,
    category: 'Exponential Equations',
    difficulty: 'Basic',
    problem: 'Solve: 2^(x+1) = 32',
    solution: 'x = 4',
    steps: [
      '2^(x+1) = 32',
      'Express 32 as power of 2: 32 = 2⁵',
      '2^(x+1) = 2⁵',
      'Equate exponents: x + 1 = 5',
      'x = 4'
    ],
    keywords: ['exponential', 'equation', 'powers', 'basic', 'algebra'],
    type: 'exponential'
  },

  // Logarithmic Equations
  {
    id: 11,
    category: 'Logarithmic Equations',
    difficulty: 'Advanced',
    problem: 'Solve: log₂(x) + log₂(x - 3) = 2',
    solution: 'x = 4',
    steps: [
      'log₂(x) + log₂(x - 3) = 2',
      'Use log property: log₂(x(x - 3)) = 2',
      'Convert to exponential: x(x - 3) = 2²',
      'x² - 3x = 4',
      'x² - 3x - 4 = 0',
      '(x - 4)(x + 1) = 0',
      'x = 4 (x = -1 invalid)'
    ],
    keywords: ['logarithmic', 'equation', 'log properties', 'advanced', 'algebra'],
    type: 'logarithmic'
  },

  // Geometry Word Problems
  {
    id: 12,
    category: 'Geometry Word Problems',
    difficulty: 'Basic',
    problem: 'A rectangle\'s length is 5 cm more than its width. If the perimeter is 30 cm, find the dimensions.',
    solution: 'Width = 5 cm, Length = 10 cm',
    steps: [
      'Let w = width, l = length = w + 5',
      'Perimeter formula: P = 2l + 2w',
      '30 = 2(w + 5) + 2w',
      '30 = 2w + 10 + 2w',
      '30 = 4w + 10',
      '20 = 4w',
      'w = 5, l = 10'
    ],
    keywords: ['geometry', 'rectangle', 'perimeter', 'word problem', 'basic'],
    type: 'geometry'
  },

  // Inequalities
  {
    id: 13,
    category: 'Inequalities',
    difficulty: 'Basic',
    problem: 'Solve: 3x - 7 > 2x + 1',
    solution: 'x > 8',
    steps: [
      '3x - 7 > 2x + 1',
      '3x - 2x > 1 + 7',
      'x > 8'
    ],
    keywords: ['inequality', 'linear', 'basic', 'algebra'],
    type: 'inequality'
  },

  // Function Composition
  {
    id: 14,
    category: 'Function Composition',
    difficulty: 'Advanced',
    problem: 'If f(x) = 2x + 1 and g(x) = x², find (f ∘ g)(x)',
    solution: '(f ∘ g)(x) = 2x² + 1',
    steps: [
      'f(x) = 2x + 1, g(x) = x²',
      '(f ∘ g)(x) = f(g(x))',
      'f(g(x)) = f(x²)',
      'f(x²) = 2(x²) + 1',
      '(f ∘ g)(x) = 2x² + 1'
    ],
    keywords: ['function', 'composition', 'advanced', 'algebra'],
    type: 'function'
  },

  // Trigonometry
  {
    id: 15,
    category: 'Trigonometry',
    difficulty: 'Intermediate',
    problem: 'Solve: sin(x) = 1/2 for 0 ≤ x ≤ 2π',
    solution: 'x = π/6 or x = 5π/6',
    steps: [
      'sin(x) = 1/2',
      'Reference angle: sin⁻¹(1/2) = π/6',
      'Sine is positive in quadrants I and II',
      'x = π/6 (quadrant I)',
      'x = π - π/6 = 5π/6 (quadrant II)'
    ],
    keywords: ['trigonometry', 'sine', 'unit circle', 'intermediate', 'math', 'trig'],
    type: 'trigonometry'
  }
];

module.exports = {
  mathematicalProblems
};;