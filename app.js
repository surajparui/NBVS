const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const app = express();
const ejs = require('ejs');
const Port = process.env.PORT || 3000;
const router = require('./routes/Web');
dotenv.config();

// Connecting with the database
require('./src/Database/Database')

// Here i am using the static folder;
app.use('/public', express.static('public'));

// Here i am using the router 
app.use(router);

// Here i am setting up the template engine
app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');

// Listening the server
app.listen(Port,()=>{
    console.log(`Server is running at http://localhost:${Port}`);
})