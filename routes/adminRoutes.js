const express = require("express")
const {allocateDeviceToUser, getAllocatedDevices, 
    getUnallocatedDevices, addNewDevice} = require("../pages/admin/device/admin_device")
const {getAllUsers,addNewUser} = require("../pages/admin/user/admin_user")

const adminRouter = express.Router()

adminRouter.post("/device/add",addNewDevice)

adminRouter.get("/allocatedDevice",getAllocatedDevices)

adminRouter.get("/unallocatedDevice",getUnallocatedDevices)

adminRouter.post("/allocate/:deviceID",allocateDeviceToUser)

adminRouter.get("/users",getAllUsers)

adminRouter.post("/user/add",addNewUser)

module.exports = adminRouter
