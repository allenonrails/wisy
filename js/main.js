class MultiLanguage{
  constructor(config){
    this.initialize(config);
  }

  async initialize(config) {
    this.langs = config.langs
    this.defaultLanguage = config.defaultLang
    this.defaultClass = config.classLang
    this.path = config.path
    this.select = await document.querySelector(config.selectClass)

    const screenWidth = window.innerWidth;

    if (screenWidth <= 520) {
      this.select = await document.querySelector('.mobile-select')
    }

    this.disallowParams()
    await this.loadOptions()

    this.select.addEventListener('change', function(){
      location.href = `${window.location.pathname}#${this.value}`
      location.reload()
    })
  }

  async loadOptions(){
    this.langs.forEach(async(name) => {
      let option = document.createElement('option')
      option.innerText = name
      if (window.location.hash.substring(1) === name) option.selected = true 
      option.value = name 

      await this.select.appendChild(option)
    }) 
  }

  changeLanguage() {
    let hash = window.location.hash.substring(1);

    if(!this.langs.includes(hash)){
      location.href = `${window.location.pathname}#${this.defaultLanguage}`
      location.reload()

      return true
    }

    this.select = hash
    if('/' == document.location.pathname){
      const investSlider = new InvestSlider(investData[hash])
    }
    

    this.getJsonData(hash).then(data => {
      Object.keys(data).forEach(async key => {
        if (key == "description" && '/' == document.location.pathname){
          await animationHeroDescription(data[key])
        }else if (key == "investorsPageDescription" && '/' != document.location.pathname) {
          await animationHeroDescription(data[key])
        }
        else {
          document.querySelectorAll(`${this.defaultClass}-${key}`).forEach(el => {
            el.innerHTML = data[key]
          })
        }
      })
    })
  }

  disallowParams(){
    history.replaceState({}, '', window.location.href.split('?')[0]);
  }

  async getJsonData(lang){
    return await(await fetch(`${this.path}/${lang}.json`)).json()
  }
}

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

class PieChart {
  constructor(dataElement, pieElement, pieSize, data) {
    this.dataElement = dataElement;
    this.pieElement = pieElement;
    this.pieSize = pieSize;
    this.data = data
    this.colors = data.map(coin => coin.color)

    const screenWidth = window.innerWidth;

    if (screenWidth <= 1228) {
      this.pieSize /= 1.2;
      this.pieSize /= 1.2;
    }

    if (screenWidth <= 380) {
      this.pieSize -= 20;
      this.pieSize -= 20;
    }

  }

  sliceSize(dataNum, dataTotal) {
    return (dataNum / dataTotal) * 360;
  }

  addSlice(sliceSize, offset, sliceID, color, text) {
    const slice = document.createElement("div");
    slice.className = `slice ${sliceID}`;
    slice.innerHTML = `<span>${text}</span>`;
    document.querySelector(this.pieElement).appendChild(slice);

    offset -= 1;
    const sizeRotation = -179 + sliceSize;

    document.querySelector(`.${sliceID}`).style.transform = `rotate(${offset}deg) translate3d(0,0,0)`;
    document.querySelector(`.${sliceID} span`).style.transform = `rotate(${sizeRotation}deg) translate3d(0,0,0)`;
    document.querySelector(`.${sliceID} span`).style.backgroundColor = color;

    // Set slice size dynamically
    slice.style.width = `${this.pieSize}px`;
    slice.style.height = `${this.pieSize}px`;
    slice.style.clip = `rect(0px, ${this.pieSize}px, ${this.pieSize}px, ${this.pieSize / 2}px)`;
    document.querySelector(`.${sliceID} span`).style.width = `${this.pieSize}px`;
    document.querySelector(`.${sliceID} span`).style.height = `${this.pieSize}px`;
    document.querySelector(`.${sliceID} span`).style.clip = `rect(0px, ${this.pieSize}px, ${this.pieSize}px, ${this.pieSize / 2}px)`;
  }

  iterateSlices(sliceSize, offset, dataCount, sliceCount, color, text) {
    const sliceID = `s${dataCount}-${sliceCount}`;
    const maxSize = 179;

    if (sliceSize <= maxSize) {
      this.addSlice(sliceSize, offset, sliceID, color, text);
    } else {
      this.addSlice(maxSize, offset, sliceID, color, text);
      this.iterateSlices(sliceSize - maxSize, offset + maxSize, dataCount, sliceCount + 1, color, text);
    }
  }

  createPie() {
    let listData = Array.from(this.data, coinData => Number(coinData.percent));
    const listTotal = listData.reduce((acc, val) => acc + val, 0);
    let offset = 0;

    const legend = document.querySelector('.legend')
    legend.innerHTML = ``

    this.data.forEach((coinData, index) => {
      const size = this.sliceSize(coinData.percent, listTotal);
      this.iterateSlices(size, offset, index, 0, coinData.color, `${coinData.percent}`)
      
      let img = document.createElement('img')
      img.src = coinData.imgPath
      img.alt = `${coinData.name.toLowerCase()} icon`

      let li = document.createElement('li')
      let em = document.createElement('em')
      let span = document.createElement('span')

      li.style.setProperty('--beforeColor', coinData.color);

      span.innerText = `${coinData.percent}%`

      em.appendChild(img);
      em.innerHTML += coinData.name

      li.appendChild(em)
      li.appendChild(span)
      legend.appendChild(li)

      offset += size;
    })

    document.querySelector(this.pieElement).style.setProperty('--pie-size', `${this.pieSize}px`);
  }
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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

async function animationHeroDescription(content){
  let description = document.querySelector('.hero-description');
  description.innerHTML = ``
  await addChars(description, content);
}

function loadGrow(){
  const growItemsWrap = document.querySelector('.grow-items');

  growData.forEach((data, index) => {
    let growItem = document.createElement('div')
    growItem.classList.add('grow-item')
    if(index === 0) growItem.classList.add('grow-item-active')

    let h4 = document.createElement('h4')
    h4.classList.add('grow-item__text')
    h4.innerText = data.title

    let img = document.createElement('img')
    img.loading = 'lazy'
    img.src = data.imageSrc
    img.alt = data.imageAlt

    growItem.addEventListener('click', function(){
      loadActiveGrow(data, growItem)
    })

    growItem.appendChild(h4)
    growItem.appendChild(img)
    growItemsWrap.appendChild(growItem)
  })
}

function loadActiveGrow(data, growItem){
  document.querySelector('.grow-subtitle').innerText = data.title

  document.querySelectorAll(".grow-item").forEach(el => el.classList.remove('grow-item-active'))

  growItem.classList.add("grow-item-active")

  document.querySelector('.pieID.pie').innerHTML = ``
  let pieChart = new PieChart(".legend", ".pieID.pie", 380, data.data.coins);
  pieChart.createPie();
}


const investData = {
  "en": [
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
  ],
  "ru": [
    {
      imageSrc: './img/invest/1.png',
      title: 'Инвестируйте без трудностей',
      description: 'Выберите готовую стратегию, например "Bitcoin & Ethereum". Привяжите к ней свою банковскую карту. И выберите частоту пополнения, например, 100 $ раз в неделю.',
      btnLink: 'https://t.me/wisy_eng_bot?start=wisy_e',
      btnText: 'Начать'
    },
    {
      imageSrc: './img/invest/2.png',
      title: 'Готовые стратегии',
      description: 'Выберите готовую стратегию и инвестируйте автоматически или создайте свою собственную стратегию всего за несколько кликов в приложении.',
      btnLink: 'https://t.me/wisy_eng_bot?start=wisy_e',
      btnText: 'Начать'
    },
    {
      imageSrc: './img/invest/3.png',
      title: 'Бесплатное обучение',
      description: 'Научитесь сохранять и зарабатывать на криптовалюте. Вы получите доступ к 27 коротким курсам в виде карточек. Среднее время изучения курса составляет 7 минут.',
      btnLink: 'https://t.me/wisy_eng_bot?start=wisy_e',
      btnText: 'Начать'
    },
    {
      imageSrc: './img/invest/4.png',
      title: 'Простота и отсутствие стресса',
      description: 'Не нужно спекулировать и прилагать много усилий для покупки криптовалюты.',
      btnLink: 'https://t.me/wisy_eng_bot?start=wisy_e',
      btnText: 'Начать'
    },
  ]

};

const growData = [
  {
    imageSrc: "./img/grow/1.png", 
    imageAlt: "Top-10 market logo",
    title: "Top-10 market",
    data: {
      coins: [
        {
          name: 'Bitcoin',
          percent: 15,
          color: "#F9AA4A",
          imgPath: './img/grow/coins/bitcoin.svg'
        },
        {
          name: 'Ethereum',
          color: "#627EEA",
          percent: 15,
          imgPath: './img/grow/coins/ethereum.svg'
        },
        {
          name: 'SOL',
          color: "#0F0338",
          percent: 10,
          imgPath: './img/grow/coins/sol.svg'
        },
        {
          name: 'MATIC',
          color: "#7E3DE1",
          percent: 10,
          imgPath: './img/grow/coins/matic.svg'
        },
        {
          name: 'TON',
          color: "#08C",
          percent: 10,
          imgPath: './img/grow/coins/ton.svg'
        },
        {
          name: 'XRP',
          color: "#23292F",
          percent: 10,
          imgPath: './img/grow/coins/xrp.svg'
        },
        {
          name: 'TRX',
          color: "#EF0027",
          percent: 10,
          imgPath: './img/grow/coins/trx.svg'
        },
        {
          name: 'BNB',
          color: "#F3BA2F",
          percent: 10,
          imgPath: './img/grow/coins/bnb.svg'
        },
        {
          name: 'ADA',
          color: "#5798F4",
          percent: 10,
          imgPath: './img/grow/coins/ada.svg'
        },
        {
          name: 'LTC',
          color: "#345D9D",
          percent: 5,
          imgPath: './img/grow/coins/ltc.svg'
        },
      ],
    }
  },
  {
    imageSrc: "./img/grow/2.png", 
    imageAlt: "Top DeFi logo",
    title: "Top DeFi",
    data: {
      coins: [
        {
          name: 'Link',
          percent: 20,
          color: "#335DD2",
          imgPath: './img/grow/coins/link.svg'
        },
        {
          name: 'LDO',
          color: "#EA8B86",
          percent: 20,
          imgPath: './img/grow/coins/ldo.svg'
        },
        {
          name: 'COMP',
          color: "#00D395",
          percent: 15,
          imgPath: './img/grow/coins/comp.svg'
        },
        {
          name: 'AAVE',
          color: "#7E3DE1",
          percent: 15,
          imgPath: './img/grow/coins/aave.svg'
        },
        {
          name: 'FTM',
          color: "#1969FF",
          percent: 15,
          imgPath: './img/grow/coins/ftm.svg'
        },
        {
          name: 'MKR',
          color: "#54AEA1",
          percent: 15,
          imgPath: './img/grow/coins/xrp.svg'
        },

      ],
    }
  },
  {
    imageSrc: "./img/grow/3.png", 
    imageAlt: "Mem-index logo",
    title: "Mem-index",
    data: {
      coins: [
        {
          name: 'Doge',
          percent: 40,
          color: "#BA9F33",
          imgPath: './img/grow/coins/doge.svg'
        },
        {
          name: 'Shib',
          color: "#ED4A35",
          percent: 30,
          imgPath: './img/grow/coins/shib.svg'
        },
        {
          name: 'PEPE',
          color: "#3D8130",
          percent: 30,
          imgPath: './img/grow/coins/pepe.svg'
        },
      ],
    }
  },
  {
    imageSrc: "./img/grow/4.png", 
    imageAlt: "Top-3 market logo",
    title: "Top-3 market",
    data: {
      coins: [
        {
          name: 'Bitcoin',
          percent: 50,
          color: "#F9AA4A",
          imgPath: './img/grow/coins/bitcoin.svg'
        },
        {
          name: 'Ethereum',
          color: "#627EEA",
          percent: 30,
          imgPath: './img/grow/coins/ethereum.svg'
        },
        {
          name: 'XRP',
          color: "#23292F",
          percent: 20,
          imgPath: './img/grow/coins/xrp.svg'
        },
      ],
    }
  },
  {
    imageSrc: "./img/grow/9.png", 
    imageAlt: "Only Bitcoin logo",
    title: "Only Bitcoin",
    data: {
      coins: [
        {
          name: 'Bitcoin',
          percent: 100,
          color: "#F9AA4A",
          imgPath: './img/grow/coins/bitcoin.svg'
        },
      ],
    }
  },
  {
    imageSrc: "./img/grow/5.png", 
    imageAlt: "POW-index logo",
    title: "POW-index",
    data: {
      coins: [
        {
          name: 'Bitcoin',
          percent: 40,
          color: "#F9AA4A",
          imgPath: './img/grow/coins/bitcoin.svg'
        },
        {
          name: 'LTC',
          color: "#345D9D",
          percent: 15,
          imgPath: './img/grow/coins/ltc.svg'
        },
        {
          name: 'Doge',
          percent: 15,
          color: "#BA9F33",
          imgPath: './img/grow/coins/doge.svg'
        },
        {
          name: 'KAS',
          percent: 10,
          color: "#70C9BB",
          imgPath: './img/grow/coins/kas.svg'
        },
        {
          name: 'XMR',
          percent: 10,
          color: "#FA6800",
          imgPath: './img/grow/coins/xmr.svg'
        },
        {
          name: 'BCH',
          percent: 10,
          color: "#0AC18E",
          imgPath: './img/grow/coins/bch.svg'
        },
      ],
    }
  },
  {
    imageSrc: "./img/grow/6.png", 
    imageAlt: "BTC & ETH logo",
    title: "BTC & ETH",
    data: {
      coins: [
        {
          name: 'Bitcoin',
          percent: 50,
          color: "#F9AA4A",
          imgPath: './img/grow/coins/bitcoin.svg'
        },
        {
          name: 'Ethereum',
          color: "#627EEA",
          percent: 50,
          imgPath: './img/grow/coins/ethereum.svg'
        },
      ],
    }
  },
  {
    imageSrc: "./img/grow/7.png", 
    imageAlt: "L2-index logo",
    title: "L2-index",
    data: {
      coins: [
        {
          name: 'ARB',
          percent: 30,
          color: "#213147",
          imgPath: './img/grow/coins/arb.svg'
        },
        {
          name: 'OP',
          color: "#FF0420",
          percent: 15,
          imgPath: './img/grow/coins/op.svg'
        },
        {
          name: 'MATIC',
          color: "#7E3DE1",
          percent: 40,
          imgPath: './img/grow/coins/matic.svg'
        },

      ],
    }
  },
  {
    imageSrc: "./img/grow/8.png", 
    imageAlt: "Only Ethereum logo",
    title: "Only Ethereum market",
    data: {
      coins: [
        {
          name: 'Ethereum',
          color: "#627EEA",
          percent: 100,
          imgPath: './img/grow/coins/ethereum.svg'
        },
      ],
    }
  },
  {
    imageSrc: "./img/grow/10.png", 
    imageAlt: "POS-index logo",
    title: "POS-index market",
    data: {
      coins: [
        {
          name: 'Ethereum',
          color: "#627EEA",
          percent: 40,
          imgPath: './img/grow/coins/ethereum.svg'
        },
        {
          name: 'SOL',
          color: "#0F0338",
          percent: 10,
          imgPath: './img/grow/coins/sol.svg'
        },
        {
          name: 'MATIC',
          color: "#7E3DE1",
          percent: 20,
          imgPath: './img/grow/coins/matic.svg'
        },
        {
          name: 'TON',
          color: "#08C",
          percent: 10,
          imgPath: './img/grow/coins/ton.svg'
        },
        {
          name: 'ADA',
          color: "#5798F4",
          percent: 10,
          imgPath: './img/grow/coins/ada.svg'
        },
      ],
    }
  }
]

const configMulti = {
  langs: ['en', 'ru'],
  defaultLang: 'en',
  classLang: '.change-language',
  path: './data/languages',
  selectClass: '.select-langugage'
}

document.addEventListener('DOMContentLoaded', function(){

  const multi = new MultiLanguage(configMulti);
  multi.changeLanguage()

  let copyBtns = document.querySelectorAll('.legal-copy');

  copyBtns.forEach(copyBtn => {
    copyBtn.addEventListener('click', async function(){
      let containerBtn = copyBtn.closest('.legal-content');

      let allContent = await getAllContent(containerBtn);
      await navigator.clipboard.writeText(allContent)
    })
  })

  function columnForecast(){
    document.querySelectorAll('.forecast-column').forEach(el => {
      let height = el.parentElement.closest('.forecast-wrap').offsetHeight * parseInt(el.parentElement.dataset.size) / 100
      el.style.height = `${height}px`
    })
  }
  if(document.querySelector('.forecast-column')){
    columnForecast()
    const blocksToAnimate = document.querySelectorAll('.forecast-column');
    const options = {
      threshold: 0.3 
    };

    const observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          blocksToAnimate.forEach(el => {
            el.classList.add('forecast-column-animated');
          })
          observer.unobserve(entry.target);
        }
      });
    }, options);

    observer.observe(blocksToAnimate[0].parentElement);
  }
  
  setCurrentPageActiveLink()
  if('/' == document.location.pathname){

    loadGrow();
    let pieChart = new PieChart(".legend", ".pieID.pie", 380, growData[0].data.coins);
    pieChart.createPie();
    const mySlider = new Slider('.guide-slider', '.guide-slide');
  }
})

