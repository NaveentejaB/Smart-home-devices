const User = require("../models/user_model")

//login of the user from the creditinals created by admin
const loginUser = async(req,res)=>{
    try{
        const {user_id,user_password} = req.body
        const findUser = await User.findOne({user_id:user_id})
        if(findUser){
            if(user_password === findUser.user_password){
                res.redirect("/").status(200).json({
                    message:"successfully logged in",
                    success:true
                })
            }else{
                res.redirect("/login").status(400).json({
                    message:"Please re-enter the correct password and Try Again.",
                    success:false
                })
            }
        }else{
            res.redirect("/login").status(400).json({
                message:"Please check the user_id and Try Again.",
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

module.exports ={loginUser}