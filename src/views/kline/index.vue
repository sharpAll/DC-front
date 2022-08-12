<template>
  <div class="w-full h-full component-content">
    <div class="flex h-full">
      <div class="w-40px border-gray-200 border-r pt-10px text-center">
        <n-tooltip trigger="hover" placement="right">
          <template #trigger>
            <n-button
              text
              style="font-size: 34px"
              @click="setShapeType('priceLine')"
            >
              <n-icon>
                <svg viewBox="0 0 24 24">
                  <rect x="4.5" y="13.5" width="15" height="1" rx="0.5"></rect>
                  <ellipse cx="6" cy="14" rx="1.5" ry="1.5"></ellipse>
                  <path
                    d="M8.314036947998046,12.235949340820312L10.985912947998047,12.235949340820312L10.985912947998047,11.517199340820312L10.151922947998047,11.517199340820312L10.151922947998047,7.735949340820312L9.497632947998047,7.735949340820312C9.214422947998047,7.917589340820312,8.915602947998046,8.030869340820313,8.464427947998047,8.108999340820313L8.464427947998047,8.661729340820312L9.274972947998046,8.661729340820312L9.274972947998046,11.517199340820312L8.314036947998046,11.517199340820312L8.314036947998046,12.235949340820312ZM11.581612947998046,12.235949340820312L14.556222947998048,12.235949340820312L14.556222947998048,11.493759340820311L13.597242947998048,11.493759340820311C13.386302947998047,11.493759340820311,13.093332947998046,11.517199340820312,12.864822947998046,11.546499340820311C13.675362947998046,10.724229340820312,14.347242947998048,9.831649340820313,14.347242947998048,9.001579340820312C14.347242947998048,8.151969340820312,13.788642947998046,7.610949340820312,12.948802947998047,7.610949340820312C12.343332947998046,7.610949340820312,11.946852947998046,7.845329340820312,11.532782947998047,8.290639340820313L12.024972947998048,8.778919340820313C12.247632947998046,8.525009340820313,12.511302947998047,8.308219340820312,12.835522947998047,8.308219340820312C13.261302947998047,8.308219340820312,13.501532947998047,8.593369340820313,13.501532947998047,9.044539340820313C13.501532947998047,9.757429340820313,12.792552947998047,10.618759340820311,11.581612947998046,11.726179340820313L11.581612947998046,12.235949340820312ZM16.460522947998047,12.360949340820312C17.312082947998046,12.360949340820312,18.026902947998046,11.894149340820313,18.026902947998046,11.048449340820312C18.026902947998046,10.431259340820311,17.642162947998045,10.050399340820313,17.144112947998046,9.911729340820312L17.144112947998046,9.882429340820313C17.612862947998046,9.696889340820313,17.882402947998045,9.331649340820313,17.882402947998045,8.823839340820312C17.882402947998045,8.032829340820312,17.300362947998046,7.610949340820312,16.44294294799805,7.610949340820312C15.921462947998046,7.610949340820312,15.495682947998047,7.821889340820313,15.110912947998047,8.151969340820312L15.565992947998048,8.722279340820313C15.825752947998048,8.460559340820312,16.083572947998046,8.308219340820312,16.401922947998045,8.308219340820312C16.77888294799805,8.308219340820312,16.99568294799805,8.525009340820313,16.99568294799805,8.892199340820312C16.99568294799805,9.319929340820313,16.730052947998047,9.610949340820312,15.921462947998046,9.610949340820312L15.921462947998046,10.247669340820313C16.88044294799805,10.247669340820313,17.138252947998048,10.530869340820313,17.138252947998048,10.991809340820312C17.138252947998048,11.407829340820314,16.833572947998046,11.642199340820312,16.38239294799805,11.642199340820312C15.974192947998047,11.642199340820312,15.657782947998047,11.433219340820312,15.392162947998047,11.161729340820312L14.978102947998046,11.743759340820311C15.290602947998046,12.097279340820313,15.765212947998048,12.360949340820312,16.460522947998047,12.360949340820312Z"
                  ></path>
                </svg>
              </n-icon>
            </n-button>
          </template>
          价格线
        </n-tooltip>
        <n-tooltip trigger="hover" placement="right">
          <template #trigger>
            <n-button
              text
              style="font-size: 34px"
              @click="setShapeType('straightLine')"
            >
              <n-icon>
                <svg viewBox="0 0 24 24">
                  <rect
                    x="5.989593505859375"
                    y="17.303306579589844"
                    width="16"
                    height="1"
                    rx="0.5"
                    transform="matrix(0.7071067690849304,-0.7071067690849304,0.7071067690849304,0.7071067690849304,-10.480973816180722,9.303303481670355)"
                  ></rect>
                  <ellipse cx="14" cy="10" rx="1.5" ry="1.5"></ellipse>
                  <ellipse cx="10" cy="14" rx="1.5" ry="1.5"></ellipse>
                </svg>
              </n-icon>
            </n-button>
          </template>
          直线
        </n-tooltip>
        <n-tooltip trigger="hover" placement="right">
          <template #trigger>
            <n-button
              text
              style="font-size: 34px"
              @click="setShapeType('parallelStraightLine')"
            >
              <n-icon>
                <svg viewBox="0 0 24 24">
                  <rect
                    x="7.989593505859375"
                    y="20.303314208984375"
                    width="16"
                    height="1"
                    rx="0.5"
                    transform="matrix(0.7071067690849304,-0.7071067690849304,0.7071067690849304,0.7071067690849304,-12.016513056401891,11.596198947183439)"
                  ></rect>
                  <rect
                    x="3.4586830139160156"
                    y="15.292892456054688"
                    width="16"
                    height="1"
                    rx="0.5"
                    transform="matrix(0.7071067690849304,-0.7071067690849304,0.7071067690849304,0.7071067690849304,-9.800682931907204,6.924842852749634)"
                  ></rect>
                  <ellipse cx="16" cy="13" rx="1.5" ry="1.5"></ellipse>
                  <ellipse cx="12" cy="17" rx="1.5" ry="1.5"></ellipse>
                  <ellipse cx="9.5" cy="10" rx="1.5" ry="1.5"></ellipse>
                </svg>
              </n-icon>
            </n-button>
          </template>
          平行直线
        </n-tooltip>
        <n-tooltip trigger="hover" placement="right">
          <template #trigger>
            <n-button
              text
              style="font-size: 34px"
              @click="setShapeType('priceChannelLine')"
            >
              <n-icon>
                <svg viewBox="0 0 24 24">
                  <rect
                    x="5.989593505859375"
                    y="17.303298950195312"
                    width="16"
                    height="1"
                    rx="0.5"
                    transform="matrix(0.7071067690849304,-0.7071067690849304,0.7071067690849304,0.7071067690849304,-10.480968421384205,9.30330124707234)"
                  ></rect>
                  <rect
                    x="5.031974792480469"
                    y="13.607009887695312"
                    width="12"
                    height="1"
                    rx="0.5"
                    transform="matrix(0.7071067690849304,-0.7071067690849304,-0.7071067690849304,-0.7071067690849304,11.095440153447726,26.786762123917924)"
                  ></rect>
                  <rect
                    x="11.40380859375"
                    y="19.303298950195312"
                    width="12"
                    height="1"
                    rx="0.5"
                    transform="matrix(0.7071067690849304,-0.7071067690849304,-0.7071067690849304,-0.7071067690849304,16.98959169711361,41.016502553537975)"
                  ></rect>
                  <ellipse cx="14" cy="10" rx="1.5" ry="1.5"></ellipse>
                  <ellipse cx="10" cy="14" rx="1.5" ry="1.5"></ellipse>
                  <ellipse cx="15" cy="15" rx="1.5" ry="1.5"></ellipse>
                </svg>
              </n-icon>
            </n-button>
          </template>
          价格通道线
        </n-tooltip>
        <n-tooltip trigger="hover" placement="right">
          <template #trigger>
            <n-button
              text
              style="font-size: 34px"
              @click="setShapeType('fibonacciLine')"
            >
              <n-icon>
                <svg viewBox="0 0 24 24">
                  <rect x="4" y="6" width="16" height="1" rx="0.5"></rect>
                  <rect x="4" y="9" width="16" height="1" rx="0.5"></rect>
                  <rect x="4" y="15" width="16" height="1" rx="0.5"></rect>
                  <rect x="4" y="18" width="16" height="1" rx="0.5"></rect>
                  <rect x="4" y="12" width="16" height="1" rx="0.5"></rect>
                  <ellipse cx="12" cy="18.5" rx="1.5" ry="1.5"></ellipse>
                  <ellipse cx="16" cy="6.5" rx="1.5" ry="1.5"></ellipse>
                  <ellipse cx="8" cy="6.5" rx="1.5" ry="1.5"></ellipse>
                </svg>
              </n-icon>
            </n-button>
          </template>
          斐波那契回调
        </n-tooltip>
        <n-tooltip trigger="hover" placement="right">
          <template #trigger>
            <n-button
              text
              style="font-size: 34px"
              @click="setShapeType('rect')"
            >
              <n-icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 20 20"
                >
                  <g fill="none">
                    <path
                      d="M2 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7zm3-2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5z"
                      fill="currentColor"
                    ></path>
                  </g>
                </svg>
              </n-icon>
            </n-button>
          </template>
          自定义矩形
        </n-tooltip>
        <n-tooltip trigger="hover" placement="right">
          <template #trigger>
            <n-button
              text
              style="font-size: 34px"
              @click="setShapeType('circle')"
            >
              <n-icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 48 48"
                >
                  <g fill="none">
                    <path
                      d="M24 6.5C14.335 6.5 6.5 14.335 6.5 24S14.335 41.5 24 41.5S41.5 33.665 41.5 24S33.665 6.5 24 6.5zM4 24C4 12.954 12.954 4 24 4s20 8.954 20 20s-8.954 20-20 20S4 35.046 4 24z"
                      fill="currentColor"
                    ></path>
                  </g>
                </svg>
              </n-icon>
            </n-button>
          </template>
          自定义圆形
        </n-tooltip>
        <n-tooltip trigger="hover" placement="right">
          <template #trigger>
            <n-button text style="font-size: 34px" @click="removeAllShape()">
              <n-icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 16 16"
                >
                  <g fill="none">
                    <path
                      d="M6.5 7v4a.5.5 0 0 0 1 0V7a.5.5 0 0 0-1 0zM9 6.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5zM10 4h3a.5.5 0 0 1 0 1h-.553l-.752 6.776A2.5 2.5 0 0 1 9.21 14H6.79a2.5 2.5 0 0 1-2.485-2.224L3.552 5H3a.5.5 0 0 1 0-1h3a2 2 0 1 1 4 0zM8 3a1 1 0 0 0-1 1h2a1 1 0 0 0-1-1zM4.559 5l.74 6.666A1.5 1.5 0 0 0 6.79 13h2.42a1.5 1.5 0 0 0 1.49-1.334L11.442 5H4.56z"
                      fill="currentColor"
                    ></path>
                  </g>
                </svg>
              </n-icon>
            </n-button>
          </template>
          清除痕迹
        </n-tooltip>
      </div>
      <div class="flex-1 flex flex-col">
        <div class="h-40px pt-4px pl-10px border-gray-200 border-b">
          <n-space>
            <n-button text size="large" @click="openIndexModal"
              ><template #icon>
                <n-icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 1024 1024"
                  >
                    <path
                      d="M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM305.8 637.7c3.1 3.1 8.1 3.1 11.3 0l138.3-137.6L583 628.5c3.1 3.1 8.2 3.1 11.3 0l275.4-275.3c3.1-3.1 3.1-8.2 0-11.3l-39.6-39.6a8.03 8.03 0 0 0-11.3 0l-230 229.9L461.4 404a8.03 8.03 0 0 0-11.3 0L266.3 586.7a8.03 8.03 0 0 0 0 11.3l39.5 39.7z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </n-icon> </template
              >指标</n-button
            >
            <n-switch
              v-model:value="dealActive"
              class="mt-5px"
              @update:value="annotationCheck"
            >
              <template #checked>交易点</template>
              <template #unchecked>交易点</template>
            </n-switch>
            <n-switch
              v-model:value="eventActive"
              class="mt-5px"
              @update:value="annotationCheck"
            >
              <template #checked>大事件</template>
              <template #unchecked>大事件</template>
            </n-switch>
          </n-space>
        </div>
        <div ref="klinebox" class="flex-auto"></div>
      </div>
    </div>
    <n-modal
      v-model:show="showIndexModal"
      display-directive="show"
      :show-icon="false"
      preset="dialog"
      title="指标"
      style="width: 400px; height: 550px"
    >
      <IndexForm
        @add-index="addIndex"
        @remove-index="removeIndex"
        @add-sub-index="addSubIndex"
        @remove-sub-index="removeSubIndex"
      />
    </n-modal>
    <n-modal
      v-model:show="showEventModal"
      :show-icon="false"
      preset="dialog"
      :title="eventTime"
      style="width: 400px; height: 400px"
    >
      {{ eventTime }} 发生了什么....
    </n-modal>
  </div>
</template>
<script setup lang="ts">
import { ref, unref, onMounted } from "vue";
import { init, Chart, ShapeTemplate } from "klinecharts";
import { checkCoordinateOnSegment } from "klinecharts/lib/shape/shapeHelper";
import generatedKLineDataList from "./generatedKLineDataList";
import IndexForm from "./components/indexForm.vue";
import { format } from "date-fns";
const klinebox = ref();
let kLineChart: undefined | Chart;
const kLineArray = generatedKLineDataList();
onMounted(() => {
  kLineChart = init(unref(klinebox), {
    candle: {
      bar: {
        upColor: "#EF5350",
        downColor: "#26A69A",
        noChangeColor: "#26A69A",
      },
      priceMark: {
        last: {
          upColor: "#EF5350",
          downColor: "#26A69A",
          noChangeColor: "#26A69A",
        },
      },
    },
  });
  kLineChart.addShapeTemplate([rect, circle] as ShapeTemplate[]);
  kLineChart.applyNewData(kLineArray);
});

/** 绘制图形start **/
const rect = {
  name: "rect",
  totalStep: 3,
  checkEventCoordinateOnShape: ({ dataSource, eventCoordinate }: any) => {
    return checkCoordinateOnSegment(
      dataSource[0],
      dataSource[1],
      eventCoordinate
    );
  },
  createShapeDataSource: ({ coordinates }: any) => {
    if (coordinates.length === 2) {
      return [
        {
          type: "line",
          isDraw: false,
          isCheck: true,
          dataSource: [
            [
              { ...coordinates[0] },
              { x: coordinates[1].x, y: coordinates[0].y },
            ],
            [
              { x: coordinates[1].x, y: coordinates[0].y },
              { ...coordinates[1] },
            ],
            [
              { ...coordinates[1] },
              { x: coordinates[0].x, y: coordinates[1].y },
            ],
            [
              { x: coordinates[0].x, y: coordinates[1].y },
              { ...coordinates[0] },
            ],
          ],
        },
        {
          type: "polygon",
          isDraw: true,
          isCheck: false,
          styles: {
            style: "fill",
            fill: {
              color: "rgba(33, 150, 243, 0.1)",
            },
          },
          dataSource: [
            [
              { ...coordinates[0] },
              { x: coordinates[1].x, y: coordinates[0].y },
              { ...coordinates[1] },
              { x: coordinates[0].x, y: coordinates[1].y },
            ],
          ],
        },
        {
          type: "polygon",
          isDraw: true,
          isCheck: false,
          dataSource: [
            [
              { ...coordinates[0] },
              { x: coordinates[1].x, y: coordinates[0].y },
              { ...coordinates[1] },
              { x: coordinates[0].x, y: coordinates[1].y },
            ],
          ],
        },
      ];
    }
    return [];
  },
};
const circle = {
  name: "circle",
  totalStep: 3,
  checkEventCoordinateOnShape: ({ dataSource, eventCoordinate }: any) => {
    const xDis = Math.abs(dataSource.x - eventCoordinate.x);
    const yDis = Math.abs(dataSource.y - eventCoordinate.y);
    const r = Math.sqrt(xDis * xDis + yDis * yDis);
    return Math.abs(r - dataSource.radius) < 3;
  },
  createShapeDataSource: ({ coordinates }: any) => {
    if (coordinates.length === 2) {
      const xDis = Math.abs(coordinates[0].x - coordinates[1].x);
      const yDis = Math.abs(coordinates[0].y - coordinates[1].y);
      const radius = Math.sqrt(xDis * xDis + yDis * yDis);
      return [
        {
          type: "arc",
          isDraw: true,
          isCheck: false,
          styles: {
            style: "fill",
            fill: {
              color: "rgba(33, 150, 243, 0.1)",
            },
          },
          dataSource: [
            { ...coordinates[0], radius, startAngle: 0, endAngle: Math.PI * 2 },
          ],
        },
        {
          type: "arc",
          isDraw: true,
          isCheck: true,
          dataSource: [
            { ...coordinates[0], radius, startAngle: 0, endAngle: Math.PI * 2 },
          ],
        },
      ];
    }
    return [];
  },
};
const setShapeType = (key: string) => {
  (kLineChart as Chart).createShape(key);
};
const removeAllShape = () => {
  (kLineChart as Chart).removeShape();
};
/** 绘制图形 end **/

/** 添加指标start **/
const showIndexModal = ref(false);
const openIndexModal = () => {
  showIndexModal.value = true;
};
const addIndex = (type: string) => {
  (kLineChart as Chart).createTechnicalIndicator(type, true, {
    id: "candle_pane",
  });
};
const removeIndex = (type: string) => {
  (kLineChart as Chart).removeTechnicalIndicator("candle_pane", type);
};
const addSubIndex = (type: string) => {
  (kLineChart as Chart).createTechnicalIndicator(type, true, {
    id: type,
  });
};
const removeSubIndex = (type: string) => {
  (kLineChart as Chart).removeTechnicalIndicator(type);
};
/** 添加指标 end **/

/** 图表注解start **/
const dealActive = ref(false);
const eventActive = ref(false);
const showEventModal = ref(false);
const eventTime = ref("");
const annotationCheck = () => {
  (kLineChart as Chart).removeAnnotation();
  if (eventActive.value) {
    (kLineChart as Chart).createAnnotation(
      createAnnotationEventPoints([
        kLineArray[kLineArray.length - 1],
        kLineArray[kLineArray.length - 5],
        kLineArray[kLineArray.length - 10],
      ])
    );
  }
  if (dealActive.value) {
    (kLineChart as Chart).createAnnotation(
      createAnnotationDealPoints([
        kLineArray[kLineArray.length - 1],
        kLineArray[kLineArray.length - 5],
        kLineArray[kLineArray.length - 10],
        kLineArray[kLineArray.length - 15],
      ])
    );
  }
};
function createAnnotationEventPoints(array) {
  return array.map((item) => {
    return {
      point: {
        timestamp: item.timestamp,
      },
      styles: {
        offset: [-10, 0],
        position: "bottom",
        symbol: {
          type: "diamond",
          size: 8,
          color: "#1e88e5",
          activeSize: 10,
          activeColor: "#FF9600",
        },
      },
      onClick: function ({ id, points, event }) {
        console.log(id, points, event);
        eventTime.value = format(points.timestamp, "yyyy-MM-dd HH:mm:ss");
        showEventModal.value = true;
      },
    };
  });
}
function annotationDrawExtend(
  ctx,
  coordinate,
  text: string,
  colorStr: string,
  position = "bottom",
  type = "fill"
) {
  ctx.font = "12px Roboto";
  ctx.fillStyle = colorStr;
  ctx.strokeStyle = colorStr;
  ctx.lineWidth = 2;

  const textWidth = ctx.measureText(text).width;
  const rectWidth = textWidth + 12;
  const rectHeight = 28;
  const startX = coordinate.x;
  let startY = position === "bottom" ? coordinate.y : coordinate.y - 70;
  ctx.beginPath();
  if (position === "bottom") {
    ctx.moveTo(startX, startY);
    startY += 5;
    ctx.lineTo(startX - 4, startY);
    ctx.lineTo(startX + 4, startY);
  } else {
    ctx.moveTo(startX, startY + rectHeight);
    startY -= 5;
    ctx.lineTo(startX - 4, startY + rectHeight);
    ctx.lineTo(startX + 4, startY + rectHeight);
  }
  ctx.closePath();
  ctx.fill();

  const rectX = startX - textWidth / 2 - 6;
  const rectY = startY;
  const r = 2;
  ctx.beginPath();
  ctx.moveTo(rectX + r, rectY);
  ctx.arcTo(rectX + rectWidth, rectY, rectX + rectWidth, rectY + rectHeight, r);
  ctx.arcTo(
    rectX + rectWidth,
    rectY + rectHeight,
    rectX,
    rectY + rectHeight,
    r
  );
  ctx.arcTo(rectX, rectY + rectHeight, rectX, rectY, r);
  ctx.arcTo(rectX, rectY, rectX + rectWidth, rectY, r);
  ctx.closePath();
  type === "fill" ? ctx.fill() : ctx.stroke();
  ctx.fillStyle = type === "fill" ? "#fff" : colorStr;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillText(text, startX, startY + 14);
}
function createAnnotationDealPoints(array: any) {
  return [
    {
      point: { timestamp: array[0].timestamp, value: array[0].low },
      styles: {
        position: "point",
        symbol: {
          type: "custom",
        },
      },
      drawExtend: (params) => {
        const { ctx, coordinate } = params;
        annotationDrawExtend(
          ctx,
          coordinate,
          "B",
          "#bb3f3c",
          "bottom",
          "empty"
        );
      },
    },
    {
      point: { timestamp: array[1].timestamp, value: array[1].high },
      styles: {
        position: "point",
        symbol: {
          type: "custom",
        },
      },
      drawExtend: (params) => {
        const { ctx, coordinate } = params;
        annotationDrawExtend(ctx, coordinate, "S", "#12746b", "top");
      },
    },
    {
      point: { timestamp: array[2].timestamp, value: array[2].high },
      styles: {
        position: "point",
        symbol: {
          type: "custom",
        },
      },
      drawExtend: (params) => {
        const { ctx, coordinate } = params;
        annotationDrawExtend(ctx, coordinate, "S", "#12746b", "top", "empty");
      },
    },
    {
      point: { timestamp: array[3].timestamp, value: array[3].low },
      styles: {
        position: "point",
        symbol: {
          type: "custom",
        },
      },
      drawExtend: (params) => {
        const { ctx, coordinate } = params;
        annotationDrawExtend(ctx, coordinate, "B", "#bb3f3c", "bottom");
      },
    },
  ];
}
/** 图表注解end **/
</script>
<style scoped lang="scss"></style>
