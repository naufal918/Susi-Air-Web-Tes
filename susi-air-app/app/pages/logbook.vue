<script setup lang="ts">
import { BookOpen } from 'lucide-vue-next'
</script>

<template>
  <div class="placeholder">
    <div class="placeholder__icon"><BookOpen :size="26" :stroke-width="1.75" /></div>
    <h1 class="placeholder__title">Logbook</h1>
    <p class="placeholder__text">Out of scope for this technical test — coming soon.</p>
  </div>
</template>

<style lang="scss" scoped>
.placeholder {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: $space-2xl;

  &__icon {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    background: rgba(14, 33, 56, 0.06);
    color: $color-navy;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: $space-lg;
  }

  &__title {
    font-size: $fs-headline-lg;
    font-weight: 800;
  }

  &__text {
    margin-top: $space-sm;
    color: $color-text-secondary;
    font-size: $fs-body;
  }
}
</style>
