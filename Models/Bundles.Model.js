const mongoose = require('mongoose')

const bundleModeSchema = new mongoose.Schema({
    modeType: { type: String },
    coursePrice: { type: Number },
    coursePriceAfterDiscount: { type: Number },
    courseDiscountPercent: { type: Number },
    courseLink:{type:String}
})

const BundleSchema = new mongoose.Schema({
    bundleName: {
        type: String,
        required: true
    },
    bundleStartingPrice: {
        type: Number,
        required: true
    },
    bundleEndingPrice: {
        type: Number,
        required: true
    },
    categoryId: {
        type: String
    },
    bundleImage: {
        url: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    }, 
    tag: {
        type: String
    },
    bundleDescription: {
        type: String
    },
    bundleCourseId:[{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course',
            required:true
        },
        _id:false
    }],
    bundleMode: [bundleModeSchema],
    feature: {
        type: Boolean
    }
}, { timestamps: true })

const Bundle = mongoose.model('Bundle', BundleSchema)
module.exports = Bundle