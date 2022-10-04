import Image from "next/image";
import Link from "next/link";
import styles from "../styles/PizzaCard.module.css";

const PizzaCard = ({ product }) => {
	return (
		<div className={styles.container}>
			<div className={styles.imgContainer}>
				<Link href={`/product/${product._id}`} passHref>
					<Image
						src={product.img}
						alt=""
						width="150px"
						height="150px"
						style={{ borderRadius: "50%" }}
					/>
				</Link>
			</div>
			<span className={styles.title}>{product.title}</span>
			<span className={styles.price}>$ {product.prices[0]}</span>
			<span className={styles.desc}>{product.desc}</span>
		</div>
	);
};

export default PizzaCard;
