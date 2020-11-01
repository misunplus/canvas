// const { Wave } = require('./wave');
import { WaveGroup } from './wavegroup.js';

class App {
	//객체를 생성하고 초기화 하는 생성자 메서드 constructor()
	//클레스 안에 한개만 존재 가능
	constructor() {
		// 캔버스 생성
		this.canvas = document.createElement('canvas');
		//HTMLCanvasElement.getContext() "메소드는 캔버스의 드로잉 컨텍스트"를 반환합니다.
		//컨텍스트 식별자가 지원되지 않을 경우 null을 반환.
		this.ctx = this.canvas.getContext('2d');
		// 바디에 캔바스를 보여주기
		document.body.appendChild(this.canvas);

		// WaveGroup() 객체 생성
		this.waveGroup = new WaveGroup();

		// 리사이즈 이벤트
		//사이즈가 변경 됐을때  resize() 함수를생성 호출
		window.addEventListener('resize', this.resize.bind(this), false);
		this.resize();

		//애니메이션 생성
		//bind() 메소드가 호출되면 새로운 함수를 생성합니다.
		//받게되는 첫 인자의 value로는 this 키워드를 설정하고, 이어지는 인자들은 바인드된 함수의 인수에 제공됩니다.
		requestAnimationFrame(this.animate.bind(this));
	}

	resize() {
		/*
Element.clientWidth인라인 요소와 CSS가없는 요소 의 경우 속성은 0입니다. 
그렇지 않으면 요소의 내부 너비 (픽셀 단위)입니다.
 패딩은 포함되지만 테두리, 여백 및 수직 스크롤바 (있는 경우)는 제외됩니다.

*/
		this.stageWidth = document.body.clientWidth;
		this.stageHeight = document.body.clientHeight;

		this.canvas.width = this.stageWidth * 2;
		this.canvas.height = this.stageHeight * 2;

		//	this.ctx = this.canvas.getContext('2d');
		this.ctx.scale(2, 2);

		this.waveGroup.resize(this.stageWidth, this.stageHeight);
		/*
		wavegroup.js
		resize(stageWidth, sageHeight) {
		for (let i = 0; i < this.totalWaves; i++) {
			const wave = this.waves[i];
			wave.resize(stageWidth, sageHeight);
		}
	}
		*/
	}


	// requestAnimationFrame 안의 animate()함수
	animate(t) {
		this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

		this.waveGroup.draw(this.ctx);

		requestAnimationFrame(this.animate.bind(this));
	}
}

window.onload = () => {
	new App();
};
