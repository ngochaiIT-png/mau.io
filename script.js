const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = "HAPPY BIRTHDAY";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array.from({ length: columns }).fill(1);

let showCake = false;
let cakePieces = [];
let candles = [];

// --- Vẽ mưa chữ ---
function drawRain() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0F0";
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }

  if (showCake) drawCake();
}

// --- Tạo mảnh bánh ---
function createCake() {
  const cakeWidth = 200;
  const cakeHeight = 100;
  const pieceSize = 10;

  const startX = (canvas.width - cakeWidth) / 2;
  const startY = (canvas.height - cakeHeight) / 2;

  for (let y = 0; y < cakeHeight; y += pieceSize) {
    for (let x = 0; x < cakeWidth; x += pieceSize) {
      const layer = y < cakeHeight / 2 ? '#f7c59f' : '#d2691e'; // kem và socola
      cakePieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        targetX: startX + x,
        targetY: startY + y,
        size: pieceSize,
        color: layer
      });
    }
  }

  // Tạo 3 cây nến
  for (let i = 0; i < 3; i++) {
    candles.push({
      x: startX + 40 + i * 60,
      y: startY - 20,
      flicker: 0
    });
  }
}

// --- Vẽ bánh và nến ---
function drawCake() {
  // Vẽ bánh
  for (let piece of cakePieces) {
    piece.x += (piece.targetX - piece.x) * 0.08;
    piece.y += (piece.targetY - piece.y) * 0.08;

    ctx.fillStyle = piece.color;
    ctx.fillRect(piece.x, piece.y, piece.size, piece.size);
  }

  // Vẽ nến
  for (let candle of candles) {
    // Thân nến
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(candle.x, candle.y, 6, 20);

    // Lửa
    const flameSize = 6 + Math.random() * 2;
    const flickerX = candle.x + 3 + (Math.random() - 0.5) * 2;
    const flickerY = candle.y - flameSize / 2;

    const gradient = ctx.createRadialGradient(flickerX, flickerY, 0, flickerX, flickerY, flameSize);
    gradient.addColorStop(0, "yellow");
    gradient.addColorStop(1, "orange");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(flickerX, flickerY, flameSize, 0, Math.PI * 2);
    ctx.fill();
  }
}

// --- Chạy hiệu ứng ---
setInterval(drawRain, 33);

// Sau 5s hiện bánh
setTimeout(() => {
  showCake = true;
  createCake();
}, 5000);
