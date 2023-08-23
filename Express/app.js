const express = require('express')
const mymiddleware = require('./middlewares/middle')
const morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(mymiddleware)
app.use(morgan('tiny'))

let courses = [{id:1,name:"java"},{id:2,name:"python"}]

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.get('/about',(req,res)=>{
    res.send("this is about page")
})

app.get('/home',(req,res)=>{
    res.send("this is home page")
})


// Route parameters

app.get('/courses',(req,res)=>{
    res.send(courses)
})

app.post('/courses',(req,res)=>{
    const course = {
        id: courses.length +1,
        name: req.body.name
    }

    courses.push(course)
    res.send(courses)

})

app.put('/courses/:id',(req,res)=>{
    let course = courses.find(course => course.id == req.params.id)
    if(!course) res.status(404).send("not found")
    else course.name = req.body.name

    res.send(courses)
})

app.delete('/courses/:id',(req,res)=>{
    let course = courses.find(course => course.id == req.params.id)
    if(!course) res.status(404).send("not found")

    const index = courses.indexOf(course)
    courses.splice(index,1)
    res.send(courses)
})


const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(`port:${port}`)
})