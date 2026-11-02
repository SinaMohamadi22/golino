
let swiperInstance = null;

const initSwiper = () => {
  const swiperElement = document.querySelector(".mySwiper");

  if (!swiperElement || typeof Swiper === "undefined") return;

  if (swiperInstance) {
    swiperInstance.destroy(true, true);
  }

  swiperInstance = new Swiper(swiperElement, {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    grabCursor: true,

    breakpoints: {
      0: {
        slidesPerView: 1.1,
        spaceBetween: 20,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
  });
};

const commentSwiper = () => {
  const commentSwiperElement =
    document.querySelector(".commentSwiper");

  if (!commentSwiperElement || typeof Swiper === "undefined") return;

  new Swiper(commentSwiperElement, {
    loop: true,

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    grabCursor: true,

    breakpoints: {
      0: {
        slidesPerView: 1.1,
        spaceBetween: 20,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });
};

export { initSwiper, commentSwiper };
