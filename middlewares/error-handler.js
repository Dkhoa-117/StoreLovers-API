const errorHandler = async (error, req, res, next) => {
	console.log(error);
	return res.status(500).json({ error: "Something went wrong!" });
};

module.exports = errorHandler;
