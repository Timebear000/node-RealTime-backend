const jwt = require("jsonwebtoken");

const generarJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
    };

    jwt.sign(
      payload,
      process.env.JWT_KEY,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) {
          //no create token,
          reject("No se pudo genrar el JWT");
        } else {
          //TOKEN :
          resolve(token);
        }
      }
    );
  });
};

const checkJWT = (token = "") => {
  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    return [true, uid];
  } catch (error) {
    return [false, null];
  }
};

module.exports = {
  generarJWT,
  checkJWT,
};
