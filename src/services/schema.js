const { Schema  , Types} = require('mongoose');
let {mongoose} = require('./mongoConnect');


let userschema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    salt : {
        type : String,
    },
    password : {
        type : String,
        required:true
    },
    loggedIn : {
        type : Boolean,
        default : false
    },
    status : {
        type : Boolean,
        default : true
    },
    created_ts : {
        type : Date,
        default :  Date.now
    },
    profilePic : {
        type : String,
        default : null
    }

})

let User = mongoose.model('Users' , userschema)


module.exports = {User}