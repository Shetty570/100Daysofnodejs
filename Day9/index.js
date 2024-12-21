import express from "express";


const app = express()
const port = 3000;
const logger = (req,res,next)=>{
    console.log("logger middleware")
    next();
}

app.get("/",logger,(req,res)=>{
    res.send(`
        <div>
        <h1>Hi Home</h1>
        </div>`)
})


app.listen(port,()=>{
    console.log("Server running on port : ",port)
})