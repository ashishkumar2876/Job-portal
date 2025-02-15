import mongoose from "mongoose";

const connectDB=async ()=>{
    try {
        await mongoose.connect("mongodb+srv://ashishk792003:aaaaa@cluster0.ebrat.mongodb.net/");
        console.log('mongodb connected successfully');
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;