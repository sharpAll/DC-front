<template>
  <n-radio-group v-model:value="radioValue">
    <div class="mb-3">
      <n-radio value="1">周，允许的通配符[, - * / L #]</n-radio>
    </div>
    <div class="mb-3">
      <n-radio value="2">不指定</n-radio>
    </div>
    <div class="mb-3">
      <n-radio value="3">
        <span>周期从 星期 </span>
        <n-input-number
          v-model:value="cycle01"
          size="tiny"
          class="w-80px inline-block relative z-99"
          :min="1"
          :max="7"
        />
        - 星期
        <n-input-number
          v-model:value="cycle02"
          size="tiny"
          class="w-80px inline-block relative z-99"
          :min="1"
          :max="7"
        />
      </n-radio>
    </div>
    <div class="mb-3">
      <n-radio value="4">
        <span>第 </span>
        <n-input-number
          v-model:value="average01"
          size="tiny"
          class="w-80px inline-block relative z-99"
          :min="1"
          :max="7"
        />
        <span> 周的星期 </span>
        <n-input-number
          v-model:value="average02"
          size="tiny"
          class="w-80px inline-block relative z-99"
          :min="1"
          :max="7"
        />
      </n-radio>
    </div>
    <div class="mb-3">
      <n-radio value="5">
        <span>本月最后一个星期 </span>
        <n-input-number
          v-model:value="weekday"
          size="tiny"
          class="w-80px inline-block relative z-99"
          :min="1"
          :max="31"
        />
        <span> 日最近的那个工作日</span>
      </n-radio>
    </div>
    <div>
      <n-radio value="6">指定</n-radio>
      <n-checkbox-group v-model:value="checkboxList" class="!ml-6">
        <n-space item-style="display: flex;">
          <n-checkbox
            v-for="item in checkBoxOpt"
            :key="item"
            :value="item.value"
            :label="item.label"
          />
        </n-space>
      </n-checkbox-group>
    </div>
  </n-radio-group>
</template>

<script setup lang="ts" name="CronSecond">
import {
  ref,
  reactive,
  toRefs,
  onMounted,
  onBeforeMount,
  computed,
  watch,
} from "vue";
const radioValue = ref("2");
const weekday = ref(1);
const cycle01 = ref(1);
const cycle02 = ref(2);
const average01 = ref(1);
const average02 = ref(1);
const checkboxList = ref([]);
const checkBoxOpt = ref([
  {
    label: "周一",
    value: 1,
  },
  {
    label: "周二",
    value: 2,
  },
  {
    label: "周三",
    value: 3,
  },
  {
    label: "周四",
    value: 4,
  },
  {
    label: "周五",
    value: 5,
  },
  {
    label: "周六",
    value: 6,
  },
  {
    label: "周日",
    value: 7,
  },
]);
const props = defineProps<{
  init: string;
  day: string;
}>();
const emit = defineEmits(["update"]);
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
  const averageArr = props.init.split("#");
  if (averageArr.length === 2) {
    radioValue.value = "4";
    average01.value = averageArr[0];
    average02.value = averageArr[1];
    return;
  }
  if (/L/.test(props.init)) {
    radioValue.value = "5";
    weekday.value = Number(props.init.replace("L", ""));
    return;
  }
  if (props.init !== "*") {
    radioValue.value = "6";
    const list = props.init.split(",");
    checkboxList.value = list;
  }
});
// 单选按钮值变化时
function radioChange() {
  switch (radioValue.value) {
    case "1":
      emit("update", "week", "*");
      break;
    case "2":
      emit("update", "week", "?");
      break;
    case "3":
      emit("update", "week", cycle01.value + "-" + cycle02.value);
      break;
    case "4":
      emit("update", "week", average01.value + "#" + average02.value);
      break;
    case "5":
      emit("update", "week", weekday.value + "L");
      break;
    case "6":
      emit("update", "week", checkboxString.value);
      break;
    default:
      break;
  }
}
// 周期两个值变化时
function cycleChange() {
  if (radioValue.value === "3") {
    emit("update", "week", cycleTotal.value);
  }
}
// 平均两个值变化时
function averageChange() {
  if (radioValue.value === "4") {
    emit("update", "week", averageTotal.value);
  }
}
// 最近工作日值变化时
function weekdayChange() {
  if (radioValue.value === "5") {
    emit("update", "week", weekday.value + "L");
  }
}
// checkbox值变化时
function checkboxChange() {
  if (radioValue.value === "6") {
    emit("update", "week", checkboxString.value);
  }
}
// 父组件传递的day发生变化触发
function dayChange() {
  // 判断week值与day不能同时为“?”
  if (props.day === "?" && radioValue.value === "2") {
    radioValue.value = "1";
  } else if (props.day !== "?" && radioValue.value !== "2") {
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
  return average01.value + "#" + average02.value;
});
// 最近的工作日（格式）
const weekdayCheck = computed(() => {
  // workday.value = this.checkNum(this.workday.value, 1, 31);
  return weekday.value;
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
  () => weekdayCheck.value,
  () => {
    weekdayChange();
  }
);
watch(
  () => checkboxString.value,
  () => {
    checkboxChange();
  }
);
watch(
  () => props.day,
  () => {
    debugger;
    console.log(props.week);
    dayChange();
  }
);
</script>
<style scoped></style>
