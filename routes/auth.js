/*
  path: api/login

*/

const { Router } = require("express");
const { createUser, login, renewToken } = require("../controllers/auth");
const { check } = require("express-validator");
const { validation } = require("../middleware/validation");
const { validationJWT } = require("../middleware/validationjwt");
const router = Router();

router.post(
  "/new",
  [
    check("name", "사용자 이름은 필수 입니다.").not().isEmpty(),
    check("email", "사용자 이메일은 필수이며 형식에 맞아야합니다.").isEmail(),
    check("password", "사용자 패스워드는 필수 입니다.").not().isEmpty(),
  ],
  validation,
  createUser
);

//post : /
// validar email , password
router.post(
  "/",
  [
    check("email", "사용자 이메일은 필수이며 형식에 맞아야합니다.").isEmail(),
    check("password", "사용자 패스워드는 필수 입니다.").not().isEmpty(),
  ],
  validation,
  login
);

router.get("/renew", validationJWT, renewToken);
module.exports = router;
