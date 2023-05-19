function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const indexSlide = document.querySelector(currentCounter),
        totalSlides = document.querySelector(totalCounter),
        slider = document.querySelector(container),
        sliderWindow = document.querySelector(wrapper),
        sliderCarousel = document.querySelector(field),
        slides = document.querySelectorAll(slide),
        nextSlide = document.querySelector(nextArrow),
        prevSlide = document.querySelector(prevArrow),
        width = window.getComputedStyle(sliderWindow).width;

    let slideIndex = 1;
    let offset = 0;

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        }
        return num;
    }

    function changeDot() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    function scrollSlide() {
        sliderCarousel.style.transform = `translateX(-${offset}px)`;
    }

    function changeIndexCounter() {
        indexSlide.innerHTML = `${getZero(slideIndex)}`;
    }

    function removeLetters(elem) {
        return +elem.replace(/\D/g, '');
    }

    changeIndexCounter();

    totalSlides.innerHTML = `/${getZero(slides.length)}`;

    sliderCarousel.style.width = `${100 * slides.length}%`;
    sliderCarousel.style.display = 'flex';
    sliderCarousel.style.transition = '0.5s all';

    sliderWindow.style.overflow = 'hidden';

    slides.forEach((elem) => {
        elem.style.width = width;
    });

    slider.style.position = 'relative';


    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
  `;

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;
    `;
        if (i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);

        dots.push(dot);
    }

    nextSlide.addEventListener('click', () => {

        if (offset == removeLetters(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += removeLetters(width);
        }

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        scrollSlide();
        changeDot();
        changeIndexCounter();
    });

    prevSlide.addEventListener('click', () => {

        if (offset == 0) {
            offset = removeLetters(width) * (slides.length - 1);
        } else {
            offset -= removeLetters(width);
        }

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        scrollSlide();
        changeDot();
        changeIndexCounter();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = removeLetters(width) * (slideTo - 1);

            scrollSlide();
            changeDot();
            changeIndexCounter();
        });
    });
}

export default slider;