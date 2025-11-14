const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username :{
        required :true,
        type : String
    },
    userid :{
        required : true,
        type : String
    },
    text :{
        required :true,
        type : String
    },
    img :{
        required : false,
        type : String
    },
    likes :{
        required :false,
        type : Number
    },
    dislikes :{
        required : false,
        type : Number
    },
    comments :{
      required:false,
      type: [String],
      value:[String]
    }
});

module.exports = mongoose.model('Post',schema);