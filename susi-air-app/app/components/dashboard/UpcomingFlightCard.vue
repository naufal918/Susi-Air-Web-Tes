<script setup lang="ts">
import { PlaneTakeoff, PlaneLanding, Clock } from 'lucide-vue-next'
import type { UpcomingFlight } from '~/types'

const props = defineProps<{ flight: UpcomingFlight }>()

const formattedDate = computed(() => {
  const d = new Date(props.flight.date + 'T00:00:00')
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
})
</script>

<template>
  <section class="upcoming card">
    <div class="upcoming__top">
      <h2 class="upcoming__title">Upcoming Flight</h2>
      <span class="upcoming__badge">{{ flight.flightNumber }}</span>
    </div>

    <div class="upcoming__meta">
      <span class="upcoming__date">{{ formattedDate }}</span>
      <span class="upcoming__time"><Clock :size="14" :stroke-width="2" /> {{ flight.time }}</span>
    </div>

    <div class="upcoming__route">
      <div class="upcoming__point">
        <PlaneTakeoff :size="18" :stroke-width="1.75" class="upcoming__icon" />
        <div>
          <p class="upcoming__icao">{{ flight.departure.icao }}</p>
          <p class="upcoming__city">{{ flight.departure.city }}</p>
        </div>
      </div>

      <div class="upcoming__line" />

      <div class="upcoming__point upcoming__point--end">
        <PlaneLanding :size="18" :stroke-width="1.75" class="upcoming__icon" />
        <div>
          <p class="upcoming__icao">{{ flight.arrival.icao }}</p>
          <p class="upcoming__city">{{ flight.arrival.city }}</p>
        </div>
      </div>
    </div>

    <p class="upcoming__aircraft">{{ flight.aircraft }}</p>
  </section>
</template>

<style lang="scss" scoped>
.upcoming {
  margin: -20px $space-lg $space-lg;
  position: relative;
  z-index: 2;

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-size: $fs-label-lg;
    font-weight: 700;
    color: $color-text-secondary;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  &__badge {
    background: rgba(230, 55, 87, 0.1);
    color: $color-red;
    font-size: $fs-label;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 20px;
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: $space-md;
    margin-top: $space-sm;
    color: $color-text-secondary;
    font-size: $fs-label-lg;
    font-weight: 600;

    span {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }

  &__route {
    display: flex;
    align-items: center;
    margin-top: $space-lg;
    gap: $space-sm;
  }

  &__point {
    display: flex;
    align-items: center;
    gap: $space-sm;
    flex: 1;

    &--end {
      justify-content: flex-end;
      text-align: right;
      flex-direction: row-reverse;
    }
  }

  &__icon {
    color: $color-navy;
    flex-shrink: 0;
  }

  &__icao {
    font-size: $fs-headline;
    font-weight: 800;
  }

  &__city {
    font-size: $fs-label;
    color: $color-text-secondary;
  }

  &__line {
    flex: 1;
    height: 2px;
    background: repeating-linear-gradient(90deg, #D8DCE3 0, #D8DCE3 6px, transparent 6px, transparent 12px);
    max-width: 60px;
  }

  &__aircraft {
    margin-top: $space-md;
    padding-top: $space-md;
    border-top: 1px solid #F0F1F4;
    font-size: $fs-label-lg;
    color: $color-text-secondary;
    font-weight: 500;
  }
}
</style>
