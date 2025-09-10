const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, "Product name is required"], 
      trim: true 
    },
    description: { 
      type: String, 
      trim: true, 
      default: "No description provided" 
    },
    image: { 
      type: String, 
      required: [true, "Product image is required"] 
    },
    price: { 
      type: Number, 
      required: [true, "Product price is required"], 
      min: [0, "Price cannot be negative"] 
    },
    stock: { 
      type: Number, 
      default: 0, 
      min: [0, "Stock cannot be negative"] 
    },
    category: { 
      type: String, 
      trim: true, 
      default: "General" 
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
    updatedAt: { 
      type: Date, 
      default: Date.now 
    },
  },
  {
    timestamps: true, // automatically adds createdAt & updatedAt
  }
);

module.exports = mongoose.model("Product", productSchema);
