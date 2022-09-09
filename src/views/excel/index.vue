<template>
  <div class="w-full h-full component-content">
    <n-data-table :columns="createColumns()" :data="data" />
    <!-- <pre>{{ JSON.stringify(data, null, 2) }}</pre> -->
    <div class="pt-6">
      <n-space justify="center">
        <n-button class="mb-6" ghost type="primary" @click="exportExcel"
          >导出Excel</n-button
        >
        <n-upload
          :custom-request="customRequest"
          :show-file-list="false"
          @before-upload="beforeUpload"
        >
          <n-button type="primary">导入Excel</n-button>
        </n-upload>
      </n-space>
    </div>
  </div>
</template>
<script setup lang="ts">
import { h, defineComponent, ref } from "vue";
import { NInput, NDatePicker, NInputNumber } from "naive-ui";
import type { DataTableColumns, UploadFileInfo } from "naive-ui";
import { getTime, format, parseISO, subSeconds } from "date-fns";
import { write, read } from "xlsx";
type RowData = {
  key: number;
  index: string;
  date: string;
  value: number;
  address: string;
};
const createData = (): RowData[] => [
  {
    index: "铁矿01合约持仓",
    date: new Date(format(new Date(), "yyyy-MM-dd 00:00:00")),
    value: 146089,
  },
  {
    index: "铁矿05合约持仓",
    date: new Date(format(new Date(), "yyyy-MM-dd 00:00:00")),
    value: 19518,
  },
  {
    index: "铁矿09合约持仓",
    date: new Date(format(new Date(), "yyyy-MM-dd 00:00:00")),
    value: 758328,
  },
];
const data = ref(createData());
const createColumns = (): DataTableColumns<RowData> => [
  {
    title: "Index",
    key: "index",
    render(row, index) {
      return h(NInput, {
        value: row.index,
        onUpdateValue(v) {
          data.value[index].index = v;
        },
      });
    },
  },
  {
    title: "Date",
    key: "date",
    render(row, index) {
      return h(NDatePicker, {
        value: row.date,
        valueFormat: "yyyy-MM-dd",
        onUpdateValue(v) {
          data.value[index].date = v;
        },
      });
    },
  },
  {
    title: "Value",
    key: "value",
    render(row, index) {
      return h(NInputNumber, {
        value: row.value,
        onUpdateValue(v) {
          data.value[index].value = v;
        },
      });
    },
  },
];

/** 导出excel start **/
const exportExcel = () => {
  const sheet = data2sheet(data.value);
  const blob = sheet2blob(sheet);
  makeExcel(blob);
};
function data2sheet(content) {
  const sheet = {};
  sheet["!ref"] = "A1:" + String.fromCharCode(65 + 2) + (content.length + 1);
  sheet[String.fromCharCode(65) + "1"] = { v: "Index", t: "s" };
  sheet[String.fromCharCode(65 + 1) + "1"] = { v: "Date", t: "s" };
  sheet[String.fromCharCode(65 + 2) + "1"] = { v: "Value", t: "s" };
  for (let n = 0; n < content.length; n++) {
    const offset = n + 2;
    sheet[String.fromCharCode(65) + offset] = {
      v: content[n].index,
      t: "s",
    };
    const offsetTime = subSeconds(content[n].date, 43);
    sheet[String.fromCharCode(65 + 1) + offset] = {
      v: offsetTime,
      t: "d",
      z: "yyyy-mm-dd",
    };
    sheet[String.fromCharCode(65 + 2) + offset] = {
      v: content[n].value,
      t: "n",
    };
  }
  return sheet;
}
function sheet2blob(sheet) {
  const sheetName = "sheet1";
  const workbook = {
    SheetNames: [sheetName],
    Sheets: {},
  };
  workbook.Sheets[sheetName] = sheet;
  const wopts = {
    bookType: "xlsx",
    bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
    type: "binary",
  };
  const wbout = write(workbook, wopts);
  const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
  // 字符串转ArrayBuffer
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  }
  return blob;
}
function makeExcel(blob: Blob) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "指标数据表.xlsx";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
/** 导出excel end **/

/** 导入excel start **/
const beforeUpload = (data: {
  file: UploadFileInfo;
  fileList: UploadFileInfo[];
}) => {
  if (
    data.file.file?.type !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
    data.file.file?.type !== "application/vnd.ms-excel application/x-excel"
  ) {
    alert("只能上传png格式的图片文件，请重新上传");
    return false;
  }
  return true;
};
const customRequest = async ({ file }: { file: File }) => {
  const fileData = await file.file.arrayBuffer();
  const WorkBook = read(fileData, { type: "binary", cellDates: true });
  const sheetsData = WorkBook.Sheets;
  let content = [];
  for (const key in sheetsData) {
    content = content.concat(getExcelData(sheetsData[key]));
  }
  data.value = content;
};
function getExcelData(sheetData: any) {
  const content: any = [];
  const ref: string = sheetData["!ref"] as string;
  const refArr = ref?.split(":");
  const start = refArr[0].charCodeAt(0);
  const len = Number(refArr[1].substring(1)) - 1;
  for (let i = 0; i < len; i++) {
    const offset = i + 2;
    content.push({
      index: sheetData[String.fromCharCode(start) + offset].v,
      date: sheetData[String.fromCharCode(start + 1) + offset].v,
      value: sheetData[String.fromCharCode(start + 2) + offset].v,
    });
  }
  return content;
}
/** 导入excel end **/
</script>
<style scoped lang="scss"></style>
