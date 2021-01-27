const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PriceInfoSchema = new Schema(
  {
    priceCOMPUSD: {
      type: Number     
    },   
  },
  { timestamps: true }
);

module.exports = PriceInfo = mongoose.model("priceCOMPUSD", PriceInfoSchema);