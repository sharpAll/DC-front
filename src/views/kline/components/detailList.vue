<template>
  <div class="mx-10px relative">
    <div class="absolute top-3px right-1px z-99">
      <n-button circle size="small" @click="close">
        <template #icon>
          <n-icon><CloseOutlined /></n-icon>
        </template>
      </n-button>
    </div>
    <n-tabs type="line" size="small" animated>
      <n-tab-pane name="hold" tab="当前持仓">
        <n-data-table
          :columns="holdColumns()"
          :data="holdData"
          :bordered="false"
          size="small"
          :max-height="220"
        />
      </n-tab-pane>
      <n-tab-pane name="incomplete" tab="未结委托">
        <n-data-table
          :columns="incompleteColumns()"
          :data="incompleteData"
          :bordered="false"
          size="small"
          :max-height="220"
        />
      </n-tab-pane>
      <n-tab-pane name="deal" tab="成交列表"
        ><n-data-table
          :columns="dealColumns()"
          :data="dealData"
          :bordered="false"
          size="small"
          :max-height="220"
      /></n-tab-pane>
      <n-tab-pane name="cancle" tab="撤单列表">
        <n-data-table
          :columns="cancleColumns()"
          :data="cancleData"
          :bordered="false"
          size="small"
          :max-height="220"
        />
      </n-tab-pane>
    </n-tabs>
  </div>
</template>
<script setup lang="ts">
import { h } from "vue";
import { CloseOutlined } from "@vicons/antd";
import { NButton, useDialog } from "naive-ui";
const emit = defineEmits(["close"]);
const close = () => {
  emit("close");
};
/** 当前持仓start **/
const holdColumns = () => {
  return [
    {
      title: "代码",
      key: "code",
    },
    {
      title: "名称",
      key: "name",
    },
    {
      title: "数量(手)",
      key: "count",
    },
    {
      title: "最新价",
      key: "lastest",
    },
    {
      title: "持仓均价",
      key: "avg",
    },
    {
      title: "浮动盈亏",
      key: "benefit",
      render(row: any) {
        return h(
          "span",
          {
            class: row.benefit > 0 ? "text-up" : "text-down",
          },
          {
            default: () => `${row.benefit}`,
          }
        );
      },
    },
    {
      title: "浮盈比例",
      key: "scale",
      render(row: any) {
        return h(
          "span",
          {
            class: row.scale > 0 ? "text-up" : "text-down",
          },
          {
            default: () => `${row.scale}%`,
          }
        );
      },
    },
  ];
};
const holdData = [
  {
    code: "600519.XSHG",
    name: "贵州茅台",
    count: "10",
    lastest: "1100",
    avg: "1000",
    benefit: "100000",
    scale: "10",
  },
  {
    code: "600520.XSHG",
    name: "文一科技",
    count: "100",
    lastest: "15",
    avg: "17",
    benefit: "-20000",
    scale: "-12",
  },
];
/** 当前持仓 end **/

/** 未结委托start **/
const dialog = useDialog();
function cancle(row: any) {
  dialog.success({
    title: "撤单",
    content: `是否撤销 ${row.name}(${row.time}) 这笔交易`,
    positiveText: "确定",
    negativeText: "取消",
    showIcon: false,
    onPositiveClick: () => {},
  });
}
const incompleteColumns = () => {
  return [
    {
      title: "委托时间",
      key: "time",
    },
    {
      title: "代码",
      key: "code",
    },
    {
      title: "名称",
      key: "name",
    },
    {
      title: "方向",
      key: "direction",
    },
    {
      title: "数量(手)",
      key: "count",
    },
    {
      title: "已成交量(手)",
      key: "complete_count",
    },
    {
      title: "操作",
      key: "actions",
      render(row: any) {
        return h(
          NButton,
          {
            type: "primary",
            text: true,
            size: "small",
            onClick: () => cancle(row),
          },
          { default: () => "撤单" }
        );
      },
    },
  ];
};
const incompleteData = [
  {
    time: "2022-08-23 14:05:30",
    code: "600519.XSHG",
    name: "贵州茅台",
    direction: "买/开",
    count: "10",
    complete_count: "5",
  },
  {
    time: "2022-08-23 14:05:30",
    code: "600520.XSHG",
    name: "文一科技",
    direction: "买/开",
    count: "100",
    complete_count: "50",
  },
];
/** 未结委托 end **/

/** 成交列表start **/
const dealColumns = () => {
  return [
    {
      title: "成交时间",
      key: "time",
    },
    {
      title: "代码",
      key: "code",
    },
    {
      title: "名称",
      key: "name",
    },
    {
      title: "方向",
      key: "direction",
    },
    {
      title: "数量(手)",
      key: "count",
    },
    {
      title: "成交价",
      key: "deal_price",
    },
    {
      title: "成交金额",
      key: "deal_total",
    },
    {
      title: "手续费",
      key: "charge",
    },
  ];
};
const dealData = [
  {
    time: "2022-08-23 14:05:30",
    code: "600519.XSHG",
    name: "贵州茅台",
    direction: "买/开",
    count: "10",
    deal_price: "1500",
    deal_total: "1500000",
    charge: "3000",
  },
  {
    time: "2022-08-23 14:05:30",
    code: "600520.XSHG",
    name: "文一科技",
    direction: "买/开",
    count: "100",
    deal_price: "1200",
    deal_total: "1200000",
    charge: "2500",
  },
];
/** 成交列表 end **/

/** 撤单列表start **/
const cancleColumns = () => {
  return [
    {
      title: "成交时间",
      key: "time",
    },
    {
      title: "代码",
      key: "code",
    },
    {
      title: "名称",
      key: "name",
    },
    {
      title: "方向",
      key: "direction",
    },
    {
      title: "价格",
      key: "price",
    },
    {
      title: "数量",
      key: "count",
    },
  ];
};
const cancleData = [
  {
    time: "2022-08-23 14:05:30",
    code: "600519.XSHG",
    name: "贵州茅台",
    direction: "买/开",
    price: "1500",
    count: "10",
  },
  {
    time: "2022-08-23 14:05:30",
    code: "600520.XSHG",
    name: "文一科技",
    direction: "买/开",
    price: "12",
    count: "100",
  },
];
/** 撤单列表 end **/
</script>
<style lang="scss" scoped>
::v-deep(.n-tabs) {
  .n-tab-pane {
    padding: 0;
  }
}
::v-deep(.n-data-table) {
  .n-data-table-wrapper {
    line-height: 1.2;
  }
}
</style>
