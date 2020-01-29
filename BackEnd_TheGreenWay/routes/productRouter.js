const express = require('express');
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const ModMiddleware = require("../middlewares/ModMiddleware"); 

let productRouter = (server) => {
    // List Don't Need Protect APIs:
    router.get("/getinfobyid", ProductController.getinfobyid);
    router.get("/getProductsByCategory", ProductController.getProductsByCategory);
    router.get("/getProducts", ProductController.getProducts);
    router.get("/fulltextsearchProduct",ProductController.fulltextsearchProduct);
    router.get("/searchProduct",ProductController.searchProduct);
    router.get("/getinfosearchProduct",ProductController.getinfosearchProduct);
    // Check Token User
    router.use(AuthMiddleware.isAuth); 
    // List Protect APIs:
    router.post("/likeProduct", ProductController.likeProduct);
    // Check Token MOD
    router.use(ModMiddleware.isAuth); 
    // List Protect APIs:
    router.post("/addNewProduct", ProductController.addNewProduct);
    router.put("/updateProduct", ProductController.updateProduct);
    router.post("/addNewImageProduct", ProductController.addNewImageProduct);
    router.delete("/removeImageProduct", ProductController.removeImageProduct);
    router.put("/updateQuatityProduct", ProductController.updateQuatityProduct);
    return server.use("/product",router);
  }
  
module.exports = productRouter;