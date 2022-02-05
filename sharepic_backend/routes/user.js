const express = require('express');
const router = express.Router();
// const PicModel = require('../model/pic');
const usercontroller = require('../controller/user')



// add user users
router.get('/adduser', usercontroller.getAddUser);
router.post('/adduser', usercontroller.postAddUser)
router.post('/login', usercontroller.postLogin)


// add display user
router.get('/displayuser', usercontroller.getDisplayUser)

// delete user
router.get('/deleteuser/:id', usercontroller.getDeleteUser)

// edit usr
router.get('/edituser/:id', usercontroller.getEditUser)
router.post('/edituser/:id', usercontroller.getEditUser)




module.exports = router;