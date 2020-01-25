const debug = console.log.bind(console);
const mysql = require('mysql');
var config = require('../config/configDB');
const connectionDB = mysql.createConnection(config.databaseOptions);

/**
 * controller user
 */

// get information of user fron database
let getinfobyid = async (req, res) => {
    const idProduct = req.query.id;
    // get email from request after handle of authmiddleware
    let sql = ` SELECT Products.ProductID, Products.CategoryID, Products.ProductName, Products.ProductPrice,Products.Description,Products.ProductStatus,Products.CreateDate,Products.Quantity, COUNT(LikesOfProduct.UserEmail) AS NumberOfLike
                FROM Products
                JOIN LikesOfProduct
                ON Products.ProductID = LikesOfProduct.ProductID
                AND Products.ProductID = ?
                GROUP BY LikesOfProduct.ProductID`;
    let query = mysql.format(sql, [idProduct]);
    connectionDB.query(query , async (err, result) => {
        if (err) {
            // chua ton tai thi bao loi
            return res.status(200).json({success: false,message : err});
        }else{
            // Da ton tai thi tao ma token va gui ve client
            const arr = await Array.apply(null,result);
            if(arr.length===0){
                return res.status(200).json({success: false,message : "Product is not exist!"});
            }else{
                let sqlGetImage = `SELECT urlImage FROM ImagesOfProduct WHERE ProductID=?`;
                let queryGetImage = mysql.format(sqlGetImage, [idProduct]);
                connectionDB.query(queryGetImage , async (err, results) => {
                    if (err) {
                        // chua ton tai thi bao loi
                        return res.status(200).json({success: false,message : err});
                    }else{
                        // Da ton tai thi tao ma token va gui ve client
                        const arrayImage =  await Array.apply(null,results);
                        if(arrayImage.length===0){
                            return res.status(200).json({success: false,message : "Product is not exist!"});
                        }else{
                            return res.status(200).json({
                                success: true,
                                data : arr[0],
                                images : arrayImage
                            });
                        }
                    };
                });
            }
        };
    });
}

// Like product
let likeProduct = async (req, res) => {
    //Lay thong tin email
    const email = req.jwtDecoded.data.email;
    const idProduct = req.query.id;
    // get email from request after handle of authmiddleware
    let sql = `SELECT * FROM LikesOfProduct WHERE ProductID=? AND UserEmail=?`;
    let query = mysql.format(sql, [idProduct,email]);
    connectionDB.query(query , async (err, result) => {
        if (err) {
            // chua ton tai thi bao loi
            return res.status(200).json({success: false,message : err});
        }else{
            // Da ton tai thi tao ma token va gui ve client
            const arr = await Array.apply(null,result);
            if(arr.length===0){
                // Chua co thi like
                const empty = {
                    UserEmail: email, 
                    ProductID: idProduct,
                };
                // Luu vao Database
                connectionDB.query('INSERT INTO LikesOfProduct SET ? ',empty, (err, result) => {
                    if (err) {
                      return res.status(200).json({success: false,message : "ERROR!"});
                    }else{
                      return res.status(200).json({success: true,message : "Like is Success!"});
                    };
                });
            }else{
                // Co roi thi unlike
                let sqlGetImage = `DELETE FROM LikesOfProduct WHERE ProductID=? AND UserEmail=?`;
                let queryGetImage = mysql.format(sqlGetImage, [idProduct,email]);
                connectionDB.query(queryGetImage , async (err, results) => {
                    if (err) {
                        // chua ton tai thi bao loi
                        return res.status(200).json({success: false,message : err});
                    }else{
                        // Da ton tai thi tao ma token va gui ve client
                        return res.status(200).json({
                            success: true,
                            message : "UnLike is Success!",
                        });    
                    };
                });
            }
        };
    });
}

// Get Product By Category
let getProductsByCategory = async (req, res) => {
    //Get ID category
    const idCategory= req.query.idCategory;

    let sql = ` SELECT ProductsCate.ProductID,ProductsCate.ProductName,ProductsCate.ProductPrice,ProductsCate.ImageDetail,COUNT(LikesOfProduct.UserEmail) AS NumberOfLikes
                FROM LikesOfProduct
                JOIN (SELECT Products.ProductID,Products.ProductName,Products.ProductPrice,Products.ImageDetail 
                        FROM Products
                        JOIN Categories
                        ON Products.CategoryID=Categories.CategoryID 
                        AND Categories.CategoryID=?) ProductsCate
                ON ProductsCate.ProductID=LikesOfProduct.ProductID
                GROUP BY ProductsCate.ProductID`;
    let query = mysql.format(sql, [idCategory]);
    connectionDB.query(query , async (err, result) => {
        if (err) {
            return res.status(200).json({success: false,message : err});
        }else{
            //Lay ID day vao Database cho bang Product
            const arr = await Array.apply(null,result);
            if(arr.length===0){
                // Chua co thi like
                return res.status(200).json({
                    success: false,
                    message : "No Products!",
                });
            }else{
                return res.status(200).json({
                    success: true,
                    data: arr,
                });             
            }
        };
    });
}

// Like product
let addNewProduct = async (req, res) => {
    let sql = `SELECT Products.ProductID FROM Products`;
    let query = mysql.format(sql);
    connectionDB.query(query , async (err, result) => {
        if (err) {
            return res.status(200).json({success: false,message : err});
        }else{
            //Lay ID day vao Database cho bang Product
            const arr = await Array.apply(null,result);
            const idProduct = arr.length+1;
            //Luu vao database
            const empty = {
                ProductID: idProduct,
                CategoryID: req.body.CategoryID,
                ProductName: req.body.ProductName,
                ProductPrice: Number(req.body.ProductPrice),
                Description: req.body.Description,
                ProductStatus: req.body.ProductStatus,
                CreateDate: req.body.CreateDate,
                Quantity: req.body.Quantity,
            };
            // Luu vao Database
            connectionDB.query('INSERT INTO Products SET ? ',empty, (err, result) => {
                if (err) {
                    debug(err);
                  return res.status(200).json({success: false,message : "Add New Product is Unsuccess!"});
                }else{
                  return res.status(200).json({success: true,message : "Add New Product is Success!"});
                };
            });
        };
    });
}



module.exports = {
    getinfobyid: getinfobyid,
    likeProduct: likeProduct,
    addNewProduct: addNewProduct,
    getProductsByCategory: getProductsByCategory,
}