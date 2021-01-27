const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PriceInfoSchema = new Schema(
  {
    priceADAETH: {
      type: Number     
    },   
  },
  { timestamps: true }
);

module.exports = PriceInfo = mongoose.model("priceADAETH", PriceInfoSchema);