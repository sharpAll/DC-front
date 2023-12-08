<template>
  <n-tabs
    v-model:value="tabActive"
    type="line"
    :tab-style="{ padding: '10px' }"
    animated
  >
    <n-tab-pane :name="tabTitles[0]" :tab="tabTitles[0]">
      {{ tabTitles[0] }}
    </n-tab-pane>
    <n-tab-pane :name="tabTitles[1]" :tab="tabTitles[1]">
      {{ tabTitles[1] }}
    </n-tab-pane>
    <n-tab-pane :name="tabTitles[2]" :tab="tabTitles[2]">
      {{ tabTitles[2] }}
    </n-tab-pane>
    <n-tab-pane :name="tabTitles[3]" :tab="tabTitles[3]">
      {{ tabTitles[3] }}
    </n-tab-pane>
    <n-tab-pane :name="tabTitles[4]" :tab="tabTitles[4]">
      {{ tabTitles[4] }}
    </n-tab-pane>
    <n-tab-pane :name="tabTitles[5]" :tab="tabTitles[5]">
      {{ tabTitles[5] }}
    </n-tab-pane>
    <n-tab-pane :name="tabTitles[6]" :tab="tabTitles[6]">
      {{ tabTitles[6] }}
    </n-tab-pane>
  </n-tabs>
</template>
<script setup lang="ts" name="Cron">
import { ref, reactive } from "vue";
const tabTitles = ref(["秒", "分", "时", "日", "月", "周", "年"]);
const tabActive = ref("秒");
const contabValueObj = reactive({
  second: "*",
  min: "*",
  hour: "*",
  day: "*",
  mouth: "*",
  week: "?",
  year: "",
});
</script>
<style scoped lang="scss"></style>
