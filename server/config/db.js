import mongoose from "mongoose"

export async function connectDB() {
    const conn = await mongoose.connect("mongodb+srv://Arundas:bgDSlQOIc3yPbBsI@cluster0.zihzh.mongodb.net/product")
    try {
        console.log(`MongoDB Connected : ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error , ${error.message}`)
    }
}