/* ===============================
   기본 변수
================================ */
const container = document.getElementById('container');
const pages = document.querySelectorAll('.page');
let currentPage = 0;
let isScrolling = false;

/* ===============================
   팝업 관련 변수
================================ */
const popup = document.getElementById('popup');
const popupImgs = document.querySelectorAll('.popup-img');
const closeBtn = document.getElementById('close');
const scrollTopBtn = document.getElementById('scrollTopBtn'); // 버튼이 있으면 null 체크
scrollTopBtn.addEventListener('click',function(e){
  e.preventDefault();
  popup.scrollTop=0

  
})
/* ===============================
   세로 스크롤 (원페이지)
================================ */
window.addEventListener('wheel', (e) => {
  if (isScrolling) return;

  if (currentPage === 0 && e.deltaY < 0) return;
  if (currentPage === pages.length - 1 && e.deltaY > 0) return;

  if (e.deltaY > 0) currentPage++;
  else currentPage--;

  scrollToPage(currentPage);
});

/* ===============================
   페이지 이동 함수
================================ */
function scrollToPage(index) {
  isScrolling = true;
  container.style.transform = `translateY(-${index * 100}vh)`;
  container.style.transition = 'transform 0.8s ease';

  // page4 진입 시 애니메이션
  if (index === 3) startPage4Animation();

  // page3 진입 시 popup 이벤트 초기화
  if (index === 2) initPage3Popup();

  setTimeout(() => { isScrolling = false; }, 800);
}

/* ===============================
   page4 텍스트 span 쪼개기
================================ */
document.querySelectorAll('.ml15 .letters').forEach(text => {
  text.innerHTML = text.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
});

/* ===============================
   page4 애니메이션 (loop)
================================ */
let page4AnimationStarted = false;
function startPage4Animation() {
  if (page4AnimationStarted) return;
  page4AnimationStarted = true;

  anime.timeline({ loop: true })
    .add({
      targets: '.contact-left .letter, .contact-right .letter',
      opacity: [0, 1],
      translateY: [50, 0],
      easing: "easeOutExpo",
      duration: 1400,
      delay: (el, i) => 30 * i
    })
    .add({
      targets: '.contact-left .letter, .contact-right .letter',
      opacity: [1, 0],
      translateY: [0, -50],
      easing: "easeInExpo",
      duration: 1200,
      delay: (el, i) => 30 * i
    });
}

/* ===============================
   page3 팝업 이벤트
================================ */
function initPage3Popup() {
  const page3MenuBtns = document.querySelectorAll('.page3 .menu-btn');
  page3MenuBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentPage !== 2) return;

      const menuId = btn.dataset.popup;

      // 모든 팝업 이미지 숨기기
      popupImgs.forEach(img => img.style.display = 'none');

      // 클릭한 버튼에 해당하는 이미지만 표시
      const targetImg = document.getElementById('popup' + menuId);
      if (targetImg) targetImg.style.display = 'block';

      // 팝업 열기
      popup.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      const ht = window.innerHeight;
      popup.style.top=ht*2+'px';
      console.log(ht)
    });
  });
}

// 닫기 버튼
closeBtn.addEventListener('click', () => {
  popup.style.display = 'none';
  document.body.style.overflow = '';
});

// 팝업 스크롤 막기
popup.addEventListener('wheel', (e) => {
  const scrollTop = popup.scrollTop;
  const scrollHeight = popup.scrollHeight;
  const clientHeight = popup.clientHeight;
  const delta = e.deltaY;

  const isAtTop = scrollTop === 0;
  const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
   e.stopPropagation();

  if ((delta < 0 && isAtTop) || (delta > 0 && isAtBottom)) {
    e.preventDefault();
  
  }
}, { passive: false });

 
scrollTopBtn