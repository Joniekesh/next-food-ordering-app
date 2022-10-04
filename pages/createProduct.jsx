import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../styles/CreateProduct.module.css";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";

const CreateProduct = () => {
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [prices, setPrices] = useState([]);
	const [file, setFile] = useState(null);
	const [extraOptions, setExtraOptions] = useState([
		{
			text: "",
			price: 0,
		},
	]);

	const handlePrices = (e) => {
		setPrices(e.target.value.split(","));
	};

	const handleChange = (e) => {
		setExtraOptions({ ...extraOptions, [e.target.name]: e.target.value });
	};

	const { user } = useSelector((state) => state.auth);
	const currentUser = user?.user;
	const token = getCookie("token");

	const router = useRouter();

	useEffect(() => {
		if (!token || !currentUser?.isAdmin) {
			toast.error("You are not authorized to access this route", {
				theme: "colored",
			});
			router.push("/");
		}
	}, [token, currentUser, router]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (currentUser && currentUser.isAdmin) {
			const config = {
				headers: {
					"Content-Type": "application/json",
					token: getCookie("token"),
				},
			};

			const data = new FormData();
			data.append("file", file);
			data.append("upload_preset", "upload");

			try {
				const uploadRes = await axios.post(
					"https://api.cloudinary.com/v1_1/joniekesh/image/upload",
					data
				);

				const { url } = uploadRes.data;

				const res = await axios.post(
					"http://localhost:3000/api/products",
					{
						title,
						desc,
						prices,
						extraOptions,
						img: url,
					},
					config
				);
				router.push(`/product/${res.data._id}`);
				toast.success("Product created", { theme: "colored" });
			} catch (err) {
				toast.error(err.response.data, { theme: "colored" });
			}
		} else {
			toast.error(err.response.data, { theme: "colored" });
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.products}>
				<h2 style={{ color: "teal", fontWeight: "bold" }}>Create Product</h2>
				<form className={styles.form}>
					<div className={styles.inputGroup}>
						<label className={styles.label}>Title</label>
						<input
							type="text"
							placeholder="Pizza title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div className={styles.inputGroup}>
						<label className={styles.label}>Description</label>
						<input
							type="text"
							placeholder="Pizza Description"
							value={desc}
							onChange={(e) => setDesc(e.target.value)}
						/>
					</div>
					<div className={styles.inputGroup}>
						<label className={styles.label}>Prices</label>
						<input
							type="text"
							placeholder="Provide comma separated numbers"
							value={prices}
							onChange={handlePrices}
						/>
					</div>
					<div className={styles.inputGroup}>
						<label className={styles.label}>Image</label>
						<input type="file" onChange={(e) => setFile(e.target.files[0])} />
					</div>
					<span
						style={{ fontSize: "18px", fontWeight: "bold", color: "orangered" }}
					>
						Extra Options:
					</span>
					<div className={styles.inputGroup}>
						<label className={styles.label}>Description</label>
						<input type="text" name="text" onChange={handleChange} />
					</div>
					<div className={styles.inputGroup}>
						<label className={styles.label}>Price</label>
						<input type="number" name="price" onChange={handleChange} />
					</div>
					<button onClick={handleSubmit} className={styles.createtBtn}>
						CREATE
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateProduct;
