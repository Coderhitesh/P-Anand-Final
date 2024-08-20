const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    courseDescription: {
        type: String,
        required: true
    },
    coursePrice: {
        type: Number,
        required: true
    },
    coursePriceAfterDiscount: {
        type: Number,
        required: true
    },
    courseDiscountPercent: {
        type: Number,
        required: true
    },
    courseImage: {
        url:{
            type:String,
            required: true
        },
        public_id:{
            type:String,
            required: true
        }
    },
    courseCategory: {
        type: String,
        required: true
    },
    courseSubCategory: {
        type: String,
    },
    courseBundleName: {
        type: String
    },
    courseTagName: {
        type: String
    }
})

const Course = mongoose.model('Course',courseSchema)
module.exports = Course