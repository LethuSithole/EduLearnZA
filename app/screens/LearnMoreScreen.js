import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

export default function LearnMoreScreen({ navigation, route }) {
  const { subject } = route.params || {};
  const themeContext = useTheme();
  const theme = themeContext?.theme || {
    background: "#f5f5f5",
    surface: "#ffffff",
    text: "#000000",
    textSecondary: "#666666",
    primary: "#6200EE",
    border: "#e0e0e0",
  };

  const [activeTab, setActiveTab] = useState("guide");

  const tabs = [
    { id: "guide", label: "Exam Guide", icon: "📚" },
    { id: "tips", label: "Study Tips", icon: "💡" },
    { id: "papers", label: "Past Papers", icon: "📄" },
    { id: "resources", label: "Resources", icon: "📖" },
    { id: "techniques", label: "Techniques", icon: "🎯" },
  ];

  const pastPapers = {
    Mathematics: [
      { year: 2024, term: "November", paper: "Paper 1", url: "#", memo: "#" },
      { year: 2024, term: "November", paper: "Paper 2", url: "#", memo: "#" },
      { year: 2024, term: "June", paper: "Paper 1", url: "#", memo: "#" },
      { year: 2024, term: "June", paper: "Paper 2", url: "#", memo: "#" },
      { year: 2023, term: "November", paper: "Paper 1", url: "#", memo: "#" },
      { year: 2023, term: "November", paper: "Paper 2", url: "#", memo: "#" },
      { year: 2023, term: "June", paper: "Paper 1", url: "#", memo: "#" },
      { year: 2023, term: "June", paper: "Paper 2", url: "#", memo: "#" },
      { year: 2022, term: "November", paper: "Paper 1", url: "#", memo: "#" },
      { year: 2022, term: "November", paper: "Paper 2", url: "#", memo: "#" },
    ],
    Science: [
      { year: 2024, term: "November", paper: "Paper 1", url: "#", memo: "#" },
      { year: 2024, term: "November", paper: "Paper 2", url: "#", memo: "#" },
      { year: 2024, term: "June", paper: "Paper 1", url: "#", memo: "#" },
      { year: 2024, term: "June", paper: "Paper 2", url: "#", memo: "#" },
      { year: 2023, term: "November", paper: "Paper 1", url: "#", memo: "#" },
      { year: 2023, term: "November", paper: "Paper 2", url: "#", memo: "#" },
      { year: 2023, term: "June", paper: "Paper 1", url: "#", memo: "#" },
      { year: 2023, term: "June", paper: "Paper 2", url: "#", memo: "#" },
    ],
    English: [
      { year: 2024, term: "November", paper: "Paper 1", url: "#", memo: "#" },
      { year: 2024, term: "November", paper: "Paper 2", url: "#", memo: "#" },
      { year: 2024, term: "November", paper: "Paper 3", url: "#", memo: "#" },
      { year: 2024, term: "June", paper: "Paper 1", url: "#", memo: "#" },
      { year: 2024, term: "June", paper: "Paper 2", url: "#", memo: "#" },
      { year: 2023, term: "November", paper: "Paper 1", url: "#", memo: "#" },
      { year: 2023, term: "November", paper: "Paper 2", url: "#", memo: "#" },
      { year: 2023, term: "November", paper: "Paper 3", url: "#", memo: "#" },
    ],
    History: [
      { year: 2024, term: "November", paper: "Paper 1", url: "#", memo: "#" },
      { year: 2024, term: "November", paper: "Paper 2", url: "#", memo: "#" },
      { year: 2024, term: "June", paper: "Paper 1", url: "#", memo: "#" },
      { year: 2024, term: "June", paper: "Paper 2", url: "#", memo: "#" },
      { year: 2023, term: "November", paper: "Paper 1", url: "#", memo: "#" },
      { year: 2023, term: "November", paper: "Paper 2", url: "#", memo: "#" },
    ],
    Geography: [
      { year: 2024, term: "November", paper: "Paper 1", url: "#", memo: "#" },
      { year: 2024, term: "November", paper: "Paper 2", url: "#", memo: "#" },
      { year: 2024, term: "June", paper: "Paper 1", url: "#", memo: "#" },
      { year: 2024, term: "June", paper: "Paper 2", url: "#", memo: "#" },
      { year: 2023, term: "November", paper: "Paper 1", url: "#", memo: "#" },
      { year: 2023, term: "November", paper: "Paper 2", url: "#", memo: "#" },
    ],
  };

  const handleDownload = (paperInfo, type) => {
    // In a real app, this would download or open the PDF
    Alert.alert(
      "Download",
      `${type === "paper" ? "Question Paper" : "Memorandum"}\n${
        paperInfo.year
      } ${paperInfo.term} - ${paperInfo.paper}`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Open",
          onPress: () => {
            // Replace with actual URL
            Alert.alert(
              "Info",
              "This feature will open the actual PDF in a future update. Papers will be sourced from DBE website."
            );
          },
        },
      ]
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "papers":
        const subjectPapers = pastPapers[subject?.name] || [];
        const groupedByYear = subjectPapers.reduce((acc, paper) => {
          if (!acc[paper.year]) {
            acc[paper.year] = [];
          }
          acc[paper.year].push(paper);
          return acc;
        }, {});

        return (
          <View>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Past Examination Papers
            </Text>

            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              {subject?.name || "Subject"} - Grade 12
            </Text>

            {/* Info Card */}
            <View style={[styles.infoCard, { backgroundColor: "#E3F2FD" }]}>
              <Text style={styles.infoIcon}>ℹ️</Text>
              <View style={{ flex: 1 }}>
                <Text style={[styles.infoTitle, { color: "#1565C0" }]}>
                  How to Use Past Papers
                </Text>
                <Text style={[styles.infoText, { color: "#1976D2" }]}>
                  • Practice under timed conditions{"\n"}• Attempt the paper
                  before checking answers{"\n"}• Review memorandum to understand
                  marking{"\n"}• Identify weak areas for focused study
                </Text>
              </View>
            </View>

            {Object.keys(groupedByYear)
              .sort((a, b) => b - a)
              .map((year) => (
                <View key={year}>
                  <Text style={[styles.yearHeader, { color: theme.primary }]}>
                    {year}
                  </Text>
                  {groupedByYear[year].map((paper, index) => (
                    <View
                      key={index}
                      style={[
                        styles.paperCard,
                        { backgroundColor: theme.surface },
                      ]}
                    >
                      <View style={styles.paperInfo}>
                        <Text
                          style={[styles.paperTitle, { color: theme.text }]}
                        >
                          {paper.term} - {paper.paper}
                        </Text>
                        <Text
                          style={[
                            styles.paperDetails,
                            { color: theme.textSecondary },
                          ]}
                        >
                          Grade 12 • {subject?.name}
                        </Text>
                      </View>
                      <View style={styles.paperActions}>
                        <TouchableOpacity
                          style={[
                            styles.downloadButton,
                            { backgroundColor: theme.primary },
                          ]}
                          onPress={() => handleDownload(paper, "paper")}
                        >
                          <Text style={styles.downloadButtonText}>
                            📥 Paper
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.downloadButton,
                            styles.memoButton,
                            { backgroundColor: "#4CAF50" },
                          ]}
                          onPress={() => handleDownload(paper, "memo")}
                        >
                          <Text style={styles.downloadButtonText}>📋 Memo</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              ))}

            {/* Additional Resources */}
            <View style={[styles.card, { backgroundColor: theme.surface }]}>
              <Text style={[styles.cardTitle, { color: theme.primary }]}>
                📚 Official Past Papers Sources
              </Text>
              <TouchableOpacity
                style={styles.linkButton}
                onPress={() =>
                  Linking.openURL(
                    "https://www.education.gov.za/Curriculum/NationalSeniorCertificate(NSC)Examinations/NSCPastExaminationpapers.aspx"
                  )
                }
              >
                <Text style={styles.linkText}>
                  • Department of Basic Education (DBE)
                </Text>
                <Text style={styles.linkArrow}>→</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.linkButton}
                onPress={() =>
                  Linking.openURL("https://www.thutong.doe.gov.za")
                }
              >
                <Text style={styles.linkText}>• Thutong Portal</Text>
                <Text style={styles.linkArrow}>→</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.linkButton}
                onPress={() =>
                  Linking.openURL("https://www.examsolutions.co.za")
                }
              >
                <Text style={styles.linkText}>
                  • Exam Solutions (with video explanations)
                </Text>
                <Text style={styles.linkArrow}>→</Text>
              </TouchableOpacity>
            </View>

            {/* Tips for Using Past Papers */}
            <View style={[styles.card, { backgroundColor: theme.surface }]}>
              <Text style={[styles.cardTitle, { color: theme.primary }]}>
                💡 Exam Practice Tips
              </Text>
              <Text style={[styles.cardText, { color: theme.text }]}>
                <Text style={styles.bold}>1. Simulate Exam Conditions</Text>
                {"\n"}Set a timer, work in a quiet space, and avoid
                distractions.{"\n\n"}
                <Text style={styles.bold}>2. Time Management</Text>
                {"\n"}Allocate time per question based on marks. Don't spend too
                long on one question.{"\n\n"}
                <Text style={styles.bold}>3. Show Your Working</Text>
                {"\n"}In subjects like Math and Science, always show your
                calculations and reasoning.{"\n\n"}
                <Text style={styles.bold}>4. Learn from Mistakes</Text>
                {"\n"}Review the memorandum carefully. Understand why you got
                answers wrong.{"\n\n"}
                <Text style={styles.bold}>5. Practice Regularly</Text>
                {"\n"}Do at least 2-3 past papers per subject before your final
                exam.
              </Text>
            </View>
          </View>
        );

      case "guide":
        return (
          <View>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Exam Preparation Guide
            </Text>

            <View style={[styles.card, { backgroundColor: theme.surface }]}>
              <Text style={[styles.cardTitle, { color: theme.primary }]}>
                📅 Create a Study Schedule
              </Text>
              <Text style={[styles.cardText, { color: theme.text }]}>
                • Start studying at least 2-3 weeks before exams{"\n"}• Break
                down topics into daily goals{"\n"}• Allocate more time to
                difficult subjects{"\n"}• Include regular breaks (Pomodoro: 25
                min study, 5 min break){"\n"}• Schedule review sessions before
                the exam
              </Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.surface }]}>
              <Text style={[styles.cardTitle, { color: theme.primary }]}>
                📝 Understand the Exam Format
              </Text>
              <Text style={[styles.cardText, { color: theme.text }]}>
                • Review past exam papers{"\n"}• Understand the marking scheme
                {"\n"}• Know the time allocation for each section{"\n"}•
                Identify question patterns and formats{"\n"}• Practice with
                timed mock exams
              </Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.surface }]}>
              <Text style={[styles.cardTitle, { color: theme.primary }]}>
                🎯 Focus on Key Topics
              </Text>
              <Text style={[styles.cardText, { color: theme.text }]}>
                • Identify high-priority topics from the syllabus{"\n"}• Master
                fundamental concepts first{"\n"}• Create mind maps for complex
                topics{"\n"}• Use flashcards for important definitions{"\n"}•
                Practice numerical problems repeatedly
              </Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.surface }]}>
              <Text style={[styles.cardTitle, { color: theme.primary }]}>
                ⏰ Day Before the Exam
              </Text>
              <Text style={[styles.cardText, { color: theme.text }]}>
                • Light revision of key points only{"\n"}• Don't start new
                topics{"\n"}• Prepare all materials (pens, calculator, ID){"\n"}
                • Get 7-8 hours of sleep{"\n"}• Eat a healthy breakfast on exam
                day
              </Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.surface }]}>
              <Text style={[styles.cardTitle, { color: theme.primary }]}>
                ✍️ During the Exam
              </Text>
              <Text style={[styles.cardText, { color: theme.text }]}>
                • Read instructions carefully{"\n"}• Allocate time for each
                section{"\n"}• Answer easy questions first{"\n"}• Show all
                working in calculations{"\n"}• Leave time to review answers
                {"\n"}• Stay calm and manage anxiety
              </Text>
            </View>
          </View>
        );

      case "tips":
        return (
          <View>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Effective Study Tips
            </Text>

            <View style={[styles.card, { backgroundColor: theme.surface }]}>
              <Text style={[styles.cardTitle, { color: theme.primary }]}>
                🧠 Active Learning Techniques
              </Text>
              <Text style={[styles.cardText, { color: theme.text }]}>
                • Teach concepts to someone else{"\n"}• Create summary notes in
                your own words{"\n"}• Use the Feynman Technique (explain simply)
                {"\n"}• Draw diagrams and visual representations{"\n"}• Make
                connections between different topics{"\n"}• Question yourself
                while reading
              </Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.surface }]}>
              <Text style={[styles.cardTitle, { color: theme.primary }]}>
                📚 Note-Taking Strategies
              </Text>
              <Text style={[styles.cardText, { color: theme.text }]}>
                • Use Cornell Method (questions, notes, summary){"\n"}•
                Highlight key concepts in different colors{"\n"}• Create
                acronyms for memorization{"\n"}• Write summary cards for each
                topic{"\n"}• Review and revise notes within 24 hours{"\n"}•
                Organize notes by subject and topic
              </Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.surface }]}>
              <Text style={[styles.cardTitle, { color: theme.primary }]}>
                🏆 Memory Enhancement
              </Text>
              <Text style={[styles.cardText, { color: theme.text }]}>
                • Use mnemonic devices{"\n"}• Practice spaced repetition{"\n"}•
                Study in short, focused sessions{"\n"}• Test yourself regularly
                {"\n"}• Sleep well (consolidates memory){"\n"}• Stay hydrated
                and eat brain-healthy foods
              </Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.surface }]}>
              <Text style={[styles.cardTitle, { color: theme.primary }]}>
                🎧 Optimal Study Environment
              </Text>
              <Text style={[styles.cardText, { color: theme.text }]}>
                • Find a quiet, well-lit space{"\n"}• Minimize distractions
                (phone, social media){"\n"}• Keep study materials organized
                {"\n"}• Use background music if it helps (instrumental){"\n"}•
                Maintain comfortable temperature{"\n"}• Have all supplies ready
                before starting
              </Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.surface }]}>
              <Text style={[styles.cardTitle, { color: theme.primary }]}>
                💪 Stay Motivated
              </Text>
              <Text style={[styles.cardText, { color: theme.text }]}>
                • Set realistic, achievable goals{"\n"}• Reward yourself after
                completing tasks{"\n"}• Join study groups for accountability
                {"\n"}• Visualize success and positive outcomes{"\n"}• Take
                regular breaks to avoid burnout{"\n"}• Remember your long-term
                goals
              </Text>
            </View>
          </View>
        );

      case "resources":
        return (
          <View>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Learning Resources
            </Text>

            <View style={[styles.card, { backgroundColor: theme.surface }]}>
              <Text style={[styles.cardTitle, { color: theme.primary }]}>
                📱 Digital Resources
              </Text>
              <Text style={[styles.cardText, { color: theme.text }]}>
                <Text style={styles.bold}>Khan Academy</Text> - Free video
                lessons for all subjects{"\n\n"}
                <Text style={styles.bold}>YouTube EDU</Text> - Educational
                channels like CrashCourse, TED-Ed{"\n\n"}
                <Text style={styles.bold}>Quizlet</Text> - Flashcard maker and
                study tools{"\n\n"}
                <Text style={styles.bold}>Coursera/edX</Text> - University-level
                courses{"\n\n"}
                <Text style={styles.bold}>Grammarly</Text> - Writing and grammar
                assistance
              </Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.surface }]}>
              <Text style={[styles.cardTitle, { color: theme.primary }]}>
                📚 South African Resources
              </Text>
              <Text style={[styles.cardText, { color: theme.text }]}>
                <Text style={styles.bold}>DBE Website</Text> - Department of
                Basic Education materials{"\n\n"}
                <Text style={styles.bold}>Matric Past Papers</Text> - Previous
                exam papers (2010-2024){"\n\n"}
                <Text style={styles.bold}>CAPS Documents</Text> - Curriculum
                guidelines{"\n\n"}
                <Text style={styles.bold}>Siyavula</Text> - Free textbooks and
                practice{"\n\n"}
                <Text style={styles.bold}>Mindset Learn</Text> - Free video
                lessons and worksheets
              </Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.surface }]}>
              <Text style={[styles.cardTitle, { color: theme.primary }]}>
                🎓 Subject-Specific Resources
              </Text>
              <Text style={[styles.cardText, { color: theme.text }]}>
                <Text style={styles.bold}>Mathematics:</Text> Photomath, Wolfram
                Alpha, Desmos{"\n\n"}
                <Text style={styles.bold}>Science:</Text> PhET Simulations,
                Labster{"\n\n"}
                <Text style={styles.bold}>Languages:</Text> Duolingo, Memrise
                {"\n\n"}
                <Text style={styles.bold}>History:</Text> History.com, BBC
                Bitesize{"\n\n"}
                <Text style={styles.bold}>Programming:</Text> Codecademy,
                freeCodeCamp
              </Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.surface }]}>
              <Text style={[styles.cardTitle, { color: theme.primary }]}>
                📖 Recommended Books
              </Text>
              <Text style={[styles.cardText, { color: theme.text }]}>
                • Study guides by X-Kit Achieve{"\n"}• Clever series
                (subject-specific){"\n"}• Oxford Study Guides{"\n"}• Via Afrika
                textbooks{"\n"}• Platinum series{"\n"}• Everything Maths &
                Science
              </Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.surface }]}>
              <Text style={[styles.cardTitle, { color: theme.primary }]}>
                🤝 Getting Help
              </Text>
              <Text style={[styles.cardText, { color: theme.text }]}>
                • Ask teachers during consultation hours{"\n"}• Join study
                groups with classmates{"\n"}• Use online forums (Stack Exchange,
                Reddit){"\n"}• Find a tutor if needed{"\n"}• Utilize school
                library resources{"\n"}• Attend extra lessons and workshops
              </Text>
            </View>
          </View>
        );

      case "techniques":
        return (
          <View>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Study Techniques & Methods
            </Text>

            <View style={[styles.card, { backgroundColor: theme.surface }]}>
              <Text style={[styles.cardTitle, { color: theme.primary }]}>
                🍅 Pomodoro Technique
              </Text>
              <Text style={[styles.cardText, { color: theme.text }]}>
                <Text style={styles.bold}>How it works:</Text>
                {"\n"}
                1. Study for 25 minutes (one "Pomodoro"){"\n"}
                2. Take a 5-minute break{"\n"}
                3. Repeat 4 times{"\n"}
                4. Take a longer 15-30 minute break{"\n\n"}
                <Text style={styles.bold}>Benefits:</Text> Maintains focus,
                prevents burnout, improves productivity
              </Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.surface }]}>
              <Text style={[styles.cardTitle, { color: theme.primary }]}>
                🎯 SQ3R Method
              </Text>
              <Text style={[styles.cardText, { color: theme.text }]}>
                <Text style={styles.bold}>Survey:</Text> Skim the material first
                {"\n"}
                <Text style={styles.bold}>Question:</Text> Form questions about
                the content{"\n"}
                <Text style={styles.bold}>Read:</Text> Read actively to answer
                questions{"\n"}
                <Text style={styles.bold}>Recite:</Text> Summarize in your own
                words{"\n"}
                <Text style={styles.bold}>Review:</Text> Go over material
                regularly{"\n\n"}
                <Text style={styles.bold}>Best for:</Text> Textbook reading and
                comprehension
              </Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.surface }]}>
              <Text style={[styles.cardTitle, { color: theme.primary }]}>
                🔄 Spaced Repetition
              </Text>
              <Text style={[styles.cardText, { color: theme.text }]}>
                <Text style={styles.bold}>Schedule:</Text>
                {"\n"}• Review after 1 day{"\n"}• Review after 3 days{"\n"}•
                Review after 1 week{"\n"}• Review after 2 weeks{"\n"}• Review
                after 1 month{"\n\n"}
                <Text style={styles.bold}>Why it works:</Text> Strengthens
                long-term memory retention
              </Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.surface }]}>
              <Text style={[styles.cardTitle, { color: theme.primary }]}>
                🗺️ Mind Mapping
              </Text>
              <Text style={[styles.cardText, { color: theme.text }]}>
                <Text style={styles.bold}>Steps:</Text>
                {"\n"}
                1. Write main topic in the center{"\n"}
                2. Branch out to subtopics{"\n"}
                3. Add details to each branch{"\n"}
                4. Use colors and images{"\n"}
                5. Show connections between ideas{"\n\n"}
                <Text style={styles.bold}>Best for:</Text> Visual learners,
                brainstorming, exam revision
              </Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.surface }]}>
              <Text style={[styles.cardTitle, { color: theme.primary }]}>
                📝 Cornell Note-Taking
              </Text>
              <Text style={[styles.cardText, { color: theme.text }]}>
                <Text style={styles.bold}>Page Layout:</Text>
                {"\n"}• Left column: Cues/questions{"\n"}• Right column: Notes
                during lecture{"\n"}• Bottom: Summary of the page{"\n\n"}
                <Text style={styles.bold}>Process:</Text>
                {"\n"}
                1. Take notes during class{"\n"}
                2. Review and add cue questions{"\n"}
                3. Cover notes and test yourself{"\n"}
                4. Write summary at bottom
              </Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.surface }]}>
              <Text style={[styles.cardTitle, { color: theme.primary }]}>
                🎨 Feynman Technique
              </Text>
              <Text style={[styles.cardText, { color: theme.text }]}>
                <Text style={styles.bold}>4 Steps:</Text>
                {"\n"}
                1. Choose a concept to learn{"\n"}
                2. Teach it to someone (or yourself) in simple terms{"\n"}
                3. Identify gaps in your understanding{"\n"}
                4. Review and simplify further{"\n\n"}
                <Text style={styles.bold}>Result:</Text> Deep understanding
                through simple explanation
              </Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.surface }]}>
              <Text style={[styles.cardTitle, { color: theme.primary }]}>
                🔢 Active Recall
              </Text>
              <Text style={[styles.cardText, { color: theme.text }]}>
                <Text style={styles.bold}>Method:</Text>
                {"\n"}• Close your notes{"\n"}• Write down everything you
                remember{"\n"}• Check against your notes{"\n"}• Focus on what
                you missed{"\n\n"}
                <Text style={styles.bold}>Why it's effective:</Text> Forces your
                brain to retrieve information, strengthening memory pathways
              </Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.surface }]}>
              <Text style={[styles.cardTitle, { color: theme.primary }]}>
                📊 Interleaving Practice
              </Text>
              <Text style={[styles.cardText, { color: theme.text }]}>
                <Text style={styles.bold}>Instead of:</Text> Math, Math, Math,
                then Science{"\n"}
                <Text style={styles.bold}>Try:</Text> Math, Science, Math,
                Science{"\n\n"}
                <Text style={styles.bold}>Benefits:</Text>
                {"\n"}• Better long-term retention{"\n"}• Improved
                problem-solving skills{"\n"}• More realistic exam conditions
              </Text>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.surface }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.backText, { color: theme.primary }]}>
            ← Back
          </Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          {subject?.name || "Learn More"}
        </Text>
        <View style={{ width: 50 }} />
      </View>

      {/* Tabs */}
      <View style={[styles.tabContainer, { backgroundColor: theme.surface }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                activeTab === tab.id && {
                  borderBottomColor: theme.primary,
                  borderBottomWidth: 3,
                },
              ]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text style={styles.tabIcon}>{tab.icon}</Text>
              <Text
                style={[
                  styles.tabText,
                  {
                    color:
                      activeTab === tab.id
                        ? theme.primary
                        : theme.textSecondary,
                  },
                  activeTab === tab.id && styles.tabTextActive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backText: {
    fontSize: 16,
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  tabContainer: {
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  tabIcon: {
    fontSize: 20,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
  },
  tabTextActive: {
    fontWeight: "700",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  infoCard: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    gap: 12,
  },
  infoIcon: {
    fontSize: 24,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    lineHeight: 20,
  },
  yearHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 15,
  },
  paperCard: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  paperInfo: {
    marginBottom: 12,
  },
  paperTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  paperDetails: {
    fontSize: 13,
  },
  paperActions: {
    flexDirection: "row",
    gap: 10,
  },
  downloadButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  memoButton: {
    flex: 1,
  },
  downloadButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  linkButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  linkText: {
    fontSize: 15,
    color: "#1976D2",
  },
  linkArrow: {
    fontSize: 18,
    color: "#1976D2",
  },
  card: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  cardText: {
    fontSize: 15,
    lineHeight: 24,
  },
  bold: {
    fontWeight: "bold",
  },
});
