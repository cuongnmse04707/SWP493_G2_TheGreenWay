const jwtHelper = require("../helpers/jwt.helper");
const debug = console.log.bind(console);
const mysql = require('mysql');
var config = require('../config/configDB');
const nodemailer = require('nodemailer');
var connectionDB = mysql.createConnection(config.databaseOptions);

// Biến cục bộ trên server này sẽ lưu trữ tạm danh sách token
// Trong dự án thực tế, nên lưu chỗ khác, có thể lưu vào Redis hoặc DB // luu de con refresherToken
// let tokenList = {};
// Thời gian sống của token
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-cuongnm";
// Regex email, password
const emailRegex =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/;

/**
 * controller login
 */
let register = async (req, res) => {
  try {
    // get email,password
    const email = req.body.email;
    const password = req.body.password;

    // validate email
    if(!emailRegex.test(email)){

        res.status(400).json({
            success: false,
            message: 'Invalid email adress',
        });
    }else if(!passwordRegex.test(password)){ // validate password
        res.status(400).json({
            success: false,
            message: 'Invalid password',
        });
    }else{
      // check email exist
      const userData = {
        email: req.body.email,
        password: req.body.email,
      };

      res.status(200).json({
        success: true,
      });
    }
  }catch(error){
      res.status(500).json({
          success: false,
          message: error.message,
      });
  }
}

let login = async (req, res) => {
  // connectionDB.connect((err)=>{
  //   let sql = `SELECT email, password FROM User WHERE email=? AND password=?`;

  //   let query = mysql.format(sql, [req.body.email,req.body.password]);
  //   connectionDB.query(query, async (error, results, fields) => {
  //     if (error) {
  //       return res.status(500).json({success: false,error});
  //     }else{
        //   const arr = Array.apply(null,results);
        // if(arr.length===0){
        //   return res.status(500).json({success: false,message : "Email or Password not exist!"});
        // }else{
          try {
            const userData = {
              email: req.body.email,
              password: req.body.email,
            };

            debug(`Thực hiện tạo mã Token, [thời gian sống 1 giờ.]`);
            const accessToken = await jwtHelper.generateToken(userData, accessTokenSecret, accessTokenLife);

            debug(`Gửi Token và Refresh Token về cho client...`);
            return res.status(200).json({
              success: true,
              accessToken
            });
          } catch (error) {
            return res.status(500).json({
              success: false,
              message: error
            });
          }
        // }
  //     };
  //   });
  // });
}

let forgotpassword = async (req, res) => {
  try {
    // check email exist
    const userData = {
      email: req.body.email,
    };
    //checkdatabase

    const accessToken = await jwtHelper.generateToken(userData, accessTokenSecret, accessTokenLife);
      // if (user === null) {
      //   console.error('email not in database');
      //   res.status(403).send('email not in db');
      // } else {
        const token = "123456";

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: `nguyencuong.3061997@gmail.com`,
            pass: `manhcuong@vickyrius1997`,
          },
        });

        const mailOptions = {
          from: 'nguyencuong.3061997@gmail.com',
          to: `${req.body.email}`,
          subject: 'Link To Reset Password',
          text:
            'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
            + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
            + `http://localhost:3000/forgot?${accessToken}?${req.body.email}\n\n`
            + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
        };

        console.log('sending mail');

        transporter.sendMail(mailOptions, (err, response) => {
          if (err) {
            console.error('there was an error: ', err);
          } else {
            console.log('here is the res: ', response);
            res.status(200).json({
              success: true,
              message: 'Recovery email sent'
            });
          }
        });
      // }
  }catch(error){
      res.status(500).json({
          success: false,
          message: error.message,
      });
  }
}

module.exports = {
  login: login,
  register: register,
  forgotpassword: forgotpassword,
}