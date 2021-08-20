const User = require("../models/User");
const bcrypt = require("bcrypt");
const email = require("../Email/sendEmail");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");

//REGISTER A NEW USER
const registerUser = async (req, res) => {
  const { username, email, password, isAdmin } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    const userByEmailExist = await User.findOne({
      email,
    });
    const userByUserNameExist = await User.findOne({
      username,
    });
    if (userByEmailExist) {
      res.status(404).json({ message: "User with this email already exist" });
    } else if (userByUserNameExist) {
      res
        .status(404)
        .json({ message: "User with this username already exist" });
    } else {
      const user = new User({
        password: hashPassword,
        username: username,
        email: email,
        isAdmin: isAdmin,
      });
      const newUser = await user.save();
      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    });
    !user && res.status(404).json({ message: "User not found" });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(400).json({ message: "Email or Password is invalid" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const searchUserAccount = async (req, res) => {
  try {
    const userByEmail = await User.findOne({
      email: req.body.phoneOrEmail,
    });
    if (userByEmail) {
      userByEmail.searchType = "email";
      res.status(200).json(userByEmail);
    } else if (!userByEmail) {
      const userByPhone = await User.findOne({
        phone: req.body.phoneOrEmail,
      });
      if (userByPhone) {
        userByPhone.searchType = "phone";
        res.status(200).json(userByPhone);
      } else {
        res.status(404).json({ message: "Account not found" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//update user account
const createPasswordResetCode = async (req, res) => {
  try {
    let resetToken = await crypto.randomInt(0, 1000000);
    const verificationCode = resetToken.toString().padStart(6, "0");
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { regCode: verificationCode },
      { new: true }
    );
    if (updatedUser) {
      if (req.params.searchType === "email") {
        updatedUser.searchType = "email";
        sgMail.setApiKey(process.env.SENDGRID_API);
        const msg = {
          to: updatedUser.email,
          from: "admin@adopt-village.co.za",
          subject: `${updatedUser.regCode} is your Facebook account recovery code`,
          text: "and easy to do anywhere, even with Node.js",
          html: `
          <h1 style = color:#1877f2;font-weight:800; font-size:30px>Facebook</h1>
          <hr>
          <p>Hi ${updatedUser.username} , </p>
          <p>We received a request to reset your Facebook password.<br>
          Enter the following password reset code:</p>

          <div style="color :black;height:20px;width :150px ;font-size: 20px;background: #e7f3ff;border-radius: 7px;text-align: center;padding: 14px 32px 14px 32px ;border: 1px solid #1877f2;">${updatedUser.regCode}
          </div><br>
          Alternatively, you can directly change your password.<br><br>
          <button style = "width :250px; border-radius: 6px; text-align: center;
          border: none;background: #1877f2; padding: 6px 20px 10px 20px; color :#fff"><a style = "color: #fff; text-decoration: none;" href = "${process.env.EMAIL_URL}/${updatedUser._id}"> Change Password</a></button>
          <h4>Didn't request this change?</h4>
          <p>If you didn't request a new password &nbsp;<a href = "facebook.com">let us know.</a> </p>
          `,
        };
        sgMail
          .send(msg)
          .then(() => {
            console.log("Email sent");
          })
          .catch((error) => {
            console.error(error);
          });
      } else if (req.params.searchType === "phone") {
        updatedUser.searchType = "phone";
      }
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//update user account
const createNewPassword = async (req, res) => {
  try {
    if (req.body.newPassword) {
      const salt = await bcrypt.genSalt(10);
      req.body.newPassword = await bcrypt.hash(req.body.newPassword, salt);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.body.userId,
      { password: req.body.newPassword },
      { new: true }
    );
    if (!updatedUser) {
      res.status(404).json({ message: "Account not found" });
    }
    res.status(200).json({ message: "Account has been updated" });
  } catch (error) {
    res.status(500).json(error);
  }
};

const verifyCode = async (req, res) => {
  try {
    const { userId, reg_Code } = req.body;
    const user = await User.findById(userId);
    console.log(user.regCode, reg_Code);
    if (user) {
      if (user.regCode === reg_Code) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "Security code is invalid" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  searchUserAccount,
  createPasswordResetCode,
  createNewPassword,
  verifyCode,
};
