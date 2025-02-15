import mongoose from "mongoose";

// Define the schema for the company
const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  website: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  logo: {
    type: String, // Store the file path or URL of the logo image
    required: false,
  },
  file: {
    type: String, // Assuming you are storing a URL or file path
    required: false, // Optional field
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

export const Company = mongoose.model('Company', companySchema);
