import { Wave } from './wave.js';

export class WaveGroup {
	constructor() {
		//웨이브 갯수
		this.totalWaves = 3;
		//웨이브를 움직이게할 점의 갯수
		this.totalPoints = 7;

		//웨이브 색상
		// this.color = ['rgba(0,199,235,0.4) , rgba(0, 146, 199, 0.4), rgba('0,87,158,0.4')];
		this.color = ['rgba(0,199,235,0.4)', ' rgba(0, 146, 199, 0.4)', 'rgba(0,87,158,0.4)'];
		// this.color = ['rgba(255,0,0,0.4)', ' rgba(255,255,0,0.4)', 'rgba(255,255,255,0.4)'];

		this.waves = [];
		//웨이브의 갯수많큼 웨이브 생성
		for (let i = 0; i < this.totalWaves; i++) {
			const wave = new Wave(i, this.totalPoints, this.color[i]);
			this.waves[i] = wave;
		}
	}

	resize(stageWidth, sageHeight) {
		for (let i = 0; i < this.totalWaves; i++) {
			const wave = this.waves[i];
			wave.resize(stageWidth, sageHeight);
		}
	}

	draw(ctx) {
		for (let i = 0; i < this.totalWaves; i++) {
			const wave = this.waves[i];
			wave.draw(ctx);
		}
	}
}
