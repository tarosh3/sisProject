// Redeem Page JavaScript
class RedeemPage {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 7;
        this.messageIndex = 0;
        this.messages = [
            "You're the best sister ever! 💕",
            "You deserve all the chocolates in the world! 🍫",
            "Your smile is worth a million chocolates! 😊",
            "You make every day sweeter! 🌟",
            "Love you to the moon and back! 🌙"
        ];

        this.init();
    }

    init() {
        this.loadChocolateCount();
        this.setupSlideshow();
        this.startMessageRotation();
        this.createChocolateRain();
        this.setupBackgroundMusic();
    }

    loadChocolateCount() {
        const totalChocolates = parseInt(localStorage.getItem('totalChocolates') || '0');

        // Get the current game score first
        const currentScore = parseInt(localStorage.getItem('currentGameScore') || '0');
        let displayScore = currentScore;

        // If no current score, check for last game score
        if (displayScore === 0) {
            displayScore = parseInt(localStorage.getItem('lastGameScore') || '0');
        }

        // Update chocolate count display
        document.getElementById('chocolateCount').textContent =
            `You've won ${displayScore} chocolates! ${'🍫'.repeat(Math.min(displayScore, 10))}`;

        // Update total chocolates in footer
        document.getElementById('totalChocolates').textContent =
            `Total chocolates earned: ${totalChocolates} 🍫`;

        // Store current score as last score for next time
        if (currentScore > 0) {
            localStorage.setItem('lastGameScore', currentScore.toString());
            localStorage.removeItem('currentGameScore');
        }
    }

    setupSlideshow() {
        // Create slide indicators
        const indicatorsContainer = document.getElementById('slideIndicators');
        for (let i = 0; i < this.totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.className = `indicator ${i === 0 ? 'active' : ''}`;
            indicator.addEventListener('click', () => this.goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }

        // Auto-advance slideshow
        setInterval(() => {
            this.nextSlide();
        }, 4000);
    }

    goToSlide(index) {
        // Hide current slide
        const slides = document.querySelectorAll('.slide');
        const indicators = document.querySelectorAll('.indicator');

        slides[this.currentSlide].classList.remove('active');
        indicators[this.currentSlide].classList.remove('active');

        // Show new slide
        this.currentSlide = index;
        slides[this.currentSlide].classList.add('active');
        indicators[this.currentSlide].classList.add('active');
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prevIndex);
    }

    startMessageRotation() {
        const messagesContainer = document.getElementById('animatedMessages');
        const messageElements = messagesContainer.querySelectorAll('.message');

        setInterval(() => {
            // Hide current message
            messageElements[this.messageIndex].classList.remove('active');

            // Show next message
            this.messageIndex = (this.messageIndex + 1) % this.messages.length;
            messageElements[this.messageIndex].classList.add('active');
        }, 3000);
    }

    createChocolateRain() {
        const chocolateRain = document.getElementById('chocolateRain');
        const chocolateEmojis = ['🍫', '🍬', '🧁', '🍭', '🍩'];

        setInterval(() => {
            const chocolate = document.createElement('div');
            chocolate.className = 'rain-chocolate';
            chocolate.textContent = chocolateEmojis[Math.floor(Math.random() * chocolateEmojis.length)];
            chocolate.style.left = Math.random() * 100 + '%';
            chocolate.style.animationDuration = (Math.random() * 2 + 2) + 's';

            chocolateRain.appendChild(chocolate);

            // Remove chocolate after animation
            setTimeout(() => {
                if (chocolate.parentNode) {
                    chocolate.parentNode.removeChild(chocolate);
                }
            }, 4000);
        }, 500);
    }

    setupBackgroundMusic() {
        // Optional: Add soft background music
        const music = document.getElementById('backgroundMusic');
        if (music) {
            music.volume = 0.3;
            // Auto-play is often blocked, so we'll start on user interaction
            document.addEventListener('click', () => {
                if (music.paused) {
                    music.play().catch(e => console.log('Audio play failed:', e));
                }
            }, { once: true });
        }
    }
}

// Navigation functions
function goToGame() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        window.location.href = 'flappy.html';
    }, 500);
}

function goHome() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 500);
}

function goToLetter() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        window.location.href = 'letter.html';
    }, 500);
}

// Slideshow controls
function changeSlide(direction) {
    if (window.redeemPage) {
        if (direction === 1) {
            window.redeemPage.nextSlide();
        } else {
            window.redeemPage.prevSlide();
        }
    }
}

// Add sparkle effect on click
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.fontSize = '20px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1000';
    sparkle.style.animation = 'sparkleEffect 1s ease-out forwards';

    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Add sparkle effect CSS
const sparkleCSS = `
@keyframes sparkleEffect {
    0% {
        opacity: 1;
        transform: scale(0) rotate(0deg);
    }
    50% {
        opacity: 1;
        transform: scale(1.2) rotate(180deg);
    }
    100% {
        opacity: 0;
        transform: scale(0) rotate(360deg);
    }
}
`;

const style = document.createElement('style');
style.textContent = sparkleCSS;
document.head.appendChild(style);

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Smooth page load animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Initialize redeem page
    window.redeemPage = new RedeemPage();

    // Add sparkle on click
    document.addEventListener('click', function (e) {
        createSparkle(e.clientX, e.clientY);
    });

    // Add celebration confetti effect
    setTimeout(() => {
        createConfetti();
    }, 1000);
});

// Confetti effect
function createConfetti() {
    const colors = ['#ff6b9d', '#c44569', '#8e44ad', '#6f42c1', '#ffd93d'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '999';
            confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;

            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 100);
    }
}

// Add confetti animation CSS
const confettiCSS = `
@keyframes confettiFall {
    0% {
        transform: translateY(-10px) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: translateY(100vh) rotate(720deg);
        opacity: 0;
    }
}
`;

const confettiStyle = document.createElement('style');
confettiStyle.textContent = confettiCSS;
document.head.appendChild(confettiStyle);