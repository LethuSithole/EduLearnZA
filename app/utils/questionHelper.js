export const getQuestionsBySubjectAndTopic = (subject, topic, grade) => {
  const questionBank = require("../data/sampleQuestions").default;

  let questions = [];

  if (
    subject === "Mathematics" ||
    subject === "Science" ||
    subject === "English" ||
    subject === "Programming"
  ) {
    // These subjects have nested topics
    const topicQuestions = questionBank[subject]?.[topic];
    questions = topicQuestions || [];
  } else {
    // History and Geography are direct arrays
    questions = questionBank[subject] || [];
  }

  // Filter by grade if specified
  if (grade && questions.length > 0) {
    questions = questions.filter((q) => q.grade?.includes(grade));
  }

  return questions;
};

export const getAllTopicsBySubject = (subject) => {
  const questionBank = require("../data/sampleQuestions").default;

  if (subject === "Mathematics") {
    return ["Algebra", "Geometry"];
  } else if (subject === "Science") {
    return ["Biology", "Chemistry", "Physics"];
  } else if (subject === "English") {
    return ["Grammar", "Literature"];
  } else if (subject === "Programming") {
    return ["Python", "WebDevelopment"];
  } else if (subject === "History" || subject === "Geography") {
    return [subject]; // Single topic
  }

  return [];
};
