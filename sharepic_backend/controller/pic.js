const User = require('../model/user')
const Pic = require('../model/pic')
const { ObjectId } = require('mongodb')

exports.getAddPic = (req, res, next) => {
   res.render('pic')
}
exports.UpdatePic = (req, res, next) => {
   let cmnt = req.body.comment;
   let id = req.body.id;
   console.log(cmnt);
   Pic.findByIdAndUpdate({ _id: id }, { $set: { 'comments': cmnt } }).then(result => {
      res.send({ data: cmnt })
   }).catch(err => err);
}
exports.displayPic = (req, res, next) => {
   let data = [];
   Pic.find().sort({ createdOn: 'desc' }).then(result => {
      let obj = []
      result.forEach(elem => {
         obj.push({ _id: elem._id, labels: elem.labels, postBy: elem.postBy, title: elem.title, image: Buffer.from(elem.image.data, 'base64').toString('ascii'), about: elem.about, comments: elem.comments });
      })
      data.push(obj);
      res.json(data);
   }
   ).catch(er => er);

}
exports.postAddPic = (req, res, next) => {
   const title = req.body.title;
   const about = req.body.about;
   const image = req.files?.image || null;
   const labels = req.body.labels;
   const labels_arr = labels.split(',');
   console.log(labels_arr);
   if (image == null)
      res.json({ msg: "Cann't Upload Image", data: [], code: 0 });
   var final_img = {
      contentType: image.mimetype,
      data: Buffer.from(image.data).toString('base64'),
   };
   const data = { title: title, about: about, image: final_img, createdOn: Date.now(), labels: labels_arr, postBy: req.body.postBy, savedby: [], comments: [] };
   // console.log(">>", data);
   var newPic = new Pic(data);
   newPic.save(function (err, task) {
      if (err)
         res.json({ msg: err, data: [], code: 0 });
      res.json({ msg: "Image Uploaded!", data: task, code: 1 });
   });
}