const express = require('express');
const fs = require('fs');
const cors = require('cors');
const http= require('http');
const mysql = require('mysql');
const initAPIs = require("./routes/index");
const debug = console.log.bind(console);
// var config = require('./config/configDB.js');

// var connectionDB = mysql.createConnection(config.databaseOptions);

// connectionDB.connect((err)=>{
//     if(!err){
//         debug("Connect mySQL success!");

        const PORT = process.env.PORT || 3001
        const app = express();
        app.use(cors());
        app.use(express.json());
        const server = http.createServer(app);

        // Khởi tạo các routes cho ứng dụng
        // initAPIs(app);

        

        server.listen(PORT,(error) => {
            if(error){
                throw error;
            }else{
                debug(`Server listen on port ${PORT} ...`);
            }
        });

//     }else{
//         debug(`Error with MySQL Connection : ${err.message}`);
//     }
// })