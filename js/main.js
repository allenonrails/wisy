function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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

  async function addChars(descriptionHtml, content) {
    for (let i = 0; i < content.length; i++) {
      descriptionHtml.innerHTML += content[i]
      await sleep(i / 2);
    }
  }

  async function animationHeroDescription(){
    let description = document.querySelector('.hero-description');
    let contentDescription = description.textContent.split('')
    description.innerHTML = ``
  
    await addChars(description, contentDescription);
  }

  animationHeroDescription()
  setCurrentPageActiveLink()
})