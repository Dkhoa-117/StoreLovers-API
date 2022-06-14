const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
	const { featured, company, name, sort, fields, numbericFilters } = req.query;
	const queryObject = {};

	// filter feature ? true : false
	if (featured) {
		queryObject.featured = featured === "true" ? true : false;
	}

	// search company
	if (company) {
		queryObject.company = company;
	}

	// search name
	if (name) {
		queryObject.name = { $regex: name, $options: "i" };
	}
	// filter number fields
	if (numbericFilters) {
		const operationMap = {
			">": "$gt",
			"<": "$lt",
			"=": "$eq",
			"<=": "$lte",
			">=": "$gte",
		};
		const regEx = /\b(>|<|=|<=|>=)\b/g;
		let filter = numbericFilters.replace(
			regEx,
			(match) => `-${operationMap[match]}-`
		);
		const options = ["price", "rating"];
		filter = filter.split(",").forEach((element) => {
			const [field, operator, value] = element.split("-");
			if (options.includes(field)) {
				queryObject[field] = { [operator]: Number(value) };
			}
		});
	}

	let results = Product.find(queryObject);

	// sort -name or price
	if (sort) {
		const sortList = sort.split(",").join(" ");
		results = results.sort(sortList);
	}

	// filter results field wanna get
	if (fields) {
		const fieldsList = fields.split(",").join(" ");
		results = results.select(fieldsList);
	}

	// paging logit
	const limit = Number(req.query.limit) || 10;
	const page = Number(req.query.page) || 1;
	const skip = (page - 1) * limit;
	results.skip(skip).limit(limit);

	const products = await results;

	res.status(200).json({ success: true, amount: products.length, products });
};

module.exports = { getAllProducts };
