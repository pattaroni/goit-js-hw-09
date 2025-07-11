import validator from 'validator';

const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';

const email = form.elements.email;
const message = form.elements.message;

const savedData = JSON.parse(localStorage.getItem(localStorageKey));
if (savedData) {
  email.value = savedData.email || '';
  message.value = savedData.message || '';
  formData.email = savedData.email || '';
  formData.message = savedData.message || '';
}
~form.addEventListener('input', evt => {
  if (evt.target.nodeName === 'INPUT') {
    formData.email = evt.target.value;
  } else if (evt.target.nodeName === 'TEXTAREA') {
    formData.message = evt.target.value;
  }
  localStorage.setItem(localStorageKey, JSON.stringify(formData));
});

form.addEventListener('submit', evt => {
  evt.preventDefault();
  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
    return;
  } else if (!validator.isEmail(email.value)) {
    alert('Invalid email!');
    return;
  } else {
    console.log(formData);
    localStorage.removeItem(localStorageKey);
  }
  form.reset();
  formData.email = '';
  formData.message = '';
});
