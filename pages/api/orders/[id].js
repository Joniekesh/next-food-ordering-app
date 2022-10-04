import dbConnect from "../../../config/mongo";
import Order from "../../../models/Order";

export default async function handler(req, res) {
	const {
		method,
		query: { id },
	} = req;
	dbConnect();

	// Get order by ID
	if (method === "GET") {
		try {
			const order = await Order.findById(id);

			res.status(200).json(order);
		} catch (err) {
			res.status(500).json(err);
		}
	}

	// Delete order
	if (method === "DELETE") {
		try {
			await Order.findByIdAndDelete(id);

			res.status(200).json("Order deleted");
		} catch (err) {
			res.status(500).json(err);
		}
	}

	// Update order
	if (method === "PUT") {
		try {
			const order = await Order.findByIdAndUpdate(id, req.body, { new: true });

			res.status(200).json(order);
		} catch (err) {
			res.status(500).json(err);
		}
	}
}
