<template>
  <n-radio-group v-model:value="radioValue">
    <div class="mb-3">
      <n-radio value="1">分钟，允许的通配符[, - * /]</n-radio>
    </div>
    <div class="mb-3">
      <n-radio value="2">
        <span>周期从 </span>
        <n-input-number
          v-model:value="cycle01"
          size="tiny"
          class="w-80px inline-block relative z-99"
          :min="0"
          :max="59"
        />
        -
        <n-input-number
          v-model:value="cycle02"
          size="tiny"
          class="w-80px inline-block relative z-99"
          :min="0"
          :max="59"
        />
        <span> 分钟</span>
      </n-radio>
    </div>
    <div class="mb-3">
      <n-radio value="3">
        <span>从 </span>
        <n-input-number
          v-model:value="average01"
          size="tiny"
          class="w-80px inline-block relative z-99"
          :min="0"
          :max="59"
        />
        <span> 分钟开始，每 </span>
        <n-input-number
          v-model:value="average02"
          size="tiny"
          class="w-80px inline-block relative z-99"
          :min="1"
          :max="59"
        />
        <span> 分钟执行一次</span>
      </n-radio>
    </div>
    <div>
      <n-radio value="4">指定</n-radio>
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
const radioValue = ref("1");
const cycle01 = ref(1);
const cycle02 = ref(2);
const average01 = ref(0);
const average02 = ref(1);
const checkboxList = ref([]);
const checkBoxOpt = ref([]);
const props = defineProps<{
  init: string;
}>();
const emit = defineEmits(["update"]);
onBeforeMount(() => {
  checkBoxOpt.value = [];
  for (let index = 0; index < 60; index++) {
    checkBoxOpt.value.push(index.toString().padStart(2, "0"));
  }
});
onMounted(() => {
  // 初始化值
  const cycleArr = props.init.split("-");
  if (cycleArr.length === 2) {
    radioValue.value = "2";
    cycle01.value = cycleArr[0];
    cycle02.value = cycleArr[1];
    return;
  }
  const averageArr = props.init.split("/");
  if (averageArr.length === 2) {
    radioValue.value = "3";
    average01.value = averageArr[0];
    average02.value = averageArr[1];
    return;
  }
  if (props.init !== "*") {
    radioValue.value = "4";
    const list = props.init.split(",");
    checkboxList.value = list;
  }
});
// 单选按钮值变化时
function radioChange() {
  switch (radioValue.value) {
    case "1":
      emit("update", "minute", "*");
      break;
    case "2":
      emit("update", "minute", cycle01.value + "-" + cycle02.value);
      break;
    case "3":
      emit("update", "minute", average01.value + "/" + average02.value);
      break;
    case "4":
      emit("update", "minute", checkboxString.value);
      break;
    default:
      break;
  }
}
// 周期两个值变化时
function cycleChange() {
  if (radioValue.value === "2") {
    emit("update", "minute", cycleTotal.value);
  }
}
// 平均两个值变化时
function averageChange() {
  if (radioValue.value === "3") {
    emit("update", "minute", averageTotal.value);
  }
}
// checkbox值变化时
function checkboxChange() {
  if (radioValue.value === "4") {
    emit("update", "minute", checkboxString.value);
  }
}
// 计算两个周期值
const cycleTotal = computed(() => {
  return cycle01.value + "-" + cycle02.value;
});
// 计算平均用到的值
const averageTotal = computed(() => {
  return average01.value + "/" + average02.value;
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
  () => checkboxString.value,
  () => {
    checkboxChange();
  }
);
</script>
<style scoped></style>
