import express from "express";

const app = express()

app.post("/", (req,res)=>{
    res.send("Post request");
})


app.listen(3000);