const express = require("express");
const {
    getCategoriesRelations,
    getCategoryRelation,
    addCategoryRelation,
    updateCategoryRelation,
    deleteCategoryRelation
} = require("../controllers/category-relation");
const { validateAddBody, validateUpdateBody } = require("../validation/categories-relations");

const router = express.Router();

router.get("/", getCategoriesRelations);
router.get("/:categoryRelationId", getCategoryRelation);
router.post("/", validateAddBody, addCategoryRelation);
router.put("/:categoryRelationId", validateUpdateBody, updateCategoryRelation);
router.delete("/:categoryRelationId", deleteCategoryRelation);

module.exports = router;
