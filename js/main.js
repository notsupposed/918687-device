const ESC_KEY_CODE = 27;

const btnFeedback = document.querySelector('.contacts a.button');
const modalFeedback = document.querySelector('.modal-feedback');
const closeFeedback = document.querySelector('.modal-feedback .modal-close');

const linkMap = document.querySelector('.contacts a.map');
const modalMap = document.querySelector('.modal-map');
const closeMap = document.querySelector('.modal-map .modal-close');

btnFeedback.addEventListener('click', function (e) {
  e.preventDefault();
  modalFeedback.classList.add('modal-show');
  modalFeedback.querySelector('#feedback-name').focus();
});

closeFeedback.addEventListener('click', function (e) {
  e.preventDefault();
  modalFeedback.classList.remove('modal-show');
});

linkMap.addEventListener('click', function (e) {
  e.preventDefault();
  modalMap.classList.add('modal-show');
});

closeMap.addEventListener('click', function (e) {
  e.preventDefault();
  modalMap.classList.remove('modal-show');
});

window.addEventListener('keydown', function (e) {
  if (e.keyCode !== ESC_KEY_CODE) return;
  const modal = document.querySelector('.modal-show');
  if (modal) {
    e.preventDefault();
    modal.classList.remove('modal-show');
  }
});