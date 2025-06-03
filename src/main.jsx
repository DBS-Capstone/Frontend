import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Fungsi untuk mendaftarkan service worker
function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log(
            "Service Worker berhasil didaftarkan:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("Gagal mendaftarkan Service Worker:", error);
        });
    });
  } else {
    console.log("Service Worker tidak didukung oleh browser ini.");
  }
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Panggil fungsi registrasi
registerServiceWorker();
