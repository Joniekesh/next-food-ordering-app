import dbConnect from "../../../config/mongo";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
	const { method } = req;
	dbConnect();

	// Register user
	if (method === "POST") {
		const { fullName, email, phoneNumber, password } = req.body;

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		const newUser = {
			fullName,
			email,
			phoneNumber,
			password: hash,
		};
		try {
			let user = await User.findOne({ email });

			if (user) {
				return res
					.status(400)
					.json(`User with email: ${user.email} already exist`);
			}

			user = await User.create(newUser);

			const token = await jwt.sign({ _id: newUser._id }, process.env.JWT);

			res.status(201).json({ user, token });
		} catch (err) {
			res.status(500).json(err);
		}
	}
}
