document.addEventListener('DOMContentLoaded', function(){
// IntersectionObserver 를 등록한다.
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
  	// 관찰 대상이 viewport 안에 들어온 경우 'tada' 클래스를 추가
    if (entry.intersectionRatio > 0) {
      entry.target.classList.add('tada');
    }
    // 그 외의 경우 'tada' 클래스 제거
    else {
      entry.target.classList.remove('tada');
    }
  })
})

// 관찰할 대상을 선언하고, 해당 속성을 관찰시킨다.
const boxElList = document.querySelectorAll('.box');
boxElList.forEach((el) => {
  io.observe(el);
})
})