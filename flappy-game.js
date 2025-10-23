// Flappy Bird Game Logic
class FlappyGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.gameRunning = false;
        this.score = 0;
        this.highScore = localStorage.getItem('highScore') || 0;

        // Game objects
        this.bird = {
            x: 80,
            y: 250,
            width: 40,
            height: 40,
            velocity: 0,
            gravity: 0.6,
            jump: -10
        };

        this.pipes = [];
        this.chocolates = [];
        this.pipeWidth = 60;
        this.pipeGap = 180;
        this.pipeSpeed = 2;

        this.frameCount = 0;

        this.setupCanvas();
        this.setupEventListeners();
        this.updateHighScore();
        this.gameLoop();
    }

    setupCanvas() {
        // Set actual canvas size
        this.canvas.width = 400;
        this.canvas.height = 600;
    }

    setupEventListeners() {
        // Start button
        document.getElementById('startButton').addEventListener('click', () => {
            this.startGame();
        });

        // Restart button
        document.getElementById('restartButton').addEventListener('click', () => {
            this.startGame();
        });

        // Redeem button
        document.getElementById('redeemButton').addEventListener('click', () => {
            this.saveScore();
            goToRedeem();
        });

        // Controls
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && this.gameRunning) {
                e.preventDefault();
                this.jump();
            }
        });

        this.canvas.addEventListener('click', () => {
            if (this.gameRunning) {
                this.jump();
            }
        });

        // Touch support
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (this.gameRunning) {
                this.jump();
            }
        });
    }

    startGame() {
        this.gameRunning = true;
        this.score = 0;
        this.frameCount = 0;

        // Reset bird
        this.bird.y = 250;
        this.bird.velocity = 0;

        // Clear obstacles
        this.pipes = [];
        this.chocolates = [];

        // Hide overlays
        document.getElementById('gameOverlay').style.display = 'none';

        this.updateScore();
    }

    jump() {
        this.bird.velocity = this.bird.jump;
    }

    updateScore() {
        document.getElementById('score').textContent = `Score: ${this.score} 🍫`;
    }

    updateHighScore() {
        document.getElementById('high-score').textContent = `Best: ${this.highScore} 🏆`;
    }

    saveScore() {
        const totalChocolates = parseInt(localStorage.getItem('totalChocolates') || '0');
        localStorage.setItem('totalChocolates', (totalChocolates + this.score).toString());
        localStorage.setItem('currentGameScore', this.score.toString());

        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('highScore', this.highScore.toString());
            this.updateHighScore();
        }
    }

    gameOver() {
        this.gameRunning = false;
        this.saveScore();

        // Show game over screen
        document.getElementById('finalScore').textContent = `You collected ${this.score} chocolates!`;
        document.getElementById('startScreen').style.display = 'none';
        document.getElementById('gameOverScreen').style.display = 'block';
        document.getElementById('gameOverlay').style.display = 'flex';
    }

    spawnPipe() {
        const minHeight = 50;
        const maxHeight = this.canvas.height - this.pipeGap - minHeight;
        const topHeight = Math.random() * (maxHeight - minHeight) + minHeight;

        this.pipes.push({
            x: this.canvas.width,
            topHeight: topHeight,
            bottomY: topHeight + this.pipeGap,
            bottomHeight: this.canvas.height - (topHeight + this.pipeGap),
            passed: false
        });

        // Spawn chocolate between pipes
        this.chocolates.push({
            x: this.canvas.width + 30,
            y: topHeight + this.pipeGap / 2 - 15,
            width: 30,
            height: 30,
            collected: false
        });
    }

    updateGame() {
        if (!this.gameRunning) return;

        this.frameCount++;

        // Update bird physics
        this.bird.velocity += this.bird.gravity;
        this.bird.y += this.bird.velocity;

        // Spawn pipes
        if (this.frameCount % 120 === 0) {
            this.spawnPipe();
        }

        // Update pipes
        for (let i = this.pipes.length - 1; i >= 0; i--) {
            const pipe = this.pipes[i];
            pipe.x -= this.pipeSpeed;

            // Check if bird passed pipe
            if (!pipe.passed && pipe.x + this.pipeWidth < this.bird.x) {
                pipe.passed = true;
                this.score++;
                this.updateScore();
            }

            // Remove off-screen pipes
            if (pipe.x + this.pipeWidth < 0) {
                this.pipes.splice(i, 1);
            }

            // Collision detection
            if (this.checkPipeCollision(pipe)) {
                this.gameOver();
                return;
            }
        }

        // Update chocolates
        for (let i = this.chocolates.length - 1; i >= 0; i--) {
            const chocolate = this.chocolates[i];
            chocolate.x -= this.pipeSpeed;

            // Check chocolate collection
            if (!chocolate.collected && this.checkChocolateCollision(chocolate)) {
                chocolate.collected = true;
                this.score++;
                this.updateScore();
            }

            // Remove off-screen chocolates
            if (chocolate.x + chocolate.width < 0) {
                this.chocolates.splice(i, 1);
            }
        }

        // Check boundaries
        if (this.bird.y + this.bird.height > this.canvas.height || this.bird.y < 0) {
            this.gameOver();
        }
    }

    checkPipeCollision(pipe) {
        const birdLeft = this.bird.x;
        const birdRight = this.bird.x + this.bird.width;
        const birdTop = this.bird.y;
        const birdBottom = this.bird.y + this.bird.height;

        const pipeLeft = pipe.x;
        const pipeRight = pipe.x + this.pipeWidth;

        // Check if bird is within pipe x range
        if (birdRight > pipeLeft && birdLeft < pipeRight) {
            // Check collision with top or bottom pipe
            if (birdTop < pipe.topHeight || birdBottom > pipe.bottomY) {
                return true;
            }
        }

        return false;
    }

    checkChocolateCollision(chocolate) {
        const birdCenterX = this.bird.x + this.bird.width / 2;
        const birdCenterY = this.bird.y + this.bird.height / 2;
        const chocolateCenterX = chocolate.x + chocolate.width / 2;
        const chocolateCenterY = chocolate.y + chocolate.height / 2;

        const distance = Math.sqrt(
            Math.pow(birdCenterX - chocolateCenterX, 2) +
            Math.pow(birdCenterY - chocolateCenterY, 2)
        );

        return distance < 25;
    }

    render() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw background gradient - soft pastel colors
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#ffeef8');
        gradient.addColorStop(0.5, '#f0e6ff');
        gradient.addColorStop(1, '#e6f3ff');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw pipes
        this.ctx.fillStyle = '#8B4513';
        for (const pipe of this.pipes) {
            // Top pipe
            this.ctx.fillRect(pipe.x, 0, this.pipeWidth, pipe.topHeight);
            // Bottom pipe
            this.ctx.fillRect(pipe.x, pipe.bottomY, this.pipeWidth, pipe.bottomHeight);

            // Pipe caps
            this.ctx.fillStyle = '#A0522D';
            this.ctx.fillRect(pipe.x - 5, pipe.topHeight - 20, this.pipeWidth + 10, 20);
            this.ctx.fillRect(pipe.x - 5, pipe.bottomY, this.pipeWidth + 10, 20);
            this.ctx.fillStyle = '#8B4513';
        }

        // Draw chocolates
        for (const chocolate of this.chocolates) {
            if (!chocolate.collected) {
                this.ctx.font = '30px Arial';
                this.ctx.fillText('🍫', chocolate.x, chocolate.y + 25);
            }
        }

        // Draw bird (heart)
        this.ctx.font = '40px Arial';
        this.ctx.fillText('💖', this.bird.x, this.bird.y + 35);

        // Add floating effect to bird
        if (this.gameRunning) {
            this.ctx.save();
            this.ctx.translate(this.bird.x + 20, this.bird.y + 20);
            this.ctx.rotate(Math.sin(this.frameCount * 0.1) * 0.1);
            this.ctx.translate(-20, -20);
            this.ctx.font = '40px Arial';
            this.ctx.fillText('💖', 0, 35);
            this.ctx.restore();
        }
    }

    gameLoop() {
        this.updateGame();
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Navigation functions
function goHome() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 500);
}

function goToRedeem() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        window.location.href = 'redeem.html';
    }, 500);
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', function () {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    new FlappyGame();
});