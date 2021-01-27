const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PriceInfoSchema = new Schema(
  {
    priceBCHUSD: {
      type: Number     
    },   
  },
  { timestamps: true }
);

module.exports = PriceInfo = mongoose.model("priceBCHUSD", PriceInfoSchema);