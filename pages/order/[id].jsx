import styles from "../../styles/Order.module.css";
import axiosInstance from "../../utils/axiosInstance";

const Order = ({ order }) => {
	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<table className={styles.table}>
					<thead className={styles.thead}>
						<tr className={styles.tr}>
							<th className={styles.th}>Order ID</th>
							<th className={styles.th}>Customer</th>
							<th className={styles.th}>Address</th>
							<th className={styles.th}>Method</th>
							<th className={styles.th}>Status</th>
							<th className={styles.th}>Total</th>
						</tr>
					</thead>
					<tbody>
						<tr className={styles.tr}>
							<td className={styles.td}>{order?._id.slice(0, 8)}...</td>
							<td className={styles.td}>{order?.customerName}</td>
							<td className={styles.td}>{order?.address}</td>
							<td className={styles.td}>
								{order?.method === 0 ? "Cash" : "PayPal"}
							</td>
							<td className={styles.td}>
								{order?.isPaid ? "PAID" : "NOT PAID"}
							</td>
							<td className={styles.td}>${order?.total}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export const getServerSideProps = async ({ params }) => {
	const res = await axiosInstance.get(`/orders/${params.id}`);

	return {
		props: {
			order: res.data,
		},
	};
};
export default Order;
