export const getQuestionsBySubject = (subjectName, grade) => {
  const subjectQuestions = {
    Mathematics: generateMathQuestions(grade),
    Science: generateScienceQuestions(grade),
    English: generateEnglishQuestions(grade),
    History: generateHistoryQuestions(grade),
    Geography: generateGeographyQuestions(grade),
    "Life Sciences": generateLifeSciencesQuestions(grade),
    "Physical Sciences": generatePhysicalSciencesQuestions(grade),
    Accounting: generateAccountingQuestions(grade),
    Economics: generateEconomicsQuestions(grade),
    "Business Studies": generateBusinessStudiesQuestions(grade),
  };

  return subjectQuestions[subjectName] || generateMathQuestions(grade);
};

// Mathematics Questions
function generateMathQuestions(grade) {
  return [
    {
      id: 1,
      question: "What is 15 × 8?",
      options: ["120", "125", "115", "130"],
      correctAnswer: 0,
      topic: "Multiplication",
      difficulty: "medium",
    },
    {
      id: 2,
      question: "Solve for x: 2x + 5 = 17",
      options: ["6", "7", "8", "5"],
      correctAnswer: 0,
      topic: "Algebra",
      difficulty: "medium",
    },
    {
      id: 3,
      question:
        "What is the area of a rectangle with length 12cm and width 8cm?",
      options: ["96 cm²", "86 cm²", "106 cm²", "76 cm²"],
      correctAnswer: 0,
      topic: "Geometry",
      difficulty: "easy",
    },
    {
      id: 4,
      question: "What is 45% of 200?",
      options: ["90", "85", "95", "100"],
      correctAnswer: 0,
      topic: "Percentages",
      difficulty: "medium",
    },
    {
      id: 5,
      question: "Simplify: 3x + 2x - x",
      options: ["4x", "5x", "6x", "3x"],
      correctAnswer: 0,
      topic: "Algebra",
      difficulty: "easy",
    },
  ];
}

// Science Questions
function generateScienceQuestions(grade) {
  return [
    {
      id: 1,
      question: "What is the chemical symbol for water?",
      options: ["H2O", "CO2", "O2", "H2"],
      correctAnswer: 0,
      topic: "Chemistry",
      difficulty: "easy",
    },
    {
      id: 2,
      question: "What is the powerhouse of the cell?",
      options: ["Mitochondria", "Nucleus", "Ribosome", "Chloroplast"],
      correctAnswer: 0,
      topic: "Biology",
      difficulty: "easy",
    },
    {
      id: 3,
      question: "What is the speed of light in a vacuum?",
      options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "200,000 km/s"],
      correctAnswer: 0,
      topic: "Physics",
      difficulty: "medium",
    },
    {
      id: 4,
      question: "Which planet is known as the Red Planet?",
      options: ["Mars", "Venus", "Jupiter", "Saturn"],
      correctAnswer: 0,
      topic: "Astronomy",
      difficulty: "easy",
    },
    {
      id: 5,
      question: "What is the process by which plants make their food?",
      options: ["Photosynthesis", "Respiration", "Fermentation", "Digestion"],
      correctAnswer: 0,
      topic: "Biology",
      difficulty: "easy",
    },
  ];
}

// English Questions
function generateEnglishQuestions(grade) {
  return [
    {
      id: 1,
      question:
        "Which word is a noun in this sentence: 'The quick brown fox jumps'?",
      options: ["fox", "quick", "jumps", "brown"],
      correctAnswer: 0,
      topic: "Grammar",
      difficulty: "easy",
    },
    {
      id: 2,
      question: "What is the past tense of 'run'?",
      options: ["ran", "runned", "running", "runs"],
      correctAnswer: 0,
      topic: "Grammar",
      difficulty: "easy",
    },
    {
      id: 3,
      question: "Which punctuation mark is used to show possession?",
      options: ["Apostrophe (')", "Comma (,)", "Period (.)", "Colon (:)"],
      correctAnswer: 0,
      topic: "Punctuation",
      difficulty: "easy",
    },
    {
      id: 4,
      question: "What is a synonym for 'happy'?",
      options: ["Joyful", "Sad", "Angry", "Tired"],
      correctAnswer: 0,
      topic: "Vocabulary",
      difficulty: "easy",
    },
    {
      id: 5,
      question:
        "Which literary device compares two things using 'like' or 'as'?",
      options: ["Simile", "Metaphor", "Personification", "Alliteration"],
      correctAnswer: 0,
      topic: "Literature",
      difficulty: "medium",
    },
  ];
}

// History Questions
function generateHistoryQuestions(grade) {
  return [
    {
      id: 1,
      question: "In which year did South Africa become a democracy?",
      options: ["1994", "1990", "1996", "1999"],
      correctAnswer: 0,
      topic: "South African History",
      difficulty: "easy",
    },
    {
      id: 2,
      question:
        "Who was the first democratically elected president of South Africa?",
      options: ["Nelson Mandela", "Thabo Mbeki", "FW de Klerk", "Desmond Tutu"],
      correctAnswer: 0,
      topic: "South African History",
      difficulty: "easy",
    },
    {
      id: 3,
      question: "What year did World War II end?",
      options: ["1945", "1944", "1946", "1943"],
      correctAnswer: 0,
      topic: "World History",
      difficulty: "medium",
    },
    {
      id: 4,
      question: "The Sharpeville Massacre occurred in which year?",
      options: ["1960", "1955", "1965", "1970"],
      correctAnswer: 0,
      topic: "South African History",
      difficulty: "medium",
    },
    {
      id: 5,
      question: "Who was known as the 'Iron Lady' of British politics?",
      options: [
        "Margaret Thatcher",
        "Queen Elizabeth II",
        "Theresa May",
        "Angela Merkel",
      ],
      correctAnswer: 0,
      topic: "World History",
      difficulty: "medium",
    },
  ];
}

// Geography Questions
function generateGeographyQuestions(grade) {
  return [
    {
      id: 1,
      question: "What is the capital city of South Africa (Executive)?",
      options: ["Pretoria", "Cape Town", "Bloemfontein", "Johannesburg"],
      correctAnswer: 0,
      topic: "South African Geography",
      difficulty: "easy",
    },
    {
      id: 2,
      question: "Which is the largest ocean on Earth?",
      options: [
        "Pacific Ocean",
        "Atlantic Ocean",
        "Indian Ocean",
        "Arctic Ocean",
      ],
      correctAnswer: 0,
      topic: "Physical Geography",
      difficulty: "easy",
    },
    {
      id: 3,
      question: "What is the longest river in the world?",
      options: [
        "Nile River",
        "Amazon River",
        "Yangtze River",
        "Mississippi River",
      ],
      correctAnswer: 0,
      topic: "Physical Geography",
      difficulty: "medium",
    },
    {
      id: 4,
      question: "Which mountain range is the longest in the world?",
      options: ["Andes", "Himalayas", "Rocky Mountains", "Alps"],
      correctAnswer: 0,
      topic: "Physical Geography",
      difficulty: "medium",
    },
    {
      id: 5,
      question: "How many provinces does South Africa have?",
      options: ["9", "8", "10", "11"],
      correctAnswer: 0,
      topic: "South African Geography",
      difficulty: "easy",
    },
  ];
}

// Life Sciences Questions
function generateLifeSciencesQuestions(grade) {
  return [
    {
      id: 1,
      question: "What is the basic unit of life?",
      options: ["Cell", "Tissue", "Organ", "Organism"],
      correctAnswer: 0,
      topic: "Cell Biology",
      difficulty: "easy",
    },
    {
      id: 2,
      question: "Which blood type is the universal donor?",
      options: ["O negative", "AB positive", "A positive", "B negative"],
      correctAnswer: 0,
      topic: "Human Biology",
      difficulty: "medium",
    },
    {
      id: 3,
      question:
        "What is the structure that carries genetic information in cells?",
      options: ["DNA", "RNA", "Protein", "Lipid"],
      correctAnswer: 0,
      topic: "Genetics",
      difficulty: "easy",
    },
    {
      id: 4,
      question: "What is the term for animals that eat only plants?",
      options: ["Herbivores", "Carnivores", "Omnivores", "Decomposers"],
      correctAnswer: 0,
      topic: "Ecology",
      difficulty: "easy",
    },
    {
      id: 5,
      question: "How many chambers does the human heart have?",
      options: ["4", "3", "2", "5"],
      correctAnswer: 0,
      topic: "Human Biology",
      difficulty: "easy",
    },
  ];
}

// Physical Sciences Questions
function generatePhysicalSciencesQuestions(grade) {
  return [
    {
      id: 1,
      question: "What is the SI unit of force?",
      options: ["Newton", "Joule", "Watt", "Pascal"],
      correctAnswer: 0,
      topic: "Physics",
      difficulty: "easy",
    },
    {
      id: 2,
      question: "What is the atomic number of Carbon?",
      options: ["6", "12", "8", "14"],
      correctAnswer: 0,
      topic: "Chemistry",
      difficulty: "medium",
    },
    {
      id: 3,
      question: "What is Newton's First Law of Motion also known as?",
      options: [
        "Law of Inertia",
        "Law of Acceleration",
        "Law of Action-Reaction",
        "Law of Gravity",
      ],
      correctAnswer: 0,
      topic: "Physics",
      difficulty: "medium",
    },
    {
      id: 4,
      question: "What is the pH of a neutral solution?",
      options: ["7", "0", "14", "10"],
      correctAnswer: 0,
      topic: "Chemistry",
      difficulty: "easy",
    },
    {
      id: 5,
      question: "What type of energy is stored in batteries?",
      options: [
        "Chemical Energy",
        "Kinetic Energy",
        "Thermal Energy",
        "Nuclear Energy",
      ],
      correctAnswer: 0,
      topic: "Physics",
      difficulty: "easy",
    },
  ];
}

// Accounting Questions
function generateAccountingQuestions(grade) {
  return [
    {
      id: 1,
      question: "What is the accounting equation?",
      options: [
        "Assets = Liabilities + Equity",
        "Assets = Revenue - Expenses",
        "Assets + Liabilities = Equity",
        "Revenue = Assets - Liabilities",
      ],
      correctAnswer: 0,
      topic: "Basic Accounting",
      difficulty: "easy",
    },
    {
      id: 2,
      question: "Which side of a T-account represents debits?",
      options: ["Left side", "Right side", "Top", "Bottom"],
      correctAnswer: 0,
      topic: "Double Entry",
      difficulty: "easy",
    },
    {
      id: 3,
      question: "What does GAAP stand for?",
      options: [
        "Generally Accepted Accounting Principles",
        "Global Accounting Assessment Program",
        "General Analysis of Accounting Practices",
        "Governmental Accounting Audit Process",
      ],
      correctAnswer: 0,
      topic: "Accounting Principles",
      difficulty: "medium",
    },
    {
      id: 4,
      question: "Which financial statement shows a company's profitability?",
      options: [
        "Income Statement",
        "Balance Sheet",
        "Cash Flow Statement",
        "Statement of Changes in Equity",
      ],
      correctAnswer: 0,
      topic: "Financial Statements",
      difficulty: "easy",
    },
    {
      id: 5,
      question: "What is depreciation?",
      options: [
        "Allocation of asset cost over its useful life",
        "Increase in asset value",
        "Payment of liabilities",
        "Cash received from sales",
      ],
      correctAnswer: 0,
      topic: "Assets",
      difficulty: "medium",
    },
  ];
}

// Economics Questions
function generateEconomicsQuestions(grade) {
  return [
    {
      id: 1,
      question: "What is the term for limited resources and unlimited wants?",
      options: ["Scarcity", "Opportunity cost", "Demand", "Supply"],
      correctAnswer: 0,
      topic: "Basic Economics",
      difficulty: "easy",
    },
    {
      id: 2,
      question:
        "What happens to demand when price increases (ceteris paribus)?",
      options: [
        "Demand decreases",
        "Demand increases",
        "Demand stays the same",
        "Supply decreases",
      ],
      correctAnswer: 0,
      topic: "Supply and Demand",
      difficulty: "medium",
    },
    {
      id: 3,
      question: "What does GDP stand for?",
      options: [
        "Gross Domestic Product",
        "General Development Plan",
        "Global Distribution Process",
        "Government Debt Payment",
      ],
      correctAnswer: 0,
      topic: "Macroeconomics",
      difficulty: "easy",
    },
    {
      id: 4,
      question: "What is inflation?",
      options: [
        "General increase in prices",
        "Decrease in prices",
        "Stable prices",
        "Government spending",
      ],
      correctAnswer: 0,
      topic: "Macroeconomics",
      difficulty: "easy",
    },
    {
      id: 5,
      question: "What is the term for goods used to produce other goods?",
      options: [
        "Capital goods",
        "Consumer goods",
        "Intermediate goods",
        "Final goods",
      ],
      correctAnswer: 0,
      topic: "Production",
      difficulty: "medium",
    },
  ];
}

// Business Studies Questions
function generateBusinessStudiesQuestions(grade) {
  return [
    {
      id: 1,
      question: "What does SWOT analysis stand for?",
      options: [
        "Strengths, Weaknesses, Opportunities, Threats",
        "Sales, Workflow, Operations, Technology",
        "Strategy, Work, Organization, Training",
        "Systems, Workers, Objectives, Tasks",
      ],
      correctAnswer: 0,
      topic: "Business Strategy",
      difficulty: "easy",
    },
    {
      id: 2,
      question: "What is a business plan?",
      options: [
        "Document outlining business goals and strategies",
        "Financial statement",
        "Marketing campaign",
        "Employee handbook",
      ],
      correctAnswer: 0,
      topic: "Business Management",
      difficulty: "easy",
    },
    {
      id: 3,
      question:
        "Which marketing mix element refers to communication with customers?",
      options: ["Promotion", "Product", "Price", "Place"],
      correctAnswer: 0,
      topic: "Marketing",
      difficulty: "medium",
    },
    {
      id: 4,
      question: "What is entrepreneurship?",
      options: [
        "Starting and running a business",
        "Working for a company",
        "Investing in stocks",
        "Government regulation",
      ],
      correctAnswer: 0,
      topic: "Entrepreneurship",
      difficulty: "easy",
    },
    {
      id: 5,
      question: "What does HR stand for in business?",
      options: [
        "Human Resources",
        "High Revenue",
        "Hourly Rate",
        "Hiring Requirements",
      ],
      correctAnswer: 0,
      topic: "Human Resources",
      difficulty: "easy",
    },
  ];
}
