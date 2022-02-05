// title about destination category image postedby savedby comments
// comment= > comment postedby

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PicSchema = Schema({
   title: {
      type: String,
      required: true,
   },
   about: {
      type: String,
   },
   labels: {
      type: Array,
   },
   image: { data: Buffer, contentType: String },
   createdOn: {
      type: Date,
   },
   postBy: {
      type: String,
   },
   savedby: {
      type: Array,
   },
   comments: {
      type: Array,
   }
});

module.exports = mongoose.model('Pic', PicSchema);