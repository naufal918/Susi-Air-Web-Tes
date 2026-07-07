<script setup lang="ts">
import type { LegendEntry } from '~/types'

defineProps<{ legend: LegendEntry[] }>()
</script>

<template>
  <div class="legend card">
    <h3 class="legend__title">Legend</h3>
    <div class="legend__grid">
      <div v-for="entry in legend" :key="entry.code" class="legend__item">
        <span class="legend__dot" :style="{ background: entry.color }" />
        <span class="legend__code">{{ entry.code }}</span>
        <span class="legend__label">{{ entry.label }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.legend {
  &__title {
    font-size: $fs-body;
    font-weight: 800;
    margin-bottom: $space-md;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $space-sm $space-md;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  &__dot {
    width: 9px;
    height: 9px;
    border-radius: 3px;
    flex-shrink: 0;
  }

  &__code {
    font-size: 11px;
    font-weight: 800;
    color: $color-text-primary;
  }

  &__label {
    font-size: 11px;
    color: $color-text-secondary;
  }
}
</style>
