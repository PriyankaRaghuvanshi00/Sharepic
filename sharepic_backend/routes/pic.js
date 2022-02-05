const express = require('express');
const router = express.Router();
const PicController = require('../controller/pic')

router.get('/addpic', PicController.getAddPic);
router.post('/addpic', PicController.postAddPic)
router.get('/displaypic', PicController.displayPic)
router.post('/addcomment', PicController.UpdatePic)

module.exports = router;
