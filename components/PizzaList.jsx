import React from "react";
import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard";

const PizzaList = ({ products }) => {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
			<div className={styles.desc}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi et,
				ratione natus impedit corrupti beatae corporis officia porro sed.
				Aliquid ratione repellat officia nemo inventore exercitationem eligendi
				natus deleniti debitis.
			</div>
			<div className={styles.wrapper}>
				{products.map((product) => (
					<PizzaCard product={product} key={product._id} />
				))}
			</div>
		</div>
	);
};

export default PizzaList;
