const canvas = document.querySelector("canvas");
const CANVAS_SIZE = 400;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
const template = (x1, y1) => `ctx.translate(${x1},${y1});<br/>drawPoint(0,0);`;
const translatedElm = document.getElementById("translate");
const tx = document.getElementById("tx");
const ty = document.getElementById("ty");
const btn = document.getElementById("btn");

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
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.font = "18px Arial";
  ctx.fillText(`(${x},${y})`, 10, -10);
  ctx.fillStyle = "#0f84eb";
  ctx.arc(0, 0, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};
let x = 0;
let y = cellSize;

btn.onclick = () => {
  setInterval(() => {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    drawGrid(cellSize);
    drawTranslatedPoint(x, y);
    translatedElm.innerHTML = template(x, y);
    tx.innerHTML = x;
    ty.innerHTML = y;
    x += cellSize;
    if (x >= CANVAS_SIZE) {
      y += cellSize;
      x = 0;
    }
  }, 1000);
};
