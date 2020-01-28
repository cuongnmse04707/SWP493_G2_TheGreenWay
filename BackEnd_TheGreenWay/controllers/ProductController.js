const debug = console.log.bind(console);
const mysql = require('mysql');
var config = require('../config/configDB');
const connectionDB = mysql.createConnection(config.databaseOptions);

/**
 * controller user
 */

// get information of user fron database
let getinfobyid = async (req, res) => {
    const idProduct = req.query.idProduct;
    // get email from request after handle of authmiddleware
    let sql = ` SELECT Products.ProductID, Products.CategoryID, Products.ProductName, Products.ProductPrice,Products.Description,Products.ProductStatus,Products.CreateDate,Products.Quantity, Products.ImageDetail,COUNT(LikesOfProduct.UserEmail) AS NumberOfLike
                FROM Products
                JOIN LikesOfProduct
                ON Products.ProductID = LikesOfProduct.ProductID
                AND Products.ProductID = ?
                GROUP BY LikesOfProduct.ProductID`;
                debug(sql)
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
                            return res.status(200).json({
                                success: true,
                                data : arr[0],
                                images : "No Images"
                            });
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

// Like Product
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

// Search Product Nang cao search by Price, Category, Name
let searchProduct = async (req, res) => {
    //ProductsCate.ProductID,ProductsCate.ProductName,ProductsCate.ProductPrice,ProductsCate.ImageDetail
    const page = req.query.page;
    const pageSize = 6;
    const offset = (page-1)*pageSize;
    var stringSQL = "";
    // SQL Query to search Product
    const ProductName  = await req.body.ProductName;
    stringSQL = (ProductName) ? stringSQL+ ` AND Products.ProductName LIKE '%${ProductName}%'` : stringSQL+ "";
    const MaxPrice  = await req.body.MaxPrice;
    stringSQL = (MaxPrice) ? stringSQL+ ` AND Products.ProductPrice <= ${MaxPrice}` : stringSQL+ "";
    const MinPrice  = await req.body.MinPrice;
    stringSQL = (MinPrice) ? stringSQL+ ` AND Products.ProductPrice >= ${MinPrice}` : stringSQL+ "";
    const CategoryID  = await req.body.CategoryID;
    stringSQL = (CategoryID) ? stringSQL+ ` AND Products.CategoryID = ${CategoryID}` : stringSQL+ "";
    // SQL to run
    let sql = ` SELECT ProductsCate.ProductID,ProductsCate.ProductName,ProductsCate.ProductPrice,ProductsCate.ImageDetail,COUNT(LikesOfProduct.UserEmail) AS NumberOfLikes
                FROM (SELECT Products.ProductID,Products.ProductName,Products.ProductPrice,Products.ImageDetail 
                        FROM Products
                        JOIN Categories
                        ON Products.CategoryID=Categories.CategoryID 
                        ${stringSQL} ) ProductsCate
                LEFT JOIN LikesOfProduct
                ON ProductsCate.ProductID=LikesOfProduct.ProductID
                GROUP BY ProductsCate.ProductID
                LIMIT ?
                OFFSET ?`;
    let query = mysql.format(sql, [pageSize,offset]);
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
                // Chay Query de lay total page
                let sql = `SELECT COUNT(*) AS Total
                            FROM (SELECT Products.ProductID,Products.ProductName,Products.ProductPrice,Products.ImageDetail 
                                    FROM Products
                                    JOIN Categories
                                    ON Products.CategoryID=Categories.CategoryID 
                                    ${stringSQL} ) ProductsCate
                            LEFT JOIN LikesOfProduct
                            ON ProductsCate.ProductID=LikesOfProduct.ProductID`;
                let query = mysql.format(sql);
                connectionDB.query(query , async (err, results) => {
                    if (err) {
                        return res.status(200).json({success: false,message : err});
                    }else{
                        //Lay ID day vao Database cho bang Product
                        const array = await Array.apply(null,results); // chi dung de lay total
                        const totalPage = Math.ceil(array[0].Total/pageSize);
                        // //Luu vao database
                        return res.status(200).json({
                            success: true,
                            data: arr,
                            totalPage: totalPage, // Total page
                        }); 
                    };
                });
                            
            }
        };
    });

}

// Get Product By Category 1 page have 6 entry
let getProductsByCategory = async (req, res) => {
    //Get ID category
    const idCategory= req.query.idCategory;
    const page = req.query.page;
    const pageSize = 6;
    const offset = (page-1)*pageSize;
    let sql = ` SELECT ProductsCate.ProductID,ProductsCate.ProductName,ProductsCate.ProductPrice,ProductsCate.ImageDetail,COUNT(LikesOfProduct.UserEmail) AS NumberOfLikes
                FROM (SELECT Products.ProductID,Products.ProductName,Products.ProductPrice,Products.ImageDetail 
                        FROM Products
                        JOIN Categories
                        ON Products.CategoryID=Categories.CategoryID 
                        AND Categories.CategoryID=?) ProductsCate
                LEFT JOIN LikesOfProduct
                ON ProductsCate.ProductID=LikesOfProduct.ProductID
                GROUP BY ProductsCate.ProductID
                LIMIT ?
                OFFSET ?`;
    let query = mysql.format(sql, [idCategory,pageSize,offset]);
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
                let sql = `SELECT COUNT(*) AS Total
                            FROM (SELECT Products.ProductID,Products.ProductName,Products.ProductPrice,Products.ImageDetail 
                                    FROM Products
                                    JOIN Categories
                                    ON Products.CategoryID=Categories.CategoryID 
                                    AND Categories.CategoryID=?) ProductsCate
                            LEFT JOIN LikesOfProduct
                            ON ProductsCate.ProductID=LikesOfProduct.ProductID`;
                let query = mysql.format(sql,[idCategory]);
                connectionDB.query(query , async (err, results) => {
                    if (err) {
                        return res.status(200).json({success: false,message : err});
                    }else{
                        //Lay ID day vao Database cho bang Product
                        const array = await Array.apply(null,results);
                        const totalPage = Math.ceil(array[0].Total/pageSize);
                        // //Luu vao database
                        return res.status(200).json({
                            success: true,
                            data: arr,
                            totalPage: totalPage, // Total page
                        }); 
                    };
                });
                            
            }
        };
    });
}

// Get List All Product 1 page have 6 entry
let getProducts = async (req, res) => {
    //Get ID category
    const page = req.query.page;
    const pageSize = 6;
    const offset = (page-1)*pageSize;
    let sql = ` SELECT Products.ProductID,Products.ProductName,Products.ProductPrice,Products.ImageDetail,COUNT(LikesOfProduct.UserEmail) AS NumberOfLikes
                FROM Products
                LEFT JOIN LikesOfProduct
                ON Products.ProductID=LikesOfProduct.ProductID
                GROUP BY Products.ProductID
                LIMIT ?
                OFFSET ?`;
    let query = mysql.format(sql, [pageSize,offset]);
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
                let sql = `SELECT COUNT(*) AS Total FROM Products`;
                let query = mysql.format(sql);
                connectionDB.query(query , async (err, results) => {
                    if (err) {
                        return res.status(200).json({success: false,message : err});
                    }else{
                        //Lay ID day vao Database cho bang Product
                        const array = await Array.apply(null,results);
                        const totalPage = Math.ceil(array[0].Total/pageSize);
                        // //Luu vao database
                        return res.status(200).json({
                            success: true,
                            data: arr,
                            totalPage: totalPage, // Total page
                        }); 
                    };
                });
                            
            }
        };
    });
}

// Add new product
let addNewProduct = async (req, res) => {
    let sql = `SELECT MAX(Products.ProductID) AS IDProduct FROM Products`;
    let query = mysql.format(sql);
    connectionDB.query(query , async (err, result) => {
        if (err) {
            return res.status(200).json({success: false,message : err});
        }else{
            //Lay ID day vao Database cho bang Product
            const arr = await Array.apply(null,result);
            const idProduct = arr[0].IDProduct+1;
            // //Luu vao database
            const QuantityProduct= req.body.Quantity;
            // Check ProductStatus
            const ProductStatus = (QuantityProduct>0) ? "Còn Hàng" : "Hết Hàng";
            
            const empty = {
                ProductID: idProduct,
                CategoryID: req.body.CategoryID,
                ProductName: req.body.ProductName,
                ProductPrice: Number(req.body.ProductPrice),
                Description: req.body.Description,
                ProductStatus: ProductStatus,
                CreateDate: req.body.CreateDate,
                Quantity: QuantityProduct,
                ImageDetail: req.body.ImageDetail,
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

// Update Product ProductStatus Se follow theo Quantity
let updateProduct = async (req, res) => {
    //Get ID Product
    const idProduct = req.query.idProduct;
    //Get Information Product
    const CategoryID= req.body.CategoryID;
    const ProductName= req.body.ProductName;
    const ProductPrice= Number(req.body.ProductPrice);
    const Description= req.body.Description;
    const CreateDate= req.body.CreateDate;
    const Quantity= Number(req.body.Quantity);
    const ImageDetail= req.body.ImageDetail;
    //Check const ProductStatus= req.body.ProductStatus;
    const ProductStatus = (Quantity>0) ? "Còn Hàng" : "Hết Hàng";
    //Update Product
    let sql = `UPDATE Products 
                SET CategoryID=?,ProductName=?,ProductPrice=?,Description=?,ProductStatus=?,CreateDate=?,Quantity=?,ImageDetail=? 
                WHERE Products.ProductID=?`;
    let query = mysql.format(sql, [CategoryID,ProductName,ProductPrice,Description,ProductStatus,CreateDate,Quantity,ImageDetail,idProduct]);
    connectionDB.query(query , async (err, result) => {
        if (err) {
            return res.status(200).json({success: false,message : "Update Product Failed!"});
        }else{
            return res.status(200).json({success: true,message : "Update Product Success!"});
        };
    });
}

//update Quatity Product
// Validate ben fontend
let updateQuatityProduct = async (req, res) => {
    //Get ID Product
    const idProduct = req.query.idProduct;
    //Get Information Product
    const newQuantity= Number(req.body.Quantity);
 
    let sql = `SELECT Products.Quantity FROM Products WHERE Products.ProductID=?`;
    let query = mysql.format(sql, [idProduct]);
    connectionDB.query(query , async (err, result) => {
        if (err) {
            return res.status(200).json({success: false,message : "Update Quatity Product Failed!"});
        }else{
            //Lay ID day vao Database cho bang Product
            const arr = await Array.apply(null,result);
            if(arr.length===0){
                // Chua co thi like
                return res.status(200).json({
                    success: false,
                    message : "No Exits Products !",
                });
            }else{
                const oldQuatity = Number(arr[0].Quantity);
                if((oldQuatity - newQuantity) > 0){
                    // Mua trong khoang quatity
                    const quatity = oldQuatity - newQuantity;
                    let sqlUpdate = `UPDATE Products SET Quantity=? WHERE Products.ProductID=?`;
                    let queryUpdate = mysql.format(sqlUpdate, [quatity,idProduct]);
                    connectionDB.query(queryUpdate , async (err, result) => {
                        if (err) {
                            return res.status(200).json({success: false,message : "Update Quatity Product Failed!"});
                        }else{
                            return res.status(200).json({success: true,message : "Update Quatity Product Success!"});
                        };
                    });
                }else{
                    // Mua cai het luon
                    // Chi ton tai truong hop 0 thoi vi ben fontend da validate so luong roi
                    let sqlUpdate = `UPDATE Products SET Quantity=0,ProductStatus="Hết Hàng" WHERE Products.ProductID=?`;
                    let queryUpdate = mysql.format(sqlUpdate, [idProduct]);
                    connectionDB.query(queryUpdate , async (err, result) => {
                        if (err) {
                            return res.status(200).json({success: false,message : "Update Quatity Product Failed!"});
                        }else{
                            return res.status(200).json({success: true,message : "Update Quatity Product Success!"});
                        };
                    });
                }         
            }
        };
    });
}

// Add new image ADD tung cai len mot
let addNewImageProduct = async (req, res) => {
    //Get ID Products
    const idProduct= req.query.idProduct;
    const urlImage = req.body.urlImage;
    //Convert listImage to array
    const empty = {
        ProductID: idProduct,
        urlImage: urlImage,
    };
    // Luu vao Database
    connectionDB.query('INSERT INTO ImagesOfProduct SET ? ',empty, (err, result) => {
        if (err) {
            debug(err);
          return res.status(200).json({success: false,message : "Add New Image is Unsuccess!"});
        }else{
          return res.status(200).json({success: true,message : "Add New Image is Success!"});
        };
    });       
}

//remove Image by ID 
let removeImageProduct = async (req, res) => {
    //Get ID Products
    const idImage = req.query.idImage;
    //Delete Images 
    let sql = `DELETE FROM ImagesOfProduct WHERE ImagesOfProduct.ImageID=?`;
    let query = mysql.format(sql, [idImage]);
    connectionDB.query(query , async (err, result) => {
        if (err) {
            return res.status(200).json({success: false,message : "Remove Image Failed!"});
        }else{
            return res.status(200).json({success: true,message : "Remove Image Success!"});
        };
    });      
}

module.exports = {
    getinfobyid: getinfobyid,
    searchProduct: searchProduct,
    likeProduct: likeProduct,
    addNewProduct: addNewProduct,
    getProductsByCategory: getProductsByCategory,
    getProducts: getProducts,
    addNewImageProduct: addNewImageProduct,
    removeImageProduct:removeImageProduct,
    updateProduct:updateProduct,
    updateQuatityProduct:updateQuatityProduct,
}