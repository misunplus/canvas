class Panel {
    constructor() {
        this.scale = 0;
        this.angle = 0;
    }

    draw() {
        ctx.fillStyle = 'rgba(255,0,0,0.8)';
        //변환초기화
        ctx.resetTransform();
        // ctx.setTransform(1,0,0,1,0,0);

        // 캔버스의변환 기분은 x좌표 시작점 y좌표 시작점
        ctx.translate(oX,oY);
        ctx.scale(this.scale, this.scale);
        
        ctx.rotate(canUtil.toRadian(this.angle));
        ctx.translate(-oX, -oY, 300, 300);
        
        ctx.fillRect(oX - 150, oY - 150, 300, 300);
        ctx.resetTransform();
  
    }

    showContent(){
        ctx.fillStyle = '#fff';
        ctx.fillText(selecteBox.index, oX, oY);
    }
}