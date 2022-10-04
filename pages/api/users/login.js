import dbConnect from "../../../config/mongo";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
	const { method } = req;
	dbConnect();

	// Login user
	if (method === "POST") {
		const { email, password } = req.body;

		try {
			const user = await User.findOne({ email });

			if (!user) {
				return res.status(404).json("Invalid Credential");
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json("Invalid credential");
			}

			const token = await jwt.sign({ _id: user._id }, process.env.JWT);

			res.status(200).json({ user, token });
		} catch (err) {
			res.status(500).json(err);
		}
	}
}
