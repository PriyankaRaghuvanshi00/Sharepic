// user name ,email ,profile pic 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = Schema({
   userName: {
      type: String,
      required: true,
   },
   image: { data: Buffer, contentType: String },
   email: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true,
   }
});

module.exports = mongoose.model('User', userSchema);