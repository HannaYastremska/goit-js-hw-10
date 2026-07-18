console.log('Timer');
// 1. Імпортуємо необхідні бібліотеки та їхні стилі
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// 2. Знаходимо всі необхідні елементи DOM
const startBtn = document.querySelector('button[data-start]');
const datetimePicker = document.querySelector('#datetime-picker');
const daysVal = document.querySelector('[data-days]');
const hoursVal = document.querySelector('[data-hours]');
const minutesVal = document.querySelector('[data-minutes]');
const secondsVal = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let timerId = null;

// 3. Налаштування для бібліотеки flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    // Перевірка: якщо обрана дата в минулому або прямо зараз
    if (selectedDate <= new Date()) {
      // Замість window.alert() використовуємо iziToast згідно з ТЗ
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
        backgroundColor: '#ef4040',
        titleColor: '#ffffff',
        messageColor: '#ffffff',
        iconColor: '#ffffff',
      });
      startBtn.disabled = true;
    } else {
      // Якщо дата правильна — вмикаємо кнопку Start
      userSelectedDate = selectedDate;
      startBtn.disabled = false;
    }
  },
};

// Ініціалізуємо календар на інпуті
flatpickr(datetimePicker, options);

// 4. Слухач події на кнопку Start
startBtn.addEventListener('click', () => {
  // При натисканні кнопка та інпут стають неактивними
  startBtn.disabled = true;
  datetimePicker.disabled = true;

  timerId = setInterval(() => {
    const currentTime = new Date();
    const deltaTime = userSelectedDate - currentTime;

    // Якщо таймер дійшов до кінця (залишок часу дорівнює нулю або менше)
    if (deltaTime <= 0) {
      clearInterval(timerId);
      updateTimerInterface({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      datetimePicker.disabled = false; // Знову вмикаємо інпут
      return;
    }

    // Конвертуємо мілісекунди в об'єкт часу та оновлюємо інтерфейс
    const timeComponents = convertMs(deltaTime);
    updateTimerInterface(timeComponents);
  }, 1000);
});

// Функція оновлення текстового вмісту елементів на сторінці
function updateTimerInterface({ days, hours, minutes, seconds }) {
  daysVal.textContent = addLeadingZero(days);
  hoursVal.textContent = addLeadingZero(hours);
  minutesVal.textContent = addLeadingZero(minutes);
  secondsVal.textContent = addLeadingZero(seconds);
}

// Функція форматування: додає 0 попереду, якщо в числі менше двох символів
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Функція конвертації мілісекунд в об'єкт (надана в ТЗ)
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
