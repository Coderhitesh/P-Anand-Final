const mongoose = require('mongoose')

const BundleSchema = new mongoose.Schema({
    bundleName:{
        type:String,
        required: true
    },
    bundlePrice:{
        type:Number,
        required: true
    },
    bundleImage:{
        type:String,
        required: true
    },
    bundleCourseName: {
        type: [String],
        required: true
    }
})

const Bundle = mongoose.model('Bundle',BundleSchema)
module.exports = Bundle