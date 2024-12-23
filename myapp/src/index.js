import React from "react";
import ReactDOM from "react-dom/client"; // React 18+
import { BrowserRouter } from "react-router-dom";
import App from "./App.js";
import { AuthProvider } from "./context/AuthContext.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    
      <App />
    
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
