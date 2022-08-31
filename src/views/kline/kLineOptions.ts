import { checkCoordinateOnSegment } from "klinecharts/lib/shape/shapeHelper";
export const candleStyle = {
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
    tooltip: {
      labels: [
        "开盘价：",
        "收盘价：",
        "最高价：",
        "最低价：",
        "成交量：",
        "涨跌幅：",
      ],
      values: (kLineData: any) => {
        const change =
          ((kLineData.close - kLineData.open) / kLineData.open) * 100;
        return [
          { value: kLineData.open.toFixed(2) },
          { value: kLineData.close.toFixed(2) },
          { value: kLineData.high.toFixed(2) },
          { value: kLineData.low.toFixed(2) },
          { value: `${(kLineData.volume / 1000000).toFixed(2)}M` },
          {
            value: `${change.toFixed(2)}%`,
            color: change < 0 ? "#26A69A" : "#EF5350",
          },
        ];
      },
    },
  },
};
export const circle = {
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
export const rect = {
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
// 买卖点
export function annotationDealDrawExtend(
  ctx: CanvasRenderingContext2D,
  coordinate: { x: number; y: number },
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
// 事件点
export const annotationEventPointStyle = {
  offset: [-10, 0],
  position: "bottom",
  symbol: {
    type: "diamond",
    size: 8,
    color: "#1e88e5",
    activeSize: 10,
    activeColor: "#FF9600",
  },
};
