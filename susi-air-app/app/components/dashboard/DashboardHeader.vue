<script setup lang="ts">
import { Bell } from 'lucide-vue-next'

const props = defineProps<{
  name: string
  totalHours: number
  avatar?: string
  notifications?: number
}>()

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
})

const initials = computed(() =>
  props.name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
)
</script>

<template>
  <header class="dash-header">
    <div class="dash-header__info">
      <p class="dash-header__greeting">{{ greeting }}, Captain</p>
      <h1 class="dash-header__name">{{ name }}</h1>
      <p class="dash-header__hours">
        <span class="numeric">{{ totalHours.toFixed(1) }}</span> total flight hours
      </p>
    </div>

    <div class="dash-header__actions">
      <button class="dash-header__bell" aria-label="Notifications">
        <Bell :size="20" :stroke-width="1.75" />
        <span v-if="notifications" class="dash-header__badge">{{ notifications }}</span>
      </button>
      <div class="dash-header__avatar">
        {{ initials }}
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.dash-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: $space-xl $space-lg 44px;
  background: $color-navy;
  border-radius: 0 0 24px 24px;
  color: #fff;

  &__greeting {
    font-size: $fs-label-lg;
    color: rgba(255, 255, 255, 0.65);
    font-weight: 500;
  }

  &__name {
    font-size: $fs-headline-lg;
    font-weight: 800;
    margin-top: 2px;
  }

  &__hours {
    font-size: $fs-label-lg;
    color: rgba(255, 255, 255, 0.75);
    margin-top: 6px;

    .numeric {
      color: #fff;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: $space-md;
  }

  &__bell {
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    transition: transform 0.1s ease;

    &:active {
      transform: scale(0.92);
    }
  }

  &__badge {
    position: absolute;
    top: -2px;
    right: -2px;
    background: $color-red;
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    min-width: 16px;
    height: 16px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    border: 2px solid $color-navy;
  }

  &__avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: $color-red;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: $fs-label-lg;
  }
}
</style>
