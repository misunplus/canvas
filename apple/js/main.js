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
                messageD : document.querySelector('#scroll-section-0 .main-message.d')
            },
            values: {
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
            },
            values: {
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
                cavasCaption : document.querySelector('.canvas-caption')
            },
            values : {

            }
        },
    ];

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

                console.log(scrollRatio);
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

    window.addEventListener('load',setLayout);
    window.addEventListener('resize',setLayout);
  
})

(); 