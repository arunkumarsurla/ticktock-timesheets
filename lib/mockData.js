// ============================================
// MOCK DATA FILE — the fake database
// ============================================



export let TIMESHEETS = [
  {
    id: 1, userId: 1, weekNumber: 1,
    startDate: "2026-01-01", endDate: "2026-01-05", status: "COMPLETED",
    entries: [
      { id: 1,  date: "Jan 1",  project: "Homepage Development", workType: "Development", description: "Built the navigation bar and hero section",    hours: 4 },
      { id: 2,  date: "Jan 2",  project: "Mobile App",           workType: "Design",      description: "Designed the login and signup screens",         hours: 6 },
      { id: 3,  date: "Jan 3",  project: "Backend API",          workType: "Development", description: "Set up Express server and basic routes",         hours: 8 },
      { id: 4,  date: "Jan 4",  project: "Homepage Development", workType: "Testing",     description: "Wrote unit tests for the navbar component",      hours: 5 },
      { id: 5,  date: "Jan 5",  project: "Backend API",          workType: "Code Review", description: "Reviewed pull requests from the team",           hours: 4 },
    ],
  },
  {
    id: 2, userId: 1, weekNumber: 2,
    startDate: "2026-01-08", endDate: "2026-01-12", status: "COMPLETED",
    entries: [
      { id: 6,  date: "Jan 8",  project: "Backend API",  workType: "Development", description: "Created user authentication endpoints",        hours: 8 },
      { id: 7,  date: "Jan 9",  project: "UI Redesign",  workType: "Design",      description: "Redesigned dashboard with new color palette",   hours: 5 },
      { id: 8,  date: "Jan 10", project: "Mobile App",   workType: "Testing",     description: "Tested login flow on iOS and Android",          hours: 3 },
      { id: 9,  date: "Jan 11", project: "Backend API",  workType: "Development", description: "Built password reset email flow",               hours: 6 },
      { id: 10, date: "Jan 12", project: "UI Redesign",  workType: "Meeting",     description: "Design review meeting with stakeholders",       hours: 3 },
    ],
  },
  {
    id: 3, userId: 1, weekNumber: 3,
    startDate: "2026-01-15", endDate: "2026-01-19", status: "INCOMPLETE",
    entries: [
      { id: 11, date: "Jan 15", project: "UI Redesign",          workType: "Design",    description: "Created wireframes for new settings page",    hours: 3 },
      { id: 12, date: "Jan 16", project: "Homepage Development",  workType: "Bug fixes", description: "Fixed responsive layout on mobile devices",   hours: 4 },
      { id: 13, date: "Jan 17", project: "Mobile App",            workType: "Development", description: "Implemented push notification system",      hours: 5 },
    ],
  },
  {
    id: 4, userId: 1, weekNumber: 4,
    startDate: "2026-01-22", endDate: "2026-01-26", status: "COMPLETED",
    entries: [
      { id: 14, date: "Jan 22", project: "Homepage Development", workType: "Development", description: "Fixed layout issues on the about page",         hours: 5 },
      { id: 15, date: "Jan 23", project: "Bug Fixing",           workType: "Bug fixes",   description: "Fixed login redirect bug reported by client",   hours: 3 },
      { id: 16, date: "Jan 24", project: "Backend API",          workType: "Development", description: "Optimised slow database queries",               hours: 6 },
      { id: 17, date: "Jan 25", project: "Mobile App",           workType: "Testing",     description: "End-to-end testing on Android devices",         hours: 4 },
      { id: 18, date: "Jan 26", project: "UI Redesign",          workType: "Design",      description: "Updated colour tokens in design system",        hours: 4 },
    ],
  },
  {
    id: 5, userId: 1, weekNumber: 5,
    startDate: "2026-01-29", endDate: "2026-02-02", status: "MISSING",
    entries: [],
  },
  {
    id: 6, userId: 1, weekNumber: 6,
    startDate: "2026-02-05", endDate: "2026-02-09", status: "COMPLETED",
    entries: [
      { id: 19, date: "Feb 5",  project: "Backend API",          workType: "Development", description: "Built file upload API with S3 integration",     hours: 8 },
      { id: 20, date: "Feb 6",  project: "Homepage Development",  workType: "Development", description: "Added dark mode support to landing page",       hours: 6 },
      { id: 21, date: "Feb 7",  project: "Mobile App",           workType: "Bug fixes",   description: "Fixed crash on profile image upload",           hours: 4 },
      { id: 22, date: "Feb 8",  project: "UI Redesign",          workType: "Design",      description: "Designed onboarding screens for new users",     hours: 5 },
      { id: 23, date: "Feb 9",  project: "Backend API",          workType: "Code Review", description: "Reviewed and merged 6 open pull requests",      hours: 3 },
    ],
  },
  {
    id: 7, userId: 1, weekNumber: 7,
    startDate: "2026-02-12", endDate: "2026-02-16", status: "COMPLETED",
    entries: [
      { id: 24, date: "Feb 12", project: "Mobile App",           workType: "Development", description: "Integrated Stripe payments into mobile app",     hours: 8 },
      { id: 25, date: "Feb 13", project: "Backend API",          workType: "Development", description: "Created webhook handler for payment events",      hours: 6 },
      { id: 26, date: "Feb 14", project: "Homepage Development",  workType: "Design",      description: "Refreshed hero section with new illustrations",  hours: 4 },
      { id: 27, date: "Feb 15", project: "UI Redesign",          workType: "Testing",     description: "Accessibility audit on redesigned components",   hours: 5 },
      { id: 28, date: "Feb 16", project: "Bug Fixing",           workType: "Bug fixes",   description: "Resolved 8 bugs from the QA backlog",            hours: 4 },
    ],
  },
  {
    id: 8, userId: 1, weekNumber: 8,
    startDate: "2026-02-19", endDate: "2026-02-23", status: "INCOMPLETE",
    entries: [
      { id: 29, date: "Feb 19", project: "Backend API",  workType: "Development", description: "Set up Redis caching for API responses",          hours: 7 },
      { id: 30, date: "Feb 20", project: "Mobile App",   workType: "Design",      description: "Prototyped new tab bar navigation design",        hours: 4 },
      { id: 31, date: "Feb 21", project: "UI Redesign",  workType: "Meeting",     description: "Sprint planning and backlog grooming session",    hours: 3 },
    ],
  },
  {
    id: 9, userId: 1, weekNumber: 9,
    startDate: "2026-02-26", endDate: "2026-03-01", status: "COMPLETED",
    entries: [
      { id: 32, date: "Feb 26", project: "Homepage Development",  workType: "Development", description: "Built interactive pricing table component",     hours: 6 },
      { id: 33, date: "Feb 27", project: "Backend API",          workType: "Development", description: "Wrote API documentation with Swagger",           hours: 5 },
      { id: 34, date: "Feb 28", project: "Mobile App",           workType: "Testing",     description: "Ran regression tests after payment update",     hours: 4 },
      { id: 35, date: "Feb 29", project: "UI Redesign",          workType: "Design",      description: "Finalised component library for handoff",       hours: 6 },
      { id: 36, date: "Mar 1",  project: "Bug Fixing",           workType: "Bug fixes",   description: "Fixed date formatting bug in reports page",     hours: 4 },
    ],
  },
  {
    id: 10, userId: 1, weekNumber: 10,
    startDate: "2026-03-04", endDate: "2026-03-08", status: "MISSING",
    entries: [],
  },
  {
    id: 11, userId: 1, weekNumber: 11,
    startDate: "2026-03-11", endDate: "2026-03-15", status: "COMPLETED",
    entries: [
      { id: 37, date: "Mar 11", project: "Backend API",          workType: "Development", description: "Migrated database schema to PostgreSQL 16",      hours: 8 },
      { id: 38, date: "Mar 12", project: "Mobile App",           workType: "Development", description: "Added biometric login support",                  hours: 6 },
      { id: 39, date: "Mar 13", project: "Homepage Development",  workType: "Bug fixes",   description: "Patched XSS vulnerability in contact form",     hours: 4 },
      { id: 40, date: "Mar 14", project: "UI Redesign",          workType: "Design",      description: "Created empty state illustrations",              hours: 5 },
      { id: 41, date: "Mar 15", project: "Backend API",          workType: "Code Review", description: "Reviewed security-sensitive authentication code", hours: 3 },
    ],
  },
  {
    id: 12, userId: 1, weekNumber: 12,
    startDate: "2026-03-18", endDate: "2026-03-22", status: "INCOMPLETE",
    entries: [
      { id: 42, date: "Mar 18", project: "Mobile App",           workType: "Development", description: "Built offline mode with local data sync",        hours: 8 },
      { id: 43, date: "Mar 19", project: "Backend API",          workType: "Testing",     description: "Load tested the API with 10k concurrent users",  hours: 5 },
    ],
  },
  {
    id: 13, userId: 1, weekNumber: 13,
    startDate: "2026-03-25", endDate: "2026-03-29", status: "COMPLETED",
    entries: [
      { id: 44, date: "Mar 25", project: "Homepage Development",  workType: "Development", description: "Rebuilt blog section with new CMS integration",  hours: 7 },
      { id: 45, date: "Mar 26", project: "UI Redesign",          workType: "Design",      description: "Delivered final design specs to engineering",    hours: 5 },
      { id: 46, date: "Mar 27", project: "Backend API",          workType: "Development", description: "Implemented rate limiting on all public routes",   hours: 6 },
      { id: 47, date: "Mar 28", project: "Mobile App",           workType: "Bug fixes",   description: "Fixed memory leak in the image viewer",           hours: 4 },
      { id: 48, date: "Mar 29", project: "Bug Fixing",           workType: "Bug fixes",   description: "Cleared 12 high-priority bugs before release",   hours: 4 },
    ],
  },
  {
    id: 14, userId: 1, weekNumber: 14,
    startDate: "2026-04-01", endDate: "2026-04-05", status: "MISSING",
    entries: [],
  },
  {
    id: 15, userId: 1, weekNumber: 15,
    startDate: "2026-04-08", endDate: "2026-04-12", status: "COMPLETED",
    entries: [
      { id: 49, date: "Apr 8",  project: "Backend API",          workType: "Development", description: "Built real-time notifications with WebSockets",   hours: 8 },
      { id: 50, date: "Apr 9",  project: "Mobile App",           workType: "Development", description: "Implemented in-app notification centre",          hours: 6 },
      { id: 51, date: "Apr 10", project: "Homepage Development",  workType: "Design",      description: "A/B tested two hero section variants",           hours: 4 },
      { id: 52, date: "Apr 11", project: "UI Redesign",          workType: "Testing",     description: "Cross-browser testing on Safari and Firefox",    hours: 5 },
      { id: 53, date: "Apr 12", project: "Bug Fixing",           workType: "Bug fixes",   description: "Fixed broken pagination on the dashboard",       hours: 4 },
    ],
  },
  {
    id: 16, userId: 1, weekNumber: 16,
    startDate: "2026-04-15", endDate: "2026-04-19", status: "INCOMPLETE",
    entries: [
      { id: 54, date: "Apr 15", project: "Backend API",  workType: "Development", description: "Designed multi-tenant architecture for enterprise",  hours: 8 },
      { id: 55, date: "Apr 16", project: "UI Redesign",  workType: "Meeting",     description: "Q2 planning session with product and design",        hours: 3 },
      { id: 56, date: "Apr 17", project: "Mobile App",   workType: "Development", description: "Shipped v2.1.0 to App Store and Play Store",         hours: 6 },
    ],
  },
  {
    id: 17, userId: 1, weekNumber: 17,
    startDate: "2026-04-22", endDate: "2026-04-26", status: "COMPLETED",
    entries: [
      { id: 57, date: "Apr 22", project: "Homepage Development",  workType: "Development", description: "Improved page load speed from 4s to 1.2s",       hours: 6 },
      { id: 58, date: "Apr 23", project: "Backend API",          workType: "Development", description: "Added GraphQL layer on top of REST API",          hours: 8 },
      { id: 59, date: "Apr 24", project: "Mobile App",           workType: "Testing",     description: "Smoke tested all features after v2.1 release",   hours: 4 },
      { id: 60, date: "Apr 25", project: "UI Redesign",          workType: "Design",      description: "Designed charts and graphs for analytics page",  hours: 5 },
      { id: 61, date: "Apr 26", project: "Bug Fixing",           workType: "Bug fixes",   description: "Resolved 5 crash reports from App Store reviews", hours: 4 },
    ],
  },
  {
    id: 18, userId: 1, weekNumber: 18,
    startDate: "2026-04-29", endDate: "2026-05-03", status: "MISSING",
    entries: [],
  },
  {
    id: 19, userId: 1, weekNumber: 19,
    startDate: "2026-05-06", endDate: "2026-05-10", status: "COMPLETED",
    entries: [
      { id: 62, date: "May 6",  project: "Backend API",          workType: "Development", description: "Implemented full-text search with Elasticsearch",  hours: 8 },
      { id: 63, date: "May 7",  project: "Mobile App",           workType: "Development", description: "Added dark mode support to all app screens",       hours: 6 },
      { id: 64, date: "May 8",  project: "Homepage Development",  workType: "Bug fixes",   description: "Fixed broken links and 404 pages",               hours: 3 },
      { id: 65, date: "May 9",  project: "UI Redesign",          workType: "Design",      description: "Polished micro-interactions across all components", hours: 5 },
      { id: 66, date: "May 10", project: "Bug Fixing",           workType: "Code Review", description: "Reviewed and approved 9 pull requests",            hours: 4 },
    ],
  },
  {
    id: 20, userId: 1, weekNumber: 20,
    startDate: "2026-05-13", endDate: "2026-05-17", status: "INCOMPLETE",
    entries: [
      { id: 67, date: "May 13", project: "Backend API",  workType: "Development", description: "Started building admin dashboard API",              hours: 7 },
      { id: 68, date: "May 14", project: "Mobile App",   workType: "Testing",     description: "Beta testing with 50 external users",              hours: 5 },
    ],
  },
]

// ── HELPER FUNCTIONS ─────────────────────────────────────

// Recalculate the status of a timesheet based on total hours logged
// MISSING = 0 entries, INCOMPLETE = some entries, COMPLETED = 40+ hours
function recalcStatus(sheet) {
  const total = sheet.entries.reduce((sum, e) => sum + Number(e.hours), 0)
  if (total === 0)    sheet.status = "MISSING"
  else if (total < 40) sheet.status = "INCOMPLETE"
  else                sheet.status = "COMPLETED"
}

export function findUser(email, password) {
  return USERS.find((u) => u.email === email && u.password === password)
}

export function getTimesheetsByUser(userId) {
  return TIMESHEETS.filter((t) => t.userId === userId)
}

export function getTimesheetById(id) {
  return TIMESHEETS.find((t) => t.id === Number(id))
}

export function addEntryToTimesheet(timesheetId, entry) {
  const sheet = TIMESHEETS.find((t) => t.id === Number(timesheetId))
  if (!sheet) return null
  const newEntry = { id: Date.now(), ...entry, hours: Number(entry.hours) }
  sheet.entries.push(newEntry)
  recalcStatus(sheet)   // ← recalculate status after every change
  return newEntry
}

export function updateEntry(timesheetId, entryId, updatedData) {
  const sheet = TIMESHEETS.find((t) => t.id === Number(timesheetId))
  if (!sheet) return null
  const index = sheet.entries.findIndex((e) => e.id === Number(entryId))
  if (index === -1) return null
  sheet.entries[index] = { ...sheet.entries[index], ...updatedData, hours: Number(updatedData.hours) }
  recalcStatus(sheet)   // ← recalculate status after every change
  return sheet.entries[index]
}

export function deleteEntry(timesheetId, entryId) {
  const sheet = TIMESHEETS.find((t) => t.id === Number(timesheetId))
  if (!sheet) return false
  const before = sheet.entries.length
  sheet.entries = sheet.entries.filter((e) => e.id !== Number(entryId))
  recalcStatus(sheet)   // ← recalculate status after every change
  return sheet.entries.length < before
}

export function createTimesheet(userId, weekNumber, startDate, endDate) {
  const newSheet = { id: Date.now(), userId, weekNumber, startDate, endDate, status: "MISSING", entries: [] }
  TIMESHEETS.push(newSheet)
  return newSheet
}
