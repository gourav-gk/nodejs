const express = require('express')
const Joi = require('joi')

const router = express.Router()


const category = [
    {id:1, name: 'web Development'},
    {id:2, name: 'Mobile'},
    {id:3, name: 'wear Os'}
]

 



router.get('/category',(req,res)=>{
    res.send(category)
})

router.post('/category',(req,res)=>{
    
       
    const {error,value} = validataData(req.body)
    if (error) res.status(400).send(error.details[0].message)
    else{
    
         const cat = {
            id:category.length +1,
            name:req.body.name
        }
        category.push(cat) 
        res.send(category)
    }
})



function validataData(category){
    const schema = Joi.object({
    name: Joi.string().min(3).required()
})

    return schema.validate(category)
}

   
module.exports = router