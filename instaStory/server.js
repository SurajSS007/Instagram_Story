require('./models/db')
const express = require('express');
var app = express();
const path = require('path')
const PORT=process.env.PORT || 5000 ;
const bodyparser = require('body-parser');
const session = require('express-session');
const stories = require('./controllers/stories')
const user = require('./controllers/users')
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json());

app.use(session({ 		//Usuage
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }));


app.use('/api/stories',stories);
app.use('/api/user',user);




app.listen(PORT,() => console.log(`Listening to PORT ${PORT}`));