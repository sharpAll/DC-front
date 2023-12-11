<template>
  <n-tabs
    v-model:value="tabActive"
    type="line"
    :tab-style="{ padding: '10px' }"
    animated
  >
    <n-tab-pane :name="tabTitles[0]" :tab="tabTitles[0]">
      <CrontabSecond
        :init="contabValueObj.second"
        :check="checkNumber"
        @update="updateContabValue"
      />
    </n-tab-pane>
    <n-tab-pane :name="tabTitles[1]" :tab="tabTitles[1]">
      <CrontabMinute
        :init="contabValueObj.minute"
        :check="checkNumber"
        @update="updateContabValue"
      />
    </n-tab-pane>
    <n-tab-pane :name="tabTitles[2]" :tab="tabTitles[2]">
      <CrontabHour
        :init="contabValueObj.hour"
        :check="checkNumber"
        @update="updateContabValue"
      />
    </n-tab-pane>
    <n-tab-pane :name="tabTitles[3]" :tab="tabTitles[3]">
      <CrontabDay
        :init="contabValueObj.day"
        :check="checkNumber"
        :week="contabValueObj.week"
        @update="updateContabValue"
      ></CrontabDay>
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
  <div class="popup-result">
    <p class="title">时间表达式</p>
    <table>
      <thead>
        <th v-for="item of tabTitles" :key="item" width="40">{{ item }}</th>
      </thead>
      <tbody>
        <td>
          <span>{{ contabValueObj.second }}</span>
        </td>
        <td>
          <span>{{ contabValueObj.minute }}</span>
        </td>
        <td>
          <span>{{ contabValueObj.hour }}</span>
        </td>
        <td>
          <span>{{ contabValueObj.day }}</span>
        </td>
        <td>
          <span>{{ contabValueObj.mouth }}</span>
        </td>
        <td>
          <span>{{ contabValueObj.week }}</span>
        </td>
        <td>
          <span>{{ contabValueObj.year }}</span>
        </td>
      </tbody>
    </table>
    <div class="flex flex-col">
      <span class="font-bold">crontab完整表达式</span>
      <span>{{ contabValueString }}</span>
    </div>
  </div>
</template>
<script setup lang="ts" name="Cron">
import { ref, reactive, computed } from "vue";
import CrontabSecond from "./crontab-second.vue";
import CrontabMinute from "./crontab-minute.vue";
import CrontabHour from "./crontab-hour.vue";
import CrontabDay from "./crontab-day.vue";
const tabTitles = ref(["秒", "分", "时", "日", "月", "周", "年"]);
const tabActive = ref("秒");
const contabValueObj = reactive({
  second: "*",
  minute: "*",
  hour: "*",
  day: "*",
  mouth: "*",
  week: "?",
  year: "",
});
// 由子组件触发，更改表达式组成的字段值
const updateContabValue = function (name, value) {
  contabValueObj[name] = value;
};
const checkNumber = function (value, minLimit, maxLimit) {
  // 检查必须为整数
  value = Math.floor(value);
  if (value < minLimit) {
    value = minLimit;
  } else if (value > maxLimit) {
    value = maxLimit;
  }
  return value;
};
const contabValueString = computed(() => {
  const str =
    contabValueObj.second +
    " " +
    contabValueObj.minute +
    " " +
    contabValueObj.hour +
    " " +
    contabValueObj.day +
    " " +
    contabValueObj.mouth +
    " " +
    contabValueObj.week +
    (contabValueObj.year === "" ? "" : " " + contabValueObj.year);
  return str;
});
</script>
<style lang="css" scoped>
.popup-main {
  padding-bottom: 20px;
}

.popup-result {
  line-height: 24px;
  margin: 25px 20px 0;
  padding: 15px 10px 10px;
  border: 1px solid #ccc;
  position: relative;
}

.popup-result .title {
  position: absolute;
  top: -20px;
  left: 50%;
  width: 140px;
  font-size: 14px;
  margin-left: -70px;
  text-align: center;
  line-height: 30px;
  background: #fff;
}

.popup-result table {
  text-align: center;
  width: 100%;
  margin: 0 auto;
}

.popup-result table span {
  display: block;
  width: 100%;
  font-family: arial;
  line-height: 30px;
  height: 30px;
  white-space: nowrap;
  overflow: hidden;
  border: 1px solid #e8e8e8;
}

.popup-result-scroll {
  font-size: 12px;
  line-height: 24px;
  height: 10em;
  overflow-y: scroll;
}
</style>
