import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},

		customerName: {
			type: String,
			required: true,
			maxlength: 60,
		},
		phoneNumber: {
			type: String,
		},
		address: {
			type: String,
			required: true,
			maxlength: 200,
		},
		total: {
			type: Number,
			required: true,
		},
		status: {
			type: Number,
			default: 0,
		},
		method: {
			type: Number,
			required: true,
		},
		isPaid: {
			type: Boolean,
			default: false,
		},
		paidAt: {
			type: Date,
			default: Date.now,
		},
		isDelivered: {
			type: Boolean,
			default: false,
		},
		deliveredAt: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
