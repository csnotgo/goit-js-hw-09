import Notiflix from 'notiflix';
Notiflix.Notify.init({ useIcon: false });

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const form = document.querySelector('form');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', checkedValue);

function checkedValue(e) {
  form.delay.value;
  form.step.value;
  form.amount.value;
}

function onFormSubmit(e) {
  e.preventDefault();
  createPromise(2, 1000)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
