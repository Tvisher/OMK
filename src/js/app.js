function testWebP() {
    return new Promise(res => {
        const webP = new Image();
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        webP.onload = webP.onerror = () => {
            res(webP.height === 2);
        };
    }).then(hasWebP => {
        let className = hasWebP === true ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
    });
};
// Проверка поддержки webP 
testWebP();




const headerSlliderEl = document.querySelector('.header__slider');
const headerSlliderSlides = headerSlliderEl.querySelectorAll('.release-item');
const defaultActiveSlideIndex = Array.from(headerSlliderSlides).findIndex(slide => slide.classList.contains('active-release'));
const releasesSlider = new Swiper(headerSlliderEl, {
    initialSlide: defaultActiveSlideIndex,
    // speed: 800,
    grabCursor: true,
    slidesPerView: 'auto',
    freeMode: true,
    spaceBetween: 14,
    init: false,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    on: {
        init: (slider) => {
            // const defaultTranslate = slider.getTranslate() + 50;
            // slider.setTranslate(defaultTranslate)
        },
        progress: function (swiper) {
            if (swiper.isEnd) {
                swiper.el.classList.add('slider_end')
            } else {
                swiper.el.classList.remove('slider_end')
            }
            if (swiper.isBeginning) {
                swiper.el.classList.remove('slider_move')
            } else {
                swiper.el.classList.add('slider_move')
            }
        },
    },
});


const mainScreenSlider = new Swiper('.main-screen__slider', {
    speed: 800,
    slidesPerView: 1,
    spaceBetween: 14,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

});

const sliderScrollContainer = document.querySelectorAll('.main-screen-slide__news-list');
sliderScrollContainer.forEach(sliderNews => {
    const sliderNewsWrapper = sliderNews.closest('.main-screen-slide__news-list_wrapper');
    sliderNews.addEventListener("scroll", e => {
        const elScrollTop = e.target.scrollTop;
        const elScrollHeight = e.target.scrollHeight;
        const elHeight = e.target.clientHeight;
        if ((elScrollHeight - elScrollTop - 100) <= elHeight) {
            sliderNewsWrapper.classList.add('hide-shadow')
        } else {
            sliderNewsWrapper.classList.remove('hide-shadow')
        }
    })
})




window.addEventListener('load', (e) => {
    releasesSlider.init();
    headerSlliderEl.classList.add('loaded')
});
