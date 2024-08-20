const express = require('express')
const upload = require("../middlewares/Multer")
const { register, login, logout, passwordChangeRequest, verifyOtpAndChangePassword, resendOtp, addDeliveryDetails, userDetails, GetDeliveryAddressOfUser, updateDeliveryAddress, getAllUsers } = require('../Controllers/Usercontroller')
const { protect } = require('../middlewares/Protect')
const { createBundle, getAllBundles, deleteSingleBundle, updateBundle, getSingleBundle } = require('../Controllers/Bundle.Controller')
const { createCategory, getAllCategory, singleCategory, deleteCategory, updateCategory } = require('../Controllers/Category.Controller')
const { createBanner, getAllBanner, deletebanner, updateBanner } = require('../Controllers/Banner.controller')
const { createCourse, getAllCourse, getSingleCourse, deleteCourse, updateCourse } = require('../Controllers/Course.controller')
const { createTag, getAllTag, getSingleTag, updateTag, deleteTag } = require('../Controllers/Tag.Controller')
const router = express.Router()

// user routers 

router.post('/Create-User', register)
router.post('/Login', login)
router.get('/Logout', protect, logout)
router.post('/Password-Change', passwordChangeRequest)
router.post('/Verify-Otp', verifyOtpAndChangePassword)
router.post('/resend-otp', resendOtp)


router.post('/Add-Delivery-Address', protect, addDeliveryDetails)
router.get('/user-details', protect, userDetails)
router.get('/get-Delivery-Address', protect, GetDeliveryAddressOfUser)
router.post('/update-Delivery-Address', protect, updateDeliveryAddress)
router.get('/AllUser', getAllUsers)

// bundle routers 

router.post('/create-Bundle',upload.single("bundleImage"),createBundle)
router.get('/get-all-Bundles',getAllBundles)
router.delete('/delete-bundle/:_id',deleteSingleBundle)
router.put('/update-bundle/:_id',upload.single("bundleImage"),updateBundle)
router.get('/single-bundle/:_id',getSingleBundle)

// category routers 

router.post('/create-category',createCategory)
router.get('/get-all-category',getAllCategory)
router.get('/single-category/:_id',singleCategory)
router.delete('/delete-category/:_id', deleteCategory)
router.put('/update-category/:_id',updateCategory)

// banner routers 

router.post('/create-banner', upload.single('bannerImage'), createBanner);
router.get('/get-all-banner',getAllBanner)
router.delete('/delete-banner/:_id',deletebanner)
router.put('/update-baner/:_id',upload.single('bannerImage'),updateBanner)

// tag routers 

router.post('/create-tag',createTag)
router.get('/get-all-tag',getAllTag)
router.get('/single-tag/:_id',getSingleTag)
router.put('/update-tag/:_id',updateTag)
router.delete('/delete-tag/:_id',deleteTag)

// course routers 

router.post('/create-course',upload.single('courseImage'),createCourse)
router.get('/get-all-course',getAllCourse)
router.get('/single-course/:_id',getSingleCourse)
router.delete('/delete-course/:_id',deleteCourse)
router.put('/update-course/:_id',upload.single('courseImage'),updateCourse)

module.exports = router