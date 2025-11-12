# 📚 EduLearn - Educational Study Platform

> **Transform learning into an engaging, interactive experience**

A comprehensive React Native educational app designed to help students practice, test, and improve their knowledge through interactive quizzes, curated learning resources, and personalized study tools.

![React Native](https://img.shields.io/badge/React_Native-0.72.6-blue)
![Expo](https://img.shields.io/badge/Expo-49.0-000020)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

### 🎯 Core Features

- **Multi-Subject Learning** - Mathematics, Science, English, History, Geography, Programming
- **Grade-Specific Content** - Tailored content for Grades 1-12
- **Interactive Testing** - Multiple-choice quizzes with instant feedback
- **Flexible Timer** - Optional 10-minute countdown timer for tests
- **Answer Review** - Comprehensive review of correct and incorrect answers
- **Progress Tracking** - Monitor your learning journey with statistics

### 🚀 Enhanced Features

- **Motivational Quotes** - Rotating inspirational messages
- **Study Tips** - Daily tips to improve learning effectiveness
- **Search Functionality** - Find topics and resources quickly
- **Video Tutorials** - Embedded YouTube learning videos
- **Expandable Topics** - Organized, collapsible content sections
- **Real-Time Feedback** - Color-coded results and progress indicators

### 🎨 User Experience

- **Smooth Animations** - Fade-in effects and transitions
- **Intuitive Navigation** - Bottom tab + stack navigation
- **Responsive Design** - Works on all screen sizes
- **Modern UI** - Clean, professional interface
- **Offline Ready** - Local data storage with AsyncStorage

---

## 📱 Screenshots

### Welcome & Authentication

Beautiful welcome screen with app description → Secure login/signup flow

### Home Dashboard

Grade selection → Subject cards → Motivational quotes → Study statistics

### Interactive Testing

Pre-test setup → Live timer → Progress tracking → Detailed results

### Learning Resources

Searchable content → Video tutorials → External resources → Study tips

---

## 🏗️ Architecture

```
EduLearn/
├── App.js                    # Main app entry
├── app/
│   ├── navigation/          # Navigation setup
│   │   ├── AuthStack.js
│   │   ├── MainTab.js
│   │   └── RootNavigator.js
│   ├── screens/             # All app screens
│   │   ├── WelcomeScreen.js
│   │   ├── LoginScreen.js
│   │   ├── SignupScreen.js
│   │   ├── HomeScreen.js
│   │   ├── TakeTestScreen.js
│   │   ├── LearnMoreScreen.js
│   │   └── ProfileScreen.js
│   ├── components/          # Reusable components
│   │   ├── GradePicker.js
│   │   ├── MotivationalQuote.js
│   │   ├── SubjectCard.js
│   │   └── TestQuestionCard.js
│   ├── context/             # State management
│   │   └── AuthContext.js
│   ├── data/                # Sample data
│   │   └── sampleQuestions.js
│   └── services/            # External services
│       └── firebaseConfig.js
└── package.json
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/edulearn.git

# Navigate to project directory
cd EduLearnZA

# Install dependencies
npm install

# Start the development server
npm start
```

### Run on Device/Emulator

```bash
# Android
npm run android

# iOS (Mac only)
npm run ios

# Web browser
npm run web
```

---

## 📦 Dependencies

```json
{
  "expo": "~49.0.0",
  "react": "18.2.0",
  "react-native": "0.72.6",
  "@react-navigation/native": "^6.1.7",
  "@react-navigation/stack": "^6.3.17",
  "@react-navigation/bottom-tabs": "^6.5.8",
  "@react-native-picker/picker": "2.4.10",
  "@react-native-async-storage/async-storage": "1.18.2",
  "expo-image-picker": "~14.3.2",
  "firebase": "^10.7.1"
}
```

---

## 🎯 Usage Guide

### For Students

1. **Sign Up/Login**

   - Create an account or login
   - Your progress is automatically saved

2. **Select Your Grade**

   - Choose from Grades 1-12
   - Content adapts to your level

3. **Take Tests**

   - Pick a subject
   - Choose timer preference
   - Answer questions
   - Review your results

4. **Explore Resources**

   - Watch video tutorials
   - Read curated content
   - Visit external learning sites

5. **Track Progress**
   - View your statistics
   - Check achievements
   - Monitor improvement

### For Developers

See [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) for detailed technical documentation.

---

## 🎨 Customization

### Change Primary Color

Search and replace `#6200EE` with your brand color across all files.

### Add New Subjects

Edit `app/screens/HomeScreen.js`:

```javascript
const subjects = [
  { id: "7", name: "Art", icon: "🎨", color: "#E91E63" },
  // Add more subjects...
];
```

### Add More Questions

Edit `app/data/sampleQuestions.js`:

```javascript
{
  id: '31',
  subject: 'Mathematics',
  question: 'What is 2 + 2?',
  options: ['3', '4', '5', '6'],
  correctAnswer: '4',
  difficulty: 'Easy',
}
```

### Modify Timer Duration

In `app/screens/TakeTestScreen.js`:

```javascript
const [timeRemaining, setTimeRemaining] = useState(600); // 600 seconds = 10 minutes
```

---

## 🔥 Firebase Integration (Optional)

To enable cloud features:

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)

2. Update `app/services/firebaseConfig.js`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

3. Enable Authentication and Firestore in Firebase Console

4. Update `app/context/AuthContext.js` to use Firebase Auth

---

## 📊 Sample Data

### Included Content:

- **30 Questions** across 6 subjects
- **12 Video Tutorials** (YouTube links)
- **12 External Resources** (Educational websites)
- **6 Motivational Quotes**
- **6 Study Tips**

### Question Distribution:

| Subject     | Questions |
| ----------- | --------- |
| Mathematics | 5         |
| Science     | 5         |
| English     | 5         |
| History     | 5         |
| Geography   | 5         |
| Programming | 5         |

---

## 🧪 Testing

### Manual Testing Checklist:

- [ ] User can sign up and login
- [ ] Grade selection works
- [ ] Tests can be started and completed
- [ ] Timer counts down correctly
- [ ] Results display accurately
- [ ] Correct answers can be reviewed
- [ ] Search filters topics correctly
- [ ] Video links open properly
- [ ] Profile displays user info
- [ ] Logout works correctly

---

## 🐛 Known Issues & Solutions

### Issue: Picker not displaying

**Solution:** Ensure `@react-native-picker/picker` is installed

```bash
npm install @react-native-picker/picker
```

### Issue: Navigation errors

**Solution:** Clear cache and reinstall

```bash
npx expo start -c
```

### Issue: Firebase errors

**Solution:** Firebase is optional. App works with AsyncStorage by default.

---

## 🗺️ Roadmap

### v1.0 (Current)

- ✅ Core testing functionality
- ✅ Learning resources
- ✅ User authentication
- ✅ Progress tracking

### v2.0 (Planned)

- [ ] Real-time leaderboards
- [ ] Daily quiz challenges
- [ ] Push notifications
- [ ] Offline mode
- [ ] Advanced analytics
- [ ] Social features
- [ ] Achievement badges
- [ ] Parent/teacher dashboard

### v3.0 (Future)

- [ ] AI-powered recommendations
- [ ] Voice-enabled learning
- [ ] AR/VR experiments
- [ ] Live tutoring
- [ ] Collaborative learning
- [ ] Adaptive difficulty

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines:

- Follow existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test thoroughly before submitting
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Initial Development** - EduLearn Team
- **Enhancements** - Community Contributors

---

## 🙏 Acknowledgments

- React Native community for excellent documentation
- Expo team for making mobile development easier
- All contributors who helped improve this project
- Educational content providers (Khan Academy, NASA, etc.)

---

## 📞 Support

- **Documentation:** See [QUICK_START.md](./QUICK_START.md)
- **Technical Details:** See [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)
- **Issues:** Open an issue on GitHub
- **Email:** support@edulearn.com (placeholder)

---

## 🌟 Star History

If you find this project useful, please consider giving it a star! ⭐

---

## 📈 Project Stats

- **Lines of Code:** ~3,000+
- **Components:** 8 screens + 4 reusable components
- **Subjects:** 6 core subjects
- **Questions:** 30+ (expandable)
- **Learning Resources:** 24+ links/videos
- **Grade Levels:** 12 grades

---

## 🎓 Educational Impact

EduLearn aims to:

- Make learning accessible to all students
- Provide instant feedback for better understanding
- Encourage consistent study habits
- Track progress for motivated learning
- Offer diverse learning resources
- Build confidence through achievement

---

## 💡 Why EduLearn?

✅ **Free & Open Source** - No hidden costs  
✅ **Offline Capable** - Learn anywhere  
✅ **Multi-Subject** - Comprehensive coverage  
✅ **Grade-Adaptive** - Grows with students  
✅ **Engaging UI** - Makes learning fun  
✅ **Progress Tracking** - See improvement  
✅ **Rich Resources** - Videos + links  
✅ **Modern Tech** - Built with React Native

---

## 🚀 Get Started Now!

```bash
git clone https://github.com/yourusername/edulearn.git
cd EduLearnZA
npm install
npm start
```

**Happy Learning! 📚✨**

---

<p align="center">Made with ❤️ by the EduLearn Team</p>
<p align="center">© 2025 EduLearn. All rights reserved.</p>
