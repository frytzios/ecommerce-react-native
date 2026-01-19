import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
        min:1,
        default:1,
    },
});

//creamos un esquema para el carrito
const cartSchema = new mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        clerkId:{
            type: String,
            required: true,
        },
        items:[ cartItemSchema],
    },
    {timestamps: true}
);

//creamos el modelo de carrito
export const Cart = mongoose.model('Cart', cartSchema);
 