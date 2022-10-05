import styles from "../styles/Profile.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

const Profile = ({ orders }) => {
	const [myOrders, setMyOrders] = useState([]);
	const { user } = useSelector((state) => state.auth);
	const currentUser = user?.user;

	useEffect(() => {
		const myOrder = orders.filter((order) => order.userId === currentUser?._id);
		setMyOrders(myOrder);
	}, [currentUser?._id, orders]);

	const latestOrder = myOrders[myOrders.length - 1];

	return (
		<div className={styles.container}>
			{currentUser?.fullName && currentUser?.isAdmin && (
				<Link href="/admin" passHref>
					<div className={styles.adminRedirect}>
						Welcome:{" "}
						<span
							style={{
								fontSize: "24px",
								color: "teal",
								fontWeight: "bold",
							}}
						>
							{currentUser?.fullName}
						</span>
						<br />
						<button
							style={{
								cursor: "pointer",
								padding: "5px",
								backgroundColor: "crimson",
								fontSize: "16px",
								color: "white",
								border: "none",
							}}
						>
							Go To Admin Dashboard
						</button>
					</div>
				</Link>
			)}
			<div className={styles.top}>
				<div className={styles.topLeft}>
					<h2 style={{ color: "teal", fontWeight: "bold" }}>User Info</h2>
					<div className={styles.item}>
						<span className={styles.title}>Full Name:</span>
						<span>{currentUser?.fullName}</span>
					</div>
					<div className={styles.item}>
						<span className={styles.title}>Email:</span>
						<span>{currentUser?.email}</span>
					</div>
					{currentUser?.phoneNumber && (
						<div className={styles.item}>
							<span className={styles.title}>Phone Number:</span>
							<span>{currentUser?.phoneNumber}</span>
						</div>
					)}
				</div>
				<div className={styles.topRight}>
					<h2 style={{ color: "teal", fontWeight: "bold" }}>
						Latest Delivery Address
					</h2>
					<div className={styles.item}>
						<span className={styles.title}>Full Name:</span>
						<span>{latestOrder?.customerName || currentUser?.fullName}</span>
					</div>
					<div className={styles.item}>
						<span className={styles.title}>Email:</span>
						<span>{currentUser?.email}</span>
					</div>
					{currentUser?.phoneNumber && (
						<div className={styles.item}>
							<span className={styles.title}>Phone Number:</span>
							<span>{currentUser?.phoneNumber}</span>
						</div>
					)}
					{latestOrder?.address && (
						<div className={styles.item}>
							<span className={styles.title}>Address:</span>
							<span>{latestOrder?.address}</span>
						</div>
					)}
				</div>
			</div>
			<div className={styles.line}></div>
			<div className={styles.bottom}>
				<h2 style={{ color: "teal" }}>My Orders</h2>
				<table className={styles.table}>
					<thead className={styles.thead}>
						<tr className={styles.tr}>
							<th className={styles.th}>ID</th>
							<th className={styles.th}>Customer</th>
							<th className={styles.th}>Method</th>
							<th className={styles.th}>Total</th>
							<th className={styles.th}>Payment</th>
							<th className={styles.th}>Status</th>
						</tr>
					</thead>
					{myOrders.map((order) => (
						<tbody key={order._id} className={styles.body}>
							<tr className={styles.tr}>
								<td className={styles.td}>{order._id.slice(0, 16)}...</td>
								<td
									className={styles.td}
									style={{ fontWeight: "500", color: "teal" }}
								>
									{order.customerName}
								</td>
								<td className={styles.td}>
									{order.method === 0 ? "Cash" : "PayPal"}
								</td>
								<td
									className={styles.td}
									style={{ color: "green", fontWeight: "500" }}
								>
									${order.total}
								</td>
								<td className={styles.td}>
									{order.isPaid ? (
										<span style={{ color: "green", fontWeight: "500" }}>
											PAID
										</span>
									) : (
										<span style={{ color: "crimson", fontWeight: "500" }}>
											NOT PAID
										</span>
									)}
								</td>
								<td className={styles.td}>
									{order?.isPaid === false ? (
										<span style={{ color: "crimson", fontWeight: "500" }}>
											Not Paid
										</span>
									) : order?.isPaid && order?.status === 0 ? (
										<span>Preparing</span>
									) : order?.isPaid && order?.status === 1 ? (
										<span>On the way</span>
									) : order?.isPaid && order?.status === 2 ? (
										<span style={{ color: "green", fontWeight: "500" }}>
											Delivered
										</span>
									) : (
										<span style={{ color: "green", fontWeight: "500" }}>
											Delivered
										</span>
									)}
								</td>
							</tr>
						</tbody>
					))}
				</table>
			</div>
		</div>
	);
};

export const getServerSideProps = async () => {
	const res = await axios.get(
		"https://next-food-ordering-app-six.vercel.app/api/orders"
	);

	return {
		props: {
			orders: res.data,
		},
	};
};

export default Profile;
