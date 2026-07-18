// 1. Імпортуємо iziToast та стилі (магія Vite)
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// 2. Знаходимо форму на сторінці
const form = document.querySelector('.form');

// 3. Додаємо слухач події на сабміт форми
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  // Заборонюємо стандартне перезавантаження сторінки
  event.preventDefault();

  // Отримуємо значення з полів форми
  const delay = Number(event.currentTarget.elements.delay.value);
  const state = event.currentTarget.elements.state.value;

  // 4. Створюємо проміс за допомогою конструктора new Promise
  createPromise(delay, state)
    .then(delay => {
      // Якщо проміс виконався вдало (fulfilled)
      iziToast.success({
        title: 'OK',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#59a16d',
        titleColor: '#ffffff',
        messageColor: '#ffffff',
        iconColor: '#ffffff',
      });
    })
    .catch(delay => {
      // Якщо проміс відхилено (rejected)
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#ef4040',
        titleColor: '#ffffff',
        messageColor: '#ffffff',
        iconColor: '#ffffff',
      });
    });

  // Очищаємо поля форми після створення промісу
  event.currentTarget.reset();
}

// Функція-генератор промісу
function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    // Запускаємо таймер на вказану кількість мілісекунд
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay); // Передаємо delay як аргумент у метод resolve
      } else {
        reject(delay); // Передаємо delay як аргумент у метод reject
      }
    }, delay);
  });
}
