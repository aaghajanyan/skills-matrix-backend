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

const { verifyLoginToken } = require('../validation/token');

router.get("/", getCategories);
router.get("/all", getCategoriesAllData);
router.get("/all/:guid", getCategoryAllData);

router.get("/:guid", getCategory);
router.post("/", verifyLoginToken, validateAddBody, addCategory);
router.put("/:guid", validateUpdateBody, updateCategory);
router.put("/all/:guid", validateUpdateBody, updateCategoryAllData);
router.delete("/:guid", deleteCategory);

module.exports = router;
