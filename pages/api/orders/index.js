import dbConnect from "../../../config/mongo";
import Order from "../../../models/Order";
import User from "../../../models/User";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
	const { method } = req;
	dbConnect();

	// Create order
	if (method === "POST") {
		const token = getCookie("token", { req, res });
		try {
			jwt.verify(token, process.env.JWT, async (err, userInfo) => {
				if (err) return res.status(400).json(err);
				const createdOrder = await Order.create({
					userId: userInfo._id,
					...req.body,
				});
				res.status(201).json(createdOrder);
			});
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
