import dbConnect from "../../../config/mongo";
import Product from "../../../models/Product";

export default async function handler(req, res) {
	const {
		method,
		query: { id },
	} = req;

	dbConnect();

	// Get all products
	if (method === "GET") {
		try {
			const product = await Product.findById(id);

			res.status(200).json(product);
		} catch (err) {
			res.status(500).json(err);
		}
	}

	// Update a product
	if (method === "PUT") {
		try {
			const product = await Product.findByIdAndUpdate(id, req.body, {
				new: true,
			});
			res.status(200).json(product);
		} catch (err) {
			res.status(500).json(err);
		}
	}

	// Delete a product
	if (method === "DELETE") {
		try {
			await Product.findByIdAndDelete(id);
			res.status(200).json("Product deleted");
		} catch (err) {
			res.status(500).json(err);
		}
	}
}
