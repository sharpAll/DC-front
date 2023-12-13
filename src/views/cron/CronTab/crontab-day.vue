<template>
  <n-radio-group v-model:value="radioValue">
    <div class="mb-3">
      <n-radio value="1">日，允许的通配符[, - * / L M]</n-radio>
    </div>
    <div class="mb-3">
      <n-radio value="2">不指定</n-radio>
    </div>
    <div class="mb-3">
      <n-radio value="3">
        <span>周期从 </span>
        <n-input-number
          v-model:value="cycle01"
          size="tiny"
          class="w-80px inline-block relative z-99"
          :min="1"
          :max="31"
        />
        -
        <n-input-number
          v-model:value="cycle02"
          size="tiny"
          class="w-80px inline-block relative z-99"
          :min="1"
          :max="31"
        />
        <span> 日</span>
      </n-radio>
    </div>
    <div class="mb-3">
      <n-radio value="4">
        <span>从 </span>
        <n-input-number
          v-model:value="average01"
          size="tiny"
          class="w-80px inline-block relative z-99"
          :min="1"
          :max="31"
        />
        <span> 日开始，每 </span>
        <n-input-number
          v-model:value="average02"
          size="tiny"
          class="w-80px inline-block relative z-99"
          :min="1"
          :max="31"
        />
        <span> 日执行一次</span>
      </n-radio>
    </div>
    <div class="mb-3">
      <n-radio value="5">
        <span>每月 </span>
        <n-input-number
          v-model:value="workday"
          size="tiny"
          class="w-80px inline-block relative z-99"
          :min="1"
          :max="31"
        />
        <span> 日最近的那个工作日</span>
      </n-radio>
    </div>
    <div class="mb-3">
      <n-radio value="6">本月最后一天</n-radio>
    </div>
    <div>
      <n-radio value="7">指定</n-radio>
      <n-checkbox-group v-model:value="checkboxList" class="!ml-6">
        <n-space item-style="display: flex;">
          <n-checkbox
            v-for="item in checkBoxOpt"
            :key="item"
            :value="item"
            :label="item"
          />
        </n-space>
      </n-checkbox-group>
    </div>
  </n-radio-group>
</template>

<script setup lang="ts" name="CronDay">
import {
  ref,
  reactive,
  toRefs,
  onMounted,
  onBeforeMount,
  computed,
  watch,
} from "vue";
const radioValue = ref("1");
const workday = ref(1);
const cycle01 = ref(1);
const cycle02 = ref(2);
const average01 = ref(1);
const average02 = ref(1);
const checkboxList = ref([]);
const checkBoxOpt = ref([]);
const props = defineProps<{
  init: string;
  week: string;
}>();
const emit = defineEmits(["update"]);
onBeforeMount(() => {
  checkBoxOpt.value = [];
  for (let index = 1; index < 32; index++) {
    checkBoxOpt.value.push(index.toString().padStart(2, "0"));
  }
});
onMounted(() => {
  // 初始化值
  if (props.init === "?") {
    radioValue.value = "2";
    return;
  }
  const cycleArr = props.init.split("-");
  if (cycleArr.length === 2) {
    radioValue.value = "3";
    cycle01.value = cycleArr[0];
    cycle02.value = cycleArr[1];
    return;
  }
  const averageArr = props.init.split("/");
  if (averageArr.length === 2) {
    radioValue.value = "4";
    average01.value = averageArr[0];
    average02.value = averageArr[1];
    return;
  }
  if (/W/.test(props.init)) {
    radioValue.value = "5";
    workday.value = Number(props.init.replace("W", ""));
    return;
  }
  if (props.init === "L") {
    radioValue.value = "6";
    return;
  }
  if (props.init !== "*") {
    radioValue.value = "7";
    const list = props.init.split(",");
    checkboxList.value = list;
  }
});
// 单选按钮值变化时
function radioChange() {
  switch (radioValue.value) {
    case "1":
      emit("update", "day", "*");
      break;
    case "2":
      emit("update", "day", "?");
      break;
    case "3":
      emit("update", "day", cycle01.value + "-" + cycle02.value);
      break;
    case "4":
      emit("update", "day", average01.value + "/" + average02.value);
      break;
    case "5":
      emit("update", "day", workday.value + "W");
      break;
    case "6":
      emit("update", "day", "L");
      break;
    case "7":
      emit("update", "day", checkboxString.value);
      break;
    default:
      break;
  }
}
// 周期两个值变化时
function cycleChange() {
  if (radioValue.value === "3") {
    emit("update", "day", cycleTotal.value);
  }
}
// 平均两个值变化时
function averageChange() {
  if (radioValue.value === "4") {
    emit("update", "day", averageTotal.value);
  }
}
// 最近工作日值变化时
function workdayChange() {
  if (radioValue.value === "5") {
    emit("update", "day", workday.value + "W");
  }
}
// checkbox值变化时
function checkboxChange() {
  if (radioValue.value === "7") {
    emit("update", "day", checkboxString.value);
  }
}
// 父组件传递的week发生变化触发
function weekChange() {
  // 判断week值与day不能同时为“?”
  if (props.week === "?" && radioValue.value === "2") {
    radioValue.value = "1";
  } else if (props.week !== "?" && radioValue.value !== "2") {
    radioValue.value = "2";
  }
}
// 计算两个周期值
const cycleTotal = computed(() => {
  // cycle01.value = props.check(cycle01.value, 0, 59);
  // cycle02.value = props.check(cycle02.value, 0, 59);
  return cycle01.value + "-" + cycle02.value;
});
// 计算平均用到的值
const averageTotal = computed(() => {
  // average01.value = props.check(average01.value, 0, 59);
  // average02.value = props.check(average02.value, 1, 59);
  return average01.value + "/" + average02.value;
});
// 计算工作日格式
const workdayCheck = computed(() => {
  // this.workday.value = this.checkNum(this.workday.value, 1, 31);
  return workday.value;
});
// 计算勾选的checkbox值合集
const checkboxString = computed(() => {
  const str = checkboxList.value.join();
  return str === "" ? "*" : str;
});
watch(
  () => radioValue.value,
  () => {
    radioChange();
  }
);
watch(
  () => cycleTotal.value,
  () => {
    cycleChange();
  }
);
watch(
  () => averageTotal.value,
  () => {
    averageChange();
  }
);
watch(
  () => workdayCheck.value,
  () => {
    workdayChange();
  }
);
watch(
  () => checkboxString.value,
  () => {
    checkboxChange();
  }
);
watch(
  () => props.week,
  () => {
    weekChange();
  }
);
</script>
<style scoped></style>
