import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../styles/CashPayment.module.css";
import { toast } from "react-toastify";

const CashPayment = ({ total, setCash, createOrder }) => {
	const [customerName, setCustomerName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [address, setAddress] = useState("");

	const {
		user: { user },
	} = useSelector((state) => state.auth);

	const handleCreate = (e) => {
		// e.preventDefault();

		createOrder({
			userId: user._id,
			email: user.email,
			customerName,
			phoneNumber,
			address,
			total,
			method: 0,
		});

		toast.success("Order created", { theme: "colored" });
	};

	return (
		<div className={styles.container}>
			<div className={styles.paymentDetails}>
				<span className={styles.cancel} onClick={() => setCash(false)}>
					X
				</span>
				<h1 style={{ marginTop: "30px" }}>
					You will pay <span style={{ color: "teal" }}>${total}</span> after
					delivery
				</h1>
				<div className={styles.inputGroup}>
					<label className={styles.label}>Full Name</label>
					<input
						type="text"
						placeholder="Enter your fullname"
						onChange={(e) => setCustomerName(e.target.value)}
					/>
				</div>
				<div className={styles.inputGroup}>
					<label className={styles.label}>Phone</label>
					<input
						type="text"
						placeholder="Enter your phone number"
						onChange={(e) => setPhoneNumber(e.target.value)}
					/>
				</div>
				<div className={styles.inputGroup}>
					<label className={styles.label}>Address</label>
					<textarea
						type="text"
						placeholder="Enter your delivery address"
						onChange={(e) => setAddress(e.target.value)}
					></textarea>
				</div>
				<button className={styles.order} onClick={handleCreate}>
					PLACE ORDER
				</button>
			</div>
		</div>
	);
};

export default CashPayment;
