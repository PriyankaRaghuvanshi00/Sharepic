const multer = require('multer');
const User = require('../model/user');
var fs = require('fs');
var path = require('path');

exports.postLogin = (req, res, next) => {
   const password = req.body.password;
   const email = req.body.email;
   User.findOne({ email: email }).then(result => {
      if (result.password === password) {
         res.json({ msg: 'logged In', data: { id: result._id, image: result.image, Username: result.userName, email: email, }, code: 1 })
      }
      else {
         res.json({ msg: 'Invalide Email or Password', data: [], code: 0 })
      }
   }).catch(r => console.log(r))

}

// >>>add user
exports.getAddUser = (req, res, next) => {
   res.render('user')
}

exports.postAddUser = (req, res, next) => {
   const email = req.body.email;
   User.findOne({ email: email }).then(result => {
      if (result === null) {
         const name = req.body.name;
         const password = req.body.password;
         const image = req.files?.image || null;
         if (image === null)
            var final_img = {
               contentType: "",
               data: ""
            }
         else
            var final_img = {
               contentType: image.mimetype,
               data: Buffer.from(image.data).toString('base64'),
            };
         const data = { userName: name, email: email, image: final_img, password: password };
         var newuser = new User(data);
         newuser.save(function (err, task) {
            if (err)
               res.send({ msg: err, data: [] });
            res.json({ msg: "User Registed!", data: task, code: 1 });
         });
      }
      else {
         res.json({ msg: "User Already Exists!", data: [], code: 0 });
      }
   })

};
// >>>add user


// >>>display user

exports.getDisplayUser = (req, res, next) => {
   let obj = [];
   User.find().then(data => {
      data.forEach(elem => {
         obj.push({ _id: elem._id, userName: elem.userName, image: Buffer.from(elem.image.data, 'base64').toString('ascii'), email: elem.email });
      });
      res.json(obj);
      // res.render('home', { obj: obj })
   }).catch(err => res.json({ error: err }));
}
// >>>display user

exports.getDeleteUser = (req, res, next) => {
   const id = req.params.id;
   console.log(id);
   User.findByIdAndDelete({ _id: id }).then(result => {
      console.log(result);
      res.redirect('/display')
   }).catch(err => err);
}

// edit user
exports.getEditUser = (req, res, next) => {
   const id = req.params.id;
   User.findOne({ _id: id }).then(data => {
      res.render('edit', { id: id, name: data.userName, email: data.email });
   })

}
exports.postEditUser = (req, res, next) => {
   const id = req.params.id;
   console.log(id);

   User.findByIdAndUpdate({ id: id, }).then(result => {
   })
      .catch(er => er);
}