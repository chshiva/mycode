import mongoose from 'mongoose';
var moment = require('moment');
const Schema = mongoose.Schema;

const settingsSchema = new Schema({
  smtpSettings : {
    apiKey : {
      type : String,
      trim : true,
      maxlength: [30, 'Api Key length should be maximum of 30 characters']
    },
    domain : {
      type : String,
      trim : true,
      maxlength: [100, 'Domain length should be maximum of 100 characters']
    },
    username : {
      type : String,
      trim : true,
      maxlength: [30, 'User Name length should be maximum of 30 characters']  
    },
    password : {
      type : String,
      trim : true,
      maxlength: [30, 'Password length should be maximum of 30 characters']
    },
    server:{
      type : String,
      trim : true,
      maxlength: [50, 'Server length should be maximum of 50 characters']
    },
    modifiedAt : { 
      type : Date
    },
    deletedAt : {
      type : Date
    }
  },
  ldapSettings : {
    domain : {
      type : String,
      trim : true,
      maxlength: [60, 'Domain length should be maximum of 60 characters']
    },
    baseDn : {
      type : String,
      trim : true,
      maxlength: [40, 'BaseDn length should be maximum of 40 characters']
    },
    url : {
      type : String,
      trim : true,
      maxlength: [60, 'URL length should be maximum of 60 characters']
    },
    bindCn : {
      type : String,
      maxlength: [30, 'BindCn length should be maximum of 30 characters']
    },
    bindPassword : {
      type : String,
      trim : true,
      maxlength: [30, 'Bind Password length should be maximum of 30 characters']
    },
    forceLogin : {
      type : String,
      trim : true
    },
    modifiedAt : { 
      type : Date 
    },
    deletedAt : {
      type : Date
    }
  },
  createdBy : {
    type : String,
    trim : true
  }
});
export default mongoose.model('Settings',settingsSchema);;