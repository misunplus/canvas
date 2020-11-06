(() =>{
    let yOffset =0; //window.pageYOff.set 
    let prevScrollHeight = 0 ; //현제 스크롤 위치 보다 이전에 위치한 스크롤 센션들의 높이값의 합
    let currentScene =0; //지금 보고있는 섹션의 인덱스
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
                messageA_opacity: [0, 1]
            }
        },
        {
            //index 1
            type:'normal',
            scrollHeight : 0, 
            heightNum :5,
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
                container : document.querySelector('#scroll-section-2')
            }
        },
        {
            //index 3
            type:'sticky',
            scrollHeight : 0, 
            heightNum :5,
            objs : {
                container : document.querySelector('#scroll-section-3')
            }
        },
    ];

    // 각 스크롤 섹션의 높이 셋팅 
    let setLayout = function(){
        for( let i=0; i<sceneInfo.length; i++){
            //센션높이를 담은 객체 = 센션의 높이 배수 * 지금보이는 창의 높이
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
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
        }
        document.body.setAttribute('id',`show-scen-${currentScene}`);
    }

    const calcValues = function(values, currentYOffset){
        let rv;
        // 현재 스크롤섹션에서 스크롤된 범위 비율로 구하기 
        let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;
        rv = scrollRatio*(values[1] - values[0]) + values[0] ;
        return rv;

    }

    const playAnimation = function(){
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset-prevScrollHeight;
        switch (currentScene){
            case 0:
                // console.log('0 play');
                let messageA_opacity_in = calcValues(values.messageA_opacity, currentYOffset);
                objs.messageA.style.opacity = messageA_opacity_in;


                break;

            case 1:
                // console.log('1 play');

                break;

            case 2:
                // console.log('2 play');

                break;

            case 3:
                // console.log('3 play');

                break;
        }
    }
    const scrollLoof = function(){
        prevScrollHeight =0; //초기화를 안할시 값이 누적됨 필요한건 전체의 scrollHeight값
        for(let i=0; i<currentScene; i++){
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            currentScene++;
            document.body.setAttribute('id',`show-scen-${currentScene}`);
        }
        if(yOffset< prevScrollHeight){
            if(currentScene === 0) return;
            currentScene--;
            document.body.setAttribute('id',`show-scen-${currentScene}`);
        }
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