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
router.get("/:skillId", getSkill);
router.get("/all/:skillId", getSkillAllData);

router.post("/", validateAddBody, addSkill);

router.put("/:skillId", validateUpdateBody, updateSkill);
router.put("/all/:skillId", validateUpdateBody, updateSkillAllData);
router.delete("/:skillId", deleteSkill);

module.exports = router;
