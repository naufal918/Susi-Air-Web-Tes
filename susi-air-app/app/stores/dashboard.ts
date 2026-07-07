import type { CrewDocument, DocumentThresholds, FlightHoursData, NewsItem, UpcomingFlight } from '~/types'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    loading: false,
    loaded: false,
    flightHoursData: null as FlightHoursData | null,
    documents: [] as CrewDocument[],
    documentsToday: '' as string,
    documentsThresholds: null as DocumentThresholds | null,
    upcomingFlight: null as UpcomingFlight | null,
    news: [
      {
        id: 'news-1',
        tag: 'Operations',
        title: 'Wet season routing update for Sumatra sectors',
        excerpt: 'Revised minimums and alternate airfields now in effect for all Sumatra routes.',
        date: '2026-05-28'
      },
      {
        id: 'news-2',
        tag: 'Safety',
        title: 'Updated fatigue reporting procedure',
        excerpt: 'New FRMS form replaces the paper fatigue log starting next month.',
        date: '2026-05-24'
      },
      {
        id: 'news-3',
        tag: 'Fleet',
        title: 'Grand Caravan PK-ASI back in service',
        excerpt: 'Scheduled maintenance complete, aircraft returned to the active fleet.',
        date: '2026-05-20'
      }
    ] as NewsItem[]
  }),
  getters: {
    unreadNotifications: () => 3
  },
  actions: {
    async loadAll() {
      if (this.loaded || this.loading) return
      this.loading = true
      try {
        const [fh, docs, flight] = await Promise.all([
          $fetch<FlightHoursData>('/data/mock-flight-hours.json'),
          $fetch<{ today: string; thresholds: DocumentThresholds; documents: CrewDocument[] }>(
            '/data/mock-documents.json'
          ),
          $fetch<{ flight: UpcomingFlight }>('/data/mock-upcoming-flight.json')
        ])
        this.flightHoursData = fh
        this.documents = docs.documents
        this.documentsToday = docs.today
        this.documentsThresholds = docs.thresholds
        this.upcomingFlight = flight.flight
        this.loaded = true
      } finally {
        this.loading = false
      }
    }
  }
})
