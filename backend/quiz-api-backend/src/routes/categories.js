const express = require("express");
const router = express.Router();
const {
  getCategoriesBySubject,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

// Route to create a new category
router.post("/", createCategory);

// Route to get all categories
router.get("/", getCategoriesBySubject);

// Route to get a category by ID
router.get("/:id", getCategory);

// Route to update a category by ID
router.put("/:id", updateCategory);

// Route to delete a category by ID
router.delete("/:id", deleteCategory);

module.exports = router;
