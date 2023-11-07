// canvas working
const canvas = document.getElementById("canvas");
let canvasStyle = getComputedStyle(canvas);
canvas.width = parseInt(canvasStyle.width);
canvas.height = parseInt(canvasStyle.height);

const ctx = canvas.getContext("2d");

function drawFigure(x, y, canvasWidth, canvasHeight) {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  const axisLength = canvasWidth / 1.5; // Длина каждой оси

  // Рисование осей X и Y
  ctx.beginPath();
  ctx.moveTo(x, 0);
  ctx.lineTo(x, canvas.height);
  ctx.moveTo(0, y);
  ctx.lineTo(canvas.width, y);
  ctx.strokeStyle = "black";
  ctx.stroke();

  // Рисование ">"
  const arrowSize = 8;

  // Стрелка по оси X
  ctx.beginPath();
  ctx.moveTo(canvas.width, y);
  ctx.lineTo(canvas.width - arrowSize, y - arrowSize);
  ctx.lineTo(canvas.width - arrowSize, y + arrowSize);
  ctx.lineTo(canvas.width, y);

  // Стрелка по оси Y
  ctx.moveTo(x, 0);
  ctx.lineTo(x - arrowSize, arrowSize);
  ctx.lineTo(x + arrowSize, arrowSize);
  ctx.lineTo(x, 0);

  ctx.fillStyle = "black";
  ctx.fill();

  // Нарисовать "x" и "y" на осях
  ctx.font = "14px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("X", canvas.width - 15, y - 10);
  ctx.fillText("Y", x + 10, 15);

  // Нарисовать метки на осях
  ctx.font = "12px Arial";
  ctx.fillStyle = "black";

  const labels = ["-R", "-R/2", "R/2", "R"];
  const labelPositions = [
    -axisLength / 2,
    -axisLength / 4,
    axisLength / 4,
    axisLength / 2,
  ];

  labels.forEach((label, index) => {
    const labelX = x + labelPositions[index];
    const labelY = y - labelPositions[index];

    ctx.fillText(label, labelX - 10, y + 20);
    ctx.fillText(label, x + 10, labelY + 3);

    // Рисование вертикальной линии (|)
    ctx.beginPath();
    ctx.moveTo(labelX, y - 5);
    ctx.lineTo(labelX, y + 5);
    ctx.strokeStyle = "black";
    ctx.stroke();

    // Рисование горизонтальной линии (-)
    ctx.beginPath();
    ctx.moveTo(x - 5, labelY);
    ctx.lineTo(x + 5, labelY);
    ctx.strokeStyle = "black";
    ctx.stroke();
  });

  // Рисование четверти круга во второй четверти
  ctx.globalCompositeOperation = "destination-over";
  ctx.beginPath();
  ctx.arc(x, y, axisLength / 4, Math.PI / 2, 0, true);
  ctx.lineTo(x, y);
  ctx.fillStyle = "lightblue";
  ctx.fill();
  ctx.globalCompositeOperation = "source-over";

  // Рисование квадрата
  ctx.globalCompositeOperation = "destination-over";
  const squareSize = axisLength / 2;
  ctx.fillStyle = "lightgreen";
  ctx.fillRect(x, y, squareSize, -squareSize);
  ctx.globalCompositeOperation = "source-over";

  // Рисование прямоугольного треугольника
  ctx.globalCompositeOperation = "destination-over";
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + axisLength / 2);
  ctx.lineTo(x - axisLength / 2, y);
  ctx.lineTo(x, y);
  ctx.fillStyle = "orange";
  ctx.fill();
  ctx.globalCompositeOperation = "source-over";
}

// Пример вызова функции с указанием ширины и высоты графика
drawFigure(canvas.width / 2, canvas.height / 2, canvas.width, canvas.height);

// canvas click

function handleCanvasClick(event) {
  if (!ifRSetCorrect()) {
    showCustomAlert("Невозможно определить координаты точки. Введите R");
    return;
  }

  let rect = canvas.getBoundingClientRect(); // Получить координаты холста
  let mouseX = event.clientX - rect.left; // Координаты мыши X
  let mouseY = event.clientY - rect.top; // Координаты мыши Y

  const originalX = mouseX;
  const originalY = mouseY;

  // преобразование в координаты относительно графика
  mouseX = mouseX - 200;
  mouseY = -(mouseY - 200);

  let R = getR();

  const k = 133.3 / R + 0.5;

  mouseX = mouseX / k;
  mouseY = mouseY / k;

  // fixing -
  if (mouseX < 0) {
    mouseX = mouseX - 0.06;
  }
  if (mouseY > 0) {
    mouseY = mouseY + 0.07;
  }

  mouseX = mouseX.toFixed(4);
  mouseY = mouseY.toFixed(4);

  //   getLogs(mouseX, mouseY);

  if (
    isRound(mouseX, mouseY) ||
    isSquare(mouseX, mouseY) ||
    isTriangle(mouseX, mouseY)
  ) {
    // console.log("Попадание");
    ctx.beginPath();
    ctx.arc(originalX, originalY, 4, 0, 2 * Math.PI);
    ctx.fillStyle = "green";
  } else {
    // console.log("Промах");
    ctx.beginPath();
    ctx.arc(originalX, originalY, 4, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
  }

  ctx.fill();
}

function getLogs(mouseX, mouseY) {
  console.log("\n");
  console.log(mouseX, mouseY);
  console.log(isRound(mouseX, mouseY));
  console.log(isSquare(mouseX, mouseY));
  console.log(isTriangle(mouseX, mouseY));
}

function isRound(x, y) {
  let R = getR();
  if (x >= 0 && x <= R / 2 && y <= 0 && y >= -R / 2) {
    let distance = Math.sqrt(x * x + y * y);
    return distance <= R / 2;
  }
  return false;
}

function isSquare(x, y) {
  let R = getR();
  if (x >= 0 && x <= R && y >= 0 && y <= R) return true;
  return false;
}

function isTriangle(x, y) {
  let R = getR();
  if (x <= 0 && y <= 0 && x >= -R && y >= -R && y >= -x - R) return true;
  return false;
}

canvas.addEventListener("click", handleCanvasClick);

function ifRSetCorrect() {
  let rValue = getR();
  if (!nonCorrectDec(rValue, "r") && checkBased(rValue, 2, 5, "r")) {
    return true;
  }
  return false;
}

function getR() {
  // change to usage R from xhtml
  let rInput = document.getElementById("r-input");
  let rValue = rInput.value.replace(",", ".");
  return rValue;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFigure(canvas.width / 2, canvas.height / 2, canvas.width, canvas.height);
}

// input listeners

function setInputListeners() {
  let yInput = document.getElementById("y-input");

  let yValue = yInput.value.replace(",", ".");

  if (nonCorrectDec(yValue, "y")) {
    return;
  }
}
document.addEventListener("input", setInputListeners);

// is correct dec
function nonCorrectDec(value, what) {
  const regex = /^-?\d*\.?\d+$/; // check dec
  if (!regex.test(value)) {
    showCustomAlert(`Введенное значение ${what} не является десятичным числом`);
    updateSubmitButton();
    return true;
  }
  return false;
}

// alert
function showCustomAlert(message) {
  const customAlert = document.querySelector(".custom-alert");
  customAlert.textContent = message;
  customAlert.style.opacity = "1";

  setTimeout(() => {
    customAlert.style.opacity = "0";
  }, 5000);
}

function hideCustomAlert() {
  const customAlert = document.querySelector(".custom-alert");
  customAlert.style.opacity = "0";
}

// validation
function isFormValid() {
  const yInput = document.getElementById("y-input");

  let yValue = yInput.value.replace(",", ".");

  if (!checkBased(yValue, -5, 3, "y")) {
    return false;
  }
  if (checkValue(yValue)) {
    return true;
  } else {
    return false;
  }
}

function checkValue(y, r) {
  if (y > -5 && y < 5 && r < 5 && r > 2) {
    return true;
  }
  return false;
}

function checkBased(value, left, right, name) {
  if (isNaN(value) || value <= left || value >= right) {
    showCustomAlert(
      `Введите корректное значение ${name} в диапазоне от ${left} до ${right} (не включительно).`
    );
    return false;
  }
  return true;
}

// submit button opacity
function updateSubmitButton() {
  const submitButton = document.getElementById("submit-button");
  const isFormValidFlag = isFormValid();
  submitButton.disabled = !isFormValidFlag;

  if (isFormValidFlag) {
    submitButton.style.opacity = 1;
  } else {
    submitButton.style.opacity = 0.5;
  }
}

// init state
document.addEventListener("DOMContentLoaded", function () {
  loadStateFromLocalStorage();
  setInputListeners();
});

// load from localstorage
function loadStateFromLocalStorage() {
  const yInput = document.getElementById("y-input");

  const savedY = localStorage.getItem("selectedY");

  if (savedY) {
    yInput.value = savedY;
  }

  yInput.addEventListener("input", updateSubmitButton);
}

// clear local storage
function clearLocalStorage() {
  localStorage.removeItem("selectedY");
}

// clear inputs
function clearSelectedButtons() {
  let yInput = document.getElementById("y-input");

  yInput.value = "";
  updateSubmitButton();
}
