<script setup lang="ts">
import type { ChartRangeKey, FlightHoursData } from '~/types'

const props = defineProps<{ data: FlightHoursData }>()

const { today, daily, weekly, monthly, annual, getChartSeries } = useFlightHours(props.data)

const ranges: { key: ChartRangeKey; label: string }[] = [
  { key: '1w', label: '1W' },
  { key: '1m', label: '1M' },
  { key: '3m', label: '3M' },
  { key: '6m', label: '6M' },
  { key: '1y', label: '1Y' }
]

const selectedRange = ref<ChartRangeKey>('1w')

const bound = computed(() => props.data.chartBounds[selectedRange.value])
const series = computed(() => getChartSeries(selectedRange.value))
const todayDateStr = computed(() => formatDateKey(today))
</script>

<template>
  <section class="hours-limit">
    <div class="hours-limit__header">
      <h2 class="hours-limit__title">Hours to Limit</h2>
    </div>

    <div class="hours-limit__cards">
      <LimitSummaryCard label="Daily" :current="daily.current" :limit="daily.limit" />
      <LimitSummaryCard label="Weekly" :current="weekly.current" :limit="weekly.limit" />
      <LimitSummaryCard label="Monthly" :current="monthly.current" :limit="monthly.limit" />
      <LimitSummaryCard label="Annual" :current="annual.current" :limit="annual.limit" />
    </div>

    <div class="hours-limit__chart-wrap card">
      <div class="hours-limit__chart-head">
        <span class="hours-limit__chart-title">Flight Hours Trend</span>
        <span class="hours-limit__chart-sub">{{ selectedRange.toUpperCase() }} rolling sum</span>
      </div>

      <FlightHoursChart
        :series="series"
        :y-max="bound.max"
        :limit="bound.limit"
        :today-date="todayDateStr"
      />

      <div class="hours-limit__toggle">
        <button
          v-for="r in ranges"
          :key="r.key"
          class="hours-limit__toggle-btn"
          :class="{ 'hours-limit__toggle-btn--active': selectedRange === r.key }"
          @click="selectedRange = r.key"
        >
          {{ r.label }}
        </button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hours-limit {
  padding: 0 $space-lg;
  margin-bottom: $space-lg;

  &__header {
    margin-bottom: $space-md;
  }

  &__title {
    font-size: $fs-headline;
    font-weight: 800;
  }

  &__cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $space-sm;
    margin-bottom: $space-md;
  }

  &__chart-wrap {
    padding: $space-lg $space-md $space-md;
  }

  &__chart-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 0 $space-sm;
    margin-bottom: $space-sm;
  }

  &__chart-title {
    font-size: $fs-body;
    font-weight: 700;
  }

  &__chart-sub {
    font-size: 11px;
    color: $color-text-secondary;
    font-weight: 600;
  }

  &__toggle {
    display: flex;
    justify-content: center;
    gap: 6px;
    margin-top: $space-md;
  }

  &__toggle-btn {
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    color: $color-text-secondary;
    background: $color-bg;
    transition: background 0.15s ease, color 0.15s ease, transform 0.1s ease;

    &:active {
      transform: scale(0.94);
    }

    &--active {
      background: $color-navy;
      color: #fff;
    }
  }
}
</style>
