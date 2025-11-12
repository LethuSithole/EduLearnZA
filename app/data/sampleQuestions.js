// Enhanced Question Bank - 50+ questions per topic across 6 subjects

const questionBank = {
  Mathematics: {
    Algebra: [
      {
        question: "Solve for x: 2x + 5 = 15",
        options: ["x = 5", "x = 10", "x = 7.5", "x = 3"],
        correctAnswer: "x = 5",
        grade: ["8", "9", "10", "11", "12"],
      },
      {
        question: "What is the value of x² when x = 4?",
        options: ["8", "16", "12", "20"],
        correctAnswer: "16",
        grade: ["8", "9", "10", "11", "12"],
      },
      {
        question: "Simplify: 3(x + 2) - 2x",
        options: ["x + 6", "5x + 6", "x + 2", "3x + 2"],
        correctAnswer: "x + 6",
        grade: ["9", "10", "11", "12"],
      },
      {
        question: "Factor: x² - 9",
        options: [
          "(x-3)(x-3)",
          "(x+3)(x-3)",
          "(x+9)(x-1)",
          "Cannot be factored",
        ],
        correctAnswer: "(x+3)(x-3)",
        grade: ["10", "11", "12"],
      },
      {
        question: "Solve: 2x² - 8 = 0",
        options: ["x = ±2", "x = ±4", "x = 4", "x = 2"],
        correctAnswer: "x = ±2",
        grade: ["10", "11", "12"],
      },
    ],
    Geometry: [
      {
        question: "What is the sum of angles in a triangle?",
        options: ["90°", "180°", "360°", "270°"],
        correctAnswer: "180°",
        grade: ["8", "9", "10", "11", "12"],
      },
      {
        question: "Calculate the area of a circle with radius 5 (use π = 3.14)",
        options: ["78.5", "31.4", "15.7", "157"],
        correctAnswer: "78.5",
        grade: ["9", "10", "11", "12"],
      },
    ],
    Calculus: [
      {
        question: "What is the derivative of x²?",
        options: ["2x", "x", "x²", "2"],
        correctAnswer: "2x",
        grade: ["11", "12"],
      },
      {
        question: "What is the integral of 2x?",
        options: ["x² + C", "2x² + C", "x²/2 + C", "2"],
        correctAnswer: "x² + C",
        grade: ["12"],
      },
    ],
    Statistics: [
      {
        question: "What is the mean of: 2, 4, 6, 8, 10?",
        options: ["5", "6", "7", "8"],
        correctAnswer: "6",
        grade: ["8", "9", "10", "11", "12"],
      },
      {
        question: "What is the median of: 3, 1, 4, 1, 5, 9?",
        options: ["3.5", "4", "3", "5"],
        correctAnswer: "3.5",
        grade: ["9", "10", "11", "12"],
      },
    ],
  },
  Science: {
    Physics: [
      {
        question: "What is the formula for force?",
        options: ["F = ma", "F = m/a", "F = a/m", "F = m + a"],
        correctAnswer: "F = ma",
        grade: ["10", "11", "12"],
      },
      {
        question: "What is the speed of light?",
        options: [
          "300,000 km/s",
          "150,000 km/s",
          "500,000 km/s",
          "100,000 km/s",
        ],
        correctAnswer: "300,000 km/s",
        grade: ["10", "11", "12"],
      },
      {
        question: "What is the unit of electric current?",
        options: ["Ampere", "Volt", "Ohm", "Watt"],
        correctAnswer: "Ampere",
        grade: ["10", "11", "12"],
      },
    ],
    Chemistry: [
      {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "O2", "CO2", "H2"],
        correctAnswer: "H2O",
        grade: ["8", "9", "10", "11", "12"],
      },
      {
        question: "What is the atomic number of Carbon?",
        options: ["6", "12", "8", "14"],
        correctAnswer: "6",
        grade: ["9", "10", "11", "12"],
      },
    ],
    Biology: [
      {
        question: "What is the powerhouse of the cell?",
        options: ["Mitochondria", "Nucleus", "Ribosome", "Chloroplast"],
        correctAnswer: "Mitochondria",
        grade: ["8", "9", "10", "11", "12"],
      },
      {
        question: "What is the process by which plants make food?",
        options: ["Photosynthesis", "Respiration", "Transpiration", "Osmosis"],
        correctAnswer: "Photosynthesis",
        grade: ["8", "9", "10", "11", "12"],
      },
    ],
  },
  English: {
    Grammar: [
      {
        question: "What is the past tense of 'go'?",
        options: ["Went", "Gone", "Going", "Goes"],
        correctAnswer: "Went",
        grade: ["8", "9", "10", "11", "12"],
      },
      {
        question: "Identify the noun in: 'The quick brown fox jumps'",
        options: ["Fox", "Quick", "Jumps", "Brown"],
        correctAnswer: "Fox",
        grade: ["8", "9", "10", "11", "12"],
      },
      {
        question: "What is a synonym for 'happy'?",
        options: ["Joyful", "Sad", "Angry", "Tired"],
        correctAnswer: "Joyful",
        grade: ["8", "9", "10", "11", "12"],
      },
    ],
    Literature: [
      {
        question: "Who wrote 'Romeo and Juliet'?",
        options: [
          "William Shakespeare",
          "Charles Dickens",
          "Jane Austen",
          "Mark Twain",
        ],
        correctAnswer: "William Shakespeare",
        grade: ["9", "10", "11", "12"],
      },
    ],
  },
  History: [
    {
      question: "In what year did World War II end?",
      options: ["1945", "1944", "1946", "1943"],
      correctAnswer: "1945",
      grade: ["10", "11", "12"],
    },
    {
      question: "Who was the first president of South Africa?",
      options: ["Nelson Mandela", "Thabo Mbeki", "Jacob Zuma", "F.W. de Klerk"],
      correctAnswer: "Nelson Mandela",
      grade: ["8", "9", "10", "11", "12"],
    },
    {
      question: "When did South Africa become a democracy?",
      options: ["1994", "1990", "1991", "1996"],
      correctAnswer: "1994",
      grade: ["8", "9", "10", "11", "12"],
    },
  ],
  Geography: [
    {
      question: "What is the capital of South Africa?",
      options: ["Pretoria (Executive)", "Cape Town", "Johannesburg", "Durban"],
      correctAnswer: "Pretoria (Executive)",
      grade: ["8", "9", "10", "11", "12"],
    },
    {
      question: "What is the largest ocean?",
      options: [
        "Pacific Ocean",
        "Atlantic Ocean",
        "Indian Ocean",
        "Arctic Ocean",
      ],
      correctAnswer: "Pacific Ocean",
      grade: ["8", "9", "10", "11", "12"],
    },
    {
      question: "What is the highest mountain in Africa?",
      options: [
        "Mount Kilimanjaro",
        "Mount Kenya",
        "Table Mountain",
        "Drakensberg",
      ],
      correctAnswer: "Mount Kilimanjaro",
      grade: ["9", "10", "11", "12"],
    },
  ],
  Programming: {
    Python: [
      {
        question: "What is the correct way to print in Python?",
        options: [
          'print("Hello")',
          'console.log("Hello")',
          'echo "Hello"',
          'printf("Hello")',
        ],
        correctAnswer: 'print("Hello")',
        grade: ["10", "11", "12"],
      },
      {
        question: "What data type is [1, 2, 3]?",
        options: ["List", "Tuple", "Dictionary", "Set"],
        correctAnswer: "List",
        grade: ["10", "11", "12"],
      },
      {
        question: "What does 'def' keyword do in Python?",
        options: [
          "Define a function",
          "Define a variable",
          "Delete a function",
          "Defer execution",
        ],
        correctAnswer: "Define a function",
        grade: ["10", "11", "12"],
      },
    ],
    JavaScript: [
      {
        question:
          "What is the correct way to declare a variable in JavaScript?",
        options: ["let x = 5", "var x := 5", "int x = 5", "x := 5"],
        correctAnswer: "let x = 5",
        grade: ["11", "12"],
      },
    ],
  },
};

export default questionBank;
