<template>
  <div class="w-full h-full component-content overflow-hidden">
    <div class="w-500px mx-auto my-4">
      <CronTab v-model:value="currentCron" />
    </div>
  </div>
</template>
<script setup lang="ts" name="Cron">
import { ref, watch } from "vue";
import CronTab from "./CronTab/crontab.vue";
const currentCron = ref("00 01,04,07,10 23 ? * 3-4");
</script>
<style scoped lang="scss"></style>
