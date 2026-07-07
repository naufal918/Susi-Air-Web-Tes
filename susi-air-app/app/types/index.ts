export interface Pilot {
  name: string
  totalFlightHours: number
}

export interface Limits {
  daily: number
  weekly: number
  monthly: number
  annual: number
}

export interface ChartBound {
  windowDays: number
  limit: number
  max: number
  displayRangeDays: number
}

export type ChartRangeKey = '1w' | '1m' | '3m' | '6m' | '1y'

export interface ChartBounds {
  [key: string]: ChartBound
}

export interface FlightHourEntry {
  date: string // YYYY-MM-DD
  hours: number
}

export interface FlightHoursData {
  pilot: Pilot
  limits: Limits
  chartBounds: ChartBounds
  flightHours: FlightHourEntry[]
}

export type DocumentStatus = 'green' | 'amber' | 'red'

export interface CrewDocument {
  id: string
  label: string
  expiryDate: string
}

export interface DocumentThresholds {
  warningDays: number
  comment?: string
}

export interface DocumentsData {
  today: string
  thresholds: DocumentThresholds
  documents: CrewDocument[]
}

export interface UpcomingFlight {
  id: string
  date: string
  time: string
  departure: { icao: string; city: string }
  arrival: { icao: string; city: string }
  aircraft: string
  flightNumber: string
}

export type DutyCode = 'DTY' | 'RLV' | 'SCK' | 'TRD' | 'TRX' | 'ADM' | 'FER' | 'MED' | 'REC' | 'ULV'

export interface ScheduleEntry {
  id: string
  duty_date: string
  status: 1 | 2 // 1 = pending/upcoming, 2 = completed/verified
  base_name: string
  base_color: string
  duty_type: DutyCode | string
  count_schedules: number
  count_logbooks: number
}

export interface LegendEntry {
  code: string
  label: string
  color: string
}

export interface ScheduleData {
  today: string
  legend: LegendEntry[]
  schedules: ScheduleEntry[]
}

export interface NewsItem {
  id: string
  title: string
  excerpt: string
  date: string
  tag: string
}
