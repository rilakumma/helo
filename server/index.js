const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
require('dotenv').config();
const controller = require('./controller');

const app = express();
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
massive(process.env.CONNECTION_STRING).then( database =>{
    app.set('db', database);
}).catch(error=>{
    console.log('Error connecting to database', error);
});
app.use( express.static( __dirname + '/../build' ) );

//user stuff
app.get('/api/user', controller.getUser);
app.post('/api/logout', controller.logout);
app.get('/auth/callback', controller.handleLogin);
// post stuff
app.get('/api/posts', controller.getPosts);
app.get('/api/posts/:postid', controller.getPost);


app.listen(4000, ()=>{
    console.log('Server is listening on port 4000✨ ✨ ✨ ✨ ✨ ✨');
})