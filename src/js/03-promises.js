import { Notify } from "notiflix";

const refs = {
  form: document.querySelector('.form')
};

refs.form.addEventListener('submit', (event) => {
  event.preventDefault();
  createDelay(event);  

})

function createDelay() {
  const form = event.currentTarget;
  const times = parseInt(form.elements.amount.value);
  let delay = parseInt(form.elements.delay.value);
  let step = parseInt(form.elements.step.value);

  for (let i = 1; i <= times; i += 1) {
    createPromise(i, delay)
      .then(value => Notify.success(value, { width: '350px' }))
      .catch(error => Notify.failure(error, { width: '350px' }));
    delay += step;
  }

  delay = parseInt(form.elements.delay.value);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`)
  
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`)
      };

    }, delay);
  });
};