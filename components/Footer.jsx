import Image from "next/image";
import React from "react";
import styles from "../styles/Footer.module.css";

const Footer = () => {
	return (
		<div className={styles.container}>
			<div className={styles.footerLeft}>
				<Image
					src="/img/pizzakitchen3.jpeg"
					layout="fill"
					objectFit="cover"
					alt=""
				/>
			</div>
			<div className={styles.footerRight}>
				<div className={styles.desc}>
					<h2>
						HURRAY!! <br />
						JONIE YUMMY PIZZA.
						<br />
						WE ARE HERE FOR YOUR <br />
						MAXIMUM SATISFACTION.
					</h2>
				</div>
				<div className={styles.contact}>
					<h3 className={styles.title}>FIND OUR RESTAURANT</h3>
					<p className={styles.text}>
						1654 R. Don Road #304.
						<br /> NewYork, 85022
						<br /> (602) 867-1010
					</p>
					<p className={styles.text}>
						2356 K. Laquie Rd #235.
						<br /> NewYork, 85022
						<br /> (602) 867-1011
					</p>
					<p className={styles.text}>
						1614 E. Erwin St #104.
						<br /> NewYork, 85022
						<br /> (602) 867-1012
					</p>
					<p className={styles.text}>
						1614 W. Caroll St #125.
						<br /> NewYork, 85022
						<br /> (602) 867-1013
					</p>
				</div>
				<div className={styles.workiHour}>
					<h3 className={styles.title}>WORKIN HOURS</h3>
					<p className={styles.text}>
						MONDAY UNTIL FRIDAY
						<br /> 9:00 – 22:00
					</p>
					<p className={styles.text}>
						SATURDAY - SUNDAY
						<br /> 12:00 – 24:00
					</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;
