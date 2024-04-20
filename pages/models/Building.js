// Create a models/Building.js file
import mongoose from 'mongoose';

const buildingSchema = new mongoose.Schema({
  name: String,
  address: String,
  image: String, // Store Base64 encoded image
});

export default mongoose.model('Building', buildingSchema);
