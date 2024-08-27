const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  phone: Number,
  description: String,
});

module.exports =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);
