<template>
  <div class="mt-10px">
    <div class="text-base my-10px">主图指标</div>
    <n-checkbox-group v-model:value="indexValue" @update:value="indexChange">
      <n-grid :y-gap="8" :cols="1">
        <n-gi v-for="item in indexOptions" :key="item">
          <n-checkbox :value="item.value" :label="item.label" />
        </n-gi>
      </n-grid>
    </n-checkbox-group>
    <div class="text-base my-10px">副图指标</div>
    <n-checkbox-group
      v-model:value="subIndexValue"
      @update:value="subIndexChange"
    >
      <n-grid :y-gap="8" :cols="1">
        <n-gi v-for="item in subIndexOptions" :key="item">
          <n-checkbox :value="item.value" :label="item.label" />
        </n-gi>
      </n-grid>
    </n-checkbox-group>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const emit = defineEmits([
  "add-index",
  "remove-Index",
  "add-sub-index",
  "remove-sub-Index",
]);
const indexOptions = ref([
  {
    label: "MA(移动平均线)",
    value: "MA",
  },
  {
    label: "EMA(指数平滑移动平均线)",
    value: "EMA",
  },
  {
    label: "SMA(简单移动平均线)",
    value: "SMA",
  },
  {
    label: "BOLL(布林线)",
    value: "BOLL",
  },
  {
    label: "SAR(停损点指向指标)",
    value: "SAR",
  },
  {
    label: "BBI(停损点指向指标)",
    value: "BBI",
  },
]);
const subIndexOptions = ref([
  // {
  //   label: "MA(移动平均线)",
  //   value: "MA",
  // },
  // {
  //   label: "EMA(指数平滑移动平均线)",
  //   value: "EMA",
  // },
  {
    label: "VOL(成交量)",
    value: "VOL",
  },
  {
    label: "MACD(指数平滑异同移动平均线)",
    value: "MACD",
  },
  {
    label: "KDJ(随机指标)",
    value: "KDJ",
  },
  {
    label: "RSI(相对强弱指标)",
    value: "RSI",
  },
  {
    label: "BIAS(乖离率)",
    value: "BIAS",
  },
  {
    label: "OBV(能量潮指标)",
    value: "OBV",
  },
  {
    label: "PVT(价量趋势指标)",
    value: "PVT",
  },
]);
const indexValue = ref([]);
const indexChange = (
  value: string | number,
  meta: {
    actionType: "check" | "uncheck";
    value: string | number;
  }
) => {
  if (meta.actionType === "check") {
    emit("add-index", meta.value);
  } else {
    emit("remove-Index", meta.value);
  }
};
const subIndexValue = ref([]);
const subIndexChange = (
  value: string | number,
  meta: {
    actionType: "check" | "uncheck";
    value: string | number;
  }
) => {
  if (meta.actionType === "check") {
    emit("add-sub-index", meta.value);
  } else {
    emit("remove-sub-Index", meta.value);
  }
};
</script>
