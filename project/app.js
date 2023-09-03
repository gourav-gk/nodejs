const express = require('express')
const mongoose = require('mongoose')
const category = require('./Routes/category')

mongoose.connect('mongodb://127.0.0.1/project1')
.then(()=>console.log('connection successfull'))
.catch((err)=>console.log('error',err))

const app = express()
app.use(express.json())

app.use('/category',category)

const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`port ${port}`)
})





