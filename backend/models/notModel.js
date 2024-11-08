const mongoose = require("mongoose");

const notSchema = new mongoose.Schema(
  {
    baslik: {
      type: String,
      required: true,
    },
    aciklama: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Not", notSchema);
