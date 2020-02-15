const debug = console.log.bind(console);
const mysql = require('mysql');
var config = require('../config/configDB');
const connectionDB = mysql.createConnection(config.databaseOptions);

/**
 * controller user
 */

// get information of user fron database
let information = async(req, res) => {
    // get email from request after handle of authmiddleware
    const email = req.jwtDecoded.data.email;
    //Lay thong tin tu database
    let sql = `SELECT * FROM Accounts WHERE email=?`;
    let query = mysql.format(sql, [email]);
    connectionDB.query(query, async(err, result) => {
        if (err) {
            // chua ton tai thi bao loi
            return res.status(200).json({ success: false, message: err });
        } else {
            // Da ton tai thi tao ma token va gui ve client
            const arr = Array.apply(null, result);
            if (arr.length === 0) {
                return res.status(200).json({ success: false, message: "Email or Password is not exist!" });
            } else {
                try {
                    return res.status(200).json({
                        success: true,
                        data: arr[0]
                    });
                } catch (error) {
                    return res.status(200).json({
                        success: false,
                        message: error
                    });
                }
            }
        };
    });
}

// save data of user to database not avatar
let saveinformation = async(req, res) => {
    // get email from request after handle of authmiddleware
    const email = req.jwtDecoded.data.email;
    const username = req.body.username;
    const phone = req.body.phone;
    const DOB = req.body.DOB;
    const address = req.body.address;
    const city = req.body.city;
    const country = req.body.country;
    // const urlAvatar = "https://firebasestorage.googleapis.com/v0/b/demoweb-2d974.appspot.com/o/images%2Fuser-roles-wordpress.png?alt=media&token=35187642-eb12-4c2c-a415-abd60485112c"; // req.body.role
    //Luu thong tin tu database
    let sql = `UPDATE Accounts SET username=?,phone=?,DOB=?,address=?,city=?,country=? WHERE email=?`;
    let query = mysql.format(sql, [username, phone, DOB, address, city, country, email]);
    connectionDB.query(query, async(err, result) => {
        if (err) {
            return res.status(200).json({ success: false, message: "Save Information Of User Is Failed!" });
        } else {
            return res.status(200).json({ success: true, message: "Save Information Of User Is Success!" });
        };
    })
}

// change avatar of user to database
let changeavatar = async(req, res) => {
    // get email from request after handle of authmiddleware
    const email = req.jwtDecoded.data.email;
    const urlAvatar = req.body.urlAvatar;
    //Luu thong tin tu database
    let sql = `UPDATE Accounts SET urlAvatar=? WHERE email=?`;
    let query = mysql.format(sql, [urlAvatar, email]);
    connectionDB.query(query, async(err, result) => {
        if (err) {
            return res.status(200).json({ success: false, message: "Save Avatar Of User Is Failed!" });
        } else {
            return res.status(200).json({ success: true, message: "Save Avatar Of User Is Success!" });
        };
    })
}

// change password of user
let changepassword = async(req, res) => {
    // get email from request after handle of authmiddleware
    const email = req.jwtDecoded.data.email;
    const oldpassword = req.body.oldpassword;
    const newpassword = req.body.newpassword;
    //Luu thong tin tu database
    //Lay thong tin tu database
    let sql = `SELECT email,password FROM Accounts WHERE email=?`;
    let query = mysql.format(sql, [email]);
    connectionDB.query(query, async(err, result) => {
        if (err) {
            // chua ton tai thi bao loi
            return res.status(200).json({ success: false, message: err });
        } else {
            // Da ton tai thi tao ma token va gui ve client
            const arr = Array.apply(null, result);
            if (arr.length === 0) {
                return res.status(200).json({ success: false, message: "Email or Password is not exist!" });
            } else {
                // Neu co email
                if (oldpassword === arr[0].password) {
                    let sqlChange = `UPDATE Accounts SET password=? WHERE email=?`;
                    let queryChange = mysql.format(sqlChange, [newpassword, email]);
                    connectionDB.query(queryChange, async(err, result) => {
                        if (err) {
                            return res.status(200).json({ success: false, message: "Change Password Of User Is Failed!" });
                        } else {
                            return res.status(200).json({ success: true, message: "Change Password Of User Is Success!" });
                        };
                    })
                } else {
                    return res.status(200).json({ success: false, message: "Old Password is not exist!" });
                }
            }
        };
    });
}


module.exports = {
    information: information,
    saveinformation: saveinformation,
    changeavatar: changeavatar,
    changepassword: changepassword,
}