import mongoose from "mongoose";
import dotenv from 'dotenv'


dotenv.config()

export const connectDB = async () => {
	try {
		
		const conn = await mongoose.connect('mongodb+srv://billetterie49_db_user:Dm5kXOrVbK4ERpMe@cluster0.jy9clji.mongodb.net/')
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.log("Error connection to MongoDB: ", error.message);
		process.exit(1); // 1 is failure, 0 status code is success
	}
};
