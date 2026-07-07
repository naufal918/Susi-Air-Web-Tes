import type { ChartRangeKey, FlightHoursData } from '~/types'

export function formatDateKey(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function addDays(d: Date, days: number): Date {
  const copy = new Date(d)
  copy.setDate(copy.getDate() + days)
  return copy
}

/**
 * Core rolling-sum utility used by both the summary cards and the trend chart.
 *
 * Y(D) = sum of flight hours from (D - windowDays + 1) up to and including D
 *
 * Missing dates (e.g. days in the future that haven't happened yet) are
 * treated as 0 hours flown.
 */
export function rollingSum(hoursByDate: Map<string, number>, endDate: Date, windowDays: number): number {
  let total = 0
  for (let i = 0; i < windowDays; i++) {
    const d = addDays(endDate, -i)
    total += hoursByDate.get(formatDateKey(d)) ?? 0
  }
  return Math.round(total * 10) / 10
}

export function useFlightHours(data: FlightHoursData) {
  const today = useToday()

  const hoursByDate = computed(() => {
    const map = new Map<string, number>()
    for (const entry of data.flightHours) {
      map.set(entry.date, entry.hours)
    }
    return map
  })

  const daily = computed(() => ({
    current: rollingSum(hoursByDate.value, today, 1),
    limit: data.limits.daily
  }))

  const weekly = computed(() => ({
    current: rollingSum(hoursByDate.value, today, 7),
    limit: data.limits.weekly
  }))

  const monthly = computed(() => ({
    current: rollingSum(hoursByDate.value, today, 30),
    limit: data.limits.monthly
  }))

  const annual = computed(() => ({
    current: rollingSum(hoursByDate.value, today, 365),
    limit: data.limits.annual
  }))

  /**
   * Builds the 15-point series for the trend chart (7 days before today,
   * today, 7 days after today). The window size used for each point's
   * rolling sum depends on the selected range toggle, but the number of
   * displayed points never changes.
   */
  function getChartSeries(rangeKey: ChartRangeKey) {
    const bound = data.chartBounds[rangeKey]
    const displayRange = bound.displayRangeDays
    const points: { date: string; value: number }[] = []
    for (let offset = -displayRange; offset <= displayRange; offset++) {
      const d = addDays(today, offset)
      points.push({
        date: formatDateKey(d),
        value: rollingSum(hoursByDate.value, d, bound.windowDays)
      })
    }
    return points
  }

  return { today, daily, weekly, monthly, annual, getChartSeries }
}
