<script setup lang="ts">
const store = useDashboardStore()

await useAsyncData('dashboard', () => store.loadAll())
</script>

<template>
  <div class="home">
    <template v-if="store.loading || !store.flightHoursData">
      <div class="home__skeleton-header skeleton" />
      <div class="home__skeleton-block skeleton" />
      <div class="home__skeleton-block skeleton" />
    </template>

    <template v-else>
      <DashboardHeader
        :name="store.flightHoursData.pilot.name"
        :total-hours="store.flightHoursData.pilot.totalFlightHours"
        :notifications="store.unreadNotifications"
      />

      <UpcomingFlightCard v-if="store.upcomingFlight" :flight="store.upcomingFlight" />

      <LatestNews :items="store.news" />

      <HoursLimit :data="store.flightHoursData" />

      <MyDocuments
        :documents="store.documents"
        :today="store.documentsToday"
        :warning-days="store.documentsThresholds?.warningDays ?? 30"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.home {
  &__skeleton-header {
    height: 140px;
    margin: 0 0 $space-lg;
    border-radius: 0 0 24px 24px;
  }

  &__skeleton-block {
    height: 120px;
    margin: 0 $space-lg $space-lg;
    border-radius: $radius-card;
  }
}
</style>
