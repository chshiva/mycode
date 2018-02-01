
var mongoose = require('mongoose');
var moment = require('moment');
import {addSlash, stripSlash} from '../controllers/slashesActions';


var schema = new mongoose.Schema( {
        businessId : { 
                type : String, 
                required : [true, 'Please enter Business Id'], 
                trim : true,
                match : [ /^[a-zA-Z0-9]+$/, "Please enter valid Business Id" ],
                maxlength: [15, 'Business Id length should be maximum of 15 characters'],
                set : addSlash,
                get : stripSlash,
                index: true

        },
        businessName : { 
                type : String, 
                required : [true, 'Please enter Business Name'], 
                trim : true,
                match : [ /^[a-zA-Z0-9\-\s]+$/, "Please enter valid Business Name"],
                maxlength: [50, 'Business Name length should be maximum of 50 characters'],
                set : addSlash,
                get : stripSlash,
                index: true
        },
        businessType : { 
                type : String,
                enum : ['Conference', 'LMS', 'CRM', 'Presenter'],
                required : [true, ' Please enter Business Type'] 
        },
        address : { 
                street : {
                        type : String,
                        required : [true, 'Please enter Street'],
                        maxlength: [50, 'Street length should be maximum of 50 characters'],
                        set : addSlash,
                        get : stripSlash

                },
                district : {
                        type : String,
                        required : [true, 'Please enter District'],
                        match : [/^[a-zA-Z\-\s]+$/, "Please enter valid District"],
                        maxlength: [20, 'District length should be maximum of 20 characters'],
                        set : addSlash,
                        get : stripSlash
                },
                state : {
                        type : String,
                        required : [true, 'Please enter State'],
                        match : [/^[a-zA-Z\-\s]+$/, "Please enter valid State"],
                        maxlength: [20, 'State length should be maximum of 20 characters'],
                        set : addSlash,
                        get : stripSlash
                },
                country : {
                        type : String,
                        required : [true, 'Please enter Country'],
                        match : [/^[a-zA-Z\-\s]+$/, "Please enter valid Country"],
                        maxlength: [20, 'Country length should be maximum of 20 characters'],
                        set : addSlash,
                        get : stripSlash
                },
                pincode : {
                        type : String,
                        required : [true, 'Please enter Pincode'],
                        match : [/^\d+$/, "Please enter valid Pincode"],
                        maxlength: [10, 'Pincode length should be maximum of 10 characters'],
                        set : addSlash,
                        get : stripSlash
                }
        },
        phoneNo : [{
            type : String,
            trim : true,
            required : [true, "Please enter Phone Number"],
            set : addSlash,
            get : stripSlash,
            maxlength: [20, 'Phone Number length should be maximum of 20 of characters']
        }],
        websiteAddr : { 
                type : String, 
                trim : true,
                match : [/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/, "Please enter valid Web Site"],
                maxlength: [50, 'Web Site length should be maximum of 50 characters '],
                set : addSlash,
                get : stripSlash
        },
        companyStatus : { 
                type : String, 
                enum : ['Active', 'Inactive'],
                required : [true, 'Please select Company Status']

        },
        scheduleType : { 
                type : String, 
                enum : ['Calendar', 'Timeslot'],
                required : [true, 'Please select Schedule Type'] 
        },
        contactDetails : {
                name : { 
                        type : String, 
                        required : [true, 'Please enter Contact Person Name'], 
                        trim : true,
                        match : [ /^[a-zA-Z\-\s]+$/, "Please enter valid Contact Person Name" ],
                        maxlength: [30, 'Contact Person Name length should be maximum of 30 characters'],
                        set : addSlash,
                        get : stripSlash
                },
                phoneNo : { 
                        type : [String], 
                        required : [true, 'Please enter Contact Phone Number '],
                        // set : addSlash,
                        // get : stripSlash
                        // maxlength: [15, 'Contact Phone Number length should be maximum of 15'] 
                },
                email : { 
                        type : String, 
                        required : [true, 'Please enter Contact E-mail'], 
                        trim : true,
                        lowercase: true,
                        match : [ /^((([a-zA-Z]|[0-9])|([-]|[_]|[.])){2,})+[@](([a-zA-Z0-9])|([-])){2,63}[.](([a-zA-Z0-9]){2,5})$/, "Please enter valid Contact E-mail" ],
                        maxlength: [50, 'Contact E-mail length should be maximum of 30 characters'],
                        set : addSlash,
                        get : stripSlash
                }
        },
        // licenses : {
        //         publishLimit : { 
        //                 type : Number, 
        //                 default : -1 
        //         },
        //         roomLimit : { 
        //                 type : Number, 
        //                 default : -1 
        //         },
        //         noOfP2P : {
        //                 type : Number,
        //                 default : -1
        //         },
        //         subscriberLimit : {
        //                 type : Number,
        //                 default : -1
        //         },
        //         usersLimit : {
        //                 type : Number,
        //                 default : -1
        //         }
        // },
        legalDocuments : {
                panNumber : { 
                        type : String,
                        trim :true,
                        match : [ /^[a-zA-Z0-9]+$/, "Please enter valid Pan Number"],
                        maxlength: [10, 'Pan Number length should be maximum of 10 characters'],
                        set : addSlash,
                        get : stripSlash
                },
                tanID : { 
                        type : String, 
                        trim : true,
                        match : [ /^[a-zA-Z0-9]+$/, "Please enter valid Tan Id"],
                        max: [20, 'Tan Id length should be maximum of 20 characters'],
                        set : addSlash,
                        get : stripSlash
                }
        },
        createdBy : { 
                type : mongoose.Schema.Types.ObjectId, 
                /*required : [true, "Unauthorized user access"]*/
        },
        modifiedBy : { 
                type : mongoose.Schema.Types.ObjectId, 
                /*required : [true, "Unauthorized user access"]*/
        },
        createdAt : { 
                type : Date, 
                /*required : true,*/
                default : moment().utc().toDate()
        },
        modifiedAt : { 
                type : Date, 
                /*required : true,*/
                default : moment().utc().toDate()
        }

},{
    toObject : {getters: true},
    toJSON : {getters: true}
});

var Corporate = mongoose.model('corporate', schema);
export default Corporate;