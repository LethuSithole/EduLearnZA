# Past Exam Papers Feature Documentation

## 📝 Overview

The Learn More tab now includes a comprehensive **Past Exam Papers** section where students can access previous exam papers organized by subject and grade level.

---

## ✨ Features Implemented

### 1. **Subject-Based Organization**

Past exam papers are organized by 5 core subjects:

- 🔢 **Mathematics** (Grades 8-12)
- 🔬 **Science** (Physical Sciences, Life Sciences, Natural Sciences - Grades 8-12)
- 📖 **English** (Language & Literature - Grades 8-12)
- 🏛️ **History** (Grades 10-12)
- 🌍 **Geography** (Grades 10-12)

### 2. **Grade-Specific Filtering**

- Select your grade using the GradePicker
- Only relevant exam papers for your grade appear
- Blue info banner confirms: "📋 Grade [X] Papers Available"
- Papers automatically filtered by grade level

### 3. **Detailed Paper Information**

Each exam paper displays:

- **Paper Type**: Paper 1, Paper 2, Final Exam, etc.
- **Grade Level**: Which grade the paper is for
- **Term**: June, November, etc.
- **Year**: 2024 (current papers)
- **Download Icon**: 📥 Orange circular button

### 4. **Expandable Interface**

- **Collapsed View**: Shows subject, icon, and paper count
  - Example: "🔢 Mathematics - 3 papers available"
- **Expanded View**: Shows full list of available papers
- Tap subject header to expand/collapse
- ▶ arrow indicates collapsed, ▼ indicates expanded

### 5. **Interactive Paper Access**

- **Tap any paper** to view details
- **Alert Dialog** appears with:
  - Paper title
  - Grade, Term, and Year
  - Confirmation message
  - "Open Paper" button (opens in browser)
  - "Cancel" option
- Links to official education resources

### 6. **Smart Empty States**

When no papers are available:

- **With Grade Selected**: "No exam papers available for Grade [X] yet."
- **Without Grade**: "Select a grade to view available exam papers."
- Hint: "Exam papers are available for Grades 8-12"
- Warm orange theme with 📚 book icon

---

## 🗂️ Data Structure

### Exam Paper Object

```javascript
{
  id: "1",
  subject: "Mathematics",
  icon: "🔢",
  grades: ["8", "9", "10", "11", "12"],
  papers: [
    {
      grade: "12",
      year: "2024",
      term: "November",
      paper: "Paper 1",
      url: "https://www.education.gov.za/..."
    },
    // ... more papers
  ]
}
```

### Available Papers Count

| Subject     | Grades | Papers per Grade | Total Papers  |
| ----------- | ------ | ---------------- | ------------- |
| Mathematics | 8-12   | 1-2              | 6 papers      |
| Science     | 8-12   | 1-2              | 6 papers      |
| English     | 8-12   | 1-2              | 6 papers      |
| History     | 10-12  | 1-2              | 4 papers      |
| Geography   | 10-12  | 1-2              | 4 papers      |
| **TOTAL**   | -      | -                | **26 papers** |

---

## 🎯 User Experience Flow

### Scenario 1: Grade 12 Student Looking for Math Papers

1. User opens **Learn More** tab
2. User scrolls to **Grade Picker**
3. **Selects "Grade 12"**
4. Green banner appears: "📚 Showing Grade 12 materials"
5. Scrolls down to **"📝 Past Exam Papers"** section
6. Blue banner: "📋 Grade 12 Papers Available"
7. Sees **Mathematics** card: "🔢 Mathematics - 2 papers available"
8. **Taps Mathematics** card → Expands
9. Sees:
   - "Paper 1 - Grade 12 • November 2024" with 📥 button
   - "Paper 2 - Grade 12 • November 2024" with 📥 button
10. **Taps "Paper 1"**
11. Alert dialog appears:

    ```
    Paper 1
    Grade 12 - November 2024

    This will open the exam paper in your browser.
    ```

12. **Taps "Open Paper"**
13. Browser opens with exam paper PDF ✅

### Scenario 2: Grade 9 Student Browsing Available Subjects

1. User selects **"Grade 9"** from picker
2. Scrolls to exam papers section
3. Sees **3 subjects** available:
   - Mathematics (1 paper)
   - Science (1 paper)
   - English (1 paper)
4. **History and Geography** don't appear (only for Grades 10-12)
5. Expands **Science** card
6. Sees: "Natural Sciences - Grade 9 • June 2024"
7. Taps to download ✅

### Scenario 3: User Without Grade Selected

1. User doesn't select a grade
2. Scrolls to exam papers section
3. Sees **empty state card**:
   ```
   📚
   Select a grade to view available exam papers.
   Exam papers are available for Grades 8-12
   ```
4. Scrolls back up to select grade ✅

---

## 🎨 Design Details

### Color Scheme

| Element            | Color                  | Usage           |
| ------------------ | ---------------------- | --------------- |
| Subject Cards      | White (#fff)           | Background      |
| Border             | Light Gray (#e0e0e0)   | Card borders    |
| Paper Items        | Light Gray (#F5F5F5)   | Background      |
| Paper Border       | Orange (#FF9800)       | Left accent     |
| Download Button    | Orange (#FF9800)       | Circular button |
| Grade Info Banner  | Light Blue (#E3F2FD)   | Background      |
| Grade Info Border  | Blue (#2196F3)         | Left accent     |
| Empty State        | Light Orange (#FFF3E0) | Background      |
| Empty State Border | Orange (#FFB74D)       | Border          |

### Typography

| Element       | Font Size | Weight          | Color |
| ------------- | --------- | --------------- | ----- |
| Section Title | 24px      | Bold            | #333  |
| Subtitle      | 16px      | Normal          | #666  |
| Subject Title | 19px      | Bold            | #333  |
| Paper Count   | 13px      | Normal (Italic) | #666  |
| Paper Title   | 16px      | 600             | #333  |
| Paper Details | 14px      | Normal          | #666  |

### Spacing & Layout

- **Card Margin**: 15px bottom
- **Card Padding**: 15px
- **Border Radius**: 12px (cards), 8px (papers)
- **Left Border**: 3px (papers), 4px (banners)
- **Download Button**: 45x45px circle
- **Icon Size**: 32px (subjects), 24px (download)

---

## 🔧 Technical Implementation

### State Management

```javascript
const [expandedExamSubjects, setExpandedExamSubjects] = useState({});

const toggleExamSubject = (subjectId) => {
  setExpandedExamSubjects((prev) => ({
    ...prev,
    [subjectId]: !prev[subjectId],
  }));
};
```

### Filtering Logic

```javascript
const filteredExamPapers = examPapers
  .filter((subject) => {
    // Filter by grade
    if (selectedGrade && !subject.grades.includes(selectedGrade)) {
      return false;
    }
    // Filter by search
    if (!searchQuery) return true;
    return subject.subject.toLowerCase().includes(searchQuery.toLowerCase());
  })
  .map((subject) => {
    // Filter papers by grade
    if (!selectedGrade) return subject;
    return {
      ...subject,
      papers: subject.papers.filter((paper) => paper.grade === selectedGrade),
    };
  })
  .filter((subject) => subject.papers.length > 0);
```

### Paper Interaction Handler

```javascript
const handleExamPaperPress = (paper) => {
  Alert.alert(
    `${paper.paper}`,
    `Grade ${paper.grade} - ${paper.term} ${paper.year}\n\nThis will open the exam paper in your browser.`,
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Open Paper",
        onPress: () => handleResourcePress(paper.url),
      },
    ]
  );
};
```

---

## 📱 Component Structure

```jsx
<View style={styles.examPapersHeader}>
  <Text style={styles.examPapersTitle}>📝 Past Exam Papers</Text>
  <Text style={styles.examPapersSubtitle}>Practice with real exam papers</Text>
  {selectedGrade && (
    <View style={styles.examGradeInfo}>
      <Text>📋 Grade {selectedGrade} Papers Available</Text>
    </View>
  )}
</View>;

{
  filteredExamPapers.map((subject) => (
    <View key={subject.id} style={styles.examSubjectCard}>
      <TouchableOpacity onPress={() => toggleExamSubject(subject.id)}>
        <View>
          <Text>
            {subject.icon} {subject.subject}
          </Text>
          <Text>{subject.papers.length} papers available</Text>
        </View>
      </TouchableOpacity>

      {expandedExamSubjects[subject.id] && (
        <View>
          {subject.papers.map((paper) => (
            <TouchableOpacity onPress={() => handleExamPaperPress(paper)}>
              <Text>{paper.paper}</Text>
              <Text>
                Grade {paper.grade} • {paper.term} {paper.year}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  ));
}
```

---

## 🧪 Testing Checklist

### Basic Functionality

- [ ] Section appears in Learn More tab
- [ ] Title "📝 Past Exam Papers" displays correctly
- [ ] Subtitle explains purpose
- [ ] Grade picker filters papers correctly

### Grade Selection Tests

- [ ] Select Grade 8 → See Math, Science, English papers
- [ ] Select Grade 12 → See all 5 subjects with multiple papers
- [ ] Select Grade 10 → See all subjects (first year with History/Geography)
- [ ] No grade selected → See empty state message

### Interaction Tests

- [ ] Tap subject card → Expands to show papers
- [ ] Tap expanded subject → Collapses papers
- [ ] Arrow icon changes: ▶ (collapsed) ↔ ▼ (expanded)
- [ ] Tap paper → Alert dialog appears
- [ ] Tap "Open Paper" → Browser opens (or app navigator)
- [ ] Tap "Cancel" → Dialog closes, stays on page

### Visual Tests

- [ ] Blue grade info banner appears when grade selected
- [ ] Orange download buttons visible
- [ ] Paper items have orange left border
- [ ] Empty state shows 📚 icon
- [ ] Cards have proper shadows/elevation
- [ ] Text is readable and properly sized

### Integration Tests

- [ ] Search works with exam papers (searches subject names)
- [ ] Grade picker affects both learning resources AND exam papers
- [ ] Expanding subjects doesn't affect other sections
- [ ] Scroll performance is smooth with all content

### Edge Cases

- [ ] Rapidly expand/collapse subjects (no lag)
- [ ] Select grade with no papers → Empty state shows
- [ ] Search for non-existent subject → No results shown
- [ ] Multiple subjects expanded simultaneously (works fine)

---

## 💡 Future Enhancements

### Phase 1: Enhanced Content

1. **More Papers**: Add papers from 2023, 2022, 2021
2. **Memorandums**: Include answer sheets/mark schemes
3. **More Subjects**: Add Accounting, Business Studies, IT
4. **Lower Grades**: Add papers for Grades 4-7 (if available)

### Phase 2: Advanced Features

1. **Download Progress**: Show download progress bar
2. **Offline Access**: Cache papers for offline viewing
3. **Favorites**: Save frequently used papers
4. **Recently Viewed**: Track recently opened papers
5. **Paper Preview**: Show first page preview before download

### Phase 3: Study Tools

1. **Study Timer**: Time yourself while practicing
2. **Progress Tracking**: Mark papers as "completed"
3. **Notes**: Add notes to specific papers
4. **Peer Sharing**: Share papers with classmates
5. **Teacher Mode**: Teachers can assign specific papers

### Phase 4: Analytics

1. **Usage Stats**: Track most downloaded papers
2. **Completion Rate**: See % of papers completed
3. **Performance Insights**: Track scores on practice papers
4. **Recommendations**: Suggest papers based on weak areas

---

## 🔗 External Links

Currently linking to South African Department of Education:

- **URL**: `https://www.education.gov.za/Curriculum/NationalSeniorCertificate(NSC)Examinations/NSCPastExaminationpapers.aspx`

### Alternative Sources (can be added):

- **IEB Papers**: Independent Examinations Board
- **Provincial Papers**: Western Cape, Gauteng, KZN, etc.
- **International Papers**: Cambridge IGCSE, IB
- **Practice Papers**: Teacher-created resources

---

## 🚀 Quick Start Guide

### For Students:

**To Find Your Grade's Papers:**

1. Open **Learn More** tab
2. Select your grade from picker
3. Scroll to "📝 Past Exam Papers"
4. Tap any subject to expand
5. Tap paper to open/download

**To Search for Specific Subject:**

1. Use search bar at top
2. Type subject name (e.g., "Mathematics")
3. Exam papers section auto-filters
4. Only matching subjects appear

### For Developers:

**To Add New Papers:**

1. Edit `examPapers` array in `LearnMoreScreen.js`
2. Add new paper object:

```javascript
{
  grade: "11",
  year: "2023",
  term: "November",
  paper: "Paper 1",
  url: "https://example.com/paper.pdf"
}
```

3. Save file → Hot reload applies changes

**To Add New Subject:**

1. Add new object to `examPapers` array:

```javascript
{
  id: "6",
  subject: "Accounting",
  icon: "💰",
  grades: ["10", "11", "12"],
  papers: [...]
}
```

---

## 📊 Feature Summary

### ✅ Completed Features

✅ Subject-based organization (5 subjects)  
✅ Grade-specific filtering (Grades 8-12)  
✅ Expandable/collapsible subject cards  
✅ 26 total exam papers included  
✅ Paper details (grade, term, year, type)  
✅ Interactive download buttons  
✅ Alert dialog confirmation  
✅ Browser integration for opening papers  
✅ Empty state handling  
✅ Blue grade info banner  
✅ Search integration  
✅ Responsive UI design  
✅ Orange accent theme

### 📈 Impact

- **Better Exam Preparation**: Students can practice with real papers
- **Grade-Appropriate Content**: Only relevant papers shown
- **Easy Access**: One tap to open/download
- **Organized Learning**: Clear structure by subject
- **User-Friendly**: Intuitive expand/collapse interface

---

## 🎓 Educational Value

### For Students:

- **Exam Familiarity**: Get used to exam format and structure
- **Time Management**: Practice completing papers within time limits
- **Topic Coverage**: Identify important topics and question types
- **Confidence Building**: Reduce exam anxiety through practice
- **Self-Assessment**: Gauge readiness for upcoming exams

### For Teachers:

- **Resource Sharing**: Easy way to share past papers
- **Homework Assignment**: Can assign specific papers to complete
- **Progress Monitoring**: See which papers students access
- **Standardization**: Use official past papers for consistency

---

## 📝 Notes

- All papers link to official government education portal
- URLs can be updated to point to specific PDF files
- Papers are organized chronologically (most recent first)
- Grade filtering is strict (exact match required)
- Subject expansion state is maintained during scrolling
- Download icon is purely visual (actual download handled by browser)

---

_Feature Added: November 11, 2025_  
_Location: Learn More Tab_  
_Component: LearnMoreScreen.js_
