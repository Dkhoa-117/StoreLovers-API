/** Using this to add data to the MongoDB database */
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");
const jsonProducts = require("./products.json");

mongoose
	.connect(process.env.MONGODB_CONNECTION)
	.then(() => console.log("SUCCESS!!"))
	.catch((error) => console.log(error));

const start = async () => {
	try {
		await Product.deleteMany();
		await Product.create(jsonProducts);
		console.log("Add Products Successful");
		process.exit();
	} catch (error) {
		console.log(error);
	}
};

start();
