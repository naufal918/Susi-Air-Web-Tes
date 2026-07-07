<script setup lang="ts">
const props = defineProps<{
  series: { date: string; value: number }[]
  yMax: number
  limit: number
  todayDate: string
}>()

const width = 320
const height = 170
const paddingLeft = 34
const paddingRight = 10
const paddingTop = 14
const paddingBottom = 22

const chartWidth = width - paddingLeft - paddingRight
const chartHeight = height - paddingTop - paddingBottom

function xFor(i: number) {
  if (props.series.length <= 1) return paddingLeft
  return paddingLeft + (i / (props.series.length - 1)) * chartWidth
}

function yFor(value: number) {
  const clamped = Math.min(value, props.yMax)
  return paddingTop + chartHeight - (clamped / props.yMax) * chartHeight
}

const linePath = computed(() =>
  props.series.map((p, i) => `${i === 0 ? 'M' : 'L'} ${xFor(i).toFixed(1)} ${yFor(p.value).toFixed(1)}`).join(' ')
)

const areaPath = computed(() => {
  if (!props.series.length) return ''
  const last = props.series.length - 1
  return `${linePath.value} L ${xFor(last).toFixed(1)} ${(paddingTop + chartHeight).toFixed(1)} L ${xFor(0).toFixed(1)} ${(paddingTop + chartHeight).toFixed(1)} Z`
})

const limitY = computed(() => yFor(props.limit))

const todayIndex = computed(() => props.series.findIndex((p) => p.date === props.todayDate))

const yTicks = computed(() => {
  const steps = 4
  return Array.from({ length: steps + 1 }, (_, i) => Math.round((props.yMax / steps) * i))
})

function formatDayLabel(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.getDate()
}

const isOverLimit = (v: number) => v > props.limit
</script>

<template>
  <div class="chart">
    <svg :viewBox="`0 0 ${width} ${height}`" class="chart__svg" preserveAspectRatio="none">
      <!-- y grid + labels -->
      <g v-for="tick in yTicks" :key="tick">
        <line
          :x1="paddingLeft"
          :x2="width - paddingRight"
          :y1="yFor(tick)"
          :y2="yFor(tick)"
          stroke="#EEF0F3"
          stroke-width="1"
        />
        <text :x="paddingLeft - 6" :y="yFor(tick) + 3" text-anchor="end" class="chart__tick">{{ tick }}</text>
      </g>

      <!-- limit line -->
      <line
        :x1="paddingLeft"
        :x2="width - paddingRight"
        :y1="limitY"
        :y2="limitY"
        stroke="#E63757"
        stroke-width="1.5"
        stroke-dasharray="4 3"
      />
      <text :x="width - paddingRight" :y="limitY - 4" text-anchor="end" class="chart__limit-label">
        limit {{ limit }}h
      </text>

      <!-- area -->
      <path :d="areaPath" fill="url(#chartGradient)" stroke="none" />
      <!-- line -->
      <path :d="linePath" fill="none" stroke="#22C5E8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />

      <!-- points -->
      <circle
        v-for="(p, i) in series"
        :key="p.date"
        :cx="xFor(i)"
        :cy="yFor(p.value)"
        :r="i === todayIndex ? 4.5 : 3"
        :fill="isOverLimit(p.value) ? '#E63757' : (i === todayIndex ? '#0E2138' : '#22C5E8')"
        :stroke="i === todayIndex ? '#fff' : 'none'"
        :stroke-width="i === todayIndex ? 2 : 0"
      />

      <!-- today vertical marker -->
      <line
        v-if="todayIndex >= 0"
        :x1="xFor(todayIndex)"
        :x2="xFor(todayIndex)"
        :y1="paddingTop"
        :y2="paddingTop + chartHeight"
        stroke="#0E2138"
        stroke-width="1"
        stroke-dasharray="2 2"
        opacity="0.35"
      />

      <defs>
        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#22C5E8" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#22C5E8" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>

    <div class="chart__xaxis">
      <span
        v-for="(p, i) in series"
        :key="p.date"
        class="chart__xlabel"
        :class="{ 'chart__xlabel--today': i === todayIndex }"
      >
        {{ formatDayLabel(p.date) }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chart {
  &__svg {
    width: 100%;
    height: 170px;
    display: block;
  }

  &__tick {
    font-size: 8px;
    fill: $color-text-secondary;
  }

  &__limit-label {
    font-size: 8px;
    fill: $color-danger;
    font-weight: 700;
  }

  &__xaxis {
    display: flex;
    justify-content: space-between;
    padding: 0 4px 0 34px;
    margin-top: 2px;
  }

  &__xlabel {
    font-size: 9px;
    color: $color-text-secondary;
    font-weight: 500;

    &--today {
      color: $color-navy;
      font-weight: 800;
    }
  }
}
</style>
