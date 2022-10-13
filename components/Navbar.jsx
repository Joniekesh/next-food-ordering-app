import styles from "../styles/Navbar.module.css";
import { AiOutlinePhone, AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authRedux";
import { useRouter } from "next/router";
import { resetCart } from "../redux/cartRedux";
import { resetAddress } from "../redux/deliveryAddressRedux";
import { deleteCookie } from "cookies-next";

const Navbar = () => {
	const quantity = useSelector((state) => state.cart.quantity);
	const dispatch = useDispatch();
	const router = useRouter();

	const { user } = useSelector((state) => state.auth);
	const currentUser = user?.user;

	const handleLogout = () => {
		dispatch(logout());
		dispatch(resetCart());
		dispatch(resetAddress());
		deleteCookie("token");
		router.push("/");
	};

	return (
		<div className={styles.container}>
			<ul className={styles.item}>
				<li className={styles.call}>
					<span>
						<AiOutlinePhone />
					</span>
				</li>
				<li>
					<div className={styles.contact}>
						<span>ORDER NOW</span>
						<span>+234 8050 667 156</span>
					</div>
				</li>
			</ul>
			<ul className={styles.item}>
				<Link href="/" passHref>
					<li className={(styles.list, styles.home)}>Home</li>
				</Link>
				<Link href="/" passHref>
					<li className={(styles.list, styles.products)}>Products</li>
				</Link>
				<li className={(styles.list, styles.menu)}>Menu</li>
				<Link href="/" passHref>
					<li className={styles.listName}>jonieKitchen</li>
				</Link>
				<li className={(styles.list, styles.events)}>Events</li>
				<li className={(styles.list, styles.blog)}>Blog</li>
				<Link href="/contact" passHref>
					<li className={styles.list}>Contact</li>
				</Link>
			</ul>
			<Link href="/profile" passHref>
				<span className={styles.logout} style={{ fontWeight: "bold" }}>
					{currentUser?.fullName}
				</span>
			</Link>
			{currentUser ? (
				<span className={styles.logout} onClick={handleLogout}>
					LOGOUT
				</span>
			) : (
				<Link href="/auth" passHref>
					<span
						style={{
							fontWeight: "bold",
							cursor: "pointer",
							border: "1px solid white",
							padding: "5px",
							borderRadius: "5px",
						}}
					>
						Login/Register
					</span>
				</Link>
			)}
			<Link href="/cart" passHref>
				<div className={styles.cart}>
					<AiOutlineShoppingCart />
					{quantity > 0 && <span className={styles.count}>{quantity}</span>}
				</div>
			</Link>
		</div>
	);
};

export default Navbar;
