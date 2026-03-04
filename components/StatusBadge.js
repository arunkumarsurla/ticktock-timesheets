
export default function StatusBadge({ status }) {
  const normalized = (status || "").toUpperCase()

  const colors = {
    COMPLETED:  "bg-green-100 text-green-700",
    INCOMPLETE: "bg-yellow-100 text-yellow-700",
    MISSING:    "bg-red-100 text-red-600",
  }

  return (
    <span className={`px-3 py-1 rounded text-xs font-semibold ${colors[normalized] || "bg-gray-100 text-gray-600"}`}>
      {normalized}
    </span>
  )
}
