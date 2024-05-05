// canvas working
const canvas = document.getElementById("canvas");
let canvasStyle = getComputedStyle(canvas);
canvas.width = parseInt(canvasStyle.width);
canvas.height = parseInt(canvasStyle.height);

let ctx = canvas.getContext("2d");

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
    mouseY = mouseY - 0.005;
  }

  mouseX = mouseX.toFixed(4);
  mouseY = mouseY.toFixed(4);

  //   getLogs(mouseX, mouseY);

  if (
    isRound(mouseX, mouseY) ||
    isSquare(mouseX, mouseY) ||
    isTriangle(mouseX, mouseY)
  ) {
    console.log("коорд до ", originalX, originalY, R)
    ctx.beginPath();
    ctx.arc(originalX, originalY, 4, 0, 2 * Math.PI);
    ctx.fillStyle = "green";
  } else {
    console.log("коорд до ", originalX, originalY, R)
    ctx.beginPath();
    ctx.arc(originalX, originalY, 4, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
  }
  SetCoordinates(mouseX, mouseY, R)
  ctx.fill();
}

function actualFromReal(x, y, r, result) {
  x = Number.parseFloat(x)
  y = Number.parseFloat(y)
  r = Number.parseFloat(r)

  if (x < 0) x = x + 0.06

  if (y > 0) y = y - 0.01



  let k = 133.3 / r + 0.5;


  x = x * k

  y = y * k



  x = x + 200

  y = -(y - 200)




  console.log("коорд после ", x, y, r)

  if (result === "true") {
    console.log("попадание");
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fillStyle = "green";
  } else if (result === "false") {
    console.log("промах");
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
  }
  ctx.fill();
}

function SetCoordinates(x, y, r) {
  console.log("start send data")
  let elemX = document.querySelector(".canvasX");
  let elemY = document.querySelector(".canvasY");
  let elemR = document.querySelector(".canvasR");

  elemX.value = x
  elemY.value = y
  elemR.value = r

  console.log("i will return", elemX.value, elemY.value, elemR.value);

  let btn = document.querySelector(".hidden-submit-button");
  btn.click();

  console.log("sent")
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
  if (!nonCorrectDec(rValue, "r")) {
    return true;
  }
  return false;
}

function linkControl() {
  let a = document.querySelectorAll(".command-links a");
  // console.log(a);

  a.forEach((i) => {
    i.addEventListener("click", changeBorder(i))
  });

  function changeBorder(link) {
    linkClear()
    link.style.border = "1px solid #393D76"
  }
}

function linkClear() {
  let a = document.querySelectorAll(".command-links a");
  a.forEach((i) => {
    i.style.border = "";
  });
}

function getR() {
  let rInput = document.getElementById("mainForm:server-r");
  let rValue;
  if (rInput == null) rValue = 3;
  else rValue = rInput.innerText.replace(",", ".");
  return rValue;
}

function parseTable() {
  let rowData = []
  let table = document.getElementById("mainForm:maintable");
  let rows = table.getElementsByTagName("tr"); // push

  Array.from(rows).forEach((row) => {
    let newData = []
    let cells = row.getElementsByTagName("td");
    Array.from(cells).forEach((cell) => {
      let content = cell.textContent.trim();
      newData.push(content);
    });

    console.log(newData)
    actualFromReal(newData[0], newData[1], newData[2], newData[5])
  });

  console.log(rowData);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFigure(canvas.width / 2, canvas.height / 2, canvas.width, canvas.height);
}


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
  console.log("Sumbit btn clicked")
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


// init state
document.addEventListener("DOMContentLoaded", function () {
  linkControl();
  parseTable();
});

