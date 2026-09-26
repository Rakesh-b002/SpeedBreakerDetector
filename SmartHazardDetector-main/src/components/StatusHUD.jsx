"use client"

import { Play, Square } from "lucide-react"

// Always-visible status strip. Lives in BottomDock's persistent header (above
// the tabs), not inside a tab, so speed / detection state / proximity status
// are on screen no matter what the driver has open.
export const StatusHUD = ({ currentSpeed, statusText, proximityAlert, isDetecting, setIsDetecting }) => {
  const speed = currentSpeed !== null && currentSpeed !== undefined ? Math.round(currentSpeed) : 0

  return (
    <div className="px-4 py-2.5 flex items-center gap-3 border-b border-gray-100">
      <div className="flex items-baseline gap-1 shrink-0">
        <span className="text-2xl font-bold text-blue-600 tabular-nums">{speed}</span>
        <span className="text-xs text-gray-500">km/h</span>
      </div>

      <button
        onClick={() => setIsDetecting(!isDetecting)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
          isDetecting
            ? "bg-red-500/10 text-red-700 border border-red-300"
            : "bg-green-500/10 text-green-700 border border-green-300"
        }`}
      >
        {isDetecting ? <Square className="w-3 h-3" /> : <Play className="w-3 h-3" />}
        {isDetecting ? "Stop" : "Detect"}
      </button>

      <div
        className={`flex-1 min-w-0 text-xs font-medium px-2 py-1.5 rounded-lg truncate text-center ${
          proximityAlert ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
        }`}
      >
        {statusText}
      </div>
    </div>
  )
}
