const header = document.querySelector("#header");
const navBars = document.querySelector(".fa-bars");
const navUl = document.querySelector("#ul").classList;

window.onscroll = () => {
  const currentScrollPos = window.pageYOffset;

  if(currentScrollPos > 280) {
    header.classList.add("header-hide");
    navUl.remove('show');
  } else {
    header.classList.remove("header-hide");
  }
};

navBars.addEventListener('click', () => {
  navUl.toggle('show');
})