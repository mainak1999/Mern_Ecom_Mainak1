const razorpay=require("../config/razorPayClient");
const orderService = require("../services/order.service")


const createPaymentLink=async(orderId)=>{
    try{
        const order = await orderService.findOrderById(orderId);

        const paymentLinkRequest={
            amount:order.totalDiscountedPrice * 100,
            currency:"INR",
            customer:{
                name:order.user.firstName+" "+order.user.lastName,
                contact:order.user.mobile,
                email:order.user.email
            },
           
           
            callback_url: `http://localhost:3000/payment/${orderId}`,
            callback_method:'get'
        };
        console.log(order.totalPrice)
        console.log(orderId);

        const paymentLink=await razorpay.paymentLink.create(paymentLinkRequest);

        const paymentLinkId=paymentLink.id;
        const payment_link_url=paymentLink.short_url;

        const resData={
            paymentLinkId,
            payment_link_url
        }
        
        return resData;
        
    }catch(error){
        console.error("Error creating payment link:", error);
        throw new Error(error.message)
    }

}

const updatePaymentInformation = async(reqData)=>{

    const paymentId=reqData.payment_id;
    const orderId=reqData.order_id;
    try{
        const order=await orderService.findOrderById(orderId);
        const payment = await razorpay.payments.fetch(paymentId);
        if(payment.status=="captured"){
            order.paymentDetails.paymentId = paymentId;
            order.paymentDetails.status="COMPLETED";
            order.orderStatus="PLACED";

            await order.save()
        }
        const resData={message:"Your order is Placed", success:true};

        return resData;



    }catch(error){
        throw new Error(error.message)
    }
}
module.exports={
    createPaymentLink,
    updatePaymentInformation
}