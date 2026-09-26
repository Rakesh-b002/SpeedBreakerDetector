import App from "../src/App"
import { ToastProvider } from "../src/components/Toast"

export default function Page() {
  return (
    <ToastProvider>
      <App />
    </ToastProvider>
  )
}
