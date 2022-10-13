import styles from "../styles/EditProduct.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getCookie } from "cookies-next";
import axiosInstance from "../utils/axiosInstance";

const EditProduct = () => {
	const router = useRouter();
	const product = router.query;

	const [title, setTitle] = useState(product.title);
	const [desc, setDesc] = useState(product.desc);
	const [prices, setPrices] = useState([product.prices]);
	const [file, setFile] = useState(product.img);
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
				const uploadRes = await axiosInstance.post(
					"https://api.cloudinary.com/v1_1/joniekesh/image/upload",
					data
				);

				const { url } = uploadRes.data;

				const res = await axiosInstance.put(
					`/products/${product._id}`,
					{
						title,
						desc,
						prices,
						extraOptions,
						img: url,
					},
					config
				);
				if (res.status === 200) {
					router.push(`/product/${product._id}`);
					toast.success("Product updated", { theme: "colored" });
				}
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
				<h2 style={{ color: "teal", fontWeight: "bold" }}>Edit Product</h2>
				<form className={styles.form}>
					<div className={styles.inputGroup}>
						<label className={styles.label}>Title</label>
						<input
							type="text"
							placeholder="Pizza title"
							defaultValue={product.title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div className={styles.inputGroup}>
						<label className={styles.label}>Description</label>
						<input
							type="text"
							placeholder="Pizza Description"
							defaultValue={product.desc}
							onChange={(e) => setDesc(e.target.value)}
						/>
					</div>
					<div className={styles.inputGroup}>
						<label className={styles.label}>Prices</label>
						<input
							type="text"
							placeholder="Provide comma separated numbers"
							defaultValue={product.prices}
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
						EDIT
					</button>
				</form>
			</div>
		</div>
	);
};

export default EditProduct;
