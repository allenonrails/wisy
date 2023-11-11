class Slider {
  constructor(containerSelector, slideSelector, breakPointSlider = 920, autoScrollSpeed = 200) {
    this.sliderContainer = document.querySelector(containerSelector);
    this.slides = document.querySelectorAll(slideSelector);
    this.isDragging = false;
    this.startPosition = 0;
    this.currentTranslate = 0;
    this.prevTranslate = 0;
    this.autoScrollSpeed = autoScrollSpeed;
    this.breakPointSlider = breakPointSlider;

    this.isMobile = window.matchMedia(`(max-width: ${this.breakPointSlider}px)`).matches;

    if (this.isMobile) {
      this.currentTranslate = this.slides[0].offsetWidth * 2;
      this.updateSliderPosition();

      this.sliderContainer.addEventListener('touchstart', this.startScroll.bind(this));
      this.sliderContainer.addEventListener('touchend', this.stopScroll.bind(this));
      this.sliderContainer.addEventListener('touchmove', this.drag.bind(this));
    }
  }

  startScroll(event) {
    this.startPosition = event.touches[0].clientX;
    this.isDragging = true;
  }

  drag(event) {
    if (!this.isDragging) return;

    const currentPosition = event.touches[0].clientX;

    this.currentTranslate = this.prevTranslate + currentPosition - this.startPosition;

    const minTranslate = 0;
    const maxTranslate = -(this.slides.length - 1) * this.slides[0].offsetWidth;

    if (this.currentTranslate > 0 && this.currentTranslate < this.slides[0].offsetWidth / 2) {
      this.currentTranslate = minTranslate;
    }

    if (this.currentTranslate < maxTranslate && this.currentTranslate > maxTranslate - this.slides[0].offsetWidth / 2) {
      this.currentTranslate = maxTranslate;
    }

    this.updateSliderPosition();
  }

  stopScroll() {
    this.isDragging = false;
    this.prevTranslate = this.currentTranslate;
  }

  updateSliderPosition() {
    this.sliderContainer.style.transform = `translateX(${this.currentTranslate}px)`;
  }
}

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
  const mySlider = new Slider('.guide-slider', '.guide-slide');
})

