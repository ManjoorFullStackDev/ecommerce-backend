const jwt = require("jsonwebtoken");

module.exports.authMiddleware = async (req, res, next) => {
  const { access_token } = req.cookies;
  if (!access_token) {
    return res.status(409).json({
      error: "Please login first",
    });
  } else {
    try {
      const decodeToken = await jwt.verify(
        access_token,
        process.env.SECRET_KEY,
      );
      req.role = decodeToken.role;
      req.id = decodeToken.id;
      next();
    } catch (error) {
      return res.status(409).json({
        error: "Please login",
      });
    }
  }
};
