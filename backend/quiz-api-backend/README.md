# Dynamic Quiz API Backend

This project is a dynamic quiz API backend built with Node.js and MongoDB. It allows users to manage subjects, categories, topics, and questions for quizzes.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Models](#models)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd quiz-api-backend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGODB_URI=<your_mongodb_connection_string>
   ```

## Usage

To start the server, run:
```
npm start
```

The server will run on `http://localhost:3000`.

## API Endpoints

- **Subjects**
  - `GET /api/subjects` - Retrieve all subjects
  - `POST /api/subjects` - Create a new subject
  - `GET /api/subjects/:id` - Retrieve a subject by ID
  - `PUT /api/subjects/:id` - Update a subject by ID
  - `DELETE /api/subjects/:id` - Delete a subject by ID

- **Categories**
  - `GET /api/categories` - Retrieve all categories
  - `POST /api/categories` - Create a new category
  - `GET /api/categories/:id` - Retrieve a category by ID
  - `PUT /api/categories/:id` - Update a category by ID
  - `DELETE /api/categories/:id` - Delete a category by ID

- **Topics**
  - `GET /api/topics` - Retrieve all topics
  - `POST /api/topics` - Create a new topic
  - `GET /api/topics/:id` - Retrieve a topic by ID
  - `PUT /api/topics/:id` - Update a topic by ID
  - `DELETE /api/topics/:id` - Delete a topic by ID

- **Questions**
  - `GET /api/questions` - Retrieve all questions
  - `POST /api/questions` - Create a new question
  - `GET /api/questions/:id` - Retrieve a question by ID
  - `PUT /api/questions/:id` - Update a question by ID
  - `DELETE /api/questions/:id` - Delete a question by ID

## Models

The project uses the following Mongoose models:
- **Subject**: Represents a subject with properties like name and description.
- **Category**: Represents a category with properties like name and a reference to the subject.
- **Topic**: Represents a topic with properties like name, a reference to the category, and an array of questions.
- **Question**: Represents a question with properties like text, options, correct answer, and a reference to the topic.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.