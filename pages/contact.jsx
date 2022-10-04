import styles from "../styles/Contact.module.css";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
	const form = useRef();
	const [done, setDone] = useState(false);

	const SERVICE = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
	const TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
	const USER = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs.sendForm(SERVICE, TEMPLATE, form.current, USER).then(
			(result) => {
				console.log(result.text);
				setDone(true);
			},
			(error) => {
				console.log(error.text);
			}
		);
	};

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>
				Please contact us for any complaints, suggestions and enquiry
			</h3>
			<form className={styles.form} ref={form}>
				<div className={styles.inputGroup}>
					<label>Full name</label>
					<input
						type="text"
						placeholder="Enter your fullname"
						name="user_name"
						required
					/>
				</div>
				<div className={styles.inputGroup}>
					<label>Email</label>
					<input
						type="email"
						placeholder="Enter your email"
						name="user_email"
						required
					/>
				</div>
				<div className={styles.inputGroup}>
					<label>Message</label>
					<textarea
						className={styles.inputGroup}
						rows="5"
						name="message"
						required
					></textarea>
				</div>
				<button type="submit" className={styles.submitBtn} onClick={sendEmail}>
					SEND
				</button>
				{done && (
					<span style={{ color: "green", fontWeight: "500" }}>
						Email sent. You will receive a reply soon. Thank You!
					</span>
				)}
			</form>
		</div>
	);
};

export default Contact;
