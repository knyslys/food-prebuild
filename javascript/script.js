import { setDate } from "./countdown.js";
import { slideTo, sliderItemContainer, slider } from "./slider.js";
import { products } from "./products.js";
import { itemsInCart, showItemsInCart } from "./cart.js";
const countdownContainer = document.querySelector(".offers__countdown");
const futureDate = new Date("Jan 15, 2023 15:37:25").getTime();
let countdownInterval = setInterval(() => {
  //gaunam array datu. Dienos / valandos/ minutes / sekundes
  let countdownDate = setDate(futureDate);
  //kiekviena sekunde resetinam containerio boxus datu.
  countdownContainer.innerHTML = "";

  //sukam datu array ir displayinam datas
  countdownDate.forEach((d, i) => {
    countdownContainer.insertAdjacentHTML(
      "afterbegin",
      ` <div class="offers__countdown__box">${d}</div>`
    );

    //addinam : simboly
    if (i < countdownDate.length - 1) {
      countdownContainer.insertAdjacentHTML("afterbegin", "<span>:</span>");
    }
  });
}, 1000);

//nuotrauku slideris
sliderItemContainer.forEach((item, i) =>
  item.addEventListener("click", () => {
    slideTo(i);
  })
);

//setinam top menu, jei  nuscrolinam tam tikra atstuma
window.addEventListener("scroll", () => {
  if (document.documentElement.scrollTop > 0) {
    document.querySelector(".navigation").classList.add("navigation--fixed");
  } else {
    document.querySelector(".navigation").classList.remove("navigation--fixed");
  }
});

//--------------------------testimonials slider
const testimonialWrapper = document.querySelectorAll(".wrapper");
const testimonialBox = document.querySelectorAll(".testimonials__box");
const TESTIMONIAL_SIZE_UNTIL_WRAP = 900;
let currentSlide;
let activeSlide;
let slideClass = Math.round(testimonialWrapper.length / 2);

const leftArrow = document.querySelector(".arrow-left");
const rightArrow = document.querySelector(".arrow-right");

const settingDefaultTestimonial = (screenWidth) => {
  if (screenWidth > TESTIMONIAL_SIZE_UNTIL_WRAP) {
    activeSlide = 1;
    currentSlide = 0;
  } else {
    activeSlide = 0;
    currentSlide = 0;
  }

  setActiveSlide(activeSlide);
  slideTestimonial(currentSlide);
};
const slideTestimonial = (curr) => {
  console.log(curr);
  testimonialWrapper.forEach((wrapper) => {
    wrapper.style.transform = "translateX(" + curr * 100 + "%)";
  });
};

const setActiveSlide = (curr) => {
  testimonialBox.forEach((w) => w.classList.remove("selected"));
  testimonialBox[curr].classList.add("selected");
};

rightArrow.addEventListener("click", () => {
  currentSlide--;
  activeSlide++;
  if (screen.width > TESTIMONIAL_SIZE_UNTIL_WRAP) {
    //logika, jeigu testimonialsus rodom po 3.
    if (activeSlide >= testimonialWrapper.length - 1) {
      currentSlide = 0;
      activeSlide = 1;
    }
  }

  if (screen.width <= TESTIMONIAL_SIZE_UNTIL_WRAP) {
    //logika, jeigu testimonialsuss rodom po 1
    if (activeSlide >= testimonialWrapper.length) {
      currentSlide = 0;
      activeSlide = 0;
    }
  }
  slideTestimonial(currentSlide);
  setActiveSlide(activeSlide);
});

leftArrow.addEventListener("click", () => {
  currentSlide++;
  activeSlide--;
  if (screen.width > TESTIMONIAL_SIZE_UNTIL_WRAP) {
    if (activeSlide <= 0) {
      currentSlide = (testimonialWrapper.length - 3) * -1;
      activeSlide = testimonialWrapper.length - 2;
    }
  }

  if (screen.width <= TESTIMONIAL_SIZE_UNTIL_WRAP) {
    if (activeSlide < 0) {
      currentSlide = (testimonialWrapper.length - 1) * -1;
      activeSlide = testimonialWrapper.length - 1;
      console.log(currentSlide);
      console.log(activeSlide);
    }
  }
  slideTestimonial(currentSlide);
  setActiveSlide(activeSlide);
});

//----------------------end of testimonial

//showing cart

//hiding cart

document.querySelector(".close-icon").addEventListener("click", () => {
  document.querySelector(".cart-page").classList.add("cart-page--off");
});

settingDefaultTestimonial(screen.width);
window.addEventListener("resize", () => {
  settingDefaultTestimonial(screen.width);
  console.log("hi");
});

//mobile navigation
const mobileNavigationIcon = document.querySelector(".mobilenavigation");
const mobileNavigationList = document.querySelector(".mob-navigation");
const hideMobileNavigation = document.querySelector(".hide-mobile");
mobileNavigationIcon.addEventListener("click", () => {
  mobileNavigationIcon.classList.toggle("mobilenavigation--off");

  if (!mobileNavigationIcon.classList.contains("mobilenavigation--off")) {
    mobileNavigationList.classList.remove("mob-navigation--hidden");
  } else {
    mobileNavigationList.classList.add("mob-navigation--hidden");
  }
});

hideMobileNavigation.addEventListener("click", () => {
  mobileNavigationList.classList.add("mob-navigation--hidden");
  mobileNavigationIcon.classList.add("mobilenavigation--off");
});
