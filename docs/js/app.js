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
        afterInit: (slider) => {
            // setTimeout(() => {
            //     const defaultTranslate = slider.getTranslate() + 150;
            //     slider.setTranslate(defaultTranslate);
            // }, 100);
            headerSlliderEl.classList.add('loaded')
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
    loop: true,
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
});

const peopleSaysThumbsSlider = new Swiper(".people-says__thumbs-slider", {
    // loop: true,
    speed: 800,
    spaceBetween: 37,
    slidesPerView: 'auto',
    freeMode: true,
    watchSlidesProgress: true,
    direction: 'vertical',
    on: {
        progress: function (swiper, p) {
            if (swiper.isEnd) {
                swiper.el.classList.add('slider_end')
            } else {
                swiper.el.classList.remove('slider_end')
            }

        },
    }
});

const peopleSaysMainSlider = new Swiper(".people-says__main-slider", {
    // loop: true,
    speed: 800,
    spaceBetween: 10,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    thumbs: {
        swiper: peopleSaysThumbsSlider,
    },
    on: {
        transitionStart: () => peopleSaysThumbsSlider.slideTo(peopleSaysMainSlider.activeIndex)
    }
});

const insetSlider = new Swiper('.inset-slider', {
    speed: 800,
    slidesPerView: 1,
    spaceBetween: 14,
    loop: true,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

});

const galerySection = document.querySelector('.galery-section');
const galerySectionSliderEl = galerySection.querySelector('.galery-section__slider')
const prevBtn = galerySection.querySelector('.swiper-button-prev');
const nextBtn = galerySection.querySelector('.swiper-button-next');
const galerySectionSlider = new Swiper(galerySectionSliderEl, {
    speed: 800,
    slidesPerView: "auto",
    spaceBetween: 20,
    navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn,
    },
});




window.addEventListener('load', (e) => {
    releasesSlider.init();
});



$(document).ready(function () {
    const marquees = document.querySelectorAll('.popular-tags__list');
    marquees.forEach((marqueeItem, index) => {
        const direction = index % 2 == 0 ? 'left' : 'right';
        $(marqueeItem).marquee({
            duration: 30000, // Скорость бегущей строки в миллисекундах
            gap: 10, // Расстояние между повторениями в пикселях
            delayBeforeStart: 0, // Задержка перед началом анимации в миллисекундах
            direction: direction, // Направление движения бегущей строки
            duplicated: true, // Создавать копию текста для бесконечной анимации
            pauseOnHover: true, // Остановка анимации при наведении
            startVisible: true
        });
    })

});