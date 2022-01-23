import React from 'react';
import {ToastContainer} from "react-toastify";
import {Navigation} from "./routes";
import {AuthProvider} from "./context";

export default function App() {
  return (
    <AuthProvider>
      <Navigation> </Navigation>
      <ToastContainer 
      position= 'bottom-center'
      autoclose={5000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}>
        
      </ToastContainer>
    </AuthProvider>
  );
}
