// ============================================
// CONSTANTS — safe to import in client pages
// ============================================

export const PROJECTS = [
  "Homepage Development",
  "Mobile App",
  "Backend API",
  "UI Redesign",
  "Bug Fixing",
]

export const WORK_TYPES = [
  "Development",
  "Bug fixes",
  "Design",
  "Testing",
  "Meeting",
  "Code Review",
]

// "1 - 5 January, 2024" or "29 January - 2 February, 2024"
export function formatDateRange(startDate, endDate) {
  const start = new Date(startDate + "T00:00:00")
  const end   = new Date(endDate   + "T00:00:00")
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
  if (start.getMonth() === end.getMonth()) {
    return `${start.getDate()} - ${end.getDate()} ${months[start.getMonth()]}, ${start.getFullYear()}`
  }
  return `${start.getDate()} ${months[start.getMonth()]} - ${end.getDate()} ${months[end.getMonth()]}, ${start.getFullYear()}`
}

// ["Jan 1", "Jan 2", "Jan 3", "Jan 4", "Jan 5"]
export function getWeekDays(startDate, endDate) {
  const days    = []
  const current = new Date(startDate + "T00:00:00")
  const end     = new Date(endDate   + "T00:00:00")
  while (current <= end) {
    days.push(current.toLocaleDateString("en-US", { month: "short", day: "numeric" }))
    current.setDate(current.getDate() + 1)
  }
  return days
}
