const Razorpay = require('razorpay');
const apiKey = "rzp_test_n2KVSKrCRENCP4";
const apiSecret = "QjbnJbWLyvzCJkMtYOl4RZjJ";

const razorpay = new Razorpay({
  key_id: apiKey,
  key_secret: apiSecret
});

module.exports = razorpay;
