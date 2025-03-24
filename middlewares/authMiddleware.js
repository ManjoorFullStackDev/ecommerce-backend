const jwt = require("jsonwebtoken");

const roles = {
  admin: ["post", "put", "delete", "get"],
  user: ["get", "post"],
};

module.exports.authMiddleware = (action) => async (req, res, next) => {
  const { access_token } = req.cookies;
  console.log(`Request:${access_token}`);
  if (!access_token) {
    return res.status(409).json({
      error: "Please login first",
    });
  } else {
    try {
      const decodeToken = await jwt.decode(access_token,
        process.env.SECRET_KEY
      );
      req.role = decodeToken.role;
      req.id = decodeToken.id;
      console.log("action", action, req.role);
      if (action && !roles[req.role].includes(action)) {
        return res.status(403).json("permission denied ");
      }
      next();
    } catch (error) {
      return res.status(409).json({
        error: "Please login",
      });
    }
  }
};
