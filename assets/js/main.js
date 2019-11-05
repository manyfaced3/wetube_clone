import "../scss/styles.scss";

const searchForm = document.querySelector(".header__culumn:nth-child(2) form");
const searchBtn = document.querySelector(".header__culumn:nth-child(2) button");

function searchBtnF() {
  const websiteWidth = window.innerWidth;
  if (websiteWidth <= 656) {
    // 656px 이하
  } else {
    searchForm.submit();
  }
}
function init() {
  searchBtn.addEventListener("click", searchBtnF);
}
init();
