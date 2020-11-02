    class Box {
        constructor(index, x, y, speed) {
            this.index = index;
            this.x = x;
            this.y = y;
            this.speed = speed;
            this.width = 100;
            this.height = 100;
            // 생성되면 바로 그리기
            this.draw();
        }
        // 그리기
        draw() {
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = '#fff';
            ctx.fillText(this.index, this.x + 30, this.y + 30);
        }
    }