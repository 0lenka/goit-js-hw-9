const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.stop.disabled = true;

refs.start.addEventListener('click', () => {
  intervalId = setInterval(changeColor, 1000);
  refs.start.disabled = true;
  refs.stop.disabled = false;
})

refs.stop.addEventListener('click', () => {
  clearInterval(intervalId);
  refs.stop.disabled = true;
  refs.start.disabled = false;
})

function changeColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}