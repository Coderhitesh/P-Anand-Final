const { uploadImage, deleteImageFromCloudinary } = require("../utils/Cloudnary");
const Bundle = require('../Models/Bundles.Model')
const fs = require("fs")

exports.createBundle = async (req, res) => {
    try {
        const { bundleName, bundlePrice, bundleCourseName } = req.body;
        const emptyField = []
        if (!bundleName) {
            emptyField.push('Bundle Name')
        }
        if (!bundlePrice) {
            emptyField.push('Bundle Price')
        }
        if (!bundleCourseName) {
            emptyField.push('Bundle Course Name')
        }
        if (emptyField > 0) {
            return res.status(400).json({
                status: false,
                message: `Please fill in the following fields: ${emptyField.join(', ')}`
            })
        }

        let newBundle = new Bundle({
            bundleName,
            bundlePrice,
            bundleCourseName
        })

        if (req.file) {
            const imgUrl = await uploadImage(req.file.path);
            newBundle.bundleImage = imgUrl;
            try {
                fs.unlinkSync(req.file.path)
            } catch (error) { }
        } else {
            return res.status(400).json({
                success: false,
                message: "Image is required."
            });
        }

        await newBundle.save();

        res.status(200).json({
            success: true,
            message: 'Bundle created successfully',
            data: newBundle
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

exports.getAllBundles = async (req, res) => {
    try {
        const allBundles = await Bundle.find()
        if (!allBundles) {
            return res.status(404).json({
                success: false,
                message: 'No bundles found'
            })
        }

        res.status(200).json({
            success: true,
            message: 'All Bundle Founded',
            data: allBundles
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

exports.deleteSingleBundle = async (req, res) => {
    try {
        const id = req.params._id
        // console.log(id)
        const bundle = await Bundle.findByIdAndDelete(id)
        if (!bundle) {
            return res.status(404).json({
                success: false,
                message: 'Bundle not found',
                
            })
        }
        res.status(200).json({
            success: true,
            message: 'Bundle deleted',
            data: bundle
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

exports.updateBundle = async (req, res) => {
    try {
        const data = await Bundle.findOne({ _id: req.params._id });
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Bundle not found"
            });
        } else {
            data.bundleName = req.body.bundleName ?? data.bundleName;
            data.bundlePrice = req.body.bundlePrice ?? data.bundlePrice;
            data.bundleCourseName = req.body.bundleCourseName ?? data.bundleCourseName;

            if (req.file) {
                const oldImage = data.bundleImage.split("/").pop().split(".")[0];
                try {
                    await deleteImageFromCloudinary(oldImage);
                } catch (error) {
                    console.error("Error deleting old image from Cloudinary:", error);
                }
                const imgUrl = await uploadImage(req.file.path);
                data.bundleImage = imgUrl;
                try {
                    fs.unlinkSync(req.file.path);
                } catch (error) {
                    console.error("Error deleting local image file:", error);
                }
            }

            await data.save();

            res.status(200).json({
                success: true,
                message: "Bundle updated successfully",
                data: data
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

exports.getSingleBundle = async (req,res) => {
    try {
        const id = req.params._id
        console.log(id)
        const singleBundle = await Bundle.findById(id)
        if(!singleBundle){
            return res.status(404).json({
                success: false,
                message: "Bundle not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Bundle found",
            data: singleBundle
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}