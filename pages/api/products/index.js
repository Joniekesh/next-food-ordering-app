import dbConnect from "../../../config/mongo";
import Product from "../../../models/Product";
import { getCookie } from "cookies-next";

export default async function handler(req, res) {
	const { method } = req;
	dbConnect();

	// Create product
	if (method === "POST") {
		try {
			const products = await Product.create(req.body);
			return res.status(201).json(products);
		} catch (err) {
			res.status(500).json(err);
		}
	}

	// Get all products
	if (method === "GET") {
		try {
			const products = await Product.find();

			res.status(200).json(products);
		} catch (err) {
			res.status(500).json(err);
		}
	}
}
