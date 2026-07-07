<script setup lang="ts">
import { Newspaper } from 'lucide-vue-next'
import type { NewsItem } from '~/types'

defineProps<{ items: NewsItem[] }>()

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}
</script>

<template>
  <section class="news">
    <h2 class="news__title">Latest News</h2>
    <div class="news__scroll">
      <article v-for="item in items" :key="item.id" class="news__card">
        <div class="news__icon"><Newspaper :size="16" :stroke-width="1.75" /></div>
        <span class="news__tag">{{ item.tag }}</span>
        <h3 class="news__headline">{{ item.title }}</h3>
        <p class="news__excerpt">{{ item.excerpt }}</p>
        <p class="news__date">{{ formatDate(item.date) }}</p>
      </article>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.news {
  padding: 0 0 0 $space-lg;
  margin-bottom: $space-lg;

  &__title {
    font-size: $fs-headline;
    font-weight: 800;
    margin-bottom: $space-md;
    padding-right: $space-lg;
  }

  &__scroll {
    display: flex;
    gap: $space-md;
    overflow-x: auto;
    padding-bottom: 4px;
    padding-right: $space-lg;
    scroll-snap-type: x mandatory;
  }

  &__card {
    background: $color-surface;
    border-radius: $radius-card-sm;
    box-shadow: $shadow-card;
    padding: $space-md $space-lg;
    min-width: 220px;
    max-width: 220px;
    scroll-snap-align: start;
    flex-shrink: 0;
  }

  &__icon {
    width: 30px;
    height: 30px;
    border-radius: 9px;
    background: rgba(34, 197, 232, 0.12);
    color: $color-chart-accent;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: $space-sm;
  }

  &__tag {
    font-size: 10px;
    font-weight: 700;
    color: $color-red;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  &__headline {
    font-size: $fs-body;
    font-weight: 700;
    margin-top: 4px;
    line-height: 1.3;
  }

  &__excerpt {
    font-size: 12px;
    color: $color-text-secondary;
    margin-top: 6px;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__date {
    font-size: 11px;
    color: #A6ACB6;
    margin-top: $space-sm;
    font-weight: 600;
  }
}
</style>
