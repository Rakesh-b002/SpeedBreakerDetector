"use client"

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-react"

// One shared toast slot for the whole app. Anything that used to call
// window.alert(...) should call showToast(...) instead. Toasts are queued
// FIFO and shown one at a time so they never stack on top of each other.

const ToastContext = createContext(null)

const TOAST_STYLES = {
  success: { bg: "bg-green-600", Icon: CheckCircle2 },
  error: { bg: "bg-red-600", Icon: XCircle },
  warning: { bg: "bg-amber-500", Icon: AlertTriangle },
  info: { bg: "bg-blue-600", Icon: Info },
}

export const ToastProvider = ({ children }) => {
  const [queue, setQueue] = useState([])
  const [current, setCurrent] = useState(null)
  const timerRef = useRef(null)

  // Add a message to the queue. type: "success" | "error" | "warning" | "info"
  const showToast = useCallback((message, { type = "info", duration = 4000 } = {}) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    setQueue((prev) => [...prev, { id, message, type, duration }])
  }, [])

  const dismissCurrent = useCallback(() => {
    clearTimeout(timerRef.current)
    setCurrent(null)
  }, [])

  // Pull the next queued toast whenever the slot is free.
  useEffect(() => {
    if (!current && queue.length > 0) {
      const [next, ...rest] = queue
      setCurrent(next)
      setQueue(rest)
    }
  }, [current, queue])

  // Auto-dismiss the active toast after its duration.
  useEffect(() => {
    if (current) {
      timerRef.current = setTimeout(() => setCurrent(null), current.duration)
      return () => clearTimeout(timerRef.current)
    }
  }, [current])

  const style = TOAST_STYLES[current?.type] || TOAST_STYLES.info
  const Icon = style.Icon

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {current && (
        <div className="fixed top-4 left-4 right-4 z-[60] flex justify-center pointer-events-none">
          <div
            className={`${style.bg} text-white rounded-lg shadow-2xl p-4 flex items-center gap-3 w-full max-w-md pointer-events-auto animate-in fade-in slide-in-from-top-2`}
          >
            <Icon className="w-5 h-5 shrink-0" />
            <p className="flex-1 text-sm font-medium leading-snug">{current.message}</p>
            <button
              onClick={dismissCurrent}
              className="p-1 rounded hover:bg-white/20 shrink-0"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error("useToast must be used within a <ToastProvider>")
  }
  return ctx
}
