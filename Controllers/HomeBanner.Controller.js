const HomeBanner = require('../Models/HomeBanner.Model')

exports.createHomeBanner = async (req,res) => {
    try {
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}