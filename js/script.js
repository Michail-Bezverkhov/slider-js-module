import slider from './modules/slider.js';

new slider({
    container: '.slider',
    nextArrow: '.slider__next-slide-btn',
    prevArrow: '.slider__prev-slide-btn',
    slide: '.slider__slide',
    totalCounter: '#total',
    currentCounter: '#current',
    wrapper: '.slider__wrapper',
    field: '.slider__carousel'
});
