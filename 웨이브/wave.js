import { Point } from './point.js';
export class Wave {
	constructor(index, totalPoints, color) {
		this.index = index;
		this.totalPoints = totalPoints;
		this.color = color;
		this.points = [];
	}

	resize(stageWidth, stageHeight) {
		this.stageWidth = stageWidth;
		this.stageHeight = stageHeight;

		this.centerX = stageWidth / 2;
		this.centerY = stageHeight / 2;

		this.pointGap = this.stageWidth / (this.totalPoints - 1);

		this.init();
	}
	//포인트 생성 = 리사이즈에서 지정한 centerx,centery 포인터 값으로 넘겨줌
	//각각의 포인트가 화면 중간에서 실행할수 있도록
	init() {
		this.points = [];

		for (let i = 0; i < this.totalPoints; i++) {
			const point = new Point(this.index + i, this.pointGap * i, this.centerY);
			this.points[i] = point;
		}
	}
	// 	// 캔버스 위에 그리는 함수

	draw(ctx) {
		ctx.beginPath();
		ctx.fillStyle = this.color;

		let prevX = this.points[0].x;
		let prevY = this.points[0].y;

		ctx.moveTo(prevX, prevY);

		//처음과 마지막 포인트는 이동하지 않게 하기위해서
		// for (let i = 1; i < this.totalPoints; i++) {
		for (let i = 0; i < this.totalPoints; i++) {
			// if (i < this.totalPoints - 1) {
			if (i < this.totalPoints) {
				this.points[i].update();
			}

			// 움직이는 웨이브 의 좌표
			const cx = (prevX + this.points[i].x) / 2;
			const cy = (prevY + this.points[i].y) / 2;

			ctx.quadraticCurveTo(prevX, prevY, cx, cy);

			prevX = this.points[i].x;
			prevY = this.points[i].y;
		}
		// lineTo 직선
		//quadraticCurveTO()  곡선
		ctx.lineTo(prevX, prevY);
		ctx.lineTo(this.stageWidth, this.stageHeight);
		ctx.lineTo(this.points[0].x, this.stageHeight);
		ctx.fill();
		ctx.closePath();
	}
}
