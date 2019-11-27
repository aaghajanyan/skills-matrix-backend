const express = require("express");
const {
    getCategories,
    getCategory,
    addCategory,
    updateCategory,
    updateCategoryAllData,
    deleteCategory,
    getCategoriesAllData,
    getCategoryAllData

} = require("../controllers/category");
const { validateAddBody, validateUpdateBody } = require("../validation/categories");

const router = express.Router();

const verifyToken = require('../validation/token');

router.get("/", getCategories);
router.get("/all", getCategoriesAllData);
router.get("/all/:categoryId", getCategoryAllData);

router.get("/:categoryId", getCategory);
router.post("/", verifyToken, validateAddBody, addCategory);
router.put("/:categoryId", validateUpdateBody, updateCategory);
router.put("/all/:categoryId", validateUpdateBody, updateCategoryAllData);
router.delete("/:categoryId", deleteCategory);

module.exports = router;
