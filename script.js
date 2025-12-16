const container = document.getElementById('container');
const pages = document.querySelectorAll('.page');
let currentPage = 0;
let isScrolling = false;

// 세로 스크롤 (페이지 전환)
window.addEventListener('wheel', (e) => {
  if (isScrolling) return;

  if (e.deltaY > 0 && currentPage < pages.length - 1) {
    currentPage++;
    scrollToPage(currentPage);
  } else if (e.deltaY < 0 && currentPage > 0) {
    currentPage--;
    scrollToPage(currentPage);
  }
});

function scrollToPage(index) {
  isScrolling = true;
  container.style.transform = `translateY(-${index * 100}vh)`;
  container.style.transition = 'transform 0.8s ease';

  setTimeout(() => {
    isScrolling = false;
  }, 800);
}

const popup = document.querySelector('.popup');
const popupImgs = document.querySelectorAll('.popup-img');
const closeBtn = document.getElementById('close');

// 메뉴 버튼 클릭
document.querySelectorAll('.menu-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const menuId = btn.dataset.popup;

    // 모든 팝업 이미지 숨기기
    popupImgs.forEach(img => img.style.display = 'none');

    // 클릭한 버튼에 해당하는 이미지만 표시
    document.getElementById('popup' + menuId).style.display = 'block';

    // 팝업 보이기
    popup.style.display = 'flex';

    // 팝업 열릴 때 배경 스크롤 막기
    document.body.style.overflow = 'hidden';
  });
});

// 팝업 닫기
closeBtn.addEventListener('click', () => {
  popup.style.display = 'none';

  // 배경 스크롤 복구
  document.body.style.overflow = '';
});

popup.addEventListener('wheel', (e) => {
  const scrollTop = popup.scrollTop;
  const scrollHeight = popup.scrollHeight;
  const clientHeight = popup.clientHeight;
  const delta = e.deltaY;

  const isAtTop = scrollTop === 0;
  const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

  // 🔒 팝업 내부 스크롤은 허용
  // ⛔ 위/아래 끝에서 부모로 스크롤 전달 차단
  if (
    (delta < 0 && isAtTop) ||
    (delta > 0 && isAtBottom)
  ) {
    e.preventDefault();      // 부모 스크롤 방지
  }

  e.stopPropagation(); // 항상 부모 이벤트로 전달 차단
}, { passive: false });

