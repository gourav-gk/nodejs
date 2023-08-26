const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/testdb')
.then(()=>console.log('connection successfull'))
.catch((err)=>console.log('error',err))

//schema

const courseSchema = new mongoose.Schema({
    name: {type:String, required:true, minlength: 2,maxlength: 10},
    creator: {type:String, reuired:true},
    category: {type:String, reuired:true, enum: ['DSA','Database','Data Science','web']},
    publishedDate: {type:Date, default:Date.now},
    isPublished: {type:Boolean, required:true},
    rating: {type:Number, required: function(){ return this.isPublished }},
    tags: {type:Array, required:true, validate:{
        validator: function(tags){
            return tags.length > 1
        }
    }}
}) 

const Course = mongoose.model('Course', courseSchema)

async function createCourse(){
    const course = new Course({
        name: 'React',
        category: 'web',
        creator: 'Gourav',
        isPublished: true,
        rating: '3.5',
        tags: ['react']
    })
    
    try{
        const result = await course.save()
        console.log(result)
    }catch(error){
       // console.log(error.message);
        for(fields in error.errors){
            console.log(error.errors[fields]);
        }
    }
    
}

async function getCourses(){
    //const courses = await Course.find({creator:'Gourav'}).select({name:1,publishedDate:1}).sort({name:-1})
    //gt (greater than) gte(graterthanequalto), lt,lte,in,not in
    const courses = await Course.find({rating:{$in:[4.2,4]}})
    console.log(courses)
}

async function updateCourse(id){
    const course = await Course.findById(id)
    if(!course)
      return

    course.isPublished = true
    const updatedcourse = await course.save()
    console.log(updatedcourse)
}

async function deleteCourse(id){
    const course = await Course.findByIdAndDelete(id)
    console.log(course);
}

createCourse()
//getCourses()
//updateCourse('64e863ed259ee11d6f375788')
//deleteCourse('64e86456e1ccc1ad1ba599b0')