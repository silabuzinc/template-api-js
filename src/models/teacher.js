import mongoose from "mongoose";


const teacherSchema = new mongoose.Schema({
 name: String,
 lastname: String,
 salary: Number
});


const Teacher = mongoose.model("Teacher", teacherSchema);


export default Teacher;