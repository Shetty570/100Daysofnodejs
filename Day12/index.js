import express from 'express'

const app = express()

app.get("/about", (req,res)=>{
    const {name,age} = req.query;

    console.log(`Name: ${name}, age: ${age}`);
    res.send( ` Hello Name: ${name}, age: ${age}`)
}).listen(3000, ()=>{
    console.log('server running at: ',3000)
})