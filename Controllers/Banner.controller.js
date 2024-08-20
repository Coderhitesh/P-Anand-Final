const mainBanner = require('../Models/Banner.Model')
const { uploadImage, deleteImageFromCloudinary } = require('../utils/Cloudnary')
const fs = require("fs")

exports.createBanner = async (req, res) => {
    try {
        let newBanner = new mainBanner({});

        if (req.file) {
            const imgUrl = await uploadImage(req.file.path);
            newBanner.bannerImage = imgUrl;

            try {
                fs.unlinkSync(req.file.path);
            } catch (error) {
                console.error("Error deleting local image file:", error);
            }
        } else {
            return res.status(400).json({
                success: false,
                message: "Please select an image to upload"
            });
        }

        await newBanner.save();

        res.status(200).json({
            success: true,
            message: 'Banner created successfully',
            data: newBanner
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

exports.getAllBanner = async (req,res) => {
    try {
        const allBanner = await mainBanner.find()
        if(!allBanner) {
            return res.status(404).json({
                success: false,
                message: 'No banner found'
            })
        }
        res.status(200).json({
            success: true,
            message: 'All banner found',
            data: allBanner
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

exports.deletebanner = async (req,res) => {
    try {
        const id = req.params._id
        const banner = await mainBanner.findByIdAndDelete(id)
        if(!banner) {
            return res.status(404).json({
                success: false,
                message: 'Banner not found'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Banner deleted successfully',
            data: banner
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

exports.updateBanner = async (req, res) => {
    try {
        const id = req.params._id;
        const banner = await mainBanner.findById(id);

        if (!banner) {
            return res.status(404).json({
                success: false,
                message: "Banner not found"
            });
        }

        // Update fields if provided
        if (req.body.bannerName) {
            banner.bannerName = req.body.bannerName;
        }

        // Handle image update if a new image is uploaded
        if (req.file) {
            const oldImage = banner.bannerImage.split("/").pop().split(".")[0];
            try {
                await deleteImageFromCloudinary(oldImage);
            } catch (error) {
                console.error("Error deleting old image from Cloudinary:", error);
            }

            const imgUrl = await uploadImage(req.file.path);
            banner.bannerImage = imgUrl;

            try {
                fs.unlinkSync(req.file.path);
            } catch (error) {
                console.error("Error deleting local image file:", error);
            }
        }

        // Save the updated banner
        await banner.save();

        res.status(200).json({
            success: true,
            message: "Banner updated successfully",
            data: banner
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};
