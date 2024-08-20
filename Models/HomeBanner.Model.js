const mongoose = require('mongoose')

const HomeBannerShema = new mongoose.Schema({
    HomeBannerImage:{
        type: String,
        required: true
    }
})

const HomeBanner = mongoose.model('HomeBanner',HomeBannerShema)
module.exports = HomeBanner;