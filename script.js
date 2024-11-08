const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");
const audio = document.getElementById("birthdaySong");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function startCelebration() {
  showFireworks();
  audio.play(); // Memulai pemutaran lagu ulang tahun
  setInterval(showFireworks, 1000);
}

class Particle {
  constructor(x, y, color, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = Math.random() * 3 + 1;
    this.alpha = 1;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 0.01;
    this.radius *= 0.96;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class Firework {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.particles = [];
    this.createParticles();
  }

  createParticles() {
    const colors = ["#ff5757", "#ffae42", "#42aaff", "#42ff72", "#ff42d9"];
    for (let i = 0; i < 80; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      const speedX = Math.cos(angle) * speed;
      const speedY = Math.sin(angle) * speed;
      const color = colors[Math.floor(Math.random() * colors.length)];
      this.particles.push(new Particle(this.x, this.y, color, speedX, speedY));
    }
  }

  update() {
    this.particles = this.particles.filter((particle) => particle.alpha > 0.1);
    this.particles.forEach((particle) => particle.update());
  }

  draw() {
    this.particles.forEach((particle) => particle.draw());
  }
}

let fireworks = [];

function showFireworks() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height * 0.5;
  fireworks.push(new Firework(x, y));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fireworks = fireworks.filter((firework) => firework.particles.length > 0);
  fireworks.forEach((firework) => {
    firework.update();
    firework.draw();
  });
  requestAnimationFrame(animate);
}

animate();
