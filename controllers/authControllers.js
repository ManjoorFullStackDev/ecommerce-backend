const adminModel = require("../models/adminModel");
const { responseReturn } = require("../utils/response");
const bcrypt = require("bcrypt");
const { createToken } = require("../utils/tokenCreate");

class authControllers {
  admin_login = async (req, res) => {
    const { email, password } = req.body;
    console.log("body", req.body);
    try {
      const adminData = await adminModel.findOne({ email }).select("+password");
      console.log("adminData", adminData);
      if (adminData) {
        const match = await bcrypt.compare(password, adminData.password);
        console.log("match", match);
        if (match) {
          const token = await createToken({
            id: adminData.id,
            role: adminData.role,
          });
          res.cookie("access_token", token, {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 200, { token, message: "Login success" });
        } else {
          responseReturn(res, 404, { error: "Passwords Wrong" });
        }
      } else {
        responseReturn(res, 404, { error: "Email not found" });
      }
    } catch (error) {
      responseReturn(res, 500, error.message);
    }
  };
}

module.exports = new authControllers();