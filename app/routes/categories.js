const express = require("express");
const {
    getCategories,
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory,
    getAll
} = require("../controllers/category");
const { validateAddBody, validateUpdateBody } = require("../validation/categories");

const router = express.Router();

router.get("/", getCategories);
router.get("/all", getAll);
router.get("/:categoryId", getCategory);
router.post("/", validateAddBody, addCategory);
router.put("/:categoryId", validateUpdateBody, updateCategory);
router.delete("/:categoryId", deleteCategory);

module.exports = router;
