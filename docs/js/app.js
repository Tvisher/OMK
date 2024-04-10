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

const headerSliderEl = document.querySelectorAll('.header__slider');
if (headerSliderEl.length > 0) {
    headerSliderEl.forEach(headerSlider => {
        const headerSlliderSlides = headerSlider.querySelectorAll('.release-item');
        let defaultActiveSlideIndex = Array.from(headerSlliderSlides).findIndex(slide => slide.classList.contains('active-release'));
        defaultActiveSlideIndex = defaultActiveSlideIndex > 1 ? defaultActiveSlideIndex - 1 : 0;
        const releasesSlider = new Swiper(headerSlider, {
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
                beforeInit: (slider) => {
                    headerSlider.classList.add('loaded')
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
        window.addEventListener('load', (e) => {
            releasesSlider.init();
        });



    })

}

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
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    on: {
        activeIndexChange: (slider) => {
            if ($(window).width() < 993) {
                $('.main-screen-slide__news-list_wrapper').slideUp();
                $(".main-screen_btn_mobile").show();
            }
        },
    }
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
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
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
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

});

const galerySections = document.querySelectorAll('.galery-section');
if (galerySections.length > 0) {
    galerySections.forEach(galerySection => {
        const galerySectionSliderEl = galerySection.querySelector('.article-body .galery-section__slider')
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
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
    })

}

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

    $('.footer__title').marquee({
        duration: 90000, // Скорость бегущей строки в миллисекундах
        gap: 10, // Расстояние между повторениями в пикселях
        delayBeforeStart: 0, // Задержка перед началом анимации в миллисекундах
        direction: 'left', // Направление движения бегущей строки
        duplicated: true, // Создавать копию текста для бесконечной анимации
        startVisible: true
    });
});
if (galerySections.length > 0) {
    galerySections.forEach(galerySection => {
        const galerySectionSliderEl = galerySection.querySelector('.smal-container .galery-section__slider')
        const prevBtn = galerySection.querySelector('.swiper-button-prev');
        const nextBtn = galerySection.querySelector('.swiper-button-next');
        const galerySectionSlider = new Swiper(galerySectionSliderEl, {
            speed: 800,
            slidesPerView: 'auto',
            spaceBetween: 20,
            navigation: {
                nextEl: nextBtn,
                prevEl: prevBtn,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
    })

}


const leftMenu = document.querySelector('.main-screen__menu._main-slider-menu');
// const mobileMenuBack = document.querySelector('.mobile_menu_back');
document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('[data-menu-btn]')) {
        const cuttentMenuItem = target.closest('[data-menu-btn]');
        const cuttentMenuItemId = cuttentMenuItem.dataset.menuBtn;

        const innerMenuItemPrev = document.querySelector('[data-menu-item].show');
        const cuttentMenuItemPrev = document.querySelector('[data-menu-btn].selected');
        if (cuttentMenuItemPrev) cuttentMenuItemPrev.classList.remove('selected');
        if (innerMenuItemPrev) innerMenuItemPrev.classList.remove('show');

        const innerMenuItem = document.querySelector(`[data-menu-item="${cuttentMenuItemId}"]`);
        innerMenuItem.classList.add('show');
        leftMenu.classList.add('fixed');
        cuttentMenuItem.classList.add('selected');
    }
    if (!target.closest('.main-screen__wrapper') && leftMenu && leftMenu.classList.contains('fixed')) {
        leftMenu.classList.remove('fixed');
        document.querySelector('[data-menu-btn].selected').classList.remove('selected');
        document.querySelector('[data-menu-item].show').classList.remove('show');
    }
})

$("[data-mobile-menu-item]").on("click", function (e) {
    e.preventDefault();
    let href = $(this).attr("href");
    console.log($(href));
    $(href).addClass('show');
    $('.mobile_menu_back').addClass('show');

});
$(".mobile_menu_back").on('click', function () {
    $(this).removeClass('show')
    $('.main-screen__menu-inner').removeClass('show')

});
const players = Plyr.setup('[data-players]', {
    controls: [
        'play-large',
        'play',
        'progress',
        'current-time',
        'mute',
        'volume',
        'captions',
        'pip',
        'airplay',
        'fullscreen'
    ],
});

$(document).ready(function () {
    $(document).on("click", ".toggle-block__head", function (e) {
        $(this).parent().toggleClass("toggle-open");
        $(this)
            .next()
            .slideToggle(() => {
                $(this).toggleClass("toggle-open");
            });
    });
    $(document).on("click", ".mobile_menu_btn", function (e) {
        $('.mobile_menu_btn').toggleClass("active");
        $('.mobile_menu').toggleClass("active");
        $('body').toggleClass("locked");

    });

    $(".menu-inner__search .search-input").on('input', function () {
        if ($(this).val().trim().length) {
            $('.search__close_text').addClass("active")
        } else {
            $('.search__close_text').removeClass("active");
        }
    });
    $(".search__close_text").on('click', function () {
        $('.menu-inner__search .search-input').val('');
        $(this).removeClass("active");
    });
    $(".main-screen_btn_mobile").on('click', function () {
        $(this).next().slideToggle();
        $(this).hide();

    });
})
const newsSlider = new Swiper('.news__list-slider', {
    slidesPerView: 'auto',
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        577: {
            slidesPerView: 2,
        },
        993: {
            slidesPerView: 4,
        },
    },
})