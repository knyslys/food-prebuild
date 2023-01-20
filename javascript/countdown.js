function setDate(futureDate) {
  let now = new Date().getTime();
  let distance = futureDate - now;

  //returninam nieko, jei dabartine data > future data
  if (distance < 0) return;

  //formules datu vienetam *__*
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  let fullDate = [days, hours, minutes, seconds];
  return fullDate;
}

export { setDate };
