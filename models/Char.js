import mongoose from "mongoose";
const charSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  show: {
    type: String,
    required: true,
  },
  imgLink: {
    type: String,
    required: true,
  },
});
export const Char = mongoose.model("Char", charSchema);
