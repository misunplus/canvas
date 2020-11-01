export class Point {
	// index = 웨이브 그룹의 웨이브 인덱스
	constructor(index, x, y) {
		// x좌표값 yw표값 얼마나 움질인 것인지 맥스값
		this.x = x;
		this.y = y;
		this.fixedY = y;
		this.speed = 0.05;
		this.cur = index;
		this.max = Math.random() * 100 + 150;
	}

	update() {
		//위아래로 움직이는 함수
		this.cur += this.speed;
		this.y = this.fixedY + Math.sin(this.cur) * this.max;
		// console.log('update();;');
	}
}
