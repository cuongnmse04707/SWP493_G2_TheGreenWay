const express = require('express');
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const ModMiddleware = require("../middlewares/ModMiddleware"); 

let orderRouter = (server) => {
    // List Don't Need Protect APIs:
    // Check Token User
    router.use(AuthMiddleware.isAuth); 
    // List Protect APIs:
    router.post("/addNewOrderByUser",OrderController.addNewOrderByUser);
    // Check Token MOD
    router.use(ModMiddleware.isAuth); 
    // List Protect APIs:
    return server.use("/userorder",router);
  }
  
module.exports = orderRouter;