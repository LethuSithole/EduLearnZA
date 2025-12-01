import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

export default function StudyGuideContentScreen({ route, navigation }) {
  const { theme } = useTheme();
  const { guide, subject } = route.params;
  const [expandedSection, setExpandedSection] = useState(null);

  // Comprehensive content for each guide
  const guideContent = {
    "Algebra Basics": {
      sections: [
        {
          title: "Linear Equations",
          content: `Linear equations are equations where the highest power of the variable is 1.

**Standard Form:** ax + b = c

**Key Concepts:**
• Variables represent unknown values
• Constants are fixed numbers
• The goal is to isolate the variable

**Steps to Solve:**
1. Simplify both sides (combine like terms)
2. Move variables to one side
3. Move constants to the other side
4. Divide or multiply to isolate the variable

**Example:**
Solve: 3x + 5 = 14
Step 1: 3x + 5 - 5 = 14 - 5
Step 2: 3x = 9
Step 3: x = 3`,
          examples: [
            "2x + 7 = 15 → x = 4",
            "5x - 3 = 12 → x = 3",
            "4(x + 2) = 20 → x = 3",
          ],
          keyFormulas: ["ax + b = c", "x = (c - b) / a"],
        },
        {
          title: "Quadratic Equations",
          content: `Quadratic equations have the highest power of 2.

**Standard Form:** ax² + bx + c = 0

**Methods to Solve:**
1. Factoring
2. Completing the square
3. Quadratic formula

**Quadratic Formula:**
x = [-b ± √(b² - 4ac)] / 2a

**The Discriminant (b² - 4ac):**
• > 0: Two real solutions
• = 0: One real solution
• < 0: No real solutions

**Example (Factoring):**
x² + 5x + 6 = 0
(x + 2)(x + 3) = 0
x = -2 or x = -3`,
          examples: [
            "x² - 4 = 0 → x = ±2",
            "x² + 3x + 2 = 0 → x = -1 or -2",
            "2x² - 8x + 6 = 0 → x = 1 or 3",
          ],
          keyFormulas: [
            "x = [-b ± √(b² - 4ac)] / 2a",
            "Discriminant: Δ = b² - 4ac",
          ],
        },
        {
          title: "Inequalities",
          content: `Inequalities show relationships using <, >, ≤, ≥ symbols.

**Key Rules:**
• Adding/subtracting: Keep the inequality sign
• Multiplying/dividing by positive: Keep the sign
• Multiplying/dividing by negative: FLIP the sign!

**Interval Notation:**
• (a, b) - open interval: a < x < b
• [a, b] - closed interval: a ≤ x ≤ b
• [a, b) - half-open: a ≤ x < b

**Example:**
Solve: 2x + 3 < 11
2x < 8
x < 4

Number line: ←———○ 4`,
          examples: [
            "x + 5 > 10 → x > 5",
            "-2x ≤ 6 → x ≥ -3 (flip sign!)",
            "3x - 1 < 8 → x < 3",
          ],
          keyFormulas: [
            "When multiplying/dividing by negative: FLIP THE SIGN!",
          ],
        },
      ],
      practiceQuestions: [
        {
          question: "Solve: 5x - 7 = 18",
          answer: "x = 5",
          solution: "5x = 25, then x = 5",
        },
        {
          question: "Solve: x² - 9 = 0",
          answer: "x = ±3",
          solution: "(x-3)(x+3) = 0, so x = 3 or x = -3",
        },
      ],
    },
    "Geometry & Trigonometry": {
      sections: [
        {
          title: "Angles",
          content: `Understanding different types of angles.

**Types of Angles:**
• Acute: 0° < θ < 90°
• Right: θ = 90°
• Obtuse: 90° < θ < 180°
• Straight: θ = 180°
• Reflex: 180° < θ < 360°

**Angle Relationships:**
• Complementary: Sum = 90°
• Supplementary: Sum = 180°
• Vertically Opposite: Equal
• Corresponding: Equal (parallel lines)
• Alternate: Equal (parallel lines)

**Example:**
If angle A = 35°, find its complement.
Complement = 90° - 35° = 55°`,
          examples: [
            "Complement of 40° = 50°",
            "Supplement of 120° = 60°",
            "Vertically opposite angles are always equal",
          ],
          keyFormulas: [
            "Complementary: A + B = 90°",
            "Supplementary: A + B = 180°",
          ],
        },
        {
          title: "Triangles",
          content: `Properties and theorems of triangles.

**Triangle Types:**
• Equilateral: All sides equal
• Isosceles: Two sides equal
• Scalene: No sides equal
• Right-angled: One 90° angle

**Important Theorems:**
• Sum of angles = 180°
• Pythagorean: a² + b² = c²
• Area = ½ × base × height

**Congruency (SSS, SAS, AAS, RHS):**
Triangles are congruent if:
• 3 sides equal (SSS)
• 2 sides and included angle (SAS)
• 2 angles and a side (AAS)
• Right angle, hypotenuse, side (RHS)`,
          examples: [
            "In a right triangle: 3² + 4² = 5²",
            "If two angles are 60° and 70°, third = 50°",
            "Isosceles triangle: base angles are equal",
          ],
          keyFormulas: [
            "Pythagorean: a² + b² = c²",
            "Area = ½bh",
            "Sum of angles = 180°",
          ],
        },
        {
          title: "Circles & Trigonometric Ratios",
          content: `Circle properties and basic trigonometry.

**Circle Formulas:**
• Circumference: C = 2πr = πd
• Area: A = πr²
• π ≈ 3.14159

**Trigonometric Ratios (SOH CAH TOA):**
• sin θ = Opposite / Hypotenuse
• cos θ = Adjacent / Hypotenuse
• tan θ = Opposite / Adjacent

**Special Angles:**
sin 30° = 0.5, cos 30° = √3/2
sin 45° = cos 45° = √2/2
sin 60° = √3/2, cos 60° = 0.5

**Example:**
Circle radius = 5cm
Area = π × 5² = 25π ≈ 78.5 cm²`,
          examples: [
            "Circle r=3: C = 6π, A = 9π",
            "In right triangle: sin 30° = 0.5",
            "tan 45° = 1",
          ],
          keyFormulas: [
            "C = 2πr",
            "A = πr²",
            "sin θ = opp/hyp",
            "cos θ = adj/hyp",
            "tan θ = opp/adj",
          ],
        },
      ],
      practiceQuestions: [
        {
          question: "Find the area of a circle with radius 7cm",
          answer: "153.94 cm²",
          solution: "A = πr² = π × 7² = 49π ≈ 153.94",
        },
        {
          question: "Find the third angle if two angles are 45° and 65°",
          answer: "70°",
          solution: "180° - 45° - 65° = 70°",
        },
      ],
    },
    "Calculus Introduction": {
      sections: [
        {
          title: "Differentiation",
          content: `Finding the rate of change of functions.

**Definition:**
The derivative measures how a function changes.

**Power Rule:**
If f(x) = xⁿ, then f'(x) = nxⁿ⁻¹

**Basic Rules:**
• Constant: d/dx(c) = 0
• Linear: d/dx(x) = 1
• Power: d/dx(xⁿ) = nxⁿ⁻¹
• Sum: (f + g)' = f' + g'
• Difference: (f - g)' = f' - g'

**Example:**
f(x) = 3x² + 5x - 2
f'(x) = 6x + 5

**Applications:**
• Finding gradients/slopes
• Maximum and minimum points
• Rate of change problems`,
          examples: [
            "d/dx(x³) = 3x²",
            "d/dx(5x²) = 10x",
            "d/dx(x⁴ + 2x) = 4x³ + 2",
          ],
          keyFormulas: [
            "Power Rule: d/dx(xⁿ) = nxⁿ⁻¹",
            "Sum Rule: (f+g)' = f' + g'",
          ],
        },
        {
          title: "Integration",
          content: `Finding the area under curves (reverse of differentiation).

**Definition:**
Integration is the reverse process of differentiation.

**Power Rule for Integration:**
∫xⁿ dx = xⁿ⁺¹/(n+1) + C (where n ≠ -1)

**Basic Rules:**
• Constant: ∫c dx = cx + C
• Power: ∫xⁿ dx = xⁿ⁺¹/(n+1) + C
• Sum: ∫(f + g) dx = ∫f dx + ∫g dx

**Definite Integrals:**
∫ₐᵇ f(x) dx = F(b) - F(a)

**Example:**
∫2x dx = x² + C
∫(3x² + 2) dx = x³ + 2x + C`,
          examples: [
            "∫x² dx = x³/3 + C",
            "∫4x³ dx = x⁴ + C",
            "∫(2x + 3) dx = x² + 3x + C",
          ],
          keyFormulas: ["∫xⁿ dx = xⁿ⁺¹/(n+1) + C", "∫ₐᵇ f(x)dx = F(b) - F(a)"],
        },
        {
          title: "Rate of Change",
          content: `Understanding how quantities change over time.

**Average Rate of Change:**
(f(b) - f(a)) / (b - a)

**Instantaneous Rate of Change:**
The derivative f'(x) at a point

**Applications:**
• Velocity (rate of change of position)
• Acceleration (rate of change of velocity)
• Growth rates
• Population changes

**Example:**
If s(t) = 3t², find velocity at t=2
v(t) = s'(t) = 6t
v(2) = 12 units/second

**Real-world Problems:**
• Water flowing from tank
• Car acceleration
• Profit/cost changes`,
          examples: [
            "Position: s = 2t³, Velocity: v = 6t²",
            "If P(t) = 100e^(0.05t), growth rate = 5%",
            "Average rate = Δy/Δx",
          ],
          keyFormulas: [
            "Average rate = Δy/Δx",
            "Instantaneous rate = dy/dx",
            "v = ds/dt, a = dv/dt",
          ],
        },
      ],
      practiceQuestions: [
        {
          question: "Differentiate: f(x) = 4x³ - 2x + 5",
          answer: "f'(x) = 12x² - 2",
          solution: "Apply power rule to each term",
        },
        {
          question: "Integrate: ∫(6x² + 4) dx",
          answer: "2x³ + 4x + C",
          solution: "Use power rule for integration",
        },
      ],
    },
    "Statistics & Probability": {
      sections: [
        {
          title: "Mean, Median, Mode",
          content: `Measures of central tendency.

**Mean (Average):**
Sum of all values ÷ Number of values
x̄ = Σx / n

**Median (Middle Value):**
• Arrange data in order
• Middle value (odd count)
• Average of two middle (even count)

**Mode (Most Frequent):**
The value that appears most often

**Example:**
Data: 2, 3, 3, 5, 7, 8
Mean = (2+3+3+5+7+8)/6 = 4.67
Median = (3+5)/2 = 4
Mode = 3

**When to Use:**
• Mean: Normal distribution
• Median: Skewed data/outliers
• Mode: Categorical data`,
          examples: [
            "Data: 5,5,6,7,9 → Mean=6.4, Median=6, Mode=5",
            "Outliers affect mean more than median",
            "Bimodal: Two modes",
          ],
          keyFormulas: [
            "Mean: x̄ = Σx/n",
            "Median: Middle value",
            "Mode: Most frequent",
          ],
        },
        {
          title: "Standard Deviation",
          content: `Measure of spread/variability.

**Variance:**
σ² = Σ(x - x̄)² / n

**Standard Deviation:**
σ = √[Σ(x - x̄)² / n]

**Steps to Calculate:**
1. Find the mean
2. Find each deviation (x - x̄)
3. Square each deviation
4. Find mean of squared deviations
5. Take square root

**Interpretation:**
• Small SD: Data close to mean
• Large SD: Data spread out
• 68% within 1 SD of mean
• 95% within 2 SD of mean

**Example:**
Data: 2, 4, 6, 8
Mean = 5
SD = 2.24`,
          examples: [
            "Low SD: 10,11,10,11,10 (consistent)",
            "High SD: 5,15,3,20,7 (spread out)",
            "Investment: High SD = High risk",
          ],
          keyFormulas: ["σ² = Σ(x-x̄)²/n", "σ = √(variance)", "68-95-99.7 rule"],
        },
        {
          title: "Probability",
          content: `Likelihood of events occurring.

**Basic Probability:**
P(Event) = Favorable outcomes / Total outcomes

**Range:** 0 ≤ P(E) ≤ 1
• P = 0: Impossible
• P = 1: Certain
• P = 0.5: Equally likely

**Rules:**
• P(A or B) = P(A) + P(B) - P(A and B)
• P(not A) = 1 - P(A)
• Independent: P(A and B) = P(A) × P(B)

**Example:**
Rolling a die: P(6) = 1/6
Coin flip: P(Heads) = 1/2

**Conditional Probability:**
P(A|B) = P(A and B) / P(B)`,
          examples: [
            "Card deck: P(Ace) = 4/52 = 1/13",
            "Two coins: P(both heads) = 1/4",
            "Dice: P(even) = 3/6 = 1/2",
          ],
          keyFormulas: [
            "P(E) = n(E)/n(S)",
            "P(A or B) = P(A) + P(B) - P(A∩B)",
            "P(not A) = 1 - P(A)",
          ],
        },
      ],
      practiceQuestions: [
        {
          question: "Find mean of: 3, 7, 8, 12, 15",
          answer: "9",
          solution: "(3+7+8+12+15)/5 = 45/5 = 9",
        },
        {
          question: "Probability of rolling odd number on die?",
          answer: "1/2 or 0.5",
          solution: "3 odd numbers (1,3,5) out of 6 = 3/6 = 1/2",
        },
      ],
    },
    // Add similar detailed content for Physical Sciences
    Mechanics: {
      sections: [
        {
          title: "Newton's Laws",
          content: `The foundation of classical mechanics.

**First Law (Inertia):**
An object at rest stays at rest, and an object in motion stays in motion unless acted upon by a force.

**Second Law (F = ma):**
Force = Mass × Acceleration
F = ma

**Third Law (Action-Reaction):**
For every action, there is an equal and opposite reaction.

**Applications:**
• Car crashes (inertia)
• Rocket propulsion (3rd law)
• Pushing objects (2nd law)

**Example:**
If m = 10kg, a = 5m/s²
F = 10 × 5 = 50N`,
          examples: [
            "Seatbelt: Stops you (1st law)",
            "F = 20kg × 2m/s² = 40N",
            "Rocket: Gas down, rocket up",
          ],
          keyFormulas: ["F = ma", "Weight: W = mg", "g = 9.8 m/s²"],
        },
        {
          title: "Forces",
          content: `Understanding different types of forces.

**Types of Forces:**
• Gravitational (Weight): W = mg
• Normal force: Perpendicular to surface
• Friction: Opposes motion (f = μN)
• Tension: In ropes/strings
• Applied force: Push/pull

**Net Force:**
ΣF = ma (vector sum of all forces)

**Free Body Diagrams:**
Shows all forces acting on object

**Example:**
Block on table, mass 5kg
Weight = 5 × 9.8 = 49N down
Normal force = 49N up`,
          examples: [
            "Friction: f = 0.3 × 100N = 30N",
            "Tension in rope = Weight",
            "Net force = F₁ + F₂ + F₃",
          ],
          keyFormulas: ["W = mg", "f = μN", "ΣF = ma", "g = 9.8 m/s²"],
        },
        {
          title: "Motion & Energy",
          content: `Kinematics and energy principles.

**Kinematic Equations:**
v = u + at
s = ut + ½at²
v² = u² + 2as

**Where:**
u = initial velocity
v = final velocity
a = acceleration
s = displacement
t = time

**Energy Types:**
• Kinetic: KE = ½mv²
• Potential: PE = mgh
• Conservation: Energy cannot be created/destroyed

**Work-Energy:**
Work = Force × Distance
W = Fd cos θ`,
          examples: [
            "Car: u=0, a=2m/s², t=5s → v=10m/s",
            "KE = ½ × 10 × 5² = 125J",
            "PE = 2 × 9.8 × 10 = 196J",
          ],
          keyFormulas: ["v = u + at", "KE = ½mv²", "PE = mgh", "W = Fd"],
        },
      ],
      practiceQuestions: [
        {
          question: "Calculate force for 5kg mass with 3m/s² acceleration",
          answer: "15N",
          solution: "F = ma = 5 × 3 = 15N",
        },
        {
          question: "Find kinetic energy: m=4kg, v=10m/s",
          answer: "200J",
          solution: "KE = ½mv² = ½ × 4 × 100 = 200J",
        },
      ],
    },
  };

  const content = guideContent[guide.title] || {
    sections: [
      {
        title: "Introduction",
        content: `This study guide covers ${guide.title}.

${guide.description}

Topics covered include:
${guide.topics.map((t) => `• ${t}`).join("\n")}

This comprehensive guide will help you master these concepts through:
• Clear explanations
• Worked examples
• Practice questions
• Key formulas and tips`,
        examples: ["Coming soon..."],
        keyFormulas: ["Content being prepared..."],
      },
    ],
    practiceQuestions: [],
  };

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View
        style={[
          styles.header,
          { backgroundColor: subject.color || theme.primary },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonWhite}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.subjectIcon}>{subject.icon}</Text>
          <Text style={styles.headerTitle}>{guide.title}</Text>
          <Text style={styles.headerSubtitle}>Grade {guide.grade}</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Overview */}
        <View
          style={[
            styles.overviewBox,
            {
              backgroundColor: theme.surface,
              borderColor: subject.color || theme.primary,
            },
          ]}
        >
          <Text style={[styles.overviewTitle, { color: theme.text }]}>
            📚 What You'll Learn
          </Text>
          <Text style={[styles.overviewText, { color: theme.text }]}>
            {guide.description}
          </Text>
          <View style={styles.topicsList}>
            {guide.topics.map((topic, index) => (
              <View key={index} style={styles.topicItem}>
                <Text
                  style={[
                    styles.topicBullet,
                    { color: subject.color || theme.primary },
                  ]}
                >
                  ✓
                </Text>
                <Text style={[styles.topicText, { color: theme.text }]}>
                  {topic}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Content Sections */}
        {content.sections.map((section, index) => (
          <View
            key={index}
            style={[
              styles.sectionCard,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.sectionHeader}
              onPress={() => toggleSection(index)}
            >
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                {section.title}
              </Text>
              <Text
                style={[
                  styles.expandIcon,
                  { color: subject.color || theme.primary },
                ]}
              >
                {expandedSection === index ? "−" : "+"}
              </Text>
            </TouchableOpacity>

            {expandedSection === index && (
              <View style={styles.sectionContent}>
                <Text style={[styles.contentText, { color: theme.text }]}>
                  {section.content}
                </Text>

                {/* Examples */}
                {section.examples && section.examples.length > 0 && (
                  <View
                    style={[
                      styles.examplesBox,
                      { backgroundColor: subject.color + "10" },
                    ]}
                  >
                    <Text
                      style={[
                        styles.examplesTitle,
                        { color: subject.color || theme.primary },
                      ]}
                    >
                      💡 Examples:
                    </Text>
                    {section.examples.map((example, idx) => (
                      <Text
                        key={idx}
                        style={[styles.exampleText, { color: theme.text }]}
                      >
                        • {example}
                      </Text>
                    ))}
                  </View>
                )}

                {/* Key Formulas */}
                {section.keyFormulas && section.keyFormulas.length > 0 && (
                  <View
                    style={[
                      styles.formulasBox,
                      {
                        backgroundColor: theme.primary + "10",
                        borderColor: theme.primary,
                      },
                    ]}
                  >
                    <Text
                      style={[styles.formulasTitle, { color: theme.primary }]}
                    >
                      📐 Key Formulas:
                    </Text>
                    {section.keyFormulas.map((formula, idx) => (
                      <Text
                        key={idx}
                        style={[styles.formulaText, { color: theme.text }]}
                      >
                        {formula}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            )}
          </View>
        ))}

        {/* Practice Questions */}
        {content.practiceQuestions && content.practiceQuestions.length > 0 && (
          <View
            style={[
              styles.practiceSection,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <Text style={[styles.practiceTitle, { color: theme.text }]}>
              ✏️ Practice Questions
            </Text>
            {content.practiceQuestions.map((q, index) => (
              <View key={index} style={styles.questionCard}>
                <Text style={[styles.questionText, { color: theme.text }]}>
                  Q{index + 1}: {q.question}
                </Text>
                <TouchableOpacity
                  style={[
                    styles.showAnswerButton,
                    { backgroundColor: subject.color || theme.primary },
                  ]}
                  onPress={() =>
                    Alert.alert(
                      "Solution",
                      `Answer: ${q.answer}\n\nSolution:\n${q.solution}`
                    )
                  }
                >
                  <Text style={styles.showAnswerText}>Show Answer</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Study Tips */}
        <View
          style={[
            styles.tipsBox,
            {
              backgroundColor: subject.color + "15",
              borderColor: subject.color || theme.primary,
            },
          ]}
        >
          <Text style={styles.tipsIcon}>💡</Text>
          <Text
            style={[
              styles.tipsTitle,
              { color: subject.color || theme.primary },
            ]}
          >
            Study Tips
          </Text>
          <Text style={[styles.tipText, { color: theme.text }]}>
            • Read through each section carefully
          </Text>
          <Text style={[styles.tipText, { color: theme.text }]}>
            • Work through all examples step-by-step
          </Text>
          <Text style={[styles.tipText, { color: theme.text }]}>
            • Practice the questions multiple times
          </Text>
          <Text style={[styles.tipText, { color: theme.text }]}>
            • Memorize key formulas and concepts
          </Text>
          <Text style={[styles.tipText, { color: theme.text }]}>
            • Create your own summary notes
          </Text>
        </View>

        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  backButtonWhite: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF",
    marginBottom: 20,
  },
  headerContent: {
    alignItems: "center",
  },
  subjectIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#FFF",
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  overviewBox: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 20,
    elevation: 2,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  overviewText: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 15,
  },
  topicsList: {
    gap: 8,
  },
  topicItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  topicBullet: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  topicText: {
    fontSize: 14,
    flex: 1,
  },
  sectionCard: {
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 15,
    elevation: 2,
    overflow: "hidden",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  expandIcon: {
    fontSize: 24,
    fontWeight: "bold",
  },
  sectionContent: {
    padding: 16,
    paddingTop: 0,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 15,
  },
  examplesBox: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  examplesTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  exampleText: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 5,
  },
  formulasBox: {
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
  },
  formulasTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  formulaText: {
    fontSize: 14,
    lineHeight: 24,
    fontFamily: "monospace",
    marginBottom: 5,
  },
  practiceSection: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
    elevation: 2,
  },
  practiceTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  questionCard: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  questionText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 10,
  },
  showAnswerButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  showAnswerText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },
  tipsBox: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 20,
  },
  tipsIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 5,
  },
  spacer: {
    height: 30,
  },
});
