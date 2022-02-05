const express = require('express');
const router = express.Router();
const User = require('../model/user');

// to display
// router.get('/', (req, res, next) => {
//    let obj = [];
//    User.find().then(data => {
//       data.forEach(elem => {
//          obj.push({ image: elem.image.data });
//       });
//       res.render('home', { obj: obj })
//    }).catch(err => err);
// })


module.exports = router;