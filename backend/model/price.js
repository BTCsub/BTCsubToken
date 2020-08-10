const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PriceInfoSchema = new Schema(
  {
    priceXETHXXBT: {
      type: Number     
    },   
  },
  { timestamps: true }
);

module.exports = PriceInfo = mongoose.model("priceXETHXXBT", PriceInfoSchema);