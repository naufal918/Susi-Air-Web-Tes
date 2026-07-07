<script setup lang="ts">
const props = defineProps<{
  label: string
  current: number
  limit: number
}>()

const pct = computed(() => Math.min(100, Math.round((props.current / props.limit) * 100)))
const remaining = computed(() => Math.max(0, Math.round((props.limit - props.current) * 10) / 10))

const status = computed<'ok' | 'warn' | 'danger'>(() => {
  if (pct.value >= 100) return 'danger'
  if (pct.value >= 80) return 'warn'
  return 'ok'
})

const circumference = 2 * Math.PI * 26
const dashOffset = computed(() => circumference - (Math.min(pct.value, 100) / 100) * circumference)
</script>

<template>
  <div class="limit-card" :class="`limit-card--${status}`">
    <div class="limit-card__ring">
      <svg viewBox="0 0 64 64" width="60" height="60">
        <circle cx="32" cy="32" r="26" fill="none" stroke="#EEF0F3" stroke-width="6" />
        <circle
          cx="32"
          cy="32"
          r="26"
          fill="none"
          stroke="currentColor"
          stroke-width="6"
          stroke-linecap="round"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="dashOffset"
          transform="rotate(-90 32 32)"
        />
      </svg>
      <span class="limit-card__pct">{{ pct }}%</span>
    </div>
    <p class="limit-card__label">{{ label }}</p>
    <p class="limit-card__value">
      <span class="numeric">{{ current.toFixed(1) }}</span>
      <span class="limit-card__of"> / {{ limit }}h</span>
    </p>
    <p class="limit-card__remaining">{{ remaining.toFixed(1) }}h left</p>
  </div>
</template>

<style lang="scss" scoped>
.limit-card {
  background: $color-surface;
  border-radius: $radius-card-sm;
  box-shadow: $shadow-card;
  padding: $space-md;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  scroll-snap-align: start;
  color: $color-success;

  &--warn {
    color: $color-warning;
  }

  &--danger {
    color: $color-danger;
  }

  &__ring {
    position: relative;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__pct {
    position: absolute;
    font-size: 12px;
    font-weight: 800;
    color: $color-text-primary;
  }

  &__label {
    margin-top: $space-sm;
    font-size: $fs-label;
    font-weight: 700;
    color: $color-text-secondary;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  &__value {
    margin-top: 2px;
    font-size: $fs-body;
    color: $color-text-primary;
  }

  &__of {
    font-size: 11px;
    color: $color-text-secondary;
    font-weight: 500;
  }

  &__remaining {
    margin-top: 2px;
    font-size: 11px;
    color: $color-text-secondary;
  }
}
</style>
