
const User = require("../../../models/user_model")

// to add new user
const addNewUser = async(req,res)=>{
    const {user_id,user_password} = req.body
    try{
        const userExist = await User.findOne({user_id:user_id})
        if(userExist){
            res.status(400).json({
                message:`${user_id} already exists.Please change it`,
                success:false
            })
        }else{
            const newUser =new User({
                user_id:user_id,
                user_password:user_password
            })
            newUser.save()
            res.status(200).json({
                newUser:newUser,
                message:`user with user_id ${user_id} added`,
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

//get all the users
const getAllUsers = async(req,res)=>{
    try{
        const devices = await User.find()
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



module.exports = {getAllUsers,addNewUser}