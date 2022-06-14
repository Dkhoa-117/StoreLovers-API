const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Product name must be provided"],
	},
	price: {
		type: Number,
		required: [true, "Product price must be provided"],
	},
	company: {
		type: String,
		enum: {
			values: ["ikea", "liddy", "caressa", "marcos"],
			message: "{VALUE} is not supported",
		},
	},
	rating: {
		type: Number,
		default: 0,
	},
	createAt: {
		type: Date,
		default: Date.now,
	},
	featured: {
		type: Boolean,
		required: false,
	},
});

module.exports = mongoose.model("Product", ProductSchema);
