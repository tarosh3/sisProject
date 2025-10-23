// ----------------------------------------------------
// Letter Page - Cute & Emotional Animation (Fixed Version)
// ----------------------------------------------------
class LetterAnimation {
  constructor() {
    this.isAnimating = false;
    this.animationComplete = false;
    this.typingSpeed = 80; // milliseconds per character

    // Heartfelt message for your sisters ❤️
    this.message = `Dear Jhilmil 💕 and Mehal 💕,

You both are the most precious gifts life has ever given me.

No matter how far we are or how much time passes,
you'll always be my little stars ✨ lighting up my world.

Love you both more than all the chocolates in the universe 🍫💖`;

    this.signature = `— Tarosh 💫`;

    this.init();
  }

  // ----------------------------------------------------
  // Initialization
  // ----------------------------------------------------
  init() {
    this.setupEventListeners();
    this.setupPageLoad();
  }

  setupPageLoad() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';

    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 200);
  }

  setupEventListeners() {
    const envelope = document.getElementById('envelope');
    envelope.addEventListener('click', () => {
      if (!this.isAnimating && !this.animationComplete) {
        this.openEnvelope();
      }
    });
  }

  // ----------------------------------------------------
  // Envelope Open Sequence
  // ----------------------------------------------------
  openEnvelope() {
    this.isAnimating = true;

    // Hide click instruction
    const instruction = document.getElementById('clickInstruction');
    instruction.classList.add('hide');

    // Hide envelope seal
    const seal = document.querySelector('.envelope-seal');
    setTimeout(() => {
      seal.classList.add('hide');
    }, 250);

    // Open envelope flap
    const envelopeFlap = document.getElementById('envelopeFlap');
    setTimeout(() => {
      envelopeFlap.classList.add('open');
    }, 350);

    // Slide up the letter
    const letterInside = document.getElementById('letterInside');
    setTimeout(() => {
      letterInside.classList.add('slide-up');

      // Once animation finishes, ensure scroll position is top and letter visible
      setTimeout(() => {
        const letterPaper = document.querySelector('.letter-paper');
        if (letterPaper) letterPaper.scrollTop = 0;

        // Adjust viewport for small screens
        const rect = letterInside.getBoundingClientRect();
        const offset = rect.top - (window.innerHeight * 0.18);
        if (offset < 0) {
          window.scrollBy({ top: offset, behavior: 'smooth' });
        }
      }, 950);
    }, 1000);

    // Start typing after letter appears
    setTimeout(() => {
      this.startTypingAnimation();
    }, 1650);

    // Confetti celebration
    setTimeout(() => {
      this.createConfetti();
    }, 1300);
  }

  // ----------------------------------------------------
  // Typing Animation
  // ----------------------------------------------------
  startTypingAnimation() {
    const messageContainer = document.getElementById('letterMessage');
    const signatureContainer = document.getElementById('letterSignature');

    // Clear containers
    messageContainer.innerHTML = '';
    signatureContainer.innerHTML = '';

    let charIndex = 0;
    let currentText = '';

    // Ensure letter starts from top
    const letterPaper = document.querySelector('.letter-paper');
    if (letterPaper) letterPaper.scrollTop = 0;

    const typeMessage = () => {
      if (charIndex < this.message.length) {
        const char = this.message[charIndex];
        currentText += char;
        messageContainer.innerHTML = currentText + '<span class="typing-cursor"></span>';

        this.scrollToKeepCursorVisible();
        this.playTypingSound();

        charIndex++;
        const delay = this.getTypingDelay(char);
        setTimeout(typeMessage, delay);
      } else {
        messageContainer.innerHTML = currentText;
        setTimeout(() => {
          this.typeSignature(signatureContainer);
        }, 800);
      }
    };

    setTimeout(typeMessage, 500);
  }

  typeSignature(container) {
    let charIndex = 0;
    let currentText = '';

    const typeSignature = () => {
      if (charIndex < this.signature.length) {
        const char = this.signature[charIndex];
        currentText += char;
        container.innerHTML = currentText + '<span class="typing-cursor"></span>';

        this.scrollToKeepCursorVisible();
        this.playTypingSound();

        charIndex++;
        setTimeout(typeSignature, this.getTypingDelay(char));
      } else {
        container.innerHTML = currentText;
        setTimeout(() => {
          this.finishAnimation();
        }, 1000);
      }
    };

    typeSignature();
  }

  getTypingDelay(char) {
    if (char === '.' || char === '!' || char === '?') return this.typingSpeed * 4;
    if (char === ',' || char === ';') return this.typingSpeed * 2;
    if (char === ' ') return this.typingSpeed * 0.7;
    if (char === '\n') return this.typingSpeed * 6;
    return this.typingSpeed + (Math.random() * 30 - 15);
  }

  // ----------------------------------------------------
  // Finish Animation & Effects
  // ----------------------------------------------------
  finishAnimation() {
    this.createHeartSparkles();

    setTimeout(() => {
      const navButtons = document.getElementById('navigationButtons');
      navButtons.classList.add('show');
      this.animationComplete = true;
      this.isAnimating = false;
    }, 1500);
  }

  createConfetti() {
    const container = document.getElementById('confettiContainer');
    const confettiEmojis = ['💕', '💖', '💗', '💝', '✨', '🌟', '💫', '🎉'];

    for (let i = 0; i < 25; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.textContent = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
        container.appendChild(confetti);

        setTimeout(() => {
          if (confetti.parentNode) confetti.parentNode.removeChild(confetti);
        }, 5000);
      }, i * 150);
    }
  }

  createHeartSparkles() {
    const sparkleEmojis = ['💕', '💖', '💗', '💝', '✨'];
    for (let i = 0; i < 12; i++) {
      setTimeout(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'heart-sparkle';
        sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];

        const angle = (i / 12) * 2 * Math.PI;
        const radius = 150 + Math.random() * 50;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        sparkle.style.left = `calc(50% + ${x}px)`;
        sparkle.style.top = `calc(50% + ${y}px)`;

        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 2000);
      }, i * 200);
    }
  }

  // ----------------------------------------------------
  // Typing Sound & Scroll Management
  // ----------------------------------------------------
  playTypingSound() {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(800 + Math.random() * 200, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.03);

      gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.03);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.03);
    } catch (e) {
      // Ignore if audio blocked
    }
  }

  scrollToKeepCursorVisible() {
    const letterPaper = document.querySelector('.letter-paper');
    const letterContent = document.querySelector('.letter-content');

    if (letterPaper && letterContent) {
      const totalContentHeight = letterContent.scrollHeight;
      const visibleHeight = letterPaper.clientHeight;
      if (totalContentHeight > visibleHeight) {
        letterPaper.scrollTop = totalContentHeight - visibleHeight + 20;
      }
    }
  }

  // ----------------------------------------------------
  // Reset Animation
  // ----------------------------------------------------
  resetAnimation() {
    this.isAnimating = false;
    this.animationComplete = false;

    const envelopeFlap = document.getElementById('envelopeFlap');
    const seal = document.querySelector('.envelope-seal');
    const instruction = document.getElementById('clickInstruction');
    const letterInside = document.getElementById('letterInside');
    const navButtons = document.getElementById('navigationButtons');

    envelopeFlap.classList.remove('open');
    seal.classList.remove('hide');
    instruction.classList.remove('hide');
    letterInside.classList.remove('slide-up');
    navButtons.classList.remove('show');

    document.getElementById('letterMessage').innerHTML = '';
    document.getElementById('letterSignature').innerHTML = '';
    document.getElementById('confettiContainer').innerHTML = '';

    document.querySelectorAll('.heart-sparkle').forEach(sparkle => sparkle.remove());
  }
}

// ----------------------------------------------------
// Navigation Functions
// ----------------------------------------------------
function replayAnimation() {
  if (window.letterAnimation) {
    window.letterAnimation.resetAnimation();
  }
}

function goToRedeem() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    window.location.href = 'redeem.html';
  }, 500);
}

function goHome() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 500);
}

// ----------------------------------------------------
// Page Initialization
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  window.letterAnimation = new LetterAnimation();

  document.addEventListener('click', function (e) {
    createClickSparkle(e.clientX, e.clientY);
  });
});

// ----------------------------------------------------
// Click Sparkle Effect
// ----------------------------------------------------
function createClickSparkle(x, y) {
  const sparkle = document.createElement('div');
  sparkle.innerHTML = '✨';
  sparkle.style.position = 'fixed';
  sparkle.style.left = x + 'px';
  sparkle.style.top = y + 'px';
  sparkle.style.fontSize = '16px';
  sparkle.style.pointerEvents = 'none';
  sparkle.style.zIndex = '1000';
  sparkle.style.animation = 'sparkleClick 0.8s ease-out forwards';
  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 800);
}

// Add sparkle animation style dynamically
const clickSparkleCSS = `
@keyframes sparkleClick {
    0% { opacity: 1; transform: scale(0) rotate(0deg); }
    50% { opacity: 1; transform: scale(1.5) rotate(180deg); }
    100% { opacity: 0; transform: scale(0) rotate(360deg); }
}`;
const clickStyle = document.createElement('style');
clickStyle.textContent = clickSparkleCSS;
document.head.appendChild(clickStyle);
