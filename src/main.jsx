import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App.jsx";
import store from "./store/store.js";

// פונקציה: רינדור האפליקציה עם כל ה-Providers.
// createRoot יוצר שורש React ורונדר את העץ לאלמנט #root ב-HTML.
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* Provider מספק את ה-Redux store לכל הקומפוננטות */}
    <BrowserRouter>
      {/* BrowserRouter מאפשר routing עם history API */}
      <App />

      {/* ToastContainer מציג הודעות popup (success/error/info) */}
      <ToastContainer position="top-center" rtl />
    </BrowserRouter>
  </Provider>
);
