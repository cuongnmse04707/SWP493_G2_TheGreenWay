const jwtHelper = require("../helpers/jwt.helper");
const debug = console.log.bind(console);
const mysql = require("mysql");
var config = require("../config/configDB");
const nodemailer = require("nodemailer");
const connectionDB = mysql.createConnection(config.databaseOptions);
var moment = require("moment-timezone");
// Biến cục bộ trên server này sẽ lưu trữ tạm danh sách token
// Trong dự án thực tế, nên lưu chỗ khác, có thể lưu vào Redis hoặc DB // luu de con refresherToken
// let tokenList = {};
// Thời gian sống của token
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "10h";
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const accessTokenSecret =
  process.env.ACCESS_TOKEN_SECRET || "access-token-secret-cuongnm";
// Regex email, password
const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/;

/**
 * controller login
 */
let register = async (req, res) => {
  debug(req.body);
  // get email,password
  //const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  // validate email
  if (!emailRegex.test(email)) {
    res.status(200).json({
      success: false,
      message: "Invalid email adress"
    });
  } else if (!passwordRegex.test(password)) {
    // validate password
    res.status(200).json({
      success: false,
      message: "Invalid password"
    });
    return;
  }
  // Tao new empty
  const empty = {
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    roles: "user",
    urlAvatar:
      "https://firebasestorage.googleapis.com/v0/b/demoweb-2d974.appspot.com/o/images%2Fuser-roles-wordpress.png?alt=media&token=35187642-eb12-4c2c-a415-abd60485112c"
  };
  // Luu vao Database
  connectionDB.query("INSERT INTO Accounts SET ?  ", empty, (err, result) => {
    if (err) {
      return res
        .status(200)
        .json({ success: false, message: "Email is exist!" });
    } else {
      return res
        .status(200)
        .json({ success: true, message: "Register is Success" });
    }
  });
};

let login = async (req, res) => {
  // check email da ton tai chua
  let sql = `SELECT email, password, roles FROM Accounts WHERE email=? AND password=?`;
  let query = mysql.format(sql, [req.body.email, req.body.password]);
  connectionDB.query(query, async (err, result) => {
    if (err) {
      // chua ton tai thi bao loi
      return res.status(200).json({ success: false, message: err });
    } else {
      // Da ton tai thi tao ma token va gui ve client
      const arr = Array.apply(null, result);
      if (arr.length === 0) {
        return res
          .status(200)
          .json({ success: false, message: "Email or Password is not exist!" });
      } else {
        try {
          const userData = {
            email: arr[0].email,
            roles: arr[0].roles
          };
          debug(`Thực hiện tạo mã Token, [thời gian sống 1 giờ.]`);
          const accessToken = await jwtHelper.generateToken(
            userData,
            accessTokenSecret,
            accessTokenLife
          );
          debug(`Gửi Token và Refresh Token về cho client...`);
          return res.status(200).json({
            success: true,
            accessToken
          });
        } catch (error) {
          return res.status(200).json({
            success: false,
            message: error
          });
        }
      }
    }
  });
};

let forgotpassword = async (req, res) => {
  //check email in database
  let sql = `SELECT email, password FROM Accounts WHERE email=?`;
  let query = mysql.format(sql, [req.body.email]);
  connectionDB.query(query, async (err, result) => {
    if (err) {
      // Bao loi trong qua trinh thuc hien query
      return res.status(200).json({ success: false, message: err });
    } else {
      const arr = Array.apply(null, result);
      if (arr.length === 0) {
        // Chua ton tai Email
        return res
          .status(200)
          .json({ success: false, message: "Email is not exist!" });
      } else {
        // Da ton tai email thi cho tao ma token
        try {
          // tao ma token forgotPassword
          const userData = {
            email: req.body.email
          };
          const accessToken = await jwtHelper.generateToken(
            userData,
            accessTokenSecret,
            accessTokenLife
          );
          //Tao transporter
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: `nguyencuong.3061997@gmail.com`,
              pass: `manhcuong@vickyrius1997`
            }
          });
          // tao mailOptions
          const mailOptions = {
            from: "nguyencuong.3061997@gmail.com",
            to: `${req.body.email}`,
            subject: "Link To Reset Password",
            text:
              "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
              "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
              `http://localhost:3000/forgot?${accessToken}?${req.body.email}\n\n` +
              "If you did not request this, please ignore this email and your password will remain unchanged.\n"
          };
          // Thao tac Update/Luu vao userToken table
          // Kiem tra email da co trong bang userToken chua
          let sqlForgot = `SELECT email, token FROM AccountsToken WHERE email=?`;
          let queryForgot = mysql.format(sqlForgot, [req.body.email]);
          connectionDB.query(queryForgot, async (err, resultForgot) => {
            if (err) {
              return res.status(200).json({ success: false, message: err });
            } else {
              // check xem da co email trong bang userToken chua
              const arrForgot = Array.apply(null, resultForgot);
              if (arrForgot.length === 0) {
                // Chua co thi tao 1 cai moi
                const empty = { email: req.body.email, token: accessToken };
                connectionDB.query(
                  "INSERT INTO AccountsToken SET ?  ",
                  empty,
                  (err, result) => {
                    if (err) {
                      return res.status(200).json({
                        success: false,
                        message: "Save DB userToken is Faild"
                      });
                    } else {
                    }
                  }
                );
              } else {
                // Da co email trong bang userToken thi update
                let sqlForgot = `UPDATE AccountsToken SET token=? WHERE email=?`;
                let queryForgot = mysql.format(sqlForgot, [
                  accessToken,
                  req.body.email
                ]);
                connectionDB.query(queryForgot, async (err, resultForgot) => {
                  if (err) {
                    return res.status(200).json({
                      success: false,
                      message: "Update DB userToken is Faild"
                    });
                  } else {
                  }
                });
              }
            }
          });
          // Gui email cho nguoi quen mat khau
          transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
              return res.status(200).json({
                success: false,
                message: err
              });
            } else {
              return res.status(200).json({
                success: true,
                message: `We'll send instructions to this email if it's associated with a account.`
              });
            }
          });
        } catch (error) {
          res.status(200).json({
            success: false,
            message: error
          });
        }
      }
    }
  });
};

let resetPassword = async (req, res) => {
  // check email da ton tai chua
  let sql = `SELECT email, token FROM AccountsToken WHERE email=? AND token=?`;
  let query = mysql.format(sql, [req.body.email, req.body.token]);
  connectionDB.query(query, async (err, result) => {
    if (err) {
      // chua ton tai thi bao loi
      return res.status(200).json({ success: false, message: err });
    } else {
      // Da ton tai thi tao ma token va gui ve client
      const arr = Array.apply(null, result);
      if (arr.length === 0) {
        // Khong ton tai email can resetPassword
        return res.status(200).json({
          success: false,
          message: "Account don't need to reset password"
        });
      } else {
        // thuc hien ResetPassword
        let sqlForgot = `UPDATE Accounts SET password=? WHERE email=?`;
        let queryForgot = mysql.format(sqlForgot, [
          req.body.password,
          req.body.email
        ]);
        connectionDB.query(queryForgot, async (err, resultForgot) => {
          if (err) {
            return res
              .status(200)
              .json({ success: false, message: "Reset Password Faild!" });
          } else {
            //Sau khi update password thi xoa bo luon. Tranh truong hop gui bang postman
            let sqlReset = `DELETE FROM AccountsToken WHERE email=?`;
            let queryReset = mysql.format(sqlReset, [req.body.email]);
            connectionDB.query(queryReset, async (err, resultForgot) => {
              if (err) {
                return res.status(200).json({
                  success: false,
                  message: "Error with reset password"
                });
              } else {
                return res
                  .status(200)
                  .json({ success: true, message: "Reset Password Success!" });
              }
            });
          }
        });
      }
    }
  });
};

module.exports = {
  login: login,
  register: register,
  forgotpassword: forgotpassword,
  resetPassword: resetPassword
};
