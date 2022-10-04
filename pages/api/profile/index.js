import dbConnect from "../../../config/mongo";
import Order from "../../../models/Order";
import User from "../../../models/User";
import { isVerified } from "../../../middleware/authMiddleware";

export default async function handler(req, res) {
	const { method } = req;
	dbConnect();

	// Get my order
	if (method === "GET") {
		const user = await User.findById(req.user._id);
		if (isVerified) {
			try {
				const orders = await Order.find({ userId: user._id });
				res.status(201).json(orders);
			} catch (err) {
				res.status(500).json(err);
			}
		} else {
			res.status(404).json("You are not authorized to access this route");
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
