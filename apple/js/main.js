(() =>{
    let yOffset =0; //window.pageYOff.set 
    let prevScrollHeight = 0 ; //현제 스크롤 위치 보다 이전에 위치한 스크롤 센션들의 높이값의 합
    let currentScene =0; //지금 보고있는 섹션의 인덱스
    let enterNewScene = false //새로운 신이 시작될때 true

    //스르롤 섹션 구간에 대한 정보를 담을객체 생성
    const sceneInfo = [
        {
            //index 0
            type:'sticky', //애니메이션이 있는 섹션 sticky 없으면 normal
            scrollHeight : 0,  // 스크롤 섹션의 높이를 설정해 줄값
            heightNum :5, //브라우저의몇배로 보여줄 것인가
            objs : {        //각 섹션의 id
                container : document.querySelector('#scroll-section-0'),
                messageA : document.querySelector('#scroll-section-0 .main-message.a'),
                messageB : document.querySelector('#scroll-section-0 .main-message.b'),
                messageC : document.querySelector('#scroll-section-0 .main-message.c'),
                messageD : document.querySelector('#scroll-section-0 .main-message.d'),
                canvas : document.querySelector('#video-canvas-0'),
                context: document.querySelector('#video-canvas-0').getContext('2d'),
                videoImages : []
            },
            values: {
                videoImageCount: 147,
                imageSequence: [0,146],
                cavas_opacity:[1 , 0, {start:0.9, end:1}],
                messageA_opacity_in: [0, 1, {start:0.1, end: 0.2}], //start 애니메이션의 시작
                messageB_opacity_in: [0, 1, {start:0.3, end: 0.4}], //end 애니메이션의 끝
                messageC_opacity_in: [0, 1, {start:0.5, end: 0.6}],
                messageD_opacity_in: [0, 1, {start:0.7, end: 0.8}],

                //트렌스 레이트 자기자신 높이의 20퍼센트 아래에서 0으로 이동
                messageA_translateY_in: [20, 0, {start:0.1, end: 0.2}], 
                messageB_translateY_in: [20, 0, {start:0.3, end: 0.4}], 
                messageC_translateY_in: [20, 0, {start:0.5, end: 0.6}], 
                messageD_translateY_in: [20, 0, {start:0.7, end: 0.8}], 


                messageA_opacity_out: [1, 0, {start:0.25, end: 0.3}],
                messageB_opacity_out: [1, 0, {start:0.45, end: 0.5}],
                messageC_opacity_out: [1, 0, {start:0.65, end: 0.7}],
                messageD_opacity_out: [1, 0, {start:0.85, end: 0.9}],


                messageA_translateY_out: [0, -20, {start:0.25, end: 0.3}], 
                messageB_translateY_out: [0, -20, {start:0.45, end: 0.5}], 
                messageC_translateY_out: [0, -20, {start:0.65, end: 0.7}], 
                messageD_translateY_out: [0, -20, {start:0.85, end: 0.9}], 

            }
        },
        {
            //index 1
            type:'normal',
            scrollHeight : 0, 
            // heightNum :5,
            objs : {
                container : document.querySelector('#scroll-section-1')
            }
        },
        {
            //index 2
            type:'sticky',
            scrollHeight : 0, 
            heightNum :5, 
            objs : {
                container : document.querySelector('#scroll-section-2'),
                messageA: document.querySelector('#scroll-section-2 .a'),
				messageB: document.querySelector('#scroll-section-2 .b'),
				messageC: document.querySelector('#scroll-section-2 .c'),
				pinB: document.querySelector('#scroll-section-2 .b .pin'),
                pinC: document.querySelector('#scroll-section-2 .c .pin'),
                canvas : document.querySelector('#video-canvas-1'),
                context: document.querySelector('#video-canvas-1').getContext('2d'),
                videoImages : []
            },
            values: {
                videoImageCount: 131,
                imageSequence: [0,130],
                cavas_opacity_in:[0 , 1, {start:0, end:0.1}],
                cavas_opacity_out:[1 , 0, {start:0.95, end:1}],
				messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
				messageB_translateY_in: [30, 0, { start: 0.6, end: 0.65 }],
				messageC_translateY_in: [30, 0, { start: 0.87, end: 0.92 }],
				messageA_opacity_in: [0, 1, { start: 0.25, end: 0.3 }],
				messageB_opacity_in: [0, 1, { start: 0.6, end: 0.65 }],
				messageC_opacity_in: [0, 1, { start: 0.87, end: 0.92 }],
				messageA_translateY_out: [0, -20, { start: 0.4, end: 0.45 }],
				messageB_translateY_out: [0, -20, { start: 0.68, end: 0.73 }],
				messageC_translateY_out: [0, -20, { start: 0.95, end: 1 }],
				messageA_opacity_out: [1, 0, { start: 0.4, end: 0.45 }],
				messageB_opacity_out: [1, 0, { start: 0.68, end: 0.73 }],
				messageC_opacity_out: [1, 0, { start: 0.95, end: 1 }],
				pinB_scaleY: [0.5, 1, { start: 0.5, end: 0.55 }],
                pinC_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],
                pinB_opcitiy_in: [0, 1, { start: 0.5, end: 0.55}],
                pinC_opcitiy_in: [0, 1, { start: 0.72, end: 0.77}],
                pinB_opcitiy_out: [0, 1, { start: 0.58, end: 0.63}],
                pinC_opcitiy_out: [0, 1, { start: 0.85, end: 0.9}],
			}

        },
        {
            //index 3
            type:'sticky',
            scrollHeight : 0, 
            heightNum :5,
            objs : {
                container : document.querySelector('#scroll-section-3'),
                cavasCaption : document.querySelector('.canvas-caption'),
                canvas : document.querySelector('.image-blend-canvas'),
                context: document.querySelector('.image-blend-canvas').getContext('2d'),
                imagesPath : [
                    './images/black-white.jpg',
                    './images/back-image.jpg'
                ],
                images : []
            },
            values : {
                // 스크롤 할때 계산하기위에 값을 넣지 않음 
                rect1X: [0, 0, {start: 0, end: 0}],
                rect2X: [0, 0, {start: 0, end: 0}]
            }
        },
    ];

    const setCanvasImages = function(){
        let imgElem;
        for(let i = 0; i<sceneInfo[0].values.videoImageCount; i++){
            imgElem = new Image();
            imgElem.src =`./images/01/${1000+i}.jpg`;
            sceneInfo[0].objs.videoImages.push(imgElem);
        }

        let imgElem2;
        for(let i = 0; i<sceneInfo[2].values.videoImageCount; i++){
            imgElem2 = new Image();
            imgElem2.src =`./images/02/${1000+i}.jpg`;
            sceneInfo[2].objs.videoImages.push(imgElem2);
        }

        for(let i=0; i < sceneInfo[3].objs.imagesPath.length; i++){
            imgElem3 = new Image();
            imgElem3.src = sceneInfo[3].objs.imagesPath[i];
            sceneInfo[3].objs.images.push(imgElem3);

        }
        // console.log( sceneInfo[3].objs.images);
    }
    setCanvasImages();

    // 각 스크롤 섹션의 높이 셋팅 
    let setLayout = function(){
        for( let i=0; i<sceneInfo.length; i++){
            if(sceneInfo[i].type === 'sticky'){
                //센션높이를 담은 객체 = 센션의 높이 배수 * 지금보이는 창의 높이
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
                
            }else if(sceneInfo[i].type === 'normal'){
                
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
            }
            //위에서 설정한 높이값 '#scroll-section-i에 스타일값 적용
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }

        //currentScene 
        let totalScrollHeight = 0;
        for(let i = 0; i < sceneInfo.length; i++){
            totalScrollHeight+= sceneInfo[i].scrollHeight;
            if(totalScrollHeight >= yOffset){
                currentScene = i;
                break;
            }
        // console.log(sceneInfo[currentScene].values);
        }
        document.body.setAttribute('id',`show-scen-${currentScene}`);
        const heightRatio = window.innerHeight /530;

        sceneInfo[0].objs.canvas.style.transform =`translate3d(-50%, -50%, 0) scale(${heightRatio})`;
        sceneInfo[2].objs.canvas.style.transform =`translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    }

    const calcValues = function(values, currentYOffset){
        let rv; 
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        // 현재 스크롤섹션에서 스크롤된 범위 비율로 구하기 
        const scrollRatio = currentYOffset / scrollHeight;
        // 부분 스크롤 영역의 비율
        if(values.length === 3){
            //start ~ end 사이의 애니메이션 실행
            const partScrollStart = values[2].start * scrollHeight;//시작점
            const partScrollEnd  = values[2].end *scrollHeight//끝나는 지점
            const partScrollHeight = partScrollEnd - partScrollStart;  //이벤트가 실행될 구간
            //0 > 100 && 0 <           
            if(currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd){
                rv = (currentYOffset - partScrollStart) / partScrollHeight *(values[1] - values[0]) + values[0];
            }else if(currentYOffset < partScrollStart){
                rv= values[0];
            }else if (currentYOffset > partScrollStart){
                rv= values[1];
            }
        }else{
            rv = scrollRatio*(values[1] - values[0]) + values[0] ; 

        }
        return rv;

    }

    const playAnimation = function(){
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset-prevScrollHeight;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        // console.log("스크롤 하이트", scrollHeight, "커런트와이오프셋", currentYOffset)
        const scrollRatio =  currentYOffset / scrollHeight;
        // console.log( "스트롤 레이디어스", scrollRatio)
        switch (currentScene){

            case 0:
                // console.log('0 play');
                let sequence =Math.round(calcValues(values.imageSequence, currentYOffset));
                objs.context.drawImage(objs.videoImages[sequence], 0, 0);

                objs.canvas.style.opacity =calcValues(values.cavas_opacity, currentYOffset);
            
                if(scrollRatio <= 0.22){
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_in, currentYOffset)}%)`;
                }else{
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_out, currentYOffset)}%)`;
                }

                if (scrollRatio <= 0.42) {
					// in
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
					objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
					objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
				}

				if (scrollRatio <= 0.62) {
					// in
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
				}

				if (scrollRatio <= 0.82) {
					// in
					objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
					objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
					objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
				}

                break;

            case 1:
                // console.log('1 play');

                break;

            case 2:
                // console.log('2 play');
                let sequence2 =Math.round(calcValues(values.imageSequence, currentYOffset));
                objs.context.drawImage(objs.videoImages[sequence2], 0, 0);
              

                // objs.context.drawImage(objs.videoImages[sequence2], 0, 0);
                if (scrollRatio <= 0.5) {
                    objs.canvas.style.opacity = calcValues(values.cavas_opacity_in, currentYOffset);
                }else{
                    objs.canvas.style.opacity = calcValues(values.cavas_opacity_out, currentYOffset);
                }


                if (scrollRatio <= 0.32) {
					// in
					objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
					objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
					objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
				}

				if (scrollRatio <= 0.67) {
					// in
					objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
					objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
				} else {
					// out
					objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
					objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
				}

                // console.log(scrollRatio);
				if (scrollRatio <= 0.93) {
					// in
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
					objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
				} else {
					// out
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
					objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
				}

                break;

            case 3:
                // console.log('3 play');
                // 가로 세로 모두 꽉 차게 하기위해 여기서 셋팅 
                const widthRatio = window.innerWidth / objs.canvas.width;
                const heightRatio = window.innerHeight / objs.canvas.height;
                let canvasScaleRatio;
                // console.log(widthRatio ,heightRatio);

                if(widthRatio <= heightRatio){
                    //캔버스 보다 브라우저 창이 홀쭉한 경우
                    canvasScaleRatio = heightRatio;
                }else{
                    //캔버스 보다 브라우저 창이 납작한 경우
                    canvasScaleRatio = widthRatio;
                }
                objs.canvas.style.transform = `scale(${canvasScaleRatio})`
                objs.context.drawImage(objs.images[0], 0, 0);

                // 캔버스 사이즈에 맞춰 가정한 innerWidth, innerHeight
                const recalculateInnerWidth = window.innerWidth / canvasScaleRatio;
                const recalculateInnerHeight = window.innerHeight / canvasScaleRatio;

                const whiteRectWidth =  recalculateInnerWidth * 0.15; //보이는 화면의 양축 사각박스
                // values.rect1X[0] 출발값 ,  values.rect1X[1] 최종값

                //캔버스의 크기에서 - 새로 지정한 innerwidth  = 좌위 안보이는 공간  /2  =  한쪽 안보이는공간의 x좌표
                values.rect1X[0] = (objs.canvas.width - recalculateInnerWidth)/2;  //초기화면
                values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
                values.rect2X[0] = values.rect1X[0] + recalculateInnerWidth - whiteRectWidth; //초기화면
                values.rect2X[1] = values.rect2X[0] + whiteRectWidth;


                //박스그리기
                objs.context.fillRect(values.rect1X[0], 0, parseInt(whiteRectWidth), objs.canvas.height);
                objs.context.fillRect(values.rect2X[0], 0, parseInt(whiteRectWidth), objs.canvas.height);
                break;
        }
    }
    const scrollLoof = function(){
        enterNewScene=false;
        prevScrollHeight =0; //초기화를 안할시 값이 누적됨 필요한건 전체의 scrollHeight값
        for(let i=0; i<currentScene; i++){
            prevScrollHeight += sceneInfo[i].scrollHeight;
       
        }
        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            enterNewScene=true;
            currentScene++;
            document.body.setAttribute('id',`show-scen-${currentScene}`);
        }
        if(yOffset< prevScrollHeight){
            enterNewScene=true;
            if(currentScene === 0) return;
            currentScene--;
            document.body.setAttribute('id',`show-scen-${currentScene}`);
        }
        if(enterNewScene) return;
        playAnimation();
    }

    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoof();

    })

    window.addEventListener('load', () => {
        setLayout();
        sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);

    });
    window.addEventListener('resize',setLayout);
  
})

(); 