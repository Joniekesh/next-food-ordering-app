import styles from "../styles/Address.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { addAddress } from "../redux/deliveryAddressRedux";

const Address = () => {
	const { userAddress } = useSelector((state) => state.address);

	const [customerName, setCustomerName] = useState(userAddress?.customerName);
	const [phoneNumber, setPhoneNumber] = useState(userAddress?.phoneNumber);
	const [address, setAddress] = useState(userAddress?.address);

	const router = useRouter();
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);
	const isAuthenticated = user?.token;

	useEffect(() => {
		if (!isAuthenticated) {
			router.push("/auth");
		}
	}, [isAuthenticated]);

	const handleAddress = (e) => {
		e.preventDefault();

		if (!customerName || !phoneNumber || !address) {
			alert("All fields must be filled");
		}

		dispatch(addAddress({ customerName, phoneNumber, address }));
		router.push("/placeOrder");
	};

	return (
		<div className={styles.container}>
			<div className={styles.deliveryDetails}>
				<h1 className={styles.title}>Delivery Address</h1>
				<form className={styles.form}>
					<div className={styles.inputGroup}>
						<label className={styles.label}>Full Name</label>
						<input
							type="text"
							placeholder="Enter your fullname"
							value={customerName}
							onChange={(e) => setCustomerName(e.target.value)}
						/>
					</div>
					<div className={styles.inputGroup}>
						<label className={styles.label}>Phone</label>
						<input
							type="text"
							placeholder="Enter your phone number"
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
						/>
					</div>
					<div className={styles.inputGroup}>
						<label className={styles.label}>Address</label>
						<textarea
							type="text"
							placeholder="Enter your delivery address"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
						></textarea>
					</div>
					<button className={styles.order} onClick={handleAddress}>
						CONTINUE
					</button>
				</form>
			</div>
		</div>
	);
};

export default Address;
