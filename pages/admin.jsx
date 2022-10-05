import styles from "../styles/Admin.module.css";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";

const Admin = ({ products, orders }) => {
	const [pizzaList, setPizzaList] = useState(products);
	const [orderList, setOrderList] = useState(orders);

	const handleDelete = async (id) => {
		if (window.confirm("Are You SURE? This can not be UNDONE")) {
			await axios.delete(
				`https://next-food-ordering-app-six.vercel.app/api/products/${id}`
			);

			setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
		}
	};

	const handleStatus = async (id) => {
		const item = orderList.filter((order) => order._id === id)[0];
		const currentStatus = item.status;

		try {
			const res = await axios.put(
				"https://next-food-ordering-app-six.vercel.app/api/orders/" + id,
				{
					status: currentStatus + 1,
				}
			);
			setOrderList([
				res.data,
				...orderList.filter((order) => order._id !== id),
			]);
		} catch (err) {
			toast.error(err.response.data, { theme: "colored" });
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<div className={styles.titleDiv}>
					<h1 style={{ color: "teal" }}>Products</h1>
					<Link href="/createProduct" passHref>
						<button className={styles.createBtn}>+ CREATE</button>
					</Link>
				</div>
				<table className={styles.table}>
					<thead className={styles.thead}>
						<tr className={styles.tr}>
							<th className={styles.th}>Image</th>
							<th className={styles.th}>ID</th>
							<th className={styles.th}>Title</th>
							<th className={styles.th}>Price</th>
							<th className={styles.th}>Action</th>
						</tr>
					</thead>
					{pizzaList.map((product) => (
						<tbody className={styles.body} key={product._id}>
							<tr className={styles.tr}>
								<td className={styles.td}>
									<Image
										src={product.img}
										height={40}
										width={40}
										alt=""
										style={{ borderRadius: "50%" }}
									/>
								</td>
								<td className={styles.td}>{product._id.slice(0, 8)}...</td>
								<td className={styles.td}>{product.title}</td>
								<td className={styles.td}>${product.prices[0]}</td>
								<td className={styles.td}>
									<div className={styles.buttons}>
										<Link
											href={{
												pathname: "/editProduct",
												query: product,
											}}
											passHref
										>
											<button className={styles.edit}>Edit</button>
										</Link>
										<button
											className={styles.delete}
											onClick={() => handleDelete(product._id)}
										>
											Delete
										</button>
									</div>
								</td>
							</tr>
						</tbody>
					))}
				</table>
			</div>
			<div className={styles.right}>
				<h1 style={{ color: "teal" }}>Orders</h1>
				<table className={styles.table}>
					<thead className={styles.thead}>
						<tr className={styles.tr}>
							<th className={styles.th}>ID</th>
							<th className={styles.th}>Customer</th>
							<th className={styles.th}>Method</th>
							<th className={styles.th}>Total</th>
							<th className={styles.th}>Payment</th>
							<th className={styles.th}>Status</th>
							<th className={styles.th}>Action</th>
						</tr>
					</thead>
					{orderList.map((order) => (
						<tbody key={order._id} className={styles.body}>
							<tr className={styles.tr}>
								<td className={styles.td}>{order._id.slice(0, 8)}...</td>
								<td
									className={styles.td}
									style={{ color: "teal", fontweight: "500" }}
								>
									{order.customerName}
								</td>
								<td className={styles.td}>
									{order.method === 0 ? "Cash" : "PayPal"}
								</td>
								<td
									className={styles.td}
									style={{ color: "green", fontweight: "500" }}
								>
									${order.total}
								</td>
								<td className={styles.td}>
									{order.isPaid ? (
										<span style={{ color: "green", fontweight: "500" }}>
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
								<td className={styles.td}>
									<button
										className={styles.next}
										onClick={() => handleStatus(order._id)}
									>
										Next Stage
									</button>
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
	const productRes = await axios.get(
		"https://next-food-ordering-app-six.vercel.app/api/products"
	);
	const orderRes = await axios.get(
		"https://next-food-ordering-app-six.vercel.app/api/orders"
	);

	return {
		props: {
			products: productRes.data,
			orders: orderRes.data,
		},
	};
};

export default Admin;
