<script setup lang="ts">
import { MoreHorizontal, LogOut, Settings, HelpCircle } from 'lucide-vue-next'

const auth = useAuthStore()
const router = useRouter()

function handleSignOut() {
  auth.signOut()
  router.push('/')
}
</script>

<template>
  <div class="more">
    <div class="more__icon"><MoreHorizontal :size="26" :stroke-width="1.75" /></div>
    <h1 class="more__title">More</h1>

    <div class="more__list card">
      <button class="more__item">
        <Settings :size="18" :stroke-width="1.75" />
        <span>Settings</span>
      </button>
      <button class="more__item">
        <HelpCircle :size="18" :stroke-width="1.75" />
        <span>Contact CRD</span>
      </button>
      <button class="more__item more__item--danger" @click="handleSignOut">
        <LogOut :size="18" :stroke-width="1.75" />
        <span>Sign Out</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.more {
  padding: $space-2xl $space-lg;
  text-align: center;

  &__icon {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    background: rgba(14, 33, 56, 0.06);
    color: $color-navy;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto $space-lg;
  }

  &__title {
    font-size: $fs-headline-lg;
    font-weight: 800;
    margin-bottom: $space-xl;
  }

  &__list {
    padding: 0;
    text-align: left;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: $space-md;
    padding: $space-lg;
    width: 100%;
    font-size: $fs-body-lg;
    font-weight: 600;
    border-bottom: 1px solid #F0F1F4;
    color: $color-text-primary;

    &:last-child {
      border-bottom: none;
    }

    &--danger {
      color: $color-danger;
    }
  }
}
</style>
