import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { fetchQuestionsByTopic } from "../config/quizApi";

export default function TopicQuestionsScreen({ navigation, route }) {
  const { subject, topic, grade } = route.params || {};
  const { theme } = useTheme();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 10;

  useEffect(() => {
    fetchQuestions();
  }, [grade]); // Re-fetch when grade changes

  // Mock questions generator with realistic content
  const generateMockQuestions = (subjectName, topicName, count = 100) => {
    const mockQuestions = [];

    const questionTemplates = {
      Mathematics: {
        Algebra: [
          {
            q: "Solve for x: 2x + 5 = 15",
            opts: ["x = 5", "x = 10", "x = 7.5", "x = 20"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Simplify: 3(x + 4) - 2x",
            opts: ["x + 12", "x + 4", "5x + 12", "x + 8"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Factor: x² - 9",
            opts: ["(x-3)(x+3)", "(x-9)(x+1)", "(x-3)²", "x(x-9)"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Solve: x² - 5x + 6 = 0",
            opts: [
              "x = 2 or x = 3",
              "x = 1 or x = 6",
              "x = -2 or x = -3",
              "x = 5 or x = 1",
            ],
            ans: "A",
            diff: "Hard",
          },
          {
            q: "What is the slope of y = 3x + 7?",
            opts: ["3", "7", "-3", "10"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Expand: (x + 2)²",
            opts: ["x² + 4x + 4", "x² + 2x + 4", "x² + 4", "x² + 4x + 2"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Solve: 4x - 8 = 2x + 6",
            opts: ["x = 7", "x = 14", "x = 3.5", "x = -1"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "What is x if 3x/5 = 9?",
            opts: ["x = 15", "x = 27", "x = 9", "x = 45"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Factor: 2x² + 7x + 3",
            opts: ["(2x+1)(x+3)", "(2x+3)(x+1)", "(x+1)(x+3)", "2(x+1)(x+3)"],
            ans: "A",
            diff: "Hard",
          },
          {
            q: "Simplify: (2x³)²",
            opts: ["4x⁶", "2x⁶", "4x⁵", "2x⁵"],
            ans: "A",
            diff: "Medium",
          },
        ],
        Geometry: [
          {
            q: "Area of a circle with radius 5?",
            opts: ["25π", "10π", "5π", "50π"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Sum of angles in a triangle?",
            opts: ["180°", "360°", "90°", "270°"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Pythagoras theorem: a² + b² = ?",
            opts: ["c²", "c", "2c", "√c"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Area of rectangle 8m × 5m?",
            opts: ["40 m²", "13 m²", "40 m", "26 m"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Volume of cube with side 3cm?",
            opts: ["27 cm³", "9 cm³", "18 cm³", "6 cm³"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Circumference of circle, radius 7?",
            opts: ["14π", "7π", "49π", "21π"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Number of sides in a hexagon?",
            opts: ["6", "5", "7", "8"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Area of triangle: base=10, height=6?",
            opts: ["30", "60", "16", "40"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Interior angle of regular pentagon?",
            opts: ["108°", "90°", "120°", "135°"],
            ans: "A",
            diff: "Hard",
          },
          {
            q: "Surface area of cube, side 4?",
            opts: ["96", "64", "48", "24"],
            ans: "A",
            diff: "Medium",
          },
        ],
        Calculus: [
          {
            q: "Derivative of x²?",
            opts: ["2x", "x", "x²", "2"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Integral of 2x?",
            opts: ["x² + C", "2x² + C", "x + C", "2x + C"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Derivative of sin(x)?",
            opts: ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Derivative of e^x?",
            opts: ["e^x", "xe^(x-1)", "e", "1"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "What is d/dx(3x³)?",
            opts: ["9x²", "3x²", "x³", "9x³"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Integral of cos(x)?",
            opts: ["sin(x) + C", "-sin(x) + C", "cos(x) + C", "tan(x) + C"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Derivative of ln(x)?",
            opts: ["1/x", "x", "ln(x)", "e^x"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Chain rule: d/dx[f(g(x))] = ?",
            opts: ["f'(g(x))·g'(x)", "f'(x)·g'(x)", "f(g'(x))", "f'(x)+g'(x)"],
            ans: "A",
            diff: "Hard",
          },
          {
            q: "Derivative of x³ + 2x?",
            opts: ["3x² + 2", "x² + 2", "3x² + 2x", "3x³ + 2"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "What is ∫(1/x)dx?",
            opts: ["ln|x| + C", "x² + C", "1/x² + C", "e^x + C"],
            ans: "A",
            diff: "Medium",
          },
        ],
        Statistics: [
          {
            q: "Mean of 2, 4, 6, 8?",
            opts: ["5", "4", "6", "20"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Median of 1, 3, 5, 7, 9?",
            opts: ["5", "3", "7", "25"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Mode of 2, 3, 3, 4, 5?",
            opts: ["3", "2", "4", "No mode"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Range of 10, 20, 30, 40?",
            opts: ["30", "100", "25", "40"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Probability of coin landing heads?",
            opts: ["1/2", "1", "0", "1/4"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Standard deviation measures?",
            opts: ["Spread of data", "Average", "Middle value", "Most common"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Sample space of rolling a die?",
            opts: [
              "{1,2,3,4,5,6}",
              "{1,2,3,4,5}",
              "{0,1,2,3,4,5,6}",
              "{2,4,6}",
            ],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "If P(A) = 0.3, what is P(not A)?",
            opts: ["0.7", "0.3", "1", "0"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Mean of 5, 5, 5, 5, 5?",
            opts: ["5", "25", "0", "1"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Quartile divides data into?",
            opts: ["4 parts", "2 parts", "10 parts", "100 parts"],
            ans: "A",
            diff: "Medium",
          },
        ],
        Trigonometry: [
          {
            q: "sin²θ + cos²θ = ?",
            opts: ["1", "0", "2", "θ"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "tan(θ) = ?",
            opts: [
              "sin(θ)/cos(θ)",
              "cos(θ)/sin(θ)",
              "sin(θ)·cos(θ)",
              "1/sin(θ)",
            ],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "sin(90°) = ?",
            opts: ["1", "0", "√2/2", "∞"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "cos(0°) = ?",
            opts: ["1", "0", "-1", "√3/2"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "What is sin(30°)?",
            opts: ["1/2", "√3/2", "1", "0"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "cos(60°) = ?",
            opts: ["1/2", "√3/2", "1", "0"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Period of sin(x)?",
            opts: ["2π", "π", "π/2", "4π"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "tan(45°) = ?",
            opts: ["1", "0", "√3", "∞"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "sin(-x) = ?",
            opts: ["-sin(x)", "sin(x)", "cos(x)", "-cos(x)"],
            ans: "A",
            diff: "Hard",
          },
          {
            q: "Amplitude of 3sin(x)?",
            opts: ["3", "1", "π", "6"],
            ans: "A",
            diff: "Medium",
          },
        ],
      },
      Science: {
        Chemistry: [
          {
            q: "What is H2O?",
            opts: ["Water", "Hydrogen", "Oxygen", "Acid"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Atomic number of Carbon?",
            opts: ["6", "12", "14", "8"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Chemical symbol for Sodium?",
            opts: ["Na", "So", "S", "N"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "pH of neutral solution?",
            opts: ["7", "0", "14", "1"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Formula for salt (table)?",
            opts: ["NaCl", "NaOH", "HCl", "H2SO4"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Number of protons in Oxygen?",
            opts: ["8", "6", "16", "12"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Chemical symbol for Gold?",
            opts: ["Au", "Go", "G", "Ag"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Electrons in outer shell of Neon?",
            opts: ["8", "2", "6", "10"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Acid + Base produces?",
            opts: ["Salt + Water", "Oxygen", "Hydrogen", "Carbon dioxide"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Most abundant gas in air?",
            opts: ["Nitrogen", "Oxygen", "Carbon dioxide", "Hydrogen"],
            ans: "A",
            diff: "Easy",
          },
        ],
        Physics: [
          {
            q: "Speed of light (m/s)?",
            opts: ["3×10⁸", "3×10⁶", "3×10⁴", "3×10¹⁰"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Unit of force?",
            opts: ["Newton", "Joule", "Watt", "Pascal"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Formula for force?",
            opts: ["F = ma", "F = mv", "F = m/a", "F = a/m"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Unit of energy?",
            opts: ["Joule", "Newton", "Watt", "Volt"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Acceleration due to gravity?",
            opts: ["9.8 m/s²", "10 m/s²", "9 m/s²", "8.8 m/s²"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Ohm's Law: V = ?",
            opts: ["IR", "I/R", "R/I", "I+R"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Unit of power?",
            opts: ["Watt", "Joule", "Newton", "Ampere"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Kinetic energy formula?",
            opts: ["½mv²", "mgh", "mv", "m/v"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "1st law of thermodynamics?",
            opts: [
              "Energy conservation",
              "Heat flows hot→cold",
              "Entropy increases",
              "Action=Reaction",
            ],
            ans: "A",
            diff: "Hard",
          },
          {
            q: "Frequency unit?",
            opts: ["Hertz", "Watt", "Joule", "Newton"],
            ans: "A",
            diff: "Easy",
          },
        ],
        Biology: [
          {
            q: "Powerhouse of the cell?",
            opts: ["Mitochondria", "Nucleus", "Ribosome", "Cell wall"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Process plants make food?",
            opts: [
              "Photosynthesis",
              "Respiration",
              "Digestion",
              "Fermentation",
            ],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "DNA stands for?",
            opts: [
              "Deoxyribonucleic acid",
              "Dioxy nucleic acid",
              "Double nuclear acid",
              "Dynamic nuclear acid",
            ],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Largest organ in human body?",
            opts: ["Skin", "Liver", "Brain", "Heart"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Number of chambers in heart?",
            opts: ["4", "2", "3", "6"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Blood type 'universal donor'?",
            opts: ["O-", "O+", "AB+", "A+"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Where does digestion begin?",
            opts: ["Mouth", "Stomach", "Small intestine", "Esophagus"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Function of red blood cells?",
            opts: [
              "Carry oxygen",
              "Fight infection",
              "Clot blood",
              "Digest food",
            ],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Number of chromosomes in humans?",
            opts: ["46", "23", "44", "48"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Plant cell has but animal doesn't?",
            opts: ["Cell wall", "Nucleus", "Mitochondria", "Ribosomes"],
            ans: "A",
            diff: "Medium",
          },
        ],
      },
      English: {
        Grammar: [
          {
            q: "What is a noun?",
            opts: [
              "Person/place/thing",
              "Action word",
              "Describing word",
              "Connecting word",
            ],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Past tense of 'go'?",
            opts: ["went", "gone", "going", "goes"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Which is a pronoun?",
            opts: ["she", "run", "happy", "quickly"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Plural of 'child'?",
            opts: ["children", "childs", "childes", "child's"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Adjective describes a?",
            opts: ["Noun", "Verb", "Adverb", "Pronoun"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Which is a verb?",
            opts: ["run", "cat", "happy", "very"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Past tense of 'eat'?",
            opts: ["ate", "eated", "eaten", "eating"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Which is an adverb?",
            opts: ["quickly", "quick", "quickness", "quicker"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "'The cat sat on the mat' - subject?",
            opts: ["cat", "sat", "mat", "the"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Comparative form of 'good'?",
            opts: ["better", "gooder", "more good", "best"],
            ans: "A",
            diff: "Medium",
          },
        ],
        Literature: [
          {
            q: "Who wrote Romeo & Juliet?",
            opts: ["Shakespeare", "Dickens", "Austen", "Orwell"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "A short story teaching moral?",
            opts: ["Fable", "Novel", "Biography", "Essay"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Main character in a story?",
            opts: ["Protagonist", "Antagonist", "Narrator", "Author"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Author of '1984'?",
            opts: [
              "George Orwell",
              "Aldous Huxley",
              "Ray Bradbury",
              "H.G. Wells",
            ],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Shakespeare's home town?",
            opts: ["Stratford", "London", "Oxford", "Cambridge"],
            ans: "A",
            diff: "Hard",
          },
          {
            q: "Poetry with 14 lines?",
            opts: ["Sonnet", "Haiku", "Limerick", "Ballad"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Comparison using 'like' or 'as'?",
            opts: ["Simile", "Metaphor", "Alliteration", "Personification"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Story of person's life by another?",
            opts: ["Biography", "Autobiography", "Memoir", "Novel"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Harry Potter author?",
            opts: [
              "J.K. Rowling",
              "C.S. Lewis",
              "J.R.R. Tolkien",
              "Roald Dahl",
            ],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Three-line Japanese poem?",
            opts: ["Haiku", "Sonnet", "Limerick", "Ode"],
            ans: "A",
            diff: "Medium",
          },
        ],
        Vocabulary: [
          {
            q: "Synonym of 'happy'?",
            opts: ["joyful", "sad", "angry", "tired"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Antonym of 'hot'?",
            opts: ["cold", "warm", "cool", "freezing"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "'Benevolent' means?",
            opts: ["Kind", "Evil", "Angry", "Lazy"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Synonym of 'big'?",
            opts: ["large", "small", "tiny", "little"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "'Verbose' means?",
            opts: ["Wordy", "Brief", "Silent", "Clear"],
            ans: "A",
            diff: "Hard",
          },
          {
            q: "Antonym of 'difficult'?",
            opts: ["easy", "hard", "complex", "tough"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "'Courageous' means?",
            opts: ["Brave", "Scared", "Weak", "Foolish"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Synonym of 'quick'?",
            opts: ["fast", "slow", "steady", "careful"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "'Enigma' means?",
            opts: ["Mystery", "Solution", "Answer", "Fact"],
            ans: "A",
            diff: "Hard",
          },
          {
            q: "Antonym of 'ancient'?",
            opts: ["modern", "old", "historic", "antique"],
            ans: "A",
            diff: "Medium",
          },
        ],
      },
      History: {
        "World History": [
          {
            q: "Year World War II ended?",
            opts: ["1945", "1944", "1946", "1943"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "First president of USA?",
            opts: [
              "George Washington",
              "Abraham Lincoln",
              "Thomas Jefferson",
              "John Adams",
            ],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Berlin Wall fell in?",
            opts: ["1989", "1990", "1988", "1991"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Ancient Egyptian writing?",
            opts: ["Hieroglyphics", "Cuneiform", "Sanskrit", "Latin"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Columbus sailed in?",
            opts: ["1492", "1500", "1480", "1510"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "French Revolution began?",
            opts: ["1789", "1776", "1800", "1812"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Great Wall is in?",
            opts: ["China", "Japan", "India", "Mongolia"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "First man on moon?",
            opts: [
              "Neil Armstrong",
              "Buzz Aldrin",
              "Yuri Gagarin",
              "John Glenn",
            ],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Renaissance began in?",
            opts: ["Italy", "France", "England", "Spain"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Titanic sank in?",
            opts: ["1912", "1910", "1915", "1920"],
            ans: "A",
            diff: "Medium",
          },
        ],
        "South African History": [
          {
            q: "Apartheid ended in?",
            opts: ["1994", "1990", "1996", "1991"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "First democratic president?",
            opts: [
              "Nelson Mandela",
              "F.W. de Klerk",
              "Thabo Mbeki",
              "Desmond Tutu",
            ],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Freedom Charter signed?",
            opts: ["1955", "1960", "1950", "1965"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Sharpeville massacre year?",
            opts: ["1960", "1955", "1965", "1976"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Soweto uprising?",
            opts: ["1976", "1980", "1970", "1985"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "How many official languages?",
            opts: ["11", "9", "12", "10"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Capital of South Africa?",
            opts: ["3 capitals", "Pretoria", "Cape Town", "Johannesburg"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Who was Hendrik Verwoerd?",
            opts: [
              "Apartheid architect",
              "Freedom fighter",
              "ANC leader",
              "First president",
            ],
            ans: "A",
            diff: "Hard",
          },
          {
            q: "Year of first democratic vote?",
            opts: ["1994", "1990", "1996", "1992"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Steve Biko died in?",
            opts: ["1977", "1976", "1980", "1975"],
            ans: "A",
            diff: "Hard",
          },
        ],
      },
      Geography: {
        "World Geography": [
          {
            q: "Largest continent?",
            opts: ["Asia", "Africa", "Europe", "Americas"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Longest river?",
            opts: ["Nile", "Amazon", "Yangtze", "Mississippi"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Tallest mountain?",
            opts: ["Mount Everest", "K2", "Kilimanjaro", "Mont Blanc"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Largest ocean?",
            opts: ["Pacific", "Atlantic", "Indian", "Arctic"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Capital of France?",
            opts: ["Paris", "Lyon", "Marseille", "Nice"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Sahara Desert is in?",
            opts: ["Africa", "Asia", "Australia", "Americas"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "How many continents?",
            opts: ["7", "6", "5", "8"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Great Barrier Reef location?",
            opts: ["Australia", "Brazil", "Philippines", "Indonesia"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Capital of Japan?",
            opts: ["Tokyo", "Osaka", "Kyoto", "Hiroshima"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Driest desert?",
            opts: ["Atacama", "Sahara", "Gobi", "Kalahari"],
            ans: "A",
            diff: "Hard",
          },
        ],
        "South African Geography": [
          {
            q: "Largest city in SA?",
            opts: ["Johannesburg", "Cape Town", "Durban", "Pretoria"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Table Mountain is in?",
            opts: ["Cape Town", "Durban", "Port Elizabeth", "Johannesburg"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Kruger National Park province?",
            opts: ["Mpumalanga", "Limpopo", "KZN", "Gauteng"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Number of provinces?",
            opts: ["9", "8", "10", "11"],
            ans: "A",
            diff: "Easy",
          },
          {
            q: "Longest river in SA?",
            opts: ["Orange River", "Limpopo", "Vaal", "Tugela"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Drakensberg is in?",
            opts: [
              "KwaZulu-Natal",
              "Eastern Cape",
              "Free State",
              "Western Cape",
            ],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Garden Route is in?",
            opts: [
              "Western/Eastern Cape",
              "KZN",
              "Mpumalanga",
              "Northern Cape",
            ],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Highest peak in SA?",
            opts: [
              "Mafadi",
              "Injasuti",
              "Thabana Ntlenyana",
              "Champagne Castle",
            ],
            ans: "A",
            diff: "Hard",
          },
          {
            q: "Border countries of SA?",
            opts: ["6 countries", "5 countries", "4 countries", "7 countries"],
            ans: "A",
            diff: "Medium",
          },
          {
            q: "Robben Island is near?",
            opts: ["Cape Town", "Durban", "Port Elizabeth", "East London"],
            ans: "A",
            diff: "Easy",
          },
        ],
      },
    };

    const templates = questionTemplates[subjectName]?.[topicName] || [
      {
        q: `${topicName} question about ${subjectName}`,
        opts: ["Option A", "Option B", "Option C", "Option D"],
        ans: "A",
        diff: "Medium",
      },
    ];

    for (let i = 1; i <= count; i++) {
      const template = templates[(i - 1) % templates.length];
      mockQuestions.push({
        _id: `mock_${subjectName}_${topicName}_${i}`,
        question: `${template.q}`,
        options: template.opts,
        correctAnswer: template.ans,
        difficulty:
          template.diff ||
          (i % 3 === 0 ? "Hard" : i % 2 === 0 ? "Medium" : "Easy"),
        subject: subjectName,
        topic: topicName,
      });
    }

    return mockQuestions;
  };

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      // Try to fetch from API
      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=10&category=${getCategoryId(
            subject.name
          )}&difficulty=${getDifficulty(grade)}&type=multiple`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }

        const data = await response.json();

        if (data.response_code !== 0) {
          throw new Error("No questions available");
        }

        const formattedQuestions = data.results.map((q, index) => ({
          id: index + 1,
          question: decodeHTML(q.question),
          options: shuffleArray([
            ...q.incorrect_answers.map(decodeHTML),
            decodeHTML(q.correct_answer),
          ]),
          correctAnswer: decodeHTML(q.correct_answer),
          difficulty: q.difficulty,
          category: q.category,
        }));

        setQuestions(formattedQuestions);
      } catch (apiError) {
        // Silently use mock data if API fails
        const mockData = generateMockQuestions(
          subject?.name || "Mathematics",
          topic?.name || "Algebra",
          100
        );
        setQuestions(mockData);
        console.log("✅ Using mock data (API unavailable)");
      }
    } catch (error) {
      // Final fallback - shouldn't reach here
      console.error("Error loading questions:", error);
      const mockData = generateMockQuestions(
        subject?.name || "Mathematics",
        topic?.name || "Algebra",
        100
      );
      setQuestions(mockData);
      Alert.alert(
        "Offline Mode",
        "Using practice questions. Connect to internet for full question bank."
      );
    } finally {
      setLoading(false);
    }
  };

  const startQuiz = () => {
    if (questions.length === 0) {
      Alert.alert("No Questions", "No questions available for this topic");
      return;
    }

    navigation.navigate("Quiz", {
      subject,
      topic,
      questions,
    });
  };

  // Pagination
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const startIndex = (currentPage - 1) * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = questions.slice(startIndex, endIndex);

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={[styles.loadingText, { color: theme.text }]}>
            Loading questions...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.surface }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.backButtonText, { color: theme.primary }]}>
            ← Back
          </Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            {topic?.name || "Topic"}
          </Text>
          <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
            {subject?.name || "Subject"} • {questions.length} Questions
          </Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Questions List */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              All Questions
            </Text>
            <Text
              style={[styles.questionCount, { color: theme.textSecondary }]}
            >
              Showing {startIndex + 1}-{Math.min(endIndex, questions.length)} of{" "}
              {questions.length}
            </Text>
          </View>

          {currentQuestions.length > 0 ? (
            currentQuestions.map((question, index) => (
              <View
                key={question._id || index}
                style={[
                  styles.questionCard,
                  { backgroundColor: theme.surface, borderColor: theme.border },
                ]}
              >
                <View style={styles.questionHeader}>
                  <Text
                    style={[styles.questionNumber, { color: theme.primary }]}
                  >
                    Q{startIndex + index + 1}
                  </Text>
                  <Text
                    style={[
                      styles.difficultyBadge,
                      { color: theme.textSecondary },
                    ]}
                  >
                    {question.difficulty || "Medium"}
                  </Text>
                </View>
                <Text style={[styles.questionText, { color: theme.text }]}>
                  {question.question}
                </Text>

                {/* Options */}
                <View style={styles.optionsContainer}>
                  {question.options?.map((option, optIndex) => (
                    <View
                      key={optIndex}
                      style={[
                        styles.optionItem,
                        { backgroundColor: theme.background },
                      ]}
                    >
                      <Text
                        style={[
                          styles.optionLabel,
                          { color: theme.textSecondary },
                        ]}
                      >
                        {String.fromCharCode(65 + optIndex)}.
                      </Text>
                      <Text style={[styles.optionText, { color: theme.text }]}>
                        {option}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Show correct answer */}
                <View style={styles.answerContainer}>
                  <Text
                    style={[styles.correctAnswer, { color: theme.success }]}
                  >
                    ✓ Correct Answer: {question.correctAnswer}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.noQuestionsContainer}>
              <Text style={[styles.noQuestionsText, { color: theme.text }]}>
                No questions available
              </Text>
            </View>
          )}
        </View>

        {/* Pagination */}
        {totalPages > 1 && (
          <View style={styles.pagination}>
            <TouchableOpacity
              style={[
                styles.paginationButton,
                {
                  backgroundColor: theme.surface,
                  opacity: currentPage === 1 ? 0.5 : 1,
                },
              ]}
              onPress={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <Text style={[styles.paginationText, { color: theme.text }]}>
                Previous
              </Text>
            </TouchableOpacity>

            <Text style={[styles.pageInfo, { color: theme.text }]}>
              Page {currentPage} of {totalPages}
            </Text>

            <TouchableOpacity
              style={[
                styles.paginationButton,
                {
                  backgroundColor: theme.surface,
                  opacity: currentPage === totalPages ? 0.5 : 1,
                },
              ]}
              onPress={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
            >
              <Text style={[styles.paginationText, { color: theme.text }]}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Start Quiz Button */}
      <View style={[styles.footer, { backgroundColor: theme.surface }]}>
        <TouchableOpacity
          style={[styles.startQuizButton, { backgroundColor: theme.primary }]}
          onPress={startQuiz}
        >
          <Text style={styles.startQuizButtonText}>
            Start Quiz ({questions.length} Questions)
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  header: {
    padding: 20,
    paddingBottom: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  headerContent: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  questionCount: {
    fontSize: 14,
  },
  questionCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
  difficultyBadge: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  questionText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  optionsContainer: {
    marginTop: 8,
  },
  optionItem: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 8,
    width: 25,
  },
  optionText: {
    fontSize: 14,
    flex: 1,
  },
  answerContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  correctAnswer: {
    fontSize: 14,
    fontWeight: "600",
  },
  noQuestionsContainer: {
    padding: 40,
    alignItems: "center",
  },
  noQuestionsText: {
    fontSize: 16,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 0,
  },
  paginationButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  paginationText: {
    fontSize: 14,
    fontWeight: "600",
  },
  pageInfo: {
    fontSize: 14,
  },
  footer: {
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  startQuizButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  startQuizButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

// Add this helper function to map grade to difficulty

const getDifficulty = (gradeLevel) => {
  const gradeNum = parseInt(gradeLevel);
  if (gradeNum <= 8) return "easy";
  if (gradeNum === 9 || gradeNum === 10) return "medium";
  return "hard"; // Grade 11 and 12
};
