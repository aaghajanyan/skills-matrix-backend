const express = require("express");
const {
    getSkills,
    getSkill,
    addSkill,
    updateSkill,
    deleteSkill
} = require("../controllers/skill");
const { validateAddBody, validateUpdateBody } = require("../validation/skills");

const router = express.Router();

router.get("/", getSkills);
router.get("/:skillId", getSkill);
router.post("/", validateAddBody, addSkill);

router.put("/:skillId", validateUpdateBody, updateSkill);
router.delete("/:skillId", deleteSkill);

module.exports = router;
