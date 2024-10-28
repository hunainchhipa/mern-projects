const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const search = "ab";
  const products = await Product.find({ price: { $gt: 30 } })
    .sort("price")
    .select("name price company");
  // .limit(10)
  // .skip(1);
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false; // Convert 'featured' to a boolean.
  }
  if (company) {
    queryObject.company = company; // Add 'company' to the query object.
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  console.log(queryObject);
  // Initialize query
  let result = Product.find(queryObject);

  // Handle sorting
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt"); // Default sort by createdAt
  }
  // in this sort function the second parameter values are not sorted

  // get particular fields
  if (fields) {
    const fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // Apply pagination
  result = result.skip(skip).limit(limit);

  // Get total count of products matching the query (without pagination)
  const totalProducts = await Product.countDocuments(queryObject);

  // Execute the query to get paginated products
  const products = await result;

  // Map product data to include absolute URLs for images
  const productsWithImagePaths = products.map((product) => ({
    ...product._doc, // Spread the product data
    image: `${req.protocol}://${req.get("host")}${product.image || ""}`, // Construct absolute image URL
  }));

  // Calculate total pages
  const totalPages = Math.ceil(totalProducts / limit);

  res.status(200).json({
    products: productsWithImagePaths,
    nbHits: products.length,
    totalPages,
  });
};

module.exports = { getAllProductsStatic, getAllProducts };
