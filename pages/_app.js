import "../styles/globals.css";
import { AlertProvider } from "../context/AlertContext";
import { LoadingProvider } from "../context/LoadingContext";
import { ToastContainer } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({ Component, pageProps }) {
  return (
    <>
    <LoadingProvider>
      <AlertProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </AlertProvider>
      </LoadingProvider>
    </>
  );
}
