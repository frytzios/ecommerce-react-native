import mongoose from "mongoose";
import { Product } from "../models/product.model.js";
import { ENV } from "../config/env.js";

const products = [
    {
        name: 'Wireless Bluetooth HeadPhones',
        description:
        'Premium over-ear headphones with active noise cancellation, 30-hour battery life,and premium sound quality. Perfect for music lovers and travelers',
        price: 149.99,
        stock: 50,
        category: 'Electronics',
        images:[
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
            'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500',
        ],
        averageRating: 4.5,
        totalReviews: 128,
    },
    {
        name: 'Stainless Steel Cookware Set',
        description:
        '10-piece stainless steel cookware set with non-stick coating, ergonomic handles, and oven-safe design. Ideal for home chefs and cooking enthusiasts.',
        price: 199.99,
        stock: 30,
        category: 'Home & Kitchen',
        images:[
            'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=500',
            'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500',
        ],
        averageRating: 4.7,
        totalReviews: 85,
    },
    
];

const seedDatabase = async () => {
    try {
        //conectar a la base de datos
        await mongoose.connect(ENV.DB_URL);
        console.log("Connected to MongoDB");
    
        //eliminar los productos existentes
        await Product.deleteMany({});
        console.log("Existing products removed");
       
        //insertar los productos de ejemplo
        await Product.insertMany(products);
        console.log(`Successfully seeded ${products.length} products`);

        const categories = [...new Set(products.map((p) => p.category))];
        console.log('Seeded Products summary : ');
        console.log(`Total Products : ${products.length}`);
        console.log(`Categories: ${categories.join(', ')}`);

        //close connection
        await mongoose.connection.close();
        console.log('Database seeding completed and connection closed');
        process.exit(0);
    }catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
}

seedDatabase();