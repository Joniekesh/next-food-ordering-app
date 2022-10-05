import styles from "../styles/Auth.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
	loginFail,
	loginRequest,
	loginSuccess,
	registerFail,
	registerRequest,
	registerSuccess,
} from "../redux/authRedux";
import Loader from "../utils/Loader";
import { setCookie } from "cookies-next";
import { toast } from "react-toastify";

const Auth = () => {
	const [isRegister, setIsRegister] = useState(false);

	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const router = useRouter();
	const dispatch = useDispatch();

	const { user, loading } = useSelector((state) => state.auth);
	const isAuthenticated = user?.token;

	useEffect(() => {
		isAuthenticated && router.push("/");
	}, [isAuthenticated, router]);

	const handleAuth = async (e) => {
		e.preventDefault();

		if (isRegister) {
			if (password !== confirmPassword) {
				toast.error("Passwords do not match", { theme: "colored" });
			} else {
				dispatch(registerRequest());
				try {
					const res = await axios.post(
						"https://next-food-ordering-app-six.vercel.app/api/users/register",
						{ fullName, email, phoneNumber, password }
					);

					dispatch(registerSuccess(res.data));
					setCookie("token", res.data.token);
					toast.success("Register Success", { theme: "colored" });

					router.push("/");
				} catch (err) {
					dispatch(registerFail());
					toast.error(err.response.data, { theme: "colored" });
				}
			}
		} else {
			dispatch(loginRequest());
			try {
				const res = await axios.post(
					"https://next-food-ordering-app-six.vercel.app/api/users/login",
					{
						email,
						password,
					}
				);
				dispatch(loginSuccess(res.data));
				setCookie("token", res.data.token);
				toast.success("Login Success", { theme: "colored" });

				router.push("/");
			} catch (err) {
				dispatch(loginFail());
				toast.error(err.response.data, { theme: "colored" });
			}
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.auth}>
				{isRegister ? (
					<h2 className={styles.title}>Register</h2>
				) : (
					<h2 className={styles.title}>Login</h2>
				)}
				<form className={styles.form} onSubmit={handleAuth}>
					{isRegister && (
						<div className={styles.formGroup}>
							<label className={styles.label}>Full Name</label>
							<input
								type="text"
								placeholder="Enter full name"
								value={fullName}
								onChange={(e) => setFullName(e.target.value)}
								required
							/>
						</div>
					)}
					<div className={styles.formGroup}>
						<label className={styles.label}>Email</label>
						<input
							type="text"
							placeholder="Enter email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					{isRegister && (
						<div className={styles.formGroup}>
							<label className={styles.label}>Phone number</label>
							<input
								type="text"
								placeholder="Enter phone number"
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.target.value)}
							/>
						</div>
					)}
					<div className={styles.formGroup}>
						<label className={styles.label}>Password</label>
						<input
							type="password"
							placeholder="Enter password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					{isRegister && (
						<div className={styles.formGroup}>
							<label className={styles.label}>Confirm Password</label>
							<input
								type="password"
								placeholder="Enter confirm password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
							/>
						</div>
					)}
					<button className={styles.btn}>
						{loading ? <Loader /> : isRegister ? "Register" : "Login"}
					</button>
					<span>
						{isRegister ? "Already have an account?" : "Don't have an account?"}
						<span
							onClick={() => setIsRegister(!isRegister)}
							className={styles.toggle}
						>
							{isRegister ? "Login" : "Register"}
						</span>
					</span>
				</form>
			</div>
		</div>
	);
};

export default Auth;
