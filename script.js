const textLine1 = document.getElementById('textLine1');
const textLine2 = document.getElementById('textLine2');
const usernameInput = document.getElementById('usernameInput');
const speedSelect = document.getElementById('speedSelect');
const durationInput = document.getElementById('durationInput');

const line1Container = document.getElementById('line1Container');
const line2Container = document.getElementById('line2Container');
const authorTag = document.getElementById('authorTag');
const progressBar = document.getElementById('progressBar');
const particlesContainer = document.getElementById('particles');

const playBtn = document.getElementById('playBtn');
const recordModeBtn = document.getElementById('recordModeBtn');

// গ্লোয়িং কণা তৈরি
function initParticles() {
    particlesContainer.innerHTML = '';
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 4 + 3}s`;
        particle.style.animationDelay = `${Math.random() * 3}s`;
        particlesContainer.appendChild(particle);
    }
}

function startAnimation() {
    const totalDuration = parseFloat(durationInput.value) || 35; 
    const speedMode = speedSelect.value;

    let delayPerWord = 0.22;
    if (speedMode === 'superfast') {
        delayPerWord = 0.12;
    } else if (speedMode === 'medium') {
        delayPerWord = 0.35;
    }

    line1Container.innerHTML = '';
    line2Container.innerHTML = '';
    authorTag.innerHTML = '';
    authorTag.style.animation = 'none';

    const words1 = textLine1.value.trim().split(/\s+/);
    const words2 = textLine2.value.trim().split(/\s+/);

    let currentDelay = 0.2;

    words1.forEach((word) => {
        const span = document.createElement('span');
        span.classList.add('word');
        span.innerText = word;
        span.style.animationDelay = `${currentDelay}s`;
        line1Container.appendChild(span);
        currentDelay += delayPerWord;
    });

    currentDelay += 0.2;

    words2.forEach((word) => {
        const span = document.createElement('span');
        span.classList.add('word');
        span.innerText = word;
        span.style.animationDelay = `${currentDelay}s`;
        line2Container.appendChild(span);
        currentDelay += delayPerWord;
    });

    currentDelay += 0.2;
    setTimeout(() => {
        authorTag.innerHTML = `<span class="author-badge">${usernameInput.value.trim()}</span>`;
        authorTag.style.animation = `fadeInUp 0.4s forwards ease`;
    }, currentDelay * 1000);

    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
    setTimeout(() => {
        progressBar.style.transition = `width ${totalDuration}s linear`;
        progressBar.style.width = '100%';
    }, 100);
}

playBtn.addEventListener('click', startAnimation);

recordModeBtn.addEventListener('click', () => {
    document.body.classList.add('recording-mode');
    startAnimation();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.body.classList.remove('recording-mode');
    }
});

window.onload = () => {
    initParticles();
    startAnimation();
};