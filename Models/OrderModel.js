const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reqBodyData: {
        type: mongoose.Schema.Types.Mixed
    },
    razorpayOrderId:{ type: String },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
    transactionId: { type: String },
    PaymentDone: { type: Boolean, default: false },
    paymentStatus: { type: String },
})

module.exports = mongoose.model('Order', OrderSchema)