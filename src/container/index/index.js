class Slider {
  //сюди будем класти посилання на  <div class="slider__content">
  static #content = null

  //на кнопки
  static #left = null
  static #right = null

  //поточна картинка в слайдері
  static #count = 1

  //число макс кількості картинок
  static #max = null

  // підключає всі потрібні значення до полей
  static init = () => {
    this.#content = document.querySelector(
      '.slider__content',
    )
    this.#left = document.querySelector(
      '.slider__button--left',
    )
    this.#right = document.querySelector(
      '.slider__button--right',
    )

    this.#max = this.#content.childElementCount

    //підключаємо виконання #slide передавши туди left
    this.#left.onclick = () => this.#slide('left')

    // right
    this.#right.onclick = () => this.#slide('right')
  }

  //буде прокручувати картинки
  //side - вказує left або right

  static #slide = (side) => {
    // дізнаємося поточну інфу для того, щоб виконати прокрутку

    // ширина доступного контенту(ширина картинки при зміні ширини екрана)
    const offsetWidth = this.#content.offsetWidth

    //на скільки вже прокручена картинка
    const scrollLeft = this.#content.scrollLeft

    //доступна ширина для прокрутки(для всіх картинок)
    const scrollWidth = this.#content.scrollWidth

    //показує на скільки пікселів потрібно прокрутити
    let scroll = 0

    if (side === 'left') {
      if (this.#count === 1 || scrollLeft === 0) {
        this.#count = this.#max
        scroll = (this.#count - 1) * offsetWidth
      } else {
        this.#count -= 1
        scroll = (this.#count - 1) * offsetWidth
      }
    }

    if (side === 'right') {
      if (
        this.#count === this.#max ||
        scrollLeft === scrollWidth - offsetWidth
      ) {
        this.#count = 1
        scroll = 0
      } else {
        this.#count += 1
        scroll = (this.#count - 1) * offsetWidth
      }
    }
    // виконуємо прокрутку
    this.#content.scrollTo({
      top: 0,
      left: scroll,
      behavior: 'smooth',
    })
  }
}
Slider.init()

class Header {
  // інфа про висоту меню
  static #height = null

  //<div class="header__wrapper">
  static #wrapper = null

  //<button class="header__button
  static #button = null

  //відкрите чи закрите вікно
  static #isOpen = false

  //підключаємо селектори для приватних полей
  static init() {
    this.#height = document.querySelector(
      '.header__bottom',
    ).offsetHeight

    this.#wrapper = document.querySelector(
      '.header__wrapper',
    )

    this.#button = document.querySelector('.header__button')

    this.#button.onclick = this.#toggle
  }

  //змінюємо стилі для wrapper та кнопки
  static #toggle = () => {
    //перевіряємо відкрите чи закрите вікно
    if (this.#isOpen) {
      this.#button.classList.replace(
        'header__button--close',
        'header__button--open',
      )

      this.#wrapper.style.height = 0
    } else {
      this.#button.classList.replace(
        'header__button--open',
        'header__button--close',
      )
      this.#wrapper.style.height = `${this.#height}px`
    }
    // робимо зворотнє значення
    this.#isOpen = !this.#isOpen
  }
}

Header.init()
