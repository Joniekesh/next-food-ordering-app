import dbConnect from "../../../config/mongo";
import User from "../../../models/User";

export default async function handler(req, res) {
	const { method } = req;
	dbConnect();

	// Update user
	if (method === "PUT") {
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
			const user = await User.findById(req.user.id);
			if (!user) {
				res.status(404).json("User not found");
			} else {
				user.fullName = user || user.fullName;
				user.email = email || user.email;
				user.phoneNumber = phoneNumber || user.phoneNumber;
			}

			res.status(201).json(user);
		} catch (err) {
			res.status(500).json(err);
		}
	}
}
