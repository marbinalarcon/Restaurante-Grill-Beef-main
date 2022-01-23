import React from "react";
import { ToastContainer } from "react-toastify";
import { Navigation } from "./routes";
import { AuthProvider } from "./context";

export default function App() {
  return (
    <AuthProvider>
      <Navigation> </Navigation>
      <ToastContainer
        position="top-center"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      ></ToastContainer>
    </AuthProvider>
  );
}
