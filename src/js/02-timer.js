import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import "flatpickr/dist/flatpickr.min.css";

const refs = {
  start: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
}

class Timer {
  constructor({ onTick }) {
    this.onTick = onTick;
    this.countDownDate = 0;
  }
  
  init() {
    const time = this.convertMs(this.countDownDate - Date.now());
    this.onTick(time);
  }
  
  start() {
    const startTime = this.countDownDate;
    
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const time = this.convertMs(deltaTime);
      
      this.onTick(time);
    }, 1000);
  }
  
  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    
    const days = this.pad(Math.floor(ms / day));
    const hours = this.pad(Math.floor((ms % day) / hour));
    const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
    const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));
    
    return { days, hours, minutes, seconds };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  get date() {
    return this.countDownDate;
  }

  set date(date) {
    this.countDownDate = date;
  }
}

refs.start.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Date.now() >= selectedDates[0].getTime()) return Notify.failure('Please choose a date in the future', { width: '400px' });
    refs.start.disabled = false;
    timer.date = selectedDates[0].getTime();
    timer.init()
  },
};

const fp = flatpickr("#datetime-picker", options);

const timer = new Timer({ onTick: updateClockFace });

refs.start.addEventListener('click', onStartClick);

function onStartClick() {
  timer.start();
}

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}



