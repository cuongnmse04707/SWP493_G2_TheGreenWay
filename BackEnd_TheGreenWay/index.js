const express = require('express');
const fs = require('fs');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const authenticationRouter = require('./routes/authenticationRouter');
const debug = console.log.bind(console);
//demo xem co lay dc data khi ko co token ko
const getdataDemoRouter = require('./routes/getdataDemoRouter');

var config = require('./config/configDB.js');
var connectionDB = mysql.createConnection(config.databaseOptions);
connectionDB.connect((err)=>{
    if(!err){
        debug("Connect mySQL success!");
        const PORT = process.env.PORT || 3001
        const server = express();
        // BodyParser to read body in header of request
        server.use(bodyParser.json());
        server.use(express.static('public'));
        // Cho phep ten mien dc truy cap vao origin
        server.use(cors());
        // Khai bao Routers
        authenticationRouter(server);
        getdataDemoRouter(server);

        server.listen(PORT,(error) => { 
            if(error){
                throw error;
            }else{
                console.log('Server listen on port 3001 ...');
            }
        });

    }else{
        debug(`Error with MySQL Connection : ${err.message}`);
    }
})