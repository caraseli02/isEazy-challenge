<template>
  <div class="max-w-full w-[900px] m-auto">
    <NuxtErrorBoundary>
      <TheAlerts />
      <ChatWidget />
      <template #error="{ error }">
        <div>
          <p class="text-4xl pt-10">⚠️ A fatal error has occurred:</p>
          <p>{{ error }}</p>
        </div>
      </template>
    </NuxtErrorBoundary>
  </div>
</template>

<script setup>
import {useAlertsStore} from '~/stores/AlertsStore'
const alerts = useAlertsStore();
onMounted(() => {
  alerts.info("click on the chat icon to connect")
})
</script>