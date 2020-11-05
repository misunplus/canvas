(() =>{
    let yOffset =0; //window.pageYOffset 
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
                container : document.querySelector('#scroll-section-0')
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
    }
    const scrollLoof = function(){
        prevScrollHeight =0; //초기화를 안할시 값이 누적됨 필요한건 전체의 scrollHeight값
        for(let i=0; i<currentScene; i++){
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            currentScene++;
            
        }
        if(yOffset< prevScrollHeight){
            if(currentScene === 0) return;
            currentScene--;
        }
        console.log(currentScene);
    }

    window.addEventListener('resize',setLayout());
    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
      

        scrollLoof();
    })


    setLayout();
})

();