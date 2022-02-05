const bodyParser = require('body-parser');
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer')
// >>>>>>>>>>>>imports
var cors = require('cors')

const PORT = process.env.PORT || 3000;
// uri is dummyy 
const uri = "mongodb+srv://priyanka:password@cluster0.b6ird.mongodb.net/db?retryWrites=true&w=majority"

const HomeRouter = require('./routes/home');
const UserRouter = require('./routes/user');
const PicRouter = require('./routes/pic');

// >>>>>>>>>>>>variables
app.set('views', 'views')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.use(fileUpload())



app.use(HomeRouter);
app.use(UserRouter);
app.use(PicRouter);

// >>>>>>>>>>>>routes

mongoose.connect(uri).then(result => {
   app.listen(PORT, () => {
      console.log(`Server is on ${PORT} `)
   });
}).catch(err => {
   console.log("cannt connect backend!", err);
})
