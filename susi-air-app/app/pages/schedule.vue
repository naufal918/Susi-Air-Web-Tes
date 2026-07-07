<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const store = useScheduleStore()
await useAsyncData('schedule', () => store.loadAll())

const initialToday = store.today ? new Date(store.today + 'T00:00:00') : useToday()
const viewYear = ref(initialToday.getFullYear())
const viewMonth = ref(initialToday.getMonth())

const monthLabel = computed(() =>
  new Date(viewYear.value, viewMonth.value, 1).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
)

function prevMonth() {
  if (viewMonth.value === 0) {
    viewMonth.value = 11
    viewYear.value -= 1
  } else {
    viewMonth.value -= 1
  }
}

function nextMonth() {
  if (viewMonth.value === 11) {
    viewMonth.value = 0
    viewYear.value += 1
  } else {
    viewMonth.value += 1
  }
}

const sheetOpen = ref(false)
const selectedDate = ref('')

function handleSelectDate(dateStr: string) {
  selectedDate.value = dateStr
  sheetOpen.value = true
}
</script>

<template>
  <div class="schedule">
    <header class="schedule__header">
      <h1 class="schedule__title">Schedule</h1>
    </header>

    <template v-if="store.loading || !store.loaded">
      <div class="schedule__skeleton skeleton" />
    </template>

    <template v-else>
      <section class="schedule__card card">
        <div class="schedule__nav">
          <button class="schedule__nav-btn" @click="prevMonth">
            <ChevronLeft :size="18" :stroke-width="2" />
          </button>
          <span class="schedule__month">{{ monthLabel }}</span>
          <button class="schedule__nav-btn" @click="nextMonth">
            <ChevronRight :size="18" :stroke-width="2" />
          </button>
        </div>

        <ScheduleCalendar
          :year="viewYear"
          :month="viewMonth"
          :entry-map="store.entryMap"
          :today-str="store.today"
          @select-date="handleSelectDate"
        />
      </section>

      <ScheduleLegend :legend="store.legend" />
    </template>

    <PlaceholderSheet :open="sheetOpen" :label="selectedDate" @close="sheetOpen = false" />
  </div>
</template>

<style lang="scss" scoped>
.schedule {
  padding: $space-lg;

  &__header {
    margin-bottom: $space-lg;
  }

  &__title {
    font-size: $fs-headline-lg;
    font-weight: 800;
  }

  &__skeleton {
    height: 360px;
    border-radius: $radius-card;
  }

  &__card {
    margin-bottom: $space-lg;
  }

  &__nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: $space-md;
  }

  &__nav-btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: $color-bg;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $color-navy;
    transition: transform 0.1s ease;

    &:active {
      transform: scale(0.9);
    }
  }

  &__month {
    font-size: $fs-body-lg;
    font-weight: 700;
  }
}
</style>
