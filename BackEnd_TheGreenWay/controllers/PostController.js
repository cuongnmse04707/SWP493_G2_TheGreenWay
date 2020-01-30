const debug = console.log.bind(console);
const mysql = require('mysql');
var config = require('../config/configDB');
const connectionDB = mysql.createConnection(config.databaseOptions);

/**
 * controller Post
 */

// get information of user fron database
let getpostbyid = async (req, res) => {
    const idPost = req.query.idPost;
    // get email from request after handle of authmiddleware
    let sql = ` SELECT * FROM( SELECT Posts.PostID,Posts.ModEmail,Posts.Title,Posts.Content,Posts.CreateDate,Posts.UpdateDate,COUNT(LikesOfPost.UserEmail) AS NumberOfLike
                FROM Posts
                LEFT JOIN LikesOfPost
                ON Posts.PostID = LikesOfPost.PostID
                GROUP BY LikesOfPost.PostID) GetPost 
                WHERE GetPost.PostID = ?`;
    let query = mysql.format(sql, [idPost]);
    connectionDB.query(query , async (err, result) => {
        if (err) {
            // chua ton tai thi bao loi
            return res.status(200).json({success: false,message : err});
        }else{
            // Da ton tai thi tao ma token va gui ve client
            const arr = await Array.apply(null,result);
            if(arr.length===0){
                return res.status(200).json({success: false,message : "Post is not exist!"});
            }else{
                let sqlGetImage = `SELECT urlImage FROM ImagesOfPost WHERE ImagesOfPost.PostID=?`;
                let queryGetImage = mysql.format(sqlGetImage, [idPost]);
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

// Add new post
let addnewpost = async (req, res) => {
    const email = req.jwtDecoded.data.email;

    let sql = `SELECT MAX(Posts.PostID) AS IDPost FROM Posts`;
    let query = mysql.format(sql);
    connectionDB.query(query , async (err, result) => {
        if (err) {
            return res.status(200).json({success: false,message : err});
        }else{
            //Lay ID day vao Database cho bang Product
            const arr = await Array.apply(null,result);
            const idPost = Number(arr[0].IDPost)+1; // Vi IDProduct là NVARCHAR
            // //Luu vao database
            const ImageDetail = (req.body.ImageDetail) ? req.body.ImageDetail : "https://firebasestorage.googleapis.com/v0/b/demoweb-2d974.appspot.com/o/images%2Fmaxresdefault.jpg?alt=media&token=2aa6af8d-44a0-43fc-bdaa-73f38bd006dd" ;
            
            const empty = {
                PostID: idPost,
                ModEmail : email,
                Title: req.body.Title,
                Content: req.body.Content,
                CreateDate: req.body.CreateDate,
                UpdateDate: req.body.UpdateDate,
                ImageDetail: ImageDetail,
            };
            // Luu vao Database
            connectionDB.query('INSERT INTO Posts SET ? ',empty, (err, result) => {
                if (err) {
                    debug(err);
                  return res.status(200).json({success: false,message : "Add New Post is Unsuccess!"});
                }else{
                  return res.status(200).json({success: true,message : "Add New Post is Success!"});
                };
            });
        };
    });
}

// Add new image ADD tung cai len mot
let addNewImagePost = async (req, res) => {
    //Get ID Products
    const idPost= req.query.idPost;
    const urlImage = req.body.urlImage;
    //Convert listImage to array
    const empty = {
        PostID: idPost,
        urlImage: urlImage,
    };
    // Luu vao Database
    connectionDB.query('INSERT INTO ImagesOfPost SET ? ',empty, (err, result) => {
        if (err) {
            debug(err);
          return res.status(200).json({success: false,message : "Add New Image is Unsuccess!"});
        }else{
          return res.status(200).json({success: true,message : "Add New Image is Success!"});
        };
    });       
}

//remove Image by ID 
let removeImagePost = async (req, res) => {
    //Get ID Products
    const idImage = req.query.idImage;
    //Delete Images 
    let sql = `DELETE FROM ImagesOfPost WHERE ImagesOfPost.ImageID=?`;
    let query = mysql.format(sql, [idImage]);
    connectionDB.query(query , async (err, result) => {
        if (err) {
            return res.status(200).json({success: false,message : "Remove Image Failed!"});
        }else{
            return res.status(200).json({success: true,message : "Remove Image Success!"});
        };
    });      
}

// Update Post
let updatePost = async (req, res) => {
    //Get ID Post
    const idPost = req.query.idPost;
    //Get Information Post
    const Title= req.body.Title;
    const Content= req.body.Content;
    const CreateDate= req.body.CreateDate;
    const UpdateDate= req.body.UpdateDate;
    const ImageDetail = (req.body.ImageDetail) ? req.body.ImageDetail : "https://firebasestorage.googleapis.com/v0/b/demoweb-2d974.appspot.com/o/images%2Fmaxresdefault.jpg?alt=media&token=2aa6af8d-44a0-43fc-bdaa-73f38bd006dd" ;
    //Update Post
    let sql = `UPDATE Posts 
                SET Title=?,Content=?,CreateDate=?,UpdateDate=?,ImageDetail=?
                WHERE Posts.PostID=?`;
    let query = mysql.format(sql, [Title,Content,CreateDate,UpdateDate,ImageDetail,idPost]);
    connectionDB.query(query , async (err, result) => {
        if (err) {
            return res.status(200).json({success: false,message : "Update Post Failed!"});
        }else{
            return res.status(200).json({success: true,message : "Update Post Success!"});
        };
    });
}

//Delete Post
let deletePost = async (req, res) => {
    //Get ID Post
    const idPost = req.query.idPost;
    //Delete Post 
    let sql = `DELETE FROM Posts WHERE Posts.PostID=?`;
    let query = mysql.format(sql, [idPost]);
    connectionDB.query(query , async (err, result) => {
        if (err) {
            return res.status(200).json({success: false,message : "Remove Post Failed!"});
        }else{
            return res.status(200).json({success: true,message : "Remove Post Success!"});
        };
    });      
}

//like Post
let likePost = async (req, res) => {
    //Lay thong tin email
    const email = req.jwtDecoded.data.email;
    const idPost = req.query.idPost;
    // get email from request after handle of authmiddleware
    let sql = `SELECT * FROM LikesOfPost WHERE PostID=? AND UserEmail=?`;
    let query = mysql.format(sql, [idPost,email]);
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
                    PostID: idPost,
                };
                // Luu vao Database
                connectionDB.query('INSERT INTO LikesOfPost SET ? ',empty, (err, result) => {
                    if (err) {
                      return res.status(200).json({success: false,message : "ERROR!"});
                    }else{
                      return res.status(200).json({success: true,message : "Like is Success!"});
                    };
                });
            }else{
                // Co roi thi unlike
                let sqlGetImage = `DELETE FROM LikesOfPost WHERE PostID=? AND UserEmail=?`;
                let queryGetImage = mysql.format(sqlGetImage, [idPost,email]);
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
 
// Get List All Post 1 page have 6 entry. Sort theo ngay moi nhat -> ngay cu nhat
let getListPost = async (req, res) => {
    //Get ID category
    const page = req.query.page;
    const pageSize = 6;
    const offset = (page-1)*pageSize;
    let sql = ` SELECT * FROM 
                (SELECT Posts.PostID,Posts.Title,Posts.CreateDate,Posts.UpdateDate,Posts.ImageDetail,COUNT(LikesOfPost.UserEmail) AS NumberOfLikes
                FROM Posts
                LEFT JOIN LikesOfPost
                ON Posts.PostID=LikesOfPost.PostID
                GROUP BY Posts.PostID
                LIMIT ?
                OFFSET ? ) PostList
                GROUP BY PostList.UpdateDate DESC`;
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
                    message : "No Post !",
                });
            }else{
                let sql = `SELECT COUNT(*) AS Total FROM Posts`;
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

//full text search Post
let fulltextsearchPost = async (req, res) => {
    //ProductsCate.ProductID,ProductsCate.ProductName,ProductsCate.ProductPrice,ProductsCate.ImageDetail
    const page = req.query.page;
    const pageSize = 6;
    const offset = (page-1)*pageSize;
    var stringSQL = req.body.fulltextsearch;
    // SQL Query to search Product
    // SQL to run
    let sql = ` SELECT * FROM Posts WHERE 
                MATCH(Title) AGAINST('${stringSQL}' IN NATURAL LANGUAGE MODE) 
                OR 
                MATCH(Content) AGAINST('${stringSQL}' IN NATURAL LANGUAGE MODE)
                LIMIT ?
                OFFSET ?`;
    let query = mysql.format(sql,[pageSize,offset]);
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
                    message : "No Post!",
                });
            }else{
                // Chay Query de lay total page
                let sqlTotal = `SELECT COUNT(*) AS Total FROM Posts WHERE 
                                MATCH(Title) AGAINST('${stringSQL}' IN NATURAL LANGUAGE MODE) 
                                OR 
                                MATCH(Content) AGAINST('${stringSQL}' IN NATURAL LANGUAGE MODE)`;
                let queryTotal = mysql.format(sqlTotal);
                connectionDB.query(queryTotal , async (err, results) => {
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
                            resultsize: array[0].Total,
                            totalPage: totalPage, // Total page
                        }); 
                    };
                });
                            
            }
        };
    });
}

module.exports = {
    getpostbyid: getpostbyid,
    addnewpost: addnewpost,
    addNewImagePost: addNewImagePost,
    removeImagePost: removeImagePost,
    updatePost: updatePost,
    deletePost: deletePost,
    likePost: likePost,
    getListPost: getListPost,
    fulltextsearchPost: fulltextsearchPost,
}