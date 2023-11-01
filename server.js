const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")


// to connect to local database
mongoose.connect("mongodb://localhost:27017/kasperTechDB",{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4,
})

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())

const adminRouter = require("./routes/adminRoutes")
const userRouter = require("./routes/userRoutes")
const login = require("./routes/loginRoutes")

app.use("/",adminRouter)
app.use("/user",userRouter)


app.listen(3000,()=>{
    console.log("running on port 3000");
})