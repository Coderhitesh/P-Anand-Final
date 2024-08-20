const mongoose = require('mongoose')

const BundleSchema = new mongoose.Schema({
    bundleName:{
        type:String,
        required: true
    },
    bundleTotalPrice:{
        type:Number,
        required: true
    },
    bundleDiscountPrice:{
        type:Number,
        required: true
    },
    bundleDisCountPercenatgae:{
        type:Number,
        required: true
    },
    bundleImage:{
        url:{
            type:String,
            required: true
        },
        public_id:{
            type:String,
            required: true
        }
    },
    bundleCourseId:[{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course',
            required:true
        },
        _id:false
    }]
},{timestamps:true})

const Bundle = mongoose.model('Bundle',BundleSchema)
module.exports = Bundle