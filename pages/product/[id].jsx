import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartRedux";

const Product = ({ pizza }) => {
	const [quantity, setQuantity] = useState(1);
	const [size, setSize] = useState(0);
	const [price, setPrice] = useState(pizza.prices[0]);
	const [extras, setExtras] = useState([]);

	const dispatch = useDispatch();

	const handleAdd = (type) => {
		if (type === "plus") {
			setQuantity(quantity + 1);
		} else {
			quantity > 0 && setQuantity(quantity - 1);
		}
	};

	const changePrice = (number) => {
		setPrice(price + number);
	};

	const handleSize = (sizeIndex) => {
		const difference = pizza.prices[sizeIndex] - pizza.prices[size];
		setSize(sizeIndex);
		changePrice(difference);
	};

	const handleChange = (e, option) => {
		const checked = e.target.checked;

		if (checked) {
			changePrice(option.price);
			setExtras((prev) => [...prev, option]);
		} else {
			changePrice(-option.price);
			setExtras(extras.filter((extra) => extra._id !== option._id));
		}
	};

	const handleCart = () => {
		dispatch(addToCart({ ...pizza, extras, price, quantity }));
	};

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<Image
					src={pizza.img}
					height={500}
					width={500}
					style={{ borderRadius: "50%" }}
				/>
			</div>
			<div className={styles.right}>
				<h1 className={styles.title}>{pizza.title.toUpperCase()}</h1>
				<h2 className={styles.price}>${price}</h2>
				<p className={styles.desc}>{pizza.desc}</p>
				<h3>Choose Size</h3>
				<div className={styles.sizes}>
					<div className={styles.size} onClick={() => handleSize(0)}>
						<Image
							src={"/img/pizza13.jpeg"}
							height={30}
							width={30}
							style={{ borderRadius: "50%" }}
						/>
						<span className={styles.pizzaSize}>Small</span>
					</div>
					<div className={styles.size} onClick={() => handleSize(1)}>
						<Image
							src="/img/pizza13.jpeg"
							height={40}
							width={40}
							style={{ borderRadius: "50%" }}
						/>
						<span className={styles.pizzaSize}>Medium</span>
					</div>
					<div className={styles.size} onClick={() => handleSize(2)}>
						<Image
							src="/img/pizza13.jpeg"
							height={50}
							width={50}
							style={{ borderRadius: "50%" }}
						/>
						<span className={styles.pizzaSize}>Large</span>
					</div>
				</div>
				<h3>Choose additional ingredients</h3>
				<div className={styles.cheboxes}>
					{pizza.extraOptions.map((option) => (
						<div className={styles.checkbox} key={option._id}>
							<input
								type="checkbox"
								id={option.text}
								name={option.text}
								className={styles.input}
								onChange={(e) => handleChange(e, option)}
							/>
							<label>{option.text}</label>
						</div>
					))}
				</div>
				<div className={styles.add}>
					<div className={styles.buttons}>
						<button
							className={styles.leftBtn}
							onClick={() => handleAdd("minus")}
						>
							-
						</button>
						<span className={styles.count}>{quantity}</span>
						<button
							className={styles.rightBtn}
							onClick={() => handleAdd("plus")}
						>
							+
						</button>
					</div>
					<button className={styles.addTocart} onClick={handleCart}>
						Add To Cart
					</button>
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps = async ({ params }) => {
	const res = await axios.get(
		`http://localhost:3000/api/products/${params.id}`
	);

	return {
		props: {
			pizza: res.data,
		},
	};
};

export default Product;
