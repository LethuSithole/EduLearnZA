const { body, validationResult } = require('express-validator');

const validateSubject = [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').optional().isString().withMessage('Description must be a string'),
];

const validateCategory = [
    body('name').notEmpty().withMessage('Name is required'),
    body('subjectId').notEmpty().withMessage('Subject ID is required'),
];

const validateTopic = [
    body('name').notEmpty().withMessage('Name is required'),
    body('categoryId').notEmpty().withMessage('Category ID is required'),
];

const validateQuestion = [
    body('text').notEmpty().withMessage('Question text is required'),
    body('options').isArray().withMessage('Options must be an array'),
    body('correctAnswer').notEmpty().withMessage('Correct answer is required'),
    body('topicId').notEmpty().withMessage('Topic ID is required'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateSubject,
    validateCategory,
    validateTopic,
    validateQuestion,
    validate,
};