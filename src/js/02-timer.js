import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
const calendar = document.querySelector('#datetime-picker');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minsValue = document.querySelector('[data-minutes]');
const secsValue = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const today = options.defaultDate.getDate();
    if (selectedDates[0].getDate() <= today) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
    console.log(selectedDates[0]);
  },
};

const fp = flatpickr(calendar, options);

startBtn.addEventListener('click', onBtnClick);
startBtn.disabled = true;

function onBtnClick(e) {
  setInterval(() => {
    const currentTime = Date.now();
    const time = convertMs(fp.selectedDates[0] - currentTime);
    updateTimerValue(time);
  }, 1000);
}

function updateTimerValue({ days, hours, minutes, seconds }) {
  daysValue.textContent = `${days}`;
  hoursValue.textContent = `${hours}`;
  minsValue.textContent = `${minutes}`;
  secsValue.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
