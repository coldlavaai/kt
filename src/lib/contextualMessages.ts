interface SpecialDay {
  month: number // 1-12
  day: number
  message: string
}

// Fixed-date holidays and special days
const SPECIAL_DAYS: SpecialDay[] = [
  // January
  { month: 1, day: 1, message: 'Happy New Year' },
  { month: 1, day: 6, message: 'Happy Epiphany' },
  { month: 1, day: 25, message: 'Happy Burns Night' },

  // February
  { month: 2, day: 2, message: 'Happy Groundhog Day' },
  { month: 2, day: 14, message: "Happy Valentine's Day" },

  // March
  { month: 3, day: 1, message: "Happy St David's Day" },
  { month: 3, day: 14, message: 'Happy Pi Day' },
  { month: 3, day: 17, message: "Happy St Patrick's Day" },

  // April
  { month: 4, day: 1, message: "Happy April Fools' Day" },
  { month: 4, day: 22, message: 'Happy Earth Day' },
  { month: 4, day: 23, message: "Happy St George's Day" },

  // May
  { month: 5, day: 4, message: 'May the Fourth be with you' },
  { month: 5, day: 5, message: 'Happy Cinco de Mayo' },

  // June
  { month: 6, day: 21, message: 'Happy Summer Solstice' },

  // July
  { month: 7, day: 4, message: 'Happy Independence Day' },
  { month: 7, day: 14, message: 'Happy Bastille Day' },

  // September
  { month: 9, day: 19, message: 'Ahoy! Talk Like a Pirate Day' },

  // October
  { month: 10, day: 3, message: 'Happy German Unity Day' },
  { month: 10, day: 31, message: 'Happy Halloween' },

  // November
  { month: 11, day: 5, message: 'Remember, remember...' },
  { month: 11, day: 11, message: 'Lest we forget' },
  { month: 11, day: 30, message: "Happy St Andrew's Day" },

  // December
  { month: 12, day: 24, message: 'Merry Christmas Eve' },
  { month: 12, day: 25, message: 'Merry Christmas' },
  { month: 12, day: 26, message: 'Happy Boxing Day' },
  { month: 12, day: 31, message: "Happy New Year's Eve" },
]

// Positive quotes for non-special days
const DAILY_QUOTES: string[] = [
  'Build something brilliant today',
  'Automate the boring stuff',
  'Ship it',
  'Make it happen',
  'Good things take time',
  'Stay curious',
  'Done is better than perfect',
  'Less meetings, more doing',
  'Create something worth talking about',
  'Work smarter, not harder',
  'The best time to start was yesterday',
  'Keep building',
  'Small steps, big results',
  'Focus on what matters',
  'Make today count',
  'Trust the process',
  'Every expert was once a beginner',
  'Simplicity is the ultimate sophistication',
  'Progress over perfection',
  'Your future self will thank you',
]

// Calculate Easter Sunday using Anonymous Gregorian algorithm
function getEasterSunday(year: number): Date {
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31)
  const day = ((h + l - 7 * m + 114) % 31) + 1
  return new Date(year, month - 1, day)
}

function getMoveableHoliday(now: Date): string | null {
  const year = now.getFullYear()
  const month = now.getMonth()
  const day = now.getDate()
  const dayOfWeek = now.getDay()

  // Easter Sunday
  const easter = getEasterSunday(year)
  if (month === easter.getMonth() && day === easter.getDate()) {
    return 'Happy Easter'
  }

  // Good Friday (2 days before Easter)
  const goodFriday = new Date(easter)
  goodFriday.setDate(easter.getDate() - 2)
  if (month === goodFriday.getMonth() && day === goodFriday.getDate()) {
    return 'Good Friday'
  }

  // Easter Monday
  const easterMonday = new Date(easter)
  easterMonday.setDate(easter.getDate() + 1)
  if (month === easterMonday.getMonth() && day === easterMonday.getDate()) {
    return 'Happy Easter Monday'
  }

  // UK Early May Bank Holiday (first Monday of May)
  if (month === 4 && dayOfWeek === 1 && day <= 7) {
    return 'Happy Bank Holiday'
  }

  // UK Spring Bank Holiday (last Monday of May)
  if (month === 4 && dayOfWeek === 1 && day > 24) {
    return 'Happy Bank Holiday'
  }

  // UK Summer Bank Holiday (last Monday of August)
  if (month === 7 && dayOfWeek === 1 && day > 24) {
    return 'Happy Bank Holiday'
  }

  // US Thanksgiving (4th Thursday of November)
  if (month === 10 && dayOfWeek === 4 && day >= 22 && day <= 28) {
    return 'Happy Thanksgiving'
  }

  // US Labor Day (first Monday of September)
  if (month === 8 && dayOfWeek === 1 && day <= 7) {
    return 'Happy Labor Day'
  }

  // US Memorial Day (last Monday of May)
  if (month === 4 && dayOfWeek === 1 && day > 24) {
    return 'Happy Memorial Day'
  }

  // Mother's Day UK (Mothering Sunday - 3 weeks before Easter)
  if (month === 2 && dayOfWeek === 0) {
    const motheringUK = new Date(easter)
    motheringUK.setDate(easter.getDate() - 21)
    if (day === motheringUK.getDate()) {
      return "Happy Mother's Day"
    }
  }

  // Mother's Day US (2nd Sunday of May)
  if (month === 4 && dayOfWeek === 0 && day >= 8 && day <= 14) {
    return "Happy Mother's Day"
  }

  // Father's Day (3rd Sunday of June)
  if (month === 5 && dayOfWeek === 0 && day >= 15 && day <= 21) {
    return "Happy Father's Day"
  }

  return null
}

// Get a consistent quote for the day (same quote all day)
function getDailyQuote(date: Date): string {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000
  )
  const quoteIndex = dayOfYear % DAILY_QUOTES.length
  return DAILY_QUOTES[quoteIndex]
}

// Main export
export function getContextualMessage(now: Date): string {
  // Get London date for consistency
  const londonDate = new Date(
    now.toLocaleString('en-US', { timeZone: 'Europe/London' })
  )
  const month = londonDate.getMonth() + 1 // 1-12
  const day = londonDate.getDate()

  // Check fixed holidays first
  const fixedHoliday = SPECIAL_DAYS.find(
    (h) => h.month === month && h.day === day
  )

  if (fixedHoliday) {
    return fixedHoliday.message
  }

  // Check moveable holidays
  const moveableHoliday = getMoveableHoliday(londonDate)
  if (moveableHoliday) {
    return moveableHoliday
  }

  // Default to daily quote
  return getDailyQuote(londonDate)
}
