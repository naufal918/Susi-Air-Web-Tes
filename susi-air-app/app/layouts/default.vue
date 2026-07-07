<script setup lang="ts">
const route = useRoute()
const showNav = computed(() => route.meta.hideNav !== true)
</script>

<template>
  <div class="shell">
    <div class="shell__scroll" :class="{ 'shell__scroll--with-nav': showNav }">
      <Transition name="page-fade" mode="out-in">
        <div :key="route.fullPath">
          <slot />
        </div>
      </Transition>
    </div>
    <BottomNav v-if="showNav" />
  </div>
</template>

<style lang="scss" scoped>
.shell {
  min-height: 100vh;
  max-width: $mobile-max;
  margin: 0 auto;
  background: $color-bg;
  position: relative;
  display: flex;
  flex-direction: column;

  &__scroll {
    flex: 1;
    padding-bottom: $space-lg;

    &--with-nav {
      padding-bottom: 84px;
    }
  }
}
</style>
