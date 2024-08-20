const MainCourse = require('../Models/Course.Model')
const { uploadImage , deleteImageFromCloudinary } = require('../utils/Cloudnary')
const fs = require('fs');

exports.createCourse = async (req, res) => {
    try {
        const { courseName, courseDescription, coursePrice, coursePriceAfterDiscount, courseDiscountPercent, courseCategory, courseSubCategory, courseBundleName, courseTagName } = req.body
        const emptyField = []
        if (!courseName) emptyField.push('Course Name')
        if (!courseDescription) emptyField.push('Course Description')
        if (!coursePrice) emptyField.push('Course Price')
        if (!coursePriceAfterDiscount) emptyField.push('Course Price After Discount')
        if (!courseDiscountPercent) emptyField.push('Course Discount Percent')
        if (!courseCategory) emptyField.push('Course Category')
        if (!courseSubCategory) emptyField.push('Course Sub Category')
        if (!courseBundleName) emptyField.push('Course Bundle Name')
        if (!courseTagName) emptyField.push('Course Tag Name')
        if (emptyField.length > 0) {
            return res.status(400).json({ message: `Please fill in the following fields: ${emptyField.join(', ')}` })
        }
        const newCourse = new MainCourse({
            courseName,
            courseDescription,
            coursePrice,
            coursePriceAfterDiscount,
            courseDiscountPercent,
            courseCategory,
            courseSubCategory,
            courseBundleName,
            courseTagName
        })

        if (req.file) {
            const imgUrl = await uploadImage(req.file.path);
            const { image, public_id } = imgUrl;
            newCourse.courseImage.url = image;
            newCourse.courseImage.public_id = public_id;
            try {
                fs.unlinkSync(req.file.path);
            } catch (error) {
                console.log('Error deleting file from local storage', error)
            }
        } else {
            return res.status(400).json({
                success: false,
                message: 'Please upload a course image',
            })
        }

        const newCourseSave = await newCourse.save();

        if (!newCourseSave) {
            await deleteImageFromCloudinary(newCourseSave.courseImage.public_id)
            return res.status(400).json({
                success: false,
                message: 'Failed to save course',
            })
        }

        res.status(200).json({
            success: true,
            message: 'Course saved successfully',
            data: newCourseSave
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error in Creating Course"
        })
    }
}

exports.getAllCourse = async (req, res) => {
    try {
        const allCourse = await MainCourse.find()
        if (!allCourse) {
            return res.status(400).json({
                success: false,
                message: 'No courses found'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Courses founded successfully',
            data: allCourse
        })
    } catch (error) {
        console.log(error)
        res.stause(500).json({
            success: false,
            message: "Internal Server Error in Getting All Courses"
        })
    }
}

exports.deleteCourse = async (req, res) => {
    try {
        const id = req.params._id
        const course = await MainCourse.findById(id)
        if(!course){
            return res.status(400).json({
                success: false,
                message: 'Course not found'
            })
        }
        await course.deleteOne()
        res.status(200).json({
            success: true,
            message: 'course deleted successfully',
            data: course
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server erron in course deleting'
        })
    }
}

exports.getSingleCourse = async (req,res) => {
    try {
        const id = req.params._id
        const singleCourse = await MainCourse.findById(id)
        if(!singleCourse){
            return res.status(400).json({
                success: false,
                messsage: 'no course found'
            })
        }

        res.status(200).json({
            success: true,
            message: "Course founded successfully",
            data: singleCourse
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error in finding single course'
        })
    }
}

exports.updateCourse = async (req,res) => {
    try {
        const id = req.params._id
        const {
            courseName,
            courseDescription,
            coursePrice,
            coursePriceAfterDiscount,
            courseDiscountPercent,
            courseCategory,
            courseSubCategory,
            courseBundleName,
            courseTagName
        } = req.body
        const data = await MainCourse.findById(id)
        if(!data){
            return res.status(400).json({
                success: false,
                message: 'Course not found'
            })
        }

        if(courseName) data.courseName = courseName
        if(courseDescription) data.courseDescription = courseDescription
        if(coursePrice) data.coursePrice = coursePrice
        if(coursePriceAfterDiscount) data.coursePriceAfterDiscount = coursePriceAfterDiscount
        if(courseDiscountPercent) data.courseDiscountPercent = courseDiscountPercent
        if(courseCategory) data.courseCategory = courseCategory
        if(courseSubCategory) data.courseSubCategory = courseSubCategory
        if(courseBundleName) data.courseBundleName = courseBundleName
        if(courseTagName) data.courseTagName = courseTagName

         // Handle image update
         if (req.file) {
            const oldImagePublicId = data.courseImage.public_id;
            if (oldImagePublicId) {
                try {
                    await deleteImageFromCloudinary(oldImagePublicId);
                } catch (error) {
                    console.error("Error deleting old image from Cloudinary:", error);
                }
            }

            // Upload new image to Cloudinary
            const imgUrl = await uploadImage(req.file.path);
            const { image, public_id } = imgUrl;
            data.courseImage = { url: image, public_id };

            try {
                fs.unlinkSync(req.file.path);
            } catch (error) {
                console.error("Error deleting local image file:", error);
            }
        }
        await data.save()
        res.status(200).json({
            success: true,
            message: 'Course updated successfully',
            data: data
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal Seerver error in update course'
        })
    }
}