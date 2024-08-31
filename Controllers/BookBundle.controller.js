const BookBundle = require('../Models/BookBundle.Model');
const { uploadImage, deleteImageFromCloudinary } = require('../utils/Cloudnary');
const fs = require('fs')

exports.createBookBundle = async (req, res) => {
    try {
        const { bundleName, bundleDescription, bundlePrice, bundleDiscountPercent, bundlePriceAfterDiscount, categoryId, tag, bundleBookId } = req.body;
        const emptyField = [];
        let formattedBundleCourseId = [];

        // Validation
        if (!bundleName) emptyField.push('Bundle Name');
        if (!bundlePrice) emptyField.push('Bundle Price');
        if (!bundlePriceAfterDiscount) emptyField.push('Bundle After Discount Price');
        if (!bundleDiscountPercent) emptyField.push('Bundle Discount Percent');
        if (!categoryId) emptyField.push('Category ID');
        if (!tag) emptyField.push('Tag');
        if (!bundleDescription) emptyField.push('Bundle Description');
        if (!mode || mode.length === 0) emptyField.push('Bundle Mode');
        if (!bundleCourseIds || bundleCourseIds.length === 0) emptyField.push('Bundle Course ID');
        if (emptyField.length > 0) {
            return res.status(400).json({
                status: false,
                message: `Please fill in the following fields: ${emptyField.join(', ')}`
            });
        }

        // Format the bundleCourseId to match schema requirements
        if (bundleBookId) {
            if (typeof bundleBookId === 'string') {
                formattedBundleCourseId = [{ id: bundleBookId }];
            } else if (Array.isArray(bundleBookId)) {
                formattedBundleCourseId = bundleBookId.map(courseId => ({ id: courseId }));
            } else {
                return res.status(400).json({ message: "Invalid data type for bundleBookId" });
            }
        }

        let newBookBundle = new BookBundle({
            bundleName,
            bundleDescription,
            bundlePrice,
            bundleDiscountPercent,
            bundlePriceAfterDiscount,
            categoryId,
            tag,
            bundleBookId: formattedBundleCourseId
        })

        // Handle image upload
        if (req.file) {
            const imgUrl = await uploadImage(req.file.path);
            const { image, public_id } = imgUrl;
            newBookBundle.bundleImage = { url: image, public_id };

            try {
                fs.unlinkSync(req.file.path);
            } catch (error) {
                console.error("Error deleting file from local storage", error);
            }
        } else {
            return res.status(400).json({
                success: false,
                message: "Image is required."
            });
        }

        const newBookBundleSave = await newBookBundle.save();

        if(!newBookBundleSave) {
            if (newBookBundleSave.bundleImage.public_id) await deleteImageFromCloudinary(newBookBundleSave.bundleImage.public_id)
            return res.status(400).json({success: false, message: 'failed to save Book bundle'})
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: 'Error creating book bundle',
        })
    }
}