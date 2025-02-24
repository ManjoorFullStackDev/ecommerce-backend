const jwt = require("jsonwebtoken");
module.exports.createToken = async (data) => {
    return await jwt.sign(data, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });
};
