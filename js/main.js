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

const sliderContainer = document.querySelector('.guide-slider');
const slides = document.querySelectorAll('.guide-slide');
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let autoScrollSpeed = 200;
let breakPointSlider = 920;

const isMobile = window.matchMedia(`(max-width: ${breakPointSlider}px)`).matches;

if (isMobile) {
  currentTranslate = slides[0].offsetWidth * 2;

  updateSliderPosition();

  sliderContainer.addEventListener('touchstart', startScroll);
  sliderContainer.addEventListener('touchend', stopScroll);
  sliderContainer.addEventListener('touchmove', drag);
}

function startScroll(event) {
  startPosition = event.touches[0].clientX;
  isDragging = true;
}

function drag(event) {
  if (!isDragging) return;

  const currentPosition = event.touches[0].clientX;

  currentTranslate = prevTranslate + currentPosition - startPosition;

  const minTranslate = 0;
  const maxTranslate = -(slides.length - 1) * slides[0].offsetWidth;

  if (currentTranslate > 0 && currentTranslate < slides[0].offsetWidth / 2) {
    currentTranslate = minTranslate;
  }

  if (currentTranslate < maxTranslate && currentTranslate > maxTranslate - slides[0].offsetWidth / 2) {
    currentTranslate = maxTranslate;
  }

  updateSliderPosition();
}

function stopScroll() {
  isDragging = false;
  prevTranslate = currentTranslate;
}

function updateSliderPosition() {
  sliderContainer.style.transform = `translateX(${currentTranslate}px)`;
}

