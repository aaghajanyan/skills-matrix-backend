const express = require("express");
const users = require("./users");
const invitations = require("./invitations");
const categories = require("./categories");
const categoriesRelations = require("./categories-relations");
const skills = require("./skills");
const skillsRelations = require("./skills-relations");

const router = express.Router();
router.use("/users", users);
router.use("/invitations", invitations);
router.use("/categories", categories);
router.use("/categories-relations", categoriesRelations);
router.use("/skills", skills);
router.use("/skills-relations", skillsRelations);

module.exports = router;
