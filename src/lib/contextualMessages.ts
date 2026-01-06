interface SpecialDay {
  month: number // 1-12
  day: number
  message: string
  description?: string
}

// Fixed-date holidays and special days
const SPECIAL_DAYS: SpecialDay[] = [
  // January
  { month: 1, day: 1, message: 'Happy New Year', description: 'The first day of the year. Celebrated worldwide with fireworks, parties, and resolutions for self-improvement in the year ahead.' },
  { month: 1, day: 6, message: 'Happy Epiphany', description: 'Christian feast day celebrating the revelation of God incarnate as Jesus Christ. In many cultures, it marks the end of the Twelve Days of Christmas and the arrival of the Three Wise Men.' },
  { month: 1, day: 25, message: 'Happy Burns Night', description: 'Scottish celebration of poet Robert Burns, born 1759. Traditionally features haggis, whisky, poetry recitals, and bagpipes. "Auld Lang Syne" was written by Burns.' },

  // February
  { month: 2, day: 2, message: 'Happy Groundhog Day', description: 'North American tradition where a groundhog emerging from its burrow predicts spring\'s arrival. If it sees its shadow, six more weeks of winter; if not, early spring.' },
  { month: 2, day: 14, message: "Happy Valentine's Day", description: 'Day of romance celebrating St. Valentine. Evolved from ancient Roman festival Lupercalia. Now a global celebration of love and affection with cards, flowers, and chocolates.' },

  // March
  { month: 3, day: 1, message: "Happy St David's Day", description: 'National day of Wales celebrating St. David, the patron saint. Welsh people wear daffodils or leeks, traditional symbols of Wales, and celebrate Welsh culture.' },
  { month: 3, day: 14, message: 'Happy Pi Day', description: 'Celebrates the mathematical constant π (3.14...). Observed by mathematics enthusiasts worldwide. Often celebrated with pie eating, as "pi" and "pie" are homophones.' },
  { month: 3, day: 17, message: "Happy St Patrick's Day", description: 'Irish cultural and religious celebration. Commemorates St. Patrick, who brought Christianity to Ireland in the 5th century. Celebrated globally with parades, green attire, and Irish music.' },

  // April
  { month: 4, day: 1, message: "Happy April Fools' Day", description: 'Day of pranks and hoaxes. Origins unclear, possibly dating to the switch from Julian to Gregorian calendar in 1582. Major news outlets often publish fake stories.' },
  { month: 4, day: 22, message: 'Happy Earth Day', description: 'Annual event supporting environmental protection. First celebrated in 1970, now observed in 193 countries. Led to the creation of environmental legislation worldwide.' },
  { month: 4, day: 23, message: "Happy St George's Day", description: 'National day of England celebrating St. George, the patron saint. Known for the legend of slaying a dragon. Celebrated with English flags, Morris dancing, and medieval fairs.' },

  // May
  { month: 5, day: 4, message: 'May the Fourth be with you', description: 'Unofficial Star Wars Day, a play on "May the Force be with you." Fans celebrate the franchise with marathons, cosplay, and special events. First Star Wars film released in 1977.' },
  { month: 5, day: 5, message: 'Happy Cinco de Mayo', description: 'Commemorates the Mexican Army\'s victory over France at the Battle of Puebla in 1862. More widely celebrated in the US than Mexico, featuring Mexican cuisine and culture.' },

  // June
  { month: 6, day: 21, message: 'Happy Summer Solstice', description: 'Longest day of the year in the Northern Hemisphere. Ancient cultures built monuments like Stonehenge to mark this astronomical event. Celebrated since prehistoric times.' },

  // July
  { month: 7, day: 4, message: 'Happy Independence Day', description: 'US Independence Day celebrating the Declaration of Independence in 1776. Marked with fireworks, parades, barbecues, and patriotic displays. "Fourth of July" is a federal holiday.' },
  { month: 7, day: 14, message: 'Happy Bastille Day', description: 'French National Day commemorating the storming of the Bastille prison in 1789, sparking the French Revolution. Celebrated with military parades, fireworks, and parties.' },

  // September
  { month: 9, day: 19, message: 'Ahoy! Talk Like a Pirate Day', description: 'Parodic holiday created in 1995. Participants speak in pirate slang for the day. Despite being entirely made up, it gained international recognition and corporate participation.' },

  // October
  { month: 10, day: 3, message: 'Happy German Unity Day', description: 'German national holiday celebrating reunification of East and West Germany in 1990. Marks the end of division following World War II and the Cold War.' },
  { month: 10, day: 31, message: 'Happy Halloween', description: 'Ancient Celtic festival of Samhain, marking summer\'s end. Evolved into a night of costumes, trick-or-treating, and spooky celebrations. Second-highest grossing commercial holiday after Christmas.' },

  // November
  { month: 11, day: 5, message: 'Remember, remember...', description: 'Guy Fawkes Night commemorating the failed Gunpowder Plot to blow up Parliament in 1605. Celebrated in the UK with bonfires, fireworks, and burning effigies of Guy Fawkes.' },
  { month: 11, day: 11, message: 'Lest we forget', description: 'Remembrance Day honoring armed forces members who died in the line of duty. Observed in Commonwealth countries at 11am on 11/11, marking the WWI armistice in 1918.' },
  { month: 11, day: 30, message: "Happy St Andrew's Day", description: 'National day of Scotland celebrating St. Andrew, the patron saint. Traditional celebrations include Scottish dancing, music, and a feast of haggis, neeps, and tatties.' },

  // December
  { month: 12, day: 24, message: 'Merry Christmas Eve', description: 'The night before Christmas. Many cultures have traditions including midnight mass, gift opening, special meals, and leaving treats for Santa. In some countries, the main celebration day.' },
  { month: 12, day: 25, message: 'Merry Christmas', description: 'Christian celebration of Jesus Christ\'s birth. One of the most widely celebrated holidays worldwide, blending religious observance with secular traditions like gift-giving and Santa Claus.' },
  { month: 12, day: 26, message: 'Happy Boxing Day', description: 'British Commonwealth holiday traditionally when servants received gifts ("boxes") from employers. Now a major shopping day and sports day, particularly for football and horse racing.' },
  { month: 12, day: 31, message: "Happy New Year's Eve", description: 'The final day of the year. Celebrated with parties, countdown to midnight, fireworks, champagne, and singing "Auld Lang Syne." Times Square ball drop attracts millions of viewers.' },
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

export interface ContextualMessageData {
  message: string
  description?: string
}

// Main export
export function getContextualMessage(now: Date): ContextualMessageData {
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
    return {
      message: fixedHoliday.message,
      description: fixedHoliday.description
    }
  }

  // Check moveable holidays
  const moveableHoliday = getMoveableHoliday(londonDate)
  if (moveableHoliday) {
    return { message: moveableHoliday }
  }

  // Default to daily quote
  return { message: getDailyQuote(londonDate) }
}
