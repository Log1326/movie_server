import mongoose from "mongoose";
mongoose.set('strictQuery', true);
export const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri, {
             useNewUrlParser: true,
             useUnifiedTopology: true,
         })
        console.log('MongoDB connected');
    }catch (e) {
        console.log('error with:' + e.message)
        process.exit(1)
    }
}