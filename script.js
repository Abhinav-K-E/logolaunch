document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    document.getElementById('background').appendChild(canvas);
  
    let width, height;
    const particles = [];
    const particleCount = 100;
    const maxDistance = 100;
  
    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
  
    function createParticles() {
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5
        });
      }
    }
  
    function updateParticles() {
      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;
  
        if (particle.x > width || particle.x < 0) particle.vx *= -1;
        if (particle.y > height || particle.y < 0) particle.vy *= -1;
      }
    }
  
    function drawParticles() {
      context.clearRect(0, 0, width, height);
      context.fillStyle = '#E8333A';
  
      for (const particle of particles) {
        context.beginPath();
        context.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        context.fill();
      }
  
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const distance = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
  
          if (distance < maxDistance) {
            context.strokeStyle = `rgba(232, 51, 58, ${1 - distance / maxDistance})`;
            context.lineWidth = 0.5;
            context.beginPath();
            context.moveTo(particles[i].x, particles[i].y);
            context.lineTo(particles[j].x, particles[j].y);
            context.stroke();
          }
        }
      }
    }
  
    function animate() {
      updateParticles();
      drawParticles();
      requestAnimationFrame(animate);
    }
  
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    createParticles();
    animate();
  });
  