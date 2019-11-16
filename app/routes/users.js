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
router.get("/:userId", getUser);
router.post("/", validateAddBody, signUp);
router.put("/:userId", validateUpdateBody, updateUser);
router.post('/login', validateLoginBody, login);
module.exports = router;
