const express = require('express')
const upload = require("../middlewares/Multer")
const { register, login, logout, passwordChangeRequest, verifyOtpAndChangePassword, resendOtp, addDeliveryDetails, userDetails, GetDeliveryAddressOfUser, updateDeliveryAddress, getAllUsers } = require('../Controllers/Usercontroller')
const { protect } = require('../middlewares/Protect')
const { createBundle, getAllBundles, deleteSingleBundle, updateBundle, getSingleBundle } = require('../Controllers/Bundle.Controller')
const { createCategory } = require('../Controllers/Category.Controller')
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

module.exports = router