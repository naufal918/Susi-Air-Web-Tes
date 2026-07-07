<script setup lang="ts">
import { Home, CalendarDays, BookOpen, MoreHorizontal } from 'lucide-vue-next'

const route = useRoute()

const items = [
  { label: 'Home', path: '/home', icon: Home },
  { label: 'Schedule', path: '/schedule', icon: CalendarDays },
  { label: 'Logbook', path: '/logbook', icon: BookOpen },
  { label: 'More', path: '/more', icon: MoreHorizontal }
]

function isActive(path: string) {
  return route.path === path
}
</script>

<template>
  <nav class="bottom-nav">
    <NuxtLink
      v-for="item in items"
      :key="item.path"
      :to="item.path"
      class="bottom-nav__item"
      :class="{ 'bottom-nav__item--active': isActive(item.path) }"
    >
      <span class="bottom-nav__icon">
        <component :is="item.icon" :size="22" :stroke-width="1.75" />
      </span>
      <span class="bottom-nav__label">{{ item.label }}</span>
    </NuxtLink>
  </nav>
</template>

<style lang="scss" scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: $mobile-max;
  margin: 0 auto;
  background: $color-surface;
  border-top: 1px solid rgba(14, 33, 56, 0.06);
  display: flex;
  justify-content: space-around;
  padding: 8px 4px calc(8px + env(safe-area-inset-bottom));
  z-index: 50;

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    color: $color-text-secondary;
    padding: 6px 14px;
    border-radius: 12px;
    transition: color 0.15s ease, background 0.15s ease, transform 0.1s ease;
    flex: 1;

    &:active {
      transform: scale(0.94);
    }

    &--active {
      color: $color-red;
      background: rgba(230, 55, 87, 0.08);
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__label {
    font-size: 11px;
    font-weight: 600;
  }
}
</style>
