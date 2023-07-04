const express = require("express")
const app = express()

require("dotenv").config()

const connectdb = require("./connect")

const router = require("./routers/routers")
app.use(express.json())
app.use("/hi" , router)


const start = async()=>{
    try{
        await connectdb(process.env.MONGO_URI)
        app.listen(1234,()=>{
            console.log("server is running on port 1234")            
        })
    }
    catch(error){
        console.log(error)
    }
}

start()