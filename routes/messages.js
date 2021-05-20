/*
  path: api/messages

*/

const { Router } = require("express");
const { check } = require("express-validator");
const { getChat } = require("../controllers/messages");
const { validation } = require("../middleware/validation");
const { validationJWT } = require("../middleware/validationjwt");
const router = Router();

router.get("/:from", validationJWT, getChat);
module.exports = router;
