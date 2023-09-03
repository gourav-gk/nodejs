const express = require('express')
const {Category,validataData} = require('../models/categoriesmodel')

const router = express.Router()

router.get('/',async (req,res)=>{
    let categories = await Category.find()
    res.send(categories)
})

router.post('/',async (req,res)=>{
    
       
    const {error,value} = validataData(req.body)
    if (error) res.status(400).send(error.details[0].message)
    else{
    
         const category = new Category({
            name: req.body.name
         })
        await category.save()
        res.send(category)
    }
})


router.put('/:id', async (req,res)=>{
    const {error} = validataData(req.body)
    if(error) res.status(400).send(error.details[0].message)
    else{
        
        const category = await Category.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true})

        if(!category) res.status(400).send("This id doesnot exist")

        res.send(category)
    }
})







   
module.exports = router