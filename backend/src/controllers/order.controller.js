import { Order } from '../models/order.model.js';
import { Product } from '../models/product.model.js';
import { Review } from '../models/review.model.js';

export async function createOrder(req, res) { 
    try{
        const user = req.user;
        const {} = req.body;

        if(!orderItems || orderItems.length ===0){
            return res.status(400).json({error:'No order items provided'});
        }

        //validar productos y stock
        for(const item of orderItems){
            const product = await Product.findById(item.product._id);
            if(!product){
                return res.status(404).json({error:`Product ${item.name} not found`});
            }
            if(product.stock < item.quantity){
                return res.status(400).json({error:`Insufficient stock for product ${product.name}`});
            }
        }
        const order = await Order.create({
            user: user._id,
            clerkId: user.clerkId,
            orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
        });

        //update stock
        for(const item of orderItems){
            await Product.findByIdAndUpdate(item.product._id , {
                $inc: { stock: -item.quantity}
            });
        }
        res.status(201).json({message: 'Order created successfully' , order});

    }catch(error){
        console.error('Error al crear el controlador' , error);
        res.status(500).json({error:'internal server error'});

    }
}

export async function getUserOrders(req, res) {
    try{
        const orders = await Order.find({ user: req.user._id})
        .populate('orderItems.product')
        .sort({ createdAt: -1});
        //check if orders exist

        const orderIds = orders.map( (order) => order._id );
        const reviews = await Review.find( { orderId: { $in: orderIds}});
        const reviewedOrderIds = new Set(reviews.map( (review) => review.orderId.toString() ) );


        
        const ordersWithReviews = await Promise.all(
            orders.map(async (order) => {
            const reviews = await Review.findOne({ orderId: order._id});
            return {
                ...order.toObject(),
                hasReviewed: reviewedOrderIds.has(order._id.toString()),
            };
        })
    );
        res.status(200).json({ orders: ordersWithReviewStauts});
            
    }catch(error){
        console.error('Error fetching user orders' , error);
        res.status(500).json({ message: "Internal Server Error" });

    }
}