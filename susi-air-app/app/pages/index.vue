<script setup lang="ts">
import { User, Lock, Eye, EyeOff } from 'lucide-vue-next'

definePageMeta({ hideNav: true })

const auth = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const isSubmitting = ref(false)

async function handleSubmit() {
  isSubmitting.value = true
  // No real authentication for this test — Sign In always proceeds straight to Home,
  // whether or not the fields are filled in.
  await new Promise((resolve) => setTimeout(resolve, 400))
  auth.signIn(username.value.trim() || 'John Doe')
  isSubmitting.value = false
  router.push('/home')
}
</script>

<template>
  <div class="signin">
    <div class="signin__top">
      <div class="signin__logo">
        <img src="/logo.png" alt="Susi Air" class="signin__logo-img" />
      </div>
      <p class="signin__subtitle">Your Complete Air Transport Solution</p>
    </div>

    <form class="signin__form" @submit.prevent="handleSubmit">
      <label class="field">
        <span class="field__label">Username</span>
        <span class="field__control">
          <User :size="18" :stroke-width="1.75" class="field__icon" />
          <input
            v-model="username"
            type="text"
            placeholder="e.g. john.doe"
            autocomplete="username"
          />
        </span>
      </label>

      <label class="field">
        <span class="field__label">Password</span>
        <span class="field__control">
          <Lock :size="18" :stroke-width="1.75" class="field__icon" />
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="••••••••"
            autocomplete="current-password"
          />
          <button type="button" class="field__toggle" @click="showPassword = !showPassword">
            <EyeOff v-if="showPassword" :size="18" :stroke-width="1.75" />
            <Eye v-else :size="18" :stroke-width="1.75" />
          </button>
        </span>
      </label>

      <button type="submit" class="signin__submit" :disabled="isSubmitting">
        <span v-if="!isSubmitting">Sign In</span>
        <span v-else class="signin__spinner" />
      </button>

      <a class="signin__help" href="mailto:crd@susiair.com">Need help? Contact CRD</a>
    </form>

    <p class="signin__footer">PT ASI Pudjiastuti Aviation</p>
  </div>
</template>

<style lang="scss" scoped>
.signin {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: $space-2xl $space-xl;
  background: linear-gradient(180deg, $color-navy 0%, $color-navy 38%, $color-bg 38%);

  &__top {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    margin-bottom: $space-2xl;
  }

  &__logo {
    width: auto;
    height: 64px;
    padding: 10px 20px;
    border-radius: 18px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: $space-lg;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
  }

  &__logo-img {
    height: 100%;
    width: auto;
    display: block;
  }

  &__subtitle {
    font-size: $fs-label-lg;
    color: rgba(255, 255, 255, 0.7);
    margin-top: $space-xs;
  }

  &__form {
    background: $color-surface;
    border-radius: $radius-card;
    box-shadow: $shadow-card;
    padding: $space-xl;
    display: flex;
    flex-direction: column;
    gap: $space-lg;
  }

  &__error {
    font-size: $fs-label-lg;
    color: $color-danger;
    margin: -4px 0 0;
  }

  &__submit {
    background: $color-red;
    color: #fff;
    font-weight: 700;
    font-size: $fs-body-lg;
    padding: 14px;
    border-radius: $radius-pill;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.1s ease, opacity 0.15s ease;

    &:active {
      transform: scale(0.97);
    }

    &:disabled {
      opacity: 0.75;
    }
  }

  &__spinner {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.4);
    border-top-color: #fff;
    animation: spin 0.7s linear infinite;
  }

  &__help {
    text-align: center;
    font-size: $fs-label-lg;
    color: $color-text-secondary;
    font-weight: 600;
  }

  &__footer {
    text-align: center;
    color: $color-text-secondary;
    font-size: $fs-label;
    margin-top: $space-xl;
  }
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;

  &__label {
    font-size: $fs-label-lg;
    font-weight: 600;
    color: $color-text-secondary;
  }

  &__control {
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1.5px solid #E5E7EB;
    border-radius: 12px;
    padding: 12px 14px;
    transition: border-color 0.15s ease;

    &:focus-within {
      border-color: $color-navy;
    }

    input {
      flex: 1;
      border: none;
      outline: none;
      font-size: $fs-body-lg;
      background: transparent;
      color: $color-text-primary;

      &::placeholder {
        color: #C2C6CE;
      }
    }
  }

  &__icon {
    color: $color-text-secondary;
    flex-shrink: 0;
  }

  &__toggle {
    color: $color-text-secondary;
    display: flex;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
