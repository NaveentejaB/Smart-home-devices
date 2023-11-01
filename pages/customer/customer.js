const Room = require("../../models/room_model")
const User = require("../../models/user_model")
const Device = require("../../models/device_model")



//to get all the allocated devices
const getAllAllocatedDevices = async(req,res)=>{
    try{
        
        console.log(req.params.userID);
        const user = await User.findOne({user_id : req.params.userID})
        res.status(200).json({
            devices:user.allocated_devices,
            message:"fetched the allocated devices",
            success:true
        })
    }catch(err){
        res.status(500).json({
            message:err.message,
            success:false
        })
    }
}

//to create room
const createRoom = async(req,res)=>{
    try{
        const { device_id ,room_id ,roomName} = req.body
        const newRoom = new Room({
            room_id : room_id,
            user_id:req.params.userID,
            device_id: device_id,
            room_name : roomName
        })
        const existDevice = await User.findOne({user_id:req.params.userID})
        var checking = false
        for(var i=0;i<existDevice.allocated_devices.length;i++){
            if(existDevice.allocated_devices[i] === device_id)
                checking=true
        }
        if(checking){
            const rooms = existDevice.createdRooms
            rooms.push(room_id)
            const updateUser = await User.findOneAndUpdate({user_id:req.params.deviceID},{createdRooms:rooms})
            const updateDevice = await Device.findOneAndUpdate({device_id:device_id},{isUsed:true})
            newRoom.save()
            res.status(200).json({
                newRoom:newRoom,
                message:"new room created",
                success:true
            }) 
        }else{
            res.status(400).json({
                message:`the device with id ${device_id} is not allocated to you or doesn't exist`,
                success:false
            })
        }
    }catch(err){
        res.status(500).json({
            message:err.message,
            success:false
        })
    }
}

// to change the state in device by user **/:userID/room/:roomID
const updateStateofDevice = async(req,res)=>{
    const {light,fan,mis} = req.body
    try{
        const room = await Room.findOne({room_id:req.params.roomID})
        const deviceID = room.device_id
        const updateDevice = await Device.findOneAndUpdate({device_id:deviceID},{
            state :{
                light:light,
                fan:fan,
                mis :mis
            }
        })
        res.status(200).json({
            message:`device with ID ${deviceID} state updated`,
            success:true
        })
    }catch(err){
        res.status(500).json({
            message:err.message,
            success:false
        })
    }
}

//to get all the rooms
const getAllRooms = async(req,res) =>{
    try{
        const userID =req.params.userID
        const user = await User.findOne({user_id:userID})
        const rooms = user.createdRooms
        res.status(200).json({
            rooms:rooms,
            message:"fetched all rooms",
            success:true
        })
    }catch(err){
        res.status(500).json({
            message:err.message,
            success:false
        })
    }
}
module.exports ={getAllAllocatedDevices ,createRoom ,updateStateofDevice ,getAllRooms}


