const router = require("express").Router();
const { getAllProducts } = require("../controllers/Products");

router.route("/").get(getAllProducts);

module.exports = router;
