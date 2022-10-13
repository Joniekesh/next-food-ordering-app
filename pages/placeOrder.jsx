import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	PayPalScriptProvider,
	PayPalButtons,
	usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import CashPayment from "../components/CashPayment";
import axiosInstance from "../utils/axiosInstance";
import { removeFromCart, resetCart } from "../redux/cartRedux";
import Link from "next/link";

const PlaceOrder = () => {
	const cart = useSelector((state) => state.cart);
	const [open, setOpen] = useState(false);
	const [cash, setCash] = useState(false);
	const currency = "USD";
	const style = { layout: "vertical" };
	const amount = cart.total;
	const router = useRouter();
	const dispatch = useDispatch();

	const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

	const { user } = useSelector((state) => state.auth);
	const isAuthenticated = user?.token;

	const { userAddress } = useSelector((state) => state.address);

	const handleCash = () => {
		if (isAuthenticated) {
			setCash(true);
		} else {
			router.push("/auth");
		}
	};

	// useEffect(() => {
	// 	if (!isAuthenticated) {
	// 		router.push("/auth");
	// 	}
	// 	if (!userAddress) {
	// 		router.push("/address");
	// 	}
	// }, [isAuthenticated, userAddress, router]);

	const createOrder = async (data) => {
		try {
			const res = await axiosInstance.post("/orders", data);

			if (res.status === 201) {
				dispatch(resetCart());
				router.push(`/order/${res.data._id}`);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const ButtonWrapper = ({ currency, showSpinner }) => {
		const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

		useEffect(() => {
			dispatch({
				type: "resetOptions",
				value: {
					...options,
					currency: currency,
				},
			});
		}, [currency, showSpinner]);

		return (
			<>
				{showSpinner && isPending && <div className="spinner" />}
				<PayPalButtons
					style={style}
					disabled={false}
					forceReRender={[amount, currency, style]}
					fundingSource={undefined}
					createOrder={(data, actions) => {
						return actions.order
							.create({
								purchase_units: [
									{
										amount: {
											currency_code: currency,
											value: amount,
										},
									},
								],
							})
							.then((orderId) => {
								return orderId;
							});
					}}
					onApprove={function (data, actions) {
						return actions.order.capture().then(function (details) {
							const shipping = details.purchase_units[0].shipping;
							console.log(details);
							createOrder({
								customerName: shipping.name.full_name,
								address: shipping.address.address_line_1,
								total: cart.total,
								isPaid: true,
								paidAt: Date.now(),
								method: 1,
							});
						});
					}}
				/>
			</>
		);
	};

	return (
		<div className={styles.container}>
			{cart.products.length > 0 ? (
				<>
					<div className={styles.left}>
						<h2 style={{ color: "teal" }}>PLACE ORDER</h2>
						<table className={styles.table}>
							<thead className={styles.thead}>
								<tr className={styles.tr}>
									<th className={styles.th}>Product</th>
									<th className={styles.th}>Name</th>
									<th className={styles.th}>Extras</th>
									<th className={styles.th}>Price</th>
									<th className={styles.th}>Quantity</th>
									<th className={styles.th}>Total</th>
								</tr>
							</thead>
							{cart.products.map((product) => (
								<tbody key={product._id}>
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
										<td className={styles.td}>{product.title}</td>
										<td className={styles.td}>
											{product.extras.map((extra) => (
												<span key={extra._id}>{extra.text}, </span>
											))}
										</td>
										<td className={styles.td}>${product.price}</td>
										<td className={styles.td}>{product.quantity}</td>
										<td className={styles.td}>
											${product.quantity * product.price}
										</td>
									</tr>
								</tbody>
							))}
						</table>
					</div>
					<div className={styles.right}>
						<h3 className={styles.title}>ORDER SUMMARY</h3>
						<div className={styles.item}>
							<span className={styles.text}>SubTotal:</span>
							<span>${cart.total}</span>
						</div>
						<div className={styles.item}>
							<span className={styles.text}>Discount:</span>
							<span>$0</span>
						</div>
						<div
							className={styles.item}
							style={{
								borderTop: "1px solid rgb(219, 60, 2)",
								fontSize: "20px",
								fontWeight: "bold",
							}}
						>
							<span className={styles.text}>Total</span>
							<span>${cart.total}</span>
						</div>
						{open ? (
							<div className={styles.buttons}>
								<button className={styles.cash} onClick={() => handleCash()}>
									CASH ON DELIVERY
								</button>
								<PayPalScriptProvider
									options={{
										"client-id": PAYPAL_CLIENT_ID,
										components: "buttons",
										currency: "USD",
										// "disable-funding": "credit,card,p24",
									}}
								>
									<ButtonWrapper currency={currency} showSpinner={false} />
								</PayPalScriptProvider>
							</div>
						) : (
							<>
								<button
									className={styles.checkout}
									onClick={() => setOpen(true)}
								>
									PLACE ORDER
								</button>
							</>
						)}
					</div>
					{cash && (
						<CashPayment
							total={cart.total}
							setCash={setCash}
							createOrder={createOrder}
						/>
					)}
				</>
			) : (
				<p className={styles.link}>
					No pizza item(s) in your cart yet <br />
					Please{" "}
					<Link
						href="/"
						style={{
							borderBottom: "1px solid rgb(219, 60, 2)",
							color: "rgb(219, 60, 2)",
						}}
					>
						Checkout
					</Link>{" "}
					some yummy pizzas to add to your cart, pay and have them delivered
					ASAP.
				</p>
			)}
		</div>
	);
};

export default PlaceOrder;
