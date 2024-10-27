<template>
    <div class="flex flex-col items-center bg-white h-screen relative">
      <div class="text-black text-sm absolute top-5">J1: {{ playerScore }} - COM: {{ opponentScore }}</div>
      <canvas ref="gameCanvas" class="border-2 border-white mt-20"></canvas>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        playerPaddleY: 70,
        opponentPaddleY: 70,
        playerScore: 0,
        opponentScore: 0,
        ballX: 150,
        ballY: 100,
        ballSpeedX: 3,
        ballSpeedY: 3,
        paddleWidth: 5,
        paddleHeight: 40,
        canvasWidth: 300,
        canvasHeight: 200
      };
    },
    mounted() {
      this.setupGame();
      window.addEventListener("keydown", this.movePaddle);
      window.addEventListener("keydown", this.preventScroll);
    },
    beforeDestroy() {
      window.removeEventListener("keydown", this.movePaddle);
      window.removeEventListener("keydown", this.preventScroll);
    },
    methods: {
      setupGame() {
        const canvas = this.$refs.gameCanvas;
        const context = canvas.getContext('2d');
  
        canvas.width = this.canvasWidth;
        canvas.height = this.canvasHeight;
  
        const drawEverything = () => {
          
          context.fillStyle = 'black';
          context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  
          
          context.fillStyle = 'white';
          context.fillRect(0, this.playerPaddleY, this.paddleWidth, this.paddleHeight);
          context.fillRect(this.canvasWidth - this.paddleWidth, this.opponentPaddleY, this.paddleWidth, this.paddleHeight);
  
          
          context.beginPath();
          context.arc(this.ballX, this.ballY, 4, 0, Math.PI * 2);
          context.fillStyle = 'white';
          context.fill();
  
          
          this.ballX += this.ballSpeedX;
          this.ballY += this.ballSpeedY;
  
          
          if (this.ballY <= 0 || this.ballY >= this.canvasHeight) {
            this.ballSpeedY = -this.ballSpeedY;
          }
  
          
          if (this.ballX <= this.paddleWidth && this.ballY > this.playerPaddleY && this.ballY < this.playerPaddleY + this.paddleHeight) {
            this.ballSpeedX = -this.ballSpeedX;
          }
  
          
          if (this.ballX >= this.canvasWidth - this.paddleWidth && this.ballY > this.opponentPaddleY && this.ballY < this.opponentPaddleY + this.paddleHeight) {
            this.ballSpeedX = -this.ballSpeedX;
          }
  
          
          if (this.ballX <= 0) {
            this.opponentScore++;
            this.resetBall();
          } else if (this.ballX >= this.canvasWidth) {
            this.playerScore++;
            this.resetBall();
          }
  
          
          this.opponentPaddleY += (this.ballY - (this.opponentPaddleY + this.paddleHeight / 2)) * 0.1;
        };
  
        const gameLoop = () => {
          drawEverything();
          requestAnimationFrame(gameLoop);
        };
  
        gameLoop();
      },
      resetBall() {
        
        this.ballX = this.canvasWidth / 2;
        this.ballY = this.canvasHeight / 2;
        this.ballSpeedX = -this.ballSpeedX;
      },
      movePaddle(e) {
        const canvas = this.$refs.gameCanvas;
        if (e.key === "ArrowUp" && this.playerPaddleY > 0) {
          this.playerPaddleY -= 10;
        } else if (e.key === "ArrowDown" && this.playerPaddleY < canvas.height - this.paddleHeight) {
          this.playerPaddleY += 10;
        }
      },
      preventScroll(e) {
        
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
          e.preventDefault();
        }
      }
    }
  };
  </script>
  
  <style scoped>
  canvas {
    width: 100%;
    max-width: 300px;
    height: auto;
  }
  </style>
  
  
  