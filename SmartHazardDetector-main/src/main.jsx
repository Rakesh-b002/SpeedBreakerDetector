import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { ToastProvider } from "./components/Toast"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </React.StrictMode>,
)

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("[v0] Service Worker registered successfully:", registration.scope)
      })
      .catch((error) => {
        console.error("[v0] Service Worker registration failed:", error)
      })
  })
}
