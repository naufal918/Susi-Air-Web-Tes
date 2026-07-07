<script setup lang="ts">
import { Check } from 'lucide-vue-next'
import type { ScheduleEntry } from '~/types'

const props = defineProps<{
  year: number
  month: number // 0-indexed
  entryMap: Map<string, ScheduleEntry>
  todayStr: string
}>()

const emit = defineEmits<{ selectDate: [dateStr: string] }>()

const weekdayLabels = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

function pad(n: number) {
  return String(n).padStart(2, '0')
}

const cells = computed(() => {
  const first = new Date(props.year, props.month, 1)
  // Monday-first index: JS getDay() 0=Sun..6=Sat -> convert to 0=Mon..6=Sun
  const firstWeekday = (first.getDay() + 6) % 7
  const daysInMonth = new Date(props.year, props.month + 1, 0).getDate()

  const result: { day: number | null; dateStr: string | null }[] = []
  for (let i = 0; i < firstWeekday; i++) result.push({ day: null, dateStr: null })
  for (let d = 1; d <= daysInMonth; d++) {
    result.push({ day: d, dateStr: `${props.year}-${pad(props.month + 1)}-${pad(d)}` })
  }
  while (result.length % 7 !== 0) result.push({ day: null, dateStr: null })
  return result
})

function entryFor(dateStr: string | null) {
  if (!dateStr) return null
  return props.entryMap.get(dateStr) ?? null
}

function isFullyLogged(entry: ScheduleEntry) {
  return entry.count_logbooks === entry.count_schedules
}

// Fill color: use the entry's own base_color at reduced opacity so the
// duty-type label / number badge stays legible on top.
function tint(hex: string, alpha = 0.16) {
  const clean = hex.replace('#', '')
  const bigint = parseInt(clean, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
</script>

<template>
  <div class="calendar">
    <div class="calendar__weekdays">
      <span v-for="w in weekdayLabels" :key="w" class="calendar__weekday">{{ w }}</span>
    </div>
    <div class="calendar__grid">
      <button
        v-for="(cell, i) in cells"
        :key="i"
        class="calendar__cell"
        :class="{
          'calendar__cell--empty': !cell.day,
          'calendar__cell--today': cell.dateStr === todayStr
        }"
        :style="entryFor(cell.dateStr) ? { background: tint(entryFor(cell.dateStr)!.base_color) } : undefined"
        :disabled="!cell.day"
        @click="cell.dateStr && emit('selectDate', cell.dateStr)"
      >
        <template v-if="cell.day">
          <span
            v-if="entryFor(cell.dateStr)"
            class="calendar__status"
            :style="{ background: entryFor(cell.dateStr)!.base_color }"
          >
            <Check v-if="isFullyLogged(entryFor(cell.dateStr)!)" :size="9" :stroke-width="3" />
            <template v-else>{{ entryFor(cell.dateStr)!.count_schedules }}</template>
          </span>
          <span class="calendar__day-number">{{ cell.day }}</span>
          <span
            v-if="entryFor(cell.dateStr)"
            class="calendar__duty"
            :style="{ color: entryFor(cell.dateStr)!.base_color }"
          >
            {{ entryFor(cell.dateStr)?.base_name }}
          </span>
        </template>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.calendar {
  &__weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: 6px;
  }

  &__weekday {
    text-align: center;
    font-size: 11px;
    font-weight: 700;
    color: $color-text-secondary;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
  }

  &__cell {
    position: relative;
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    border-radius: 10px;
    background: transparent;
    transition: transform 0.1s ease;

    &:active:not(&--empty) {
      transform: scale(0.92);
    }

    &--empty {
      cursor: default;
    }

    &--today {
      box-shadow: inset 0 0 0 1.5px $color-navy;
    }
  }

  &__status {
    position: absolute;
    top: 3px;
    right: 3px;
    min-width: 14px;
    height: 14px;
    border-radius: 7px;
    color: #fff;
    font-size: 8px;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 2px;
  }

  &__day-number {
    font-size: 12px;
    font-weight: 600;
    color: $color-text-primary;
  }

  &__duty {
    font-size: 8px;
    font-weight: 800;
    letter-spacing: 0.02em;
  }
}
</style>
