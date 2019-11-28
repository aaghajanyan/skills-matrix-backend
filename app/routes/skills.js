const express = require("express");
const {
    getSkills,
    getSkill,
    getSkillAllData,
    getSkillsAllData,
    addSkill,
    updateSkill,
    updateSkillAllData,
    deleteSkill
} = require("../controllers/skill");
const { validateAddBody, validateUpdateBody } = require("../validation/skills");

const router = express.Router();

router.get("/", getSkills);
router.get("/all", getSkillsAllData);
router.get("/:guid", getSkill);
router.get("/all/:guid", getSkillAllData);

router.post("/", validateAddBody, addSkill);

router.put("/:guid", validateUpdateBody, updateSkill);
router.put("/all/:guid", validateUpdateBody, updateSkillAllData);
router.delete("/:guid", deleteSkill);

module.exports = router;
