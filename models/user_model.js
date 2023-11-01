const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    user_id :{ type:String , required:true, unique:true},
    user_password : { type:String, required:true},
    allocated_devices : [String],
    createdRooms :[String]
})

const User = mongoose.model("User",userSchema)

module.exports = User