import mongoose from "mongoose";

import {ENV} from "./env.js"

export const connectDB = async () => {
    try {
        const conn= await mongoose.connect(ENV.DB_URL);
        console.log(`Base de datos conectada: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error de conexión a la base de datos:`);
        process.exit(1);
    }
}