const express = require('express');
const router = express.Router();
const FriendController = require("../controllers/FriendController");
const ModMiddleware = require("../middlewares/ModMiddleware");

let modRouter = (server) => {
    // router.post("/refresh-token", AuthController.refreshToken);
    // Sử dụng authMiddleware.isAuth trước những api cần xác thực
    router.use(ModMiddleware.isAuth); // check token
    // List Protect APIs:
    router.get("/friends", FriendController.friendLists);
    return server.use("/mod",router);
  }
  
module.exports = modRouter;