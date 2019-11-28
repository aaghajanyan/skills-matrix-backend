const express = require('express');
const {
    getRoleGroup,
    getRoleGroups
} = require('../controllers/roles-groups');

const router = express.Router();

router.get('/', getRoleGroups);
router.get('/:guid', getRoleGroup);

module.exports = router;