const express = require("express");
const {
    getSkillsRelations,
    getSkillRelation,
    addSkillRelation,
    updateSkillRelation,
    deleteSkillRelation
} = require("../controllers/skill-relation");
const { validateAddBody, validateUpdateBody } = require("../validation/skills-relations");

const router = express.Router();

router.get("/", getSkillsRelations);
router.get("/:skillRelationId", getSkillRelation);
router.post("/", validateAddBody, addSkillRelation);
router.put("/:skillRelationId", validateUpdateBody, updateSkillRelation);
router.delete("/:skillRelationId", deleteSkillRelation);

module.exports = router;
