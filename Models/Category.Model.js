const mongoose = require('mongoose')

const CategoryModel = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
})

const Category = mongoose.model('Category',CategoryModel)
module.exports = Category