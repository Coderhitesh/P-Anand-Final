const mongoose = require('mongoose')

const CategoryModel = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    subcategoryName: [{
        name: {
            type: String,
            trim: true
        }
    }]

})

const Category = mongoose.model('Category', CategoryModel)
module.exports = Category