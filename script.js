// --- GİRİŞ KONTROLÜ ---
const isimler = {
    "enes": "enes.html",
    "gamze": "gamze.html",
    "esra": "esra.html",
    "sevgül": "sevgul.html",
    "abdullah": "abdullah.html",
    "eren": "eren.html",
    "elif": "elif.html",
    "eda": "eda.html",
    "sevgi": "sevgi.html",
    "süleyman": "suleyman.html",
    "ayşe": "ayse.html"
}
function kontrolEt() {
  const input = document.getElementById("nameInput").value.toLowerCase();
  const hata = document.getElementById("hata");

  if (isimler[input]) {
    window.location.href = isimler[input];
  } else {
    hata.textContent = "Yanlış isim girdiniz!";
  }
}

// --- CANVAS ARKA PLAN ---
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Particles (üçgenler)
const particles = [];
const particleCount = 50;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = 3 + Math.random() * 3;
    this.speedX = (Math.random() - 0.5) * 1.5;
    this.speedY = (Math.random() - 0.5) * 1.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.size);
    ctx.lineTo(this.x - this.size, this.y + this.size);
    ctx.lineTo(this.x + this.size, this.y + this.size);
    ctx.closePath();
    ctx.fill();
  }
}

// Particles oluştur
for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

// Mouse koordinatları
const mouse = { x: null, y: null };
window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

// Animate
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  // Particles arası çizgi
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        ctx.strokeStyle = 'rgba(255,255,255,' + (1 - distance / 100) + ')';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  // Mouse ile yakınsa bağla
  particles.forEach(p => {
    if (mouse.x && mouse.y) {
      let dx = p.x - mouse.x;
      let dy = p.y - mouse.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 120) {
        ctx.strokeStyle = 'rgba(255,0,255,' + (1 - distance / 120) + ')';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(animate);
}

animate();
document.getElementById("nameInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
  }
});
