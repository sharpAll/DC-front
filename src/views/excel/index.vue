<template>
  <div class="w-full h-full component-content">
    <div id="screenshotRef">
      <n-data-table :columns="createColumns()" :data="data" />
    </div>
    <div class="pt-6">
      <n-space justify="center">
        <n-upload
          :custom-request="customRequest"
          :show-file-list="false"
          @before-upload="beforeUpload"
        >
          <n-button ghost type="primary">导入Excel</n-button>
        </n-upload>
        <n-button class="mb-6" type="primary" @click="exportExcel"
          >导出Excel</n-button
        >
        <n-button class="mb-6" type="info" @click="screenShot"
          >导出图片</n-button
        >
        <n-button class="mb-6" type="info" @click="screenPDF">导出Pdf</n-button>
      </n-space>
    </div>
  </div>
</template>
<script setup lang="ts" name="Excel">
import { h, ref } from "vue";
import { NInput, NDatePicker, NInputNumber } from "naive-ui";
import type { DataTableColumns, UploadFileInfo } from "naive-ui";
import { format, subSeconds } from "date-fns";
import { write, read, utils } from "xlsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
type RowData = {
  key?: number;
  index: string;
  date: Number;
  value: number;
  address?: string;
};
const createData = (): RowData[] => [
  {
    index: "铁矿01合约持仓",
    date: new Date().getTime(),
    value: 146089,
  },
  {
    index: "铁矿05合约持仓",
    date: new Date().getTime(),
    value: 19518,
  },
  {
    index: "铁矿09合约持仓",
    date: new Date().getTime(),
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
      return h(NDatePicker as any, {
        value: row.date,
        valueFormat: "yyyy-MM-dd",
        onUpdateValue(v: number) {
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
          data.value[index].value = v as number;
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
function data2sheet(content: any) {
  const sheet: any = {};
  sheet["!ref"] = "A1:" + utils.encode_cell({ c: 2, r: content.length });
  sheet[utils.encode_col(0) + "1"] = { v: "Index", t: "s" };
  sheet[utils.encode_col(1) + "1"] = { v: "Date", t: "s" };
  sheet[utils.encode_col(2) + "1"] = { v: "Value", t: "s" };
  for (let n = 0; n < content.length; n++) {
    const offset = n + 2;
    sheet[utils.encode_col(0) + offset] = {
      v: content[n].index,
      t: "s",
    };
    const offsetTime = subSeconds(content[n].date, 43);
    sheet[utils.encode_col(1) + offset] = {
      v: offsetTime,
      t: "d",
      z: "yyyy-mm-dd",
    };
    sheet[utils.encode_col(2) + offset] = {
      v: content[n].value,
      t: "n",
    };
  }
  return sheet;
}
function sheet2blob(sheet: any) {
  const sheetName = "sheet1";
  const workbook: {
    SheetNames: string[];
    Sheets: any;
  } = {
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
  let content: any[] = [];
  for (const key in sheetsData) {
    content = content.concat(getExcelData(sheetsData[key]));
  }
  data.value = content;
};
function getExcelData(sheetData: any) {
  const content: any = [];
  const ref: string = sheetData["!ref"] as string;
  const refArr = ref?.split(":");
  const startCell = utils.decode_cell(refArr[0]);
  const endCell = utils.decode_cell(refArr[1]);
  const len = endCell.r - startCell.r;
  for (let i = 0; i < len; i++) {
    const offset = i + 2;
    content.push({
      index: sheetData[utils.encode_col(startCell.c) + offset].v,
      date: sheetData[utils.encode_col(startCell.c + 1) + offset].v,
      value: sheetData[utils.encode_col(startCell.c + 2) + offset].v,
    });
  }
  return content;
}
/** 导入excel end **/

/** 保存图片start **/
/**
 * @description: base64 to blob
 */
function dataURLtoBlob(base64Buf: string): Blob {
  const arr = base64Buf.split(",");
  const typeItem = arr[0];
  const mime = typeItem.match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
/**
 * @description:将base64转换为文件
 */
function dataURLtoFile(dataurl: string, filename: string): File {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
/**
 * 数据转为文件
 */
function downloadByData(data: any, filename: string, mime?: string, bom?: any) {
  const blobData = typeof bom !== "undefined" ? [bom, data] : [data];
  const blob = new Blob(blobData, { type: mime || "application/octet-stream" });
  const blobURL = window.URL.createObjectURL(blob);
  const tempLink = document.createElement("a");
  tempLink.style.display = "none";
  tempLink.href = blobURL;
  tempLink.setAttribute("download", filename);
  if (typeof tempLink.download === "undefined") {
    tempLink.setAttribute("target", "_blank");
  }
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
  window.URL.revokeObjectURL(blobURL);
}
async function addWaterMark(canvas: HTMLCanvasElement, text: string) {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  ctx!.font = "36px 微软雅黑";
  ctx!.fillStyle = "rgba(0,0,0,0.05)";
  ctx!.strokeStyle = "rgba(0,0,0,0.05)";
  const wText = ctx?.measureText(text).width as number;
  ctx!.translate(0, 0);
  ctx!.rotate((-Math.PI / 180) * 30);
  const xn = width * 3;
  const yn = height * 3;
  let x;
  let y;
  const offset = 100;
  let odd = 0;
  for (y = -xn; y < yn; y = y + offset) {
    odd++;
    for (x = -yn; x < xn; x = x + wText + offset) {
      if (odd % 2 === 0) {
        ctx!.fillText(text, x, y);
        ctx!.strokeText(text, x, y);
      } else {
        ctx!.fillText(text, x + wText, y);
        ctx!.strokeText(text, x + wText, y);
      }
    }
  }
}
enum fileType {
  BLOB = "blob",
  FILE = "file",
}
interface dom2imgFileParams {
  dom: HTMLElement;
  fileName?: string;
  type: fileType;
  scale?: number;
  waterMark?: string;
}
async function dom2imgFile({
  dom,
  fileName,
  type,
  scale,
  waterMark,
}: dom2imgFileParams): Promise<File | Blob> {
  if (scale === undefined) {
    scale = 1;
  }
  scale *= window.devicePixelRatio;
  const width = dom.offsetWidth * scale;
  const height = dom.offsetHeight * scale;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const canvasRes: HTMLCanvasElement = await html2canvas(dom, {
    canvas,
    width,
    height,
    useCORS: true,
    scale,
  });
  /** 水印 start **/
  if (waterMark) {
    addWaterMark(canvasRes, waterMark);
  }
  /** 水印 end **/
  const obj = {
    blob: dataURLtoBlob(canvasRes.toDataURL("image/jpeg", 1)),
    file: dataURLtoFile(canvasRes.toDataURL("image/jpeg", 1), fileName!),
  };
  return obj[type];
}
async function screenShot() {
  const screenshotBlob = await dom2imgFile({
    dom: document.getElementById("screenshotRef") as HTMLElement,
    type: fileType.BLOB,
    waterMark: "sharpAll",
  });
  downloadByData(screenshotBlob as Blob, `Excel.jpeg`);
}
/** 保存图片end **/

/** 保存PDFstart **/
async function screenPDF() {
  html2canvas(document.getElementById("screenshotRef") as HTMLElement, {
    allowTaint: true,
    useCORS: true,
  }).then(async function (canvas: HTMLCanvasElement) {
    await addWaterMark(canvas, "sharpAll");
    const A4W = 595.28;
    const A4H = 841.89;
    const TOP_ADJUST = 10; // 纵轴偏移误差
    const clipArray: any = [0]; // 分页切割位置
    const contentWidth = (
      document.getElementById("screenshotRef") as HTMLElement
    ).offsetWidth;
    const contentHeight = (
      document.getElementById("screenshotRef") as HTMLElement
    ).offsetHeight; // 原图总高度
    const pageHeight = (contentWidth / A4W) * A4H; // 原图单页高度
    let offsetEle = 0; // 上次分页高度
    const imgWidth = A4W;
    const imgHeight = (A4W / contentWidth) * contentHeight; // a4图总高度
    const PDF = new jsPDF("p", "pt", "a4");
    const pageData = canvas.toDataURL("image/jpeg", 1.0);
    const elements = (document.getElementById("screenshotRef") as HTMLElement)
      .children;
    for (let i = 0; i < elements.length; i++) {
      const curEle = elements[i] as HTMLElement;
      const curH = curEle.offsetTop + curEle.offsetHeight - offsetEle;
      if (curH > pageHeight) {
        offsetEle = curEle.offsetTop;
        clipArray.push(curEle.offsetTop - TOP_ADJUST);
      }
    }
    for (let i = 0; i < clipArray.length; i++) {
      PDF.addImage(
        pageData,
        "JPEG",
        0,
        -((clipArray[i] * A4H) / pageHeight),
        imgWidth,
        imgHeight
      );
      if (i !== clipArray.length - 1) {
        PDF.setFillColor(255, 255, 255);
        PDF.rect(
          0,
          ((clipArray[i + 1] - clipArray[i]) * A4H) / pageHeight,
          imgWidth,
          imgHeight,
          "F"
        );
        PDF.addPage();
      }
    }
    PDF.save(`PDF.pdf`);
  });
}
/** 保存PDFend **/
</script>
<style scoped lang="scss"></style>
