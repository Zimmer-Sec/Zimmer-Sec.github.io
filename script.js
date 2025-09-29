// Animated Star Background
const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');

// Set higher resolution for canvas
const dpr = window.devicePixelRatio || 1;
canvas.width = window.innerWidth * dpr;
canvas.height = document.documentElement.scrollHeight * dpr;
canvas.style.width = window.innerWidth + 'px';
canvas.style.height = document.documentElement.scrollHeight + 'px';
ctx.scale(dpr, dpr);

const stars = [];
const numStars = 350;

class Star {
    constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * document.documentElement.scrollHeight;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.opacity = Math.random() * 0.6 + 0.4;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > window.innerWidth) this.speedX *= -1;
        if (this.y < 0 || this.y > document.documentElement.scrollHeight) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.shadowBlur = 2;
        ctx.shadowColor = `rgba(255, 255, 255, ${this.opacity * 0.5})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

// Initialize stars
for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
}

function connectStars() {
    for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
            const dx = stars[i].x - stars[j].x;
            const dy = stars[i].y - stars[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                const opacity = (1 - distance / 150) * 0.4;
                ctx.strokeStyle = `rgba(74, 158, 255, ${opacity})`;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(stars[i].x, stars[i].y);
                ctx.lineTo(stars[j].x, stars[j].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, window.innerWidth, document.documentElement.scrollHeight);

    connectStars();

    stars.forEach(star => {
        star.update();
        star.draw();
    });

    requestAnimationFrame(animate);
}

animate();

// Update canvas size on window resize
window.addEventListener('resize', () => {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = document.documentElement.scrollHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = document.documentElement.scrollHeight + 'px';
    ctx.scale(dpr, dpr);
});

// Update canvas height on scroll (for dynamic content)
window.addEventListener('scroll', () => {
    if (document.documentElement.scrollHeight > parseInt(canvas.style.height)) {
        const dpr = window.devicePixelRatio || 1;
        canvas.height = document.documentElement.scrollHeight * dpr;
        canvas.style.height = document.documentElement.scrollHeight + 'px';
        ctx.scale(dpr, dpr);
    }
});

// Typing Animation
const typingText = document.getElementById('typing-text');
const textArray = ['Kyle Zimmer', 'Zimmer-Sec', 'Portfolio'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

function typeText() {
    const currentText = textArray[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 100;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        // Pause at end of word
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeText, typingSpeed);
}

// Start typing animation
typeText();

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Add scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Show first section immediately
document.querySelector('#home').style.opacity = '1';
document.querySelector('#home').style.transform = 'translateY(0)';
