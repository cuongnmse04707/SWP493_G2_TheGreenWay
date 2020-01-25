const express = require('express');
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const ModMiddleware = require("../middlewares/ModMiddleware"); 

let productRouter = (server) => {
    // List Don't Need Protect APIs:
    router.get("/getinfobyid", ProductController.getinfobyid);
    router.get("/getProductsByCategory", ProductController.getProductsByCategory);
    // Check Token User
    router.use(AuthMiddleware.isAuth); 
    // List Protect APIs:
    router.post("/likeProduct", ProductController.likeProduct);

    // Check Token MOD
    router.use(ModMiddleware.isAuth); 
    // List Protect APIs:
    router.post("/addNewProduct", ProductController.addNewProduct);
    return server.use("/product",router);
  }
  
module.exports = productRouter;