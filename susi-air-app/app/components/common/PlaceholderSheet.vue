<script setup lang="ts">
import { X, Construction } from 'lucide-vue-next'

defineProps<{ open: boolean; label?: string }>()
const emit = defineEmits<{ close: [] }>()
</script>

<template>
  <Transition name="fade-slide">
    <div v-if="open" class="sheet-backdrop" @click.self="emit('close')">
      <div class="sheet">
        <button class="sheet__close" @click="emit('close')">
          <X :size="18" :stroke-width="2" />
        </button>
        <div class="sheet__icon">
          <Construction :size="24" :stroke-width="1.75" />
        </div>
        <p class="sheet__title">{{ label }}</p>
        <p class="sheet__text">Detail page coming soon</p>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.sheet-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(14, 33, 56, 0.45);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 100;
}

.sheet {
  width: 100%;
  max-width: $mobile-max;
  background: $color-surface;
  border-radius: 20px 20px 0 0;
  padding: $space-2xl $space-xl calc($space-2xl + env(safe-area-inset-bottom));
  position: relative;
  text-align: center;

  &__close {
    position: absolute;
    top: $space-md;
    right: $space-md;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: $color-bg;
    color: $color-text-secondary;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__icon {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background: rgba(230, 55, 87, 0.1);
    color: $color-red;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto $space-md;
  }

  &__title {
    font-size: $fs-headline;
    font-weight: 800;
  }

  &__text {
    font-size: $fs-label-lg;
    color: $color-text-secondary;
    margin-top: 6px;
  }
}
</style>
