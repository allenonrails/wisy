document.addEventListener('DOMContentLoaded', function(){

  function setCurrentPageActiveLink(){
    let currentPage = `.${window.location.pathname}`;
    let navLinks    = document.querySelectorAll(".header-item-link");
  
    navLinks.forEach(function (link) {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('header-item-link-active');
      }
    });
  }

  setCurrentPageActiveLink()
})