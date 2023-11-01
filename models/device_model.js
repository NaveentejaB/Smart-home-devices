const mongoose = require("mongoose")

const lotDeviceSchema = new mongoose.Schema({
    device_id:{type:String , required:true ,Unique:true},
    isAllocated:{type:Boolean , default:false},
    isUsed : {type:Boolean, default:false},
    userAllocated:String,
    state:{
        light : {type:Number , enum:[1,0] , default:0},// depending on whether the light is on or off
        fan   : {type:Number , enum:[1,0] , default:0},
        mis   : {type:Number , enum:[1,0] , default:0}    
    }
})

const Device = mongoose.model("Device",lotDeviceSchema)

module.exports = Device