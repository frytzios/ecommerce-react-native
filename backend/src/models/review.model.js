import mongoose from "mongoose";
//creamos un esquema para las reseñas

const reviewSchema = new mongoose.Schema(
    {
        productId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        orderId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
            required: true,
        },
        rating:{
            type: Number,
            required: true,
            min: 1,
            max: 5,
        }
    },
    {timestamps: true}
);

//creamos el modelo de reseña
export const Review = mongoose.model('Review', reviewSchema);