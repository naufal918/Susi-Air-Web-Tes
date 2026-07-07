<script setup lang="ts">
import { FileText, ChevronRight } from 'lucide-vue-next'
import type { CrewDocument, DocumentStatus } from '~/types'

const props = defineProps<{
  documents: CrewDocument[]
  today: string // ISO date string, e.g. "2026-05-31" — comes from the mock file itself
  warningDays: number
}>()

function daysUntil(dateStr: string) {
  const target = new Date(dateStr + 'T00:00:00')
  const reference = new Date(props.today + 'T00:00:00')
  const diffMs = target.getTime() - reference.getTime()
  return Math.round(diffMs / (1000 * 60 * 60 * 24))
}

// Mirrors the file's own rule: daysRemaining <= 0 -> red, <= warningDays -> amber, else green.
function statusFor(doc: CrewDocument): DocumentStatus {
  const days = daysUntil(doc.expiryDate)
  if (days <= 0) return 'red'
  if (days <= props.warningDays) return 'amber'
  return 'green'
}

function badgeText(doc: CrewDocument) {
  const days = daysUntil(doc.expiryDate)
  if (days < 0) return 'Expired'
  if (days === 0) return 'Expires today'
  return `${days}d left`
}

const sorted = computed(() =>
  [...props.documents].sort((a, b) => daysUntil(a.expiryDate) - daysUntil(b.expiryDate))
)
</script>

<template>
  <section class="documents">
    <div class="documents__header">
      <h2 class="documents__title">My Documents</h2>
      <span class="documents__count">{{ documents.length }}</span>
    </div>

    <div class="documents__list card">
      <div
        v-for="(doc, idx) in sorted"
        :key="doc.id"
        class="documents__item"
        :class="{ 'documents__item--border': idx < sorted.length - 1 }"
      >
        <div class="documents__icon">
          <FileText :size="17" :stroke-width="1.75" />
        </div>
        <div class="documents__info">
          <p class="documents__name">{{ doc.label }}</p>
          <p class="documents__type">Expires {{ doc.expiryDate }}</p>
        </div>
        <span class="documents__badge" :class="`documents__badge--${statusFor(doc)}`">
          {{ badgeText(doc) }}
        </span>
        <ChevronRight :size="16" :stroke-width="1.75" class="documents__chevron" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.documents {
  padding: 0 $space-lg;
  margin-bottom: $space-lg;

  &__header {
    display: flex;
    align-items: center;
    gap: $space-sm;
    margin-bottom: $space-md;
  }

  &__title {
    font-size: $fs-headline;
    font-weight: 800;
  }

  &__count {
    background: $color-bg;
    color: $color-text-secondary;
    font-size: 11px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 10px;
  }

  &__list {
    padding: 0 $space-lg;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: $space-sm;
    padding: $space-md 0;
    transition: background 0.15s ease;

    &--border {
      border-bottom: 1px solid #F0F1F4;
    }

    &:active {
      background: #FAFBFC;
    }
  }

  &__icon {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: rgba(14, 33, 56, 0.06);
    color: $color-navy;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  &__info {
    flex: 1;
    min-width: 0;
  }

  &__name {
    font-size: $fs-body;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__type {
    font-size: 11px;
    color: $color-text-secondary;
    margin-top: 2px;
  }

  &__badge {
    font-size: 11px;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 20px;
    white-space: nowrap;
    flex-shrink: 0;

    &--green {
      background: rgba(31, 191, 143, 0.12);
      color: $color-success;
    }

    &--amber {
      background: rgba(245, 158, 11, 0.12);
      color: $color-warning;
    }

    &--red {
      background: rgba(230, 55, 87, 0.12);
      color: $color-danger;
    }
  }

  &__chevron {
    color: #C7CBD1;
    flex-shrink: 0;
  }
}
</style>
