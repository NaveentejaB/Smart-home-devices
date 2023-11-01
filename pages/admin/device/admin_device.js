const Device = require("../../../models/device_model")
const User = require("../../../models/user_model")
//add new device
const addNewDevice = async(req,res)=>{
    const {device_id} = req.body
    try{
        const deviceExist = await Device.findOne({device_id:device_id})
        if(deviceExist){
            res.status(400).json({
                message:`${device_id} already exists.Please change it`,
                success:false
            })
        }else{
            const newDevice =new Device({
                device_id:device_id
            })
            newDevice.save()
            const device = await Device.findOne({device_id:device_id})
            res.status(200).json({
                newDevice:newDevice,
                message:`user with user_id ${device_id} added`,
                success:true
            })

        }
    }catch(err){
        res.status(500).json({
            message:err.message,
            success:false
        })
    }
}

// get all allocated devies
const getAllocatedDevices = async(req,res)=>{
    try{
        const devices = await Device.find({isAllocated:true})
        res.status(200).json({
            devices:devices,
            message:`all devices fetched.`,
            success:true
        })
    }catch(err){
        res.status(500).json({
            message:err.message,
            success:false
        })
    }
}

// get all Unallocated devies
const getUnallocatedDevices = async(req,res)=>{
    try{
        const devices = await Device.find({isAllocated:false})
        res.status(200).json({
            devices:devices,
            message:`all devices fetched.`,
            success:true
        })
    }catch(err){
        res.status(500).json({
            message:err.message,
            success:false
        })
    }
}

// can allocate a device to the user or customer
const allocateDeviceToUser = async(req,res)=>{
    try{
        const {user_id} = req.body
        const deviceID = req.params.deviceID
        const checkUser = await User.findOne({user_id:user_id})
        if(checkUser){
            const user = await User.findOne({user_id:user_id})
            const arr = user.allocated_devices
            arr.push(deviceID)
            const userUpdate = await User.findOneAndUpdate({user_id:user_id},{allocated_devices:arr})
            const changeDevice = await Device.findOneAndUpdate({device_id:deviceID},{
                isAllocated:true,
                userAllocated :user_id
            })
            res.status(200).json({
                changeDevice : changeDevice,
                success:true,
                message:`allocated device ${deviceID} to user ${user_id}`
            })
        }else{
            res.status(200).json({
                success:true,
                message:`check the user id ${user_id} and try again.`
            })
        }
    }catch(err){
        res.status(500).json({
            message:err.message,
            success:false
        })
    }
}

module.exports ={allocateDeviceToUser, getAllocatedDevices, getUnallocatedDevices, addNewDevice}