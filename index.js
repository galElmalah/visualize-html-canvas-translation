const canvas = document.querySelector("canvas");
const CANVAS_SIZE = 400;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
let translationsCount = 0;

const translationCountTemp = (x, y) => {
  let str = "";
  for (let i = 0; i < translationsCount; i++) {
    str += `ctx.translate(${x},0);<br/>`;
  }
  return str;
};

const template = (x1 = "tx", y1 = "ty") =>
  `ctx.save();<br/>ctx.translate(${x1},${y1});<br/>${translationCountTemp(
    x1
  )}drawPoint(0,0);<br/>ctx.restore();<br/>//total X translation ${
    x1 + x1 * translationsCount
  }`;
const translatedElm = document.getElementById("translate-c");
const tx = document.getElementById("tx");
const ty = document.getElementById("ty");
const btn = document.getElementById("btn");
const addTranslationBtn = document.getElementById("add-translate");
const removeTranslationBtn = document.getElementById("remove-translate");
const resetBtn = document.getElementById("reset");
const stepBtn = document.getElementById("step");

const drawGrid = (cellSize) => {
  ctx.beginPath();
  ctx.strokeStyle = "#337ebf";
  // rows
  for (let i = cellSize; i < CANVAS_SIZE; i += cellSize) {
    ctx.moveTo(0, i);
    ctx.lineTo(CANVAS_SIZE, i);
  }
  ctx.stroke();

  ctx.beginPath();
  // columns
  for (let i = cellSize; i < CANVAS_SIZE; i += cellSize) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, CANVAS_SIZE);
  }
  ctx.stroke();
};
const cellSize = CANVAS_SIZE / 10;
drawGrid(cellSize);

const drawTranslatedPoint = (x, y) => {
  ctx.save();

  ctx.beginPath();
  ctx.translate(x, y);
  for (let i = 0; i < translationsCount; i++) {
    ctx.translate(x, 0);
  }
  ctx.font = "18px Arial";
  ctx.fillText(`(${x + translationsCount * x},${y})`, 10, -10);
  ctx.fillStyle = "#0f84eb";
  ctx.arc(0, 0, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};
let x = 0;
let y = cellSize;
let intervalId;

const gridStep = () => {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  drawGrid(cellSize);
  drawTranslatedPoint(x, y);
  translatedElm.innerHTML = template(x, y);
  tx.innerHTML = x + translationsCount * x;
  ty.innerHTML = y;
  x += cellSize;
  if (x + x * translationsCount >= CANVAS_SIZE) {
    y += cellSize;
    x = 0;
  }
};
btn.onclick = () => {
  if (intervalId) {
    clearInterval(intervalId);
    x = 0;
    y = cellSize;
    translationsCount = 0;
  }
  intervalId = setInterval(gridStep, 1250);
};

stepBtn.onclick = gridStep;

addTranslationBtn.onclick = () => {
  translationsCount++;
  translatedElm.innerHTML = template(x || undefined, y || undefined);
};

removeTranslationBtn.onclick = () => {
  translationsCount--;
  translatedElm.innerHTML = template(x || undefined, y || undefined);
};

resetBtn.onclick = () => {
  x = 0;
  y = cellSize;
  translationsCount = 0;
  intervalId && clearInterval(intervalId);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  drawGrid(cellSize);
  translatedElm.innerHTML = template();
};
