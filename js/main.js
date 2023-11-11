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

class InvestSlider {
  constructor(data){
    this.data = data
    this.container  = document.querySelector('.invest-container');
    this.navLinks   = this.container.querySelectorAll('.invest-navigation__item');
    this.investItem = this.container.querySelector('.invest-item');

    this.navLinks.forEach((navLink, index) => navLink.addEventListener('click', (e) => {
      e.preventDefault()
      
      if(!navLink.classList.contains('invest-navigation__item-active')){
        this.deleteAllActiveInvestNavLinks()
        navLink.classList.add('invest-navigation__item-active')
  
        this.setCurrentItem(index)
      }
    }))
  }

  setCurrentItem(index){
    let itemData = this.data[index];

    this.investItem.innerHTML = ``

    let investItemImage = document.createElement('img')
    investItemImage.classList.add('invest-item__image', 'fade-in')
    investItemImage.src = itemData.imageSrc
    investItemImage.alt = `${itemData.title} ${index} image`

    let investItemText = document.createElement('div')
    investItemText.classList.add('invest-item__text')

    let investItemTitle = document.createElement('h3')
    investItemTitle.classList.add('invest-item__title', 'fade-in')
    investItemTitle.innerText = itemData.title

    let investItemDescription = document.createElement('p')
    investItemDescription.classList.add('.invest-item__description', 'fade-in')
    investItemDescription.innerText = itemData.description

    let investItemBtn = document.createElement('a')
    investItemBtn.src = itemData.btnLink
    investItemBtn.innerText = itemData.btnText
    investItemBtn.classList.add('invest-item__btn', 'btn', 'fade-in')

    this.investItem.appendChild(investItemImage)

    investItemText.appendChild(investItemTitle)
    investItemText.appendChild(investItemDescription)
    investItemText.appendChild(investItemBtn)

    this.investItem.appendChild(investItemText)
  }

  deleteAllActiveInvestNavLinks(){
    this.navLinks.forEach(el => el.classList.remove('invest-navigation__item-active'))
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const investData = [
  {
    imageSrc: './img/invest/1.png',
    title: 'Invest Easily 1',
    description: 'Choose a ready-made strategy, such as «Bitcoin & Ethereum». Link your bank card. And select the frequency of replenishment, for example, 100 $ once a week.',
    btnLink: './',
    btnText: 'Get started'
  },
  {
    imageSrc: './img/invest/1.png',
    title: 'Invest Easily 2',
    description: 'Choose a ready-made strategy, such as «Bitcoin & Ethereum». Link your bank card. And select the frequency of replenishment, for example, 100 $ once a week.',
    btnLink: './',
    btnText: 'Get started'
  },
  {
    imageSrc: './img/invest/1.png',
    title: 'Invest Easily 3',
    description: 'Choose a ready-made strategy, such as «Bitcoin & Ethereum». Link your bank card. And select the frequency of replenishment, for example, 100 $ once a week.',
    btnLink: './',
    btnText: 'Get started'
  },
  {
    imageSrc: './img/invest/1.png',
    title: 'Invest Easily 4',
    description: 'Choose a ready-made strategy, such as «Bitcoin & Ethereum». Link your bank card. And select the frequency of replenishment, for example, 100 $ once a week.',
    btnLink: './',
    btnText: 'Get started'
  },
];

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
  const investSlider = new InvestSlider(investData)
})

