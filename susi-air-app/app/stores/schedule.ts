import type { LegendEntry, ScheduleEntry } from '~/types'

export const useScheduleStore = defineStore('schedule', {
  state: () => ({
    loading: false,
    loaded: false,
    today: '' as string,
    legend: [] as LegendEntry[],
    entries: [] as ScheduleEntry[]
  }),
  getters: {
    entryMap: (state) => {
      const map = new Map<string, ScheduleEntry>()
      for (const e of state.entries) map.set(e.duty_date, e)
      return map
    },
    legendMap: (state) => {
      const map = new Map<string, LegendEntry>()
      for (const l of state.legend) map.set(l.code, l)
      return map
    }
  },
  actions: {
    async loadAll() {
      if (this.loaded || this.loading) return
      this.loading = true
      try {
        const data = await $fetch<{ today: string; legend: LegendEntry[]; schedules: ScheduleEntry[] }>(
          '/data/mock-schedules.json'
        )
        this.today = data.today
        this.legend = data.legend
        this.entries = data.schedules
        this.loaded = true
      } finally {
        this.loading = false
      }
    }
  }
})
