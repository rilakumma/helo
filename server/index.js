const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
massive(process.env.CONNECTION_STRING).then( database =>{
    app.set('db', database);
}).catch(error=>{
    console.log('Error connecting to database', error);
})

app.listen(4000, ()=>{
    console.log('Server is listening on port 4000✨ ✨ ✨ ✨ ✨ ✨');
})