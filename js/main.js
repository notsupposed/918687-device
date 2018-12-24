const btnFeedback = document.querySelector('.contacts a.button');
const modalContact = document.querySelector('.modal-login');

const linkMap = document.querySelector('.contacts a.map');

btnContacts.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.add("modal-show");
});