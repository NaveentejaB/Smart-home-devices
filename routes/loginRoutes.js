const express = require("express")
const {loginUser} = require("../pages/login")

const loginRouter =express.Router()

loginRouter.post("/login",loginUser)

module.exports = loginRouter