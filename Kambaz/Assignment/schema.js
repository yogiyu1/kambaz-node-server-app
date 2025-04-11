import mongoose from "mongoose"; 

const DetailSchema = new mongoose.Schema({
    dueDate: {
      type: String, 
      required: false,
      default: ""
    },
    points: {
      type: Number,
      required: false,
      default: 0
    },
    availableFrom: {
      type: String, 
      required: false,
      default: ""
    },
    description: {
      type: String,
      required: false,
      default: ""
    },
    modules: {
      type: [String],
      required: false,
      default: []
    }
  });   
const schema = new mongoose.Schema({
    _id: String,
    title: String,
    detail: {
        type: DetailSchema,
        required: false,
        default: {}
      },
    course: { type: String, ref: "CourseModel" },
}, { collection: "assignments" }
);
export default schema;