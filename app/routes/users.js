const express = require("express");
const {
    getUsers,
    getUser,
    signUp,
    updateUser,
    login
} = require("../controllers/user");
const { validateAddBody, validateUpdateBody, validateLoginBody } = require("../validation/users");

const router = express.Router();

router.get("/", getUsers);
router.get("/:guid", getUser);
router.put("/:guid", validateUpdateBody, updateUser);
router.post("/", validateAddBody, signUp);
router.post('/login', validateLoginBody, login);
module.exports = router;