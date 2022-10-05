import dbConnect from "../../../config/mongo";
import Order from "../../../models/Order";

export default async function handler(req, res) {
	const { method } = req;
	dbConnect();

	// Get my order
	if (method === "GET") {
		try {
			const orders = await Order.find({ userId: user._id });
			res.status(201).json(orders);
		} catch (err) {
			res.status(500).json(err);
		}
	}

	// Get all orders
	if (method === "GET") {
		try {
			const orders = await Order.find();

			res.status(200).json(orders);
		} catch (err) {
			res.status(500).json(err);
		}
	}
}
