const mongoose = require("mongoose");

const siteContentSchema = new mongoose.Schema({
  page: {
    type: String,
    unique: true,
    required: true,
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports =
  mongoose.models.SiteContent ||
  mongoose.model("SiteContent", siteContentSchema);
