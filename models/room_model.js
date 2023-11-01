const mongoose = require("mongoose")

const roomSchema = new mongoose.Schema({
    room_id :{type:String , required:true ,Unique:true},
    user_id :{type:String , required:true ,Unique:true},
    device_id : {type:String , required:true ,Unique:true},
    room_name : {type:String , required:true}
})

const Room = mongoose.model("Room",roomSchema)

module.exports = Room