import "../styles/globals.css";
import Layout from "../components/Layout";
import { store, persistor } from "../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<div>
				<ToastContainer />
			</div>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</PersistGate>
			</Provider>
		</>
	);
}

export default MyApp;
