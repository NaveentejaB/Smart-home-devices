const express = require("express")
const {getAllAllocatedDevices ,
    createRoom ,updateStateofDevice,getAllRooms} = require("../pages/customer/customer")

const userRouter =express.Router()

userRouter.get("/:userID/allocate",getAllAllocatedDevices)

userRouter.post("/:userID/create/room",createRoom)

userRouter.post("/:userID/room/:roomID/use",updateStateofDevice)

userRouter.get("/:userID/rooms",getAllRooms)

module.exports = userRouter