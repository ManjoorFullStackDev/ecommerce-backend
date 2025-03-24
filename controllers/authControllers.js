const { responseReturn } = require("../utils/response");
const { createToken } = require("../utils/tokenCreate");
const bcrypt = require("bcrypt");
const adminModel = require("../models/adminModel");
const users = require("../models/users");
const locationModel = require("../models/location");
const skillsModel = require("../models/skills");
const registeredUserModel = require("../models/RegisteredUser");
class authControllers {
  admin_login = async (req, res) => {
    const { email, password } = req.body;
    console.log("body", req.body);
    try {
      const adminData = await registeredUserModel
        .findOne({ email })
        .select("+password");
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
            expires: new Date(Date.now() +   60 * 60 * 1000),
          });
          responseReturn(res, 200, { token, message: "Login success" });
        } else {
          responseReturn(res, 401, { error: "Passwords Wrong" });
        }
      } else {
        responseReturn(res, 404, { error: "Email not found" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  //End admin_login method

  registerUser = async (req, res) => {
    try {
      const { userName, email, password, role } = req.body;
      console.log("body", req.body);
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValidEmail = emailRegex.test(email);
      if (!isValidEmail) {
        responseReturn(res, 404, { error: "Email is invalid" });
      }
      console.log("role role", role);
      const saltedRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltedRounds);
      console.log("hashedPassword", hashedPassword);
      const newUser = await registeredUserModel.create({
        userName,
        email,
        password: hashedPassword,
        role: role,
      });
      responseReturn(res, 200, { newUser: newUser });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  getUser = async (req, res) => {
    const { id, role } = req;
    try {
      if (role === "admin") {
        const user = await adminModel.findById(id);
        responseReturn(res, 200, { userInfo: user });
      } else {
        console.log("Seller Info");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  // End getUser method

  postUser = async (req, res) => {
    try {
      const isUserExist = await users.findById(req.userId);
      if (!isUserExist) {
        let { skills, ...rest } = req.body;
        skills = skills.map((items) => items.value);
        const newUser = await users.create({ skills, ...rest });
        responseReturn(res, 200, { userInfo: newUser });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  getUserById = async (req, res) => {
    const { id } = req.params;
    try {
      const isUserExist = await users.findOne({ userId: id });
      if (isUserExist) {
        responseReturn(res, 200, { userInfo: isUserExist });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  getAllUsers = async (req, res) => {
    try {
      const allUserData = await users.find();
      responseReturn(res, 200, { userInfo: allUserData });
    } catch (error) {
      console.log(error.message);
    }
  };

  searchLocations = async (req, res) => {
    const { location } = req.params;
    try {
      const query = {
        $or: [
          { state: { $regex: location, $options: "i" } },
          { cities: { $in: [new RegExp(location, "i")] } },
        ],
      };

      // Fetch matching records
      const results = await locationModel
        .find(query)
        .select("cities state -_id");
      const formattedResults = [];
      results.forEach(({ state, cities }) => {
        if (state.toLowerCase().includes(location.toLowerCase())) {
          cities.forEach((city) =>
            formattedResults.push({ location: `${city}, ${state}` }),
          );
        } else {
          const matchedCities = cities.filter((city) =>
            city.toLowerCase().includes(location.toLowerCase()),
          );
          matchedCities.forEach((city) => {
            formattedResults.push({ location: `${city}, ${state}` });
          });
        }
      });

      responseReturn(res, 200, { LocationData: formattedResults });
    } catch (error) {
      responseReturn(res, 404, { error: "Failed to search locations" });
      console.log(error.message);
    }
  };

  getSkills = async (req, res) => {
    try {
      const skillsData = await skillsModel.find();
      const extractedSkills = skillsData.map(({ value }) => ({
        label: value,
        value,
      }));
      responseReturn(res, 200, { skillsInfo: extractedSkills });
    } catch (error) {
      responseReturn(res, 404, { error: "Failed to get skills" });
      console.log(error.message);
    }
  };

  deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      const isUserDeleted = await users.deleteOne({ userId: id });
      responseReturn(res, 200, { isUserDeleted: isUserDeleted });
    } catch (error) {
      responseReturn(res, 404, { error: "Failed to delete user" });
      console.log(error.message);
    }
  };

  updateUser = async (req, res) => {
    try {
      console.log(req.body);
      const isUserExist = await users.findOne({ userId: req.body.userId });
      console.log("isUserExist", isUserExist);
      if (isUserExist.userId === req.body.userId) {
        let { userId, skills, ...userData } = req.body;

        skills = skills.map((items) => items.value);
        console.log("skills", skills);
        const updatedUser = await users.updateOne(
          { userId }, // Filter
          { $set: { skills, ...userData } }, // Dynamically update only provided fields
        );
        console.log("updatedUser", updatedUser);
        responseReturn(res, 200, updatedUser);
      }
    } catch (error) {
      console.log(error.message);
      responseReturn(res, 404, { error: "Failed to update user" });
    }
  };
}
module.exports = new authControllers();
