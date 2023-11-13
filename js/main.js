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

    this.setCurrentItem(0)

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
    investItemBtn.href = itemData.btnLink
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

class ElementCircle {
  constructor(circleId, data, circleSize=1000, elementSize=150) {
    this.circle = document.getElementById(circleId);
    this.circleSize = circleSize;
    this.elementSize = elementSize;
    this.data = data;
    this.elements = [];

    this.initCircle();
    this.updateSizes(); // Вызываем метод для установки размеров при загрузке страницы
  }

  initCircle() {
    this.circle.style.width = `${this.circleSize}px`;
    this.circle.style.height = `${this.circleSize}px`;

    // Добавляем внутренний круг
    const innerCircle = document.createElement("div");
    innerCircle.className = "inner-circle";
    this.circle.appendChild(innerCircle);

    this.data.forEach((dataCircle, i) => {
      let element = document.createElement("div");
      let image   = document.createElement('img');
      let title   = document.createElement('h4')

      image.src = dataCircle.imageSrc
      image.alt = dataCircle.imageAlt
      image.loading = "lazy"

      title.innerText = dataCircle.title
      title.classList.add('element-title')

      element.className = "element";
      element.style.width = `${this.elementSize}px`
      element.style.height = `${this.elementSize}px`

      element.appendChild(image)
      element.appendChild(title)
      element.style.animationDelay = `${(i / this.data.length) * 5}s`;
      this.circle.appendChild(element);
      this.elements.push(element);
    })

    this.positionElements();
  }

  positionElements() {
    this.elements.forEach((element, index) => {
      const angle = (360 / this.data.length) * index;
      const x = this.circleSize / 2 + (this.circleSize / 2) * Math.cos(this.toRadians(angle));
      const y = this.circleSize / 2 + (this.circleSize / 2) * Math.sin(this.toRadians(angle));

      element.style.left = `${x - this.elementSize / 2}px`;
      element.style.top = `${y - this.elementSize / 2}px`;
    });
  }

  updateSizes() {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 1228) {
      this.circleSize /= 1.5;
      this.elementSize /= 1.5;
    }

    if (screenWidth <= 676) {
      this.circleSize /= 2.2;
      this.elementSize /= 2.2;
    }

    if (screenWidth <= 380) {
      this.circleSize -= 70;
      this.elementSize -= 30;
    }
    

    // Обновляем размеры кругов
    this.circle.style.width = `${this.circleSize}px`;
    this.circle.style.height = `${this.circleSize}px`;

    // Обновляем размеры элементов
    this.elements.forEach((element) => {
      element.style.width = `${this.elementSize}px`;
      element.style.height = `${this.elementSize}px`;
    });

    this.positionElements();
  }

  toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const investData = [
  {
    imageSrc: './img/invest/1.png',
    title: 'Invest Easily',
    description: 'Choose a ready-made strategy, such as «Bitcoin & Ethereum». Link your bank card. And select the frequency of replenishment, for example, 100 $ once a week.',
    btnLink: 'https://t.me/wisy_eng_bot?start=wisy_e',
    btnText: 'Get started'
  },
  {
    imageSrc: './img/invest/2.png',
    title: 'Ready-Made Strategies',
    description: 'Choose a pre-made strategy and invest automatically, or create your own strategy in just a few clicks within the app.',
    btnLink: 'https://t.me/wisy_eng_bot?start=wisy_e',
    btnText: 'Get started'
  },
  {
    imageSrc: './img/invest/3.png',
    title: 'Free Training',
    description: 'Learn to save and earn money on cryptocurrency. You will have access to 27 short courses in the form of cards. The average course learning time is 7 minutes.',
    btnLink: 'https://t.me/wisy_eng_bot?start=wisy_e',
    btnText: 'Get started'
  },
  {
    imageSrc: './img/invest/4.png',
    title: 'Simple and stress-free',
    description: 'No need to speculateand exert a lot of effort to buy cryptocurrency.',
    btnLink: 'https://t.me/wisy_eng_bot?start=wisy_e',
    btnText: 'Get started'
  },
];

const circleData = [
  [
    {
      imageSrc: "./img/grow/1.png", 
      imageAlt: "Top-10 market logo",
      title: "Top-10 market"
    },
    {
      imageSrc: "./img/grow/2.png", 
      imageAlt: "Top DeFi logo",
      title: "Top DeFi"
    },
    {
      imageSrc: "./img/grow/3.png", 
      imageAlt: "Mem-index logo",
      title: "Mem-index"
    },
    {
      imageSrc: "./img/grow/4.png", 
      imageAlt: "Top-3 market logo",
      title: "Top-3 market"
    },
    {
      imageSrc: "./img/grow/9.png", 
      imageAlt: "Only Bitcoin logo",
      title: "Only Bitcoin"
    },
  ],
  [
    {
      imageSrc: "./img/grow/5.png", 
      imageAlt: "POW-index logo",
      title: "POW-index"
    },
    {
      imageSrc: "./img/grow/6.png", 
      imageAlt: "BTC & ETH logo",
      title: "BTC & ETH"
    },
    {
      imageSrc: "./img/grow/7.png", 
      imageAlt: "L2-index logo",
      title: "L2-index"
    },
    {
      imageSrc: "./img/grow/8.png", 
      imageAlt: "Only Ethereum logo",
      title: "Only Ethereum market"
    },
    {
      imageSrc: "./img/grow/10.png", 
      imageAlt: "POS-index logo",
      title: "POS-index market"
    },
  ],
]

document.addEventListener('DOMContentLoaded', function(){
  console.log(navigator.clipboard)
  let copyBtns = document.querySelectorAll('.legal-copy');

  copyBtns.forEach(copyBtn => {
    copyBtn.addEventListener('click', async function(){
      let containerBtn = copyBtn.closest('.legal-content');

      let allContent = await getAllContent(containerBtn);
      await navigator.clipboard.writeText(allContent)
    })
  })

  async function getAllContent(container){
    result = Array.from( await container.querySelectorAll('.legal-text')).map(p => p.textContent).join('\n')

    return result
  }

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
  const elementCircle = new ElementCircle("circle-1", circleData[0], 1200);
  const elementSecondCircle = new ElementCircle("circle-2", circleData[1], 800);

})

