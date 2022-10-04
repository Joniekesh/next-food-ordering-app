import React, { useState } from "react";
import styles from "../styles/Featured.module.css";
import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const Featured = () => {
	const [slideIndex, setSlideIndex] = useState(0);

	const images = [
		"/img/pizza1.jpeg",
		"/img/pizza2.jpeg",
		"/img/pizza3.jpeg",
		"/img/pizza4.jpeg",
		"/img/pizza5.jpeg",
	];

	const handleArrow = (direction) => {
		if (direction === "left") {
			setSlideIndex(slideIndex !== 0 ? slideIndex - 1 : 4);
		}
		if (direction === "right") {
			setSlideIndex(slideIndex !== 4 ? slideIndex + 1 : 0);
		}
	};

	return (
		<div className={styles.container}>
			<div
				className={styles.arrowContainer}
				style={{ left: 0 }}
				onClick={() => handleArrow("left")}
			>
				<IoIosArrowBack />
			</div>
			<div
				className={styles.wrapper}
				style={{ transform: `translateX(${-100 * slideIndex}vw)` }}
			>
				{images.map((img, i) => (
					<div className={styles.imgContainer} key={i}>
						<Image src={img} layout="fill" objectFit="cover" />
					</div>
				))}
			</div>
			<div
				className={styles.arrowContainer}
				style={{ right: 0 }}
				onClick={() => handleArrow("right")}
			>
				<IoIosArrowForward />
			</div>
		</div>
	);
};

export default Featured;
