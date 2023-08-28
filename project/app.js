const express = require('express')
const mongoose = require('mongoose')
const category = require('./Routes/category')

const app = express()
app.use(express.json())

app.use(category)

const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`port ${port}`)
})





