/*
  path: api/users

*/

const { Router } = require("express");
const { getUsers } = require("../controllers/users");
const { check } = require("express-validator");
const { validation } = require("../middleware/validation");
const { validationJWT } = require("../middleware/validationjwt");
const router = Router();

router.get("/", validationJWT, getUsers);
module.exports = router;
