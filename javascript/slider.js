export const slider = document.querySelector(".offers__slider");
export const sliderItemContainer = document.querySelectorAll(
  ".offers__slider__container"
);

export function slideTo(id) {
  sliderItemContainer.forEach((item) => {
    item.classList.remove("offers__slider__container--active");
  });

  slider.scrollLeft = sliderItemContainer[id].clientWidth * id;
  sliderItemContainer[id].classList.add("offers__slider__container--active");
}
