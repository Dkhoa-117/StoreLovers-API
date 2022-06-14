require("dotenv").config();
require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const errorHandler = require("./middlewares/error-handler");
const notFound = require("./middlewares/not-found");
const products = require("./routes/Products");

// middlewares
app.use(express.json());

// routes
app.get("/", (req, res) => {
	res.send("<h1>Store API</h1>");
});
app.use("/api/v1/products", products);
app.use(notFound);
app.use(errorHandler);

console.log("Store API is Running...");

// database connection...
mongoose
	.connect(process.env.MONGODB_CONNECTION)
	.then(() => console.log("connect to Database"))
	.catch((error) => console.log(error));

port = 3000 || process.env.PORT;
app.listen(port, () => {
	console.log(`listening on ${port}`);
});
