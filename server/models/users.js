import mongoose from 'mongoose';
import {addSlash, stripSlash} from '../controllers/slashesActions';
const Schema = mongoose.Schema;
var moment = require('moment');

mongoose.Promise = require('bluebird');

const userSchema = new Schema({
  password : { 
    type : String,   
    // required : [true, "Please enter password"],
  },
  firstname : { 
    type : String, 
    required : [true, "Please enter First Name"],
    match : [ /^[a-zA-Z\-\s]+$/, "Please enter valid First Name" ],
    maxlength: [30, 'First name length should be maximum of 30 characters'],
    set : addSlash,
    get : stripSlash,
    index: true
  },
  lastname : { 
    type : String,
    match : [ /^[a-zA-Z\-\s]+$/, "Please enter valid Last Name" ],
    maxlength: [30, 'Last name length should be maximum of 30 characters'], 
    default : "",
    set : addSlash,
    get : stripSlash,
    index: true
  },
  email : { 
    type : String, 
    lowercase: true, trim: true,
    required : [true, "Please enter Email"], 
    index : { unique : true },
    match : [ /^((([a-zA-Z]|[0-9])|([-]|[_]|[.])){2,})+[@](([a-zA-Z0-9])|([-]|[.])){2,40}[.]((([a-zA-Z0-9]){2,4})|(([a-zA-Z0-9]){2,4}[.]([a-zA-Z0-9]){2,4}))$/, "Please enter valid Email" ],
    maxlength: [50, 'Email length should be maximum of 50 characters'],
    set : addSlash,
    get : stripSlash 
  },
  gmail:{
    type : String, 
    lowercase: true, trim: true,
    match : [ /^((([a-zA-Z]|[0-9])|([-]|[_]|[.])){2,})+[@](([a-zA-Z0-9])|([-]|[.])){2,40}[.]((([a-zA-Z0-9]){2,4})|(([a-zA-Z0-9]){2,4}[.]([a-zA-Z0-9]){2,4}))$/, "Please enter valid Email" ],
    maxlength: [50, 'Email length should be maximum of 50 characters'],
    index: true, 
    set : addSlash,
    get : stripSlash  
  },
  facebookMail :{
    type : String,
    lowercase: true, trim: true,
    match : [ /^((([a-zA-Z]|[0-9])|([-]|[_]|[.])){2,})+[@](([a-zA-Z0-9])|([-]|[.])){2,40}[.]((([a-zA-Z0-9]){2,4})|(([a-zA-Z0-9]){2,4}[.]([a-zA-Z0-9]){2,4}))$/, "Please enter valid Email" ],
    maxlength: [50, 'Email length should be maximum 50 of characters'],
    index: true,
    set : addSlash,
    get : stripSlash
  },
  token : { 
    type: String, 
    required: false 
  },
  deviceType: {
    type: String,
    required: false
  },
  deviceId: {
    type: String,
    required: false
  },
  userStatus : {
    type : String,
    enum : ['Active', 'Registered', 'Deleted', 'Blocked'],
    default : 'Active',
    index: true
  },
  loginType: {
    type: String,
    enum: ['Application', 'Google','Facebook'],
    default: 'Application'
  },
  googleId:{
    type: String
  },
  facebookId:{
    type: String
  },
  profile: {
    companyid: { 
      type: String, 
      match : [ /^[a-zA-Z0-9]+$/, "Please enter valid Company Id" ],
      ref : 'corporate',
      index: true, 
      // set : addSlash,
      // get : stripSlash
    },
    phone: [{
      type: String,
      maxlength: [20, 'Phone number length should be maximum 20 of characters'],
      set : addSlash,
      get : stripSlash
    }],
  	gender: { 
      type: String, 
      enum : ['', 'Male', 'Female']
    }, 
  	dateofbirth: { 
      type: Date,
      validate: {
        validator: function (v) {
          if (v < moment().utc().toDate()) return true
          else return false
        },
        message: 'Date of birth  {VALUE} should not be a future date!'
      },
    },
    aboutme: { 
      type: String,
      maxlength: [150, 'About me length should be maximum 150 characters'],
      set : addSlash,
      get : stripSlash
    },
    position: { 
      type: String,
      maxlength: [30, 'Position length should be maximum 30 characters'],
      set : addSlash,
      get : stripSlash  
    },
    dept: { 
      type: String,
      maxlength: [30, 'Department length should be maximum 30 characters'],
      set : addSlash,
      get : stripSlash
    },
    roomid: { 
      type: String 
    },
    profileImage :{
      type:String
    },
    contact :{
      address :{
        type:String,
        maxlength: [50, 'Address length should be maximum 50 characters'],
        set : addSlash,
        get : stripSlash
      },
      street : {
        type:String,
        maxlength: [20, 'Street length should be maximum 20 characters'],
        set : addSlash,
        get : stripSlash
      },
      city:{
        type:String,
        maxlength: [20, 'City length should be maximum 20 characters'],
        set : addSlash,
        get : stripSlash
      },
      zip :{
        type:Number,
        maxlength: [10, 'Zip code length should be maximum 10 characters'],
        set : addSlash,
        get : stripSlash
      },
      landMark :{
        type:String,
        maxlength: [30, 'Landmark length should be maximum 30 characters'],
        set : addSlash,
        get : stripSlash
      },
      state :{
        type : String,
        maxlength: [20, 'State length should be maximum 20 characters'],
        set : addSlash,
        get : stripSlash
      },
      country : {
        type : String,
        maxlength: [20, 'Country length should be maximum 20 characters'],
        set : addSlash,
        get : stripSlash
      }      
    },
    website :{
      type:String,
      maxlength: [50, 'Website length should be maximum 50 characters'],
      set : addSlash,
      get : stripSlash
    },
    socialLink :{
      type:String,
      maxlength: [50, 'Social link length should be maximum 50 characters'],
      set : addSlash,
      get : stripSlash 
    }, 
    experience: {
      workplace:[{
        company : {
          type : String,
          maxlength: [50, 'Company name length should be maximum 50 characters'],
          set : addSlash,
          get : stripSlash
        },
        position: {
          type : String,
          maxlength: [30, 'Position length should be maximum 30 characters'],
          set : addSlash,
          get : stripSlash
        },
        city: {
          type : String,
          maxlength: [20, 'City length should be maximum 20 characters'],
          set : addSlash,
          get : stripSlash
        },
        country:{
          type:String,
          maxlength: [20, 'Country length should be maximum 20 characters'],
          set : addSlash,
          get : stripSlash
        },
        description : {
          type : String,
          maxlength: [150, 'Description length should be maximum 150 characters'],
          set : addSlash,
          get : stripSlash
        },
        yearFrom : {
          type : Date
        },
        yearTo : {
          type : Date 
        },
        present : {
          type : Boolean
        }        
      }],
      professionalSkills: {
        type : Array
      },
    },
    education: {
      college: [{
        university : {
          type : String,
          maxlength: [50, 'University length should be maximum 50 characters'],
          set : addSlash,
          get : stripSlash
        },
        city:{
          type:String,
          maxlength: [20, 'City length should be maximum 20 characters'],
          set : addSlash,
          get : stripSlash
        },
        country:{
          type:String,
          maxlength: [20, 'Country length should be maximum 20 characters'],
          set : addSlash,
          get : stripSlash
        },
        yearFrom : {
          type : Date
        },
        yearTo : {
          type : Date 
        },
        graduated : {
          type : Boolean
        },
        description : {
          type : String,
          maxlength: [150, 'Description length should be maximum 150 characters'],
          set : addSlash,
          get : stripSlash
        },
        concentration : {
          type : String,
          maxlength: [30, 'Concentration length should be maximum 30 characters'],
          set : addSlash,
          get : stripSlash
        }
      }],
      highSchool: {
        school : {
          type : String,
          maxlength: [50, 'School length should be maximum 50 characters'],
          set : addSlash,
          get : stripSlash
        },
        city: {
          type : String,
          maxlength: [20, 'City length should be maximum 20 characters'],
          set : addSlash,
          get : stripSlash
        },
        country:{
          type:String,
          maxlength: [20, 'Country length should be maximum 20 characters'],
          set : addSlash,
          get : stripSlash
        },
        yearFrom : {
          type : Date
        },
        yearTo : {
          type : Date 
        },        
        graduated : {
          type : Boolean
        },
        description : {
          type : String,
          maxlength: [150, 'Description length should be maximum 150 characters'],
          set : addSlash,
          get : stripSlash
        }
      }
    }    
  },
  contacts : [{
      _id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Users'
      },
      status : {
        type : Number,
        enum : [0, 1, 2, 3]
      }
  }],
  locale : {
    timezone : {
      type : String, 
      trim : true,
      set : addSlash,
      get : stripSlash 
    },
    dateformat : {
      type : String,
      trim : true,
      set : addSlash,
      get : stripSlash  
    },
    timeformat : {
      type : String,
      trim : true,
      set : addSlash,
      get : stripSlash  
    },
    currencyformat : {
      type : String,
      trim : true,
      set : addSlash,
      get : stripSlash 
    },
    preferedlanguage : {
      type : String,
      trim : true
    }
  },
  modifiedAt : { 
    type :Date, 
    default: moment().utc().toDate(), 
    required: true 
  },
  role: { 
    type: Number, 
    required: true, 
    default: 4 
  },
  studentId : {
    type : String
  },
  guest: { 
    type: Boolean, 
    required: false,
    default: false 
  },
  createdby: { 
    type: String, 
    required: true 
  },
  modifiedby : { 
    type :String, 
    required: true 
  },
  dateAdded: { 
    type: Date, 
    default: moment().utc().toDate(), 
    required: true 
  },
  passwordToken : {
    type:String,
  },
  resetPasswordExpires : {
    type : String,
  }
},{
    toObject : {getters: true},
    toJSON : {getters: true}
});

userSchema.index({ email: 1}, { unique : true} ); // schema level

export default mongoose.model('Users', userSchema);
