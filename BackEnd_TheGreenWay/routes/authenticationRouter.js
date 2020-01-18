const express = require('express');
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const AuthMiddleWare = require("../middlewares/AuthMiddleware");

let initAuthenticationRouter = (server) => {
    router.post("/login", AuthController.login);
    router.post("/register", AuthController.register);
    router.post("/forgotpassword", AuthController.forgotpassword);
    return server.use("/auth",router);
  }
  
module.exports = initAuthenticationRouter;