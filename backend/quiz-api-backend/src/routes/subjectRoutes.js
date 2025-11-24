const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');

// Route to create a new subject
router.post('/', subjectController.createSubject);

// Route to get all subjects
router.get('/', subjectController.getAllSubjects);

// Route to get a subject by ID
router.get('/:id', subjectController.getSubjectById);

// Route to update a subject by ID
router.put('/:id', subjectController.updateSubject);

// Route to delete a subject by ID
router.delete('/:id', subjectController.deleteSubject);

module.exports = router;