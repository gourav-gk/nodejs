const mongoose = require('mongoose')
const Joi = require('joi')

const categorySchema = mongoose.Schema({
    name:{type: String,requuired: true,minlength: 3, maxlength: 30}
})

const Category = new mongoose.model("Category", categorySchema)


function validataData(category){
    const schema = Joi.object({
    name: Joi.string().min(3).required()
})

    return schema.validate(category)
}

exports.Category = Category
exports.validataData = validataData