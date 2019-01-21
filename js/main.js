// IE11 doesn't support forEach for NodeList
// https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Polyfill
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

const ESC_KEY_CODE = 27;

const feedbackModal = document.querySelector('.modal-feedback');
const feedbackOpenButton = document.querySelector('.contacts a.button');
const feedbackForm = document.querySelector('form.feedback-form');
const feedbackInputs = document.querySelectorAll(
  '.feedback-form .js-validation'
);
const feedbackSubmitButton = document.querySelector(
  '.feedback-form button[type="submit"]'
);
const feedbackCloseButton = document.querySelector(
  '.modal-feedback .modal-close'
);

const mapModal = document.querySelector('.modal-map');
const mapOpenButton = document.querySelector('.contacts a.map');
const mapCloseButton = document.querySelector('.modal-map .modal-close');

const serviceButtons = document.querySelectorAll('.button-service');
const serviceSlides = document.querySelectorAll('.service');

const sliderButtons = document.querySelectorAll('.slider-controls i');
const sliderSlides = document.querySelectorAll('.slider-item');

/* KEYBOARD HANDLERS */

window.addEventListener('keydown', function(e) {
  if (e.keyCode !== ESC_KEY_CODE) return;
  const isHandled = closeVisibleModal();
  if (isHandled) e.preventDefault();
});

/* DOM HANDLERS */

feedbackOpenButton.addEventListener('click', function(e) {
  e.preventDefault();
  disableValidationHightligh();
  animateModalShow(feedbackModal);
  openFeedbackModal();
});

feedbackSubmitButton.addEventListener('click', function(e) {
  const isFormValid = feedbackForm.reportValidity();
  if (!isFormValid) {
    enableValidationHightlight();
    animateFeedbackInvalid();
  }
});

feedbackCloseButton.addEventListener('click', function(e) {
  closeFeedbackModal();
});

mapOpenButton.addEventListener('click', function(e) {
  animateModalShow(mapModal);
  openMapModal();
  e.preventDefault();
});

mapCloseButton.addEventListener('click', function(e) {
  closeMapModal();
});

serviceButtons.forEach(function(button) {
  button.addEventListener('click', function(e) {
    const serviceName = e.target.dataset.serviceName;
    switchServiceSlide(serviceName);
  });
});

sliderButtons.forEach(function(button) {
  button.addEventListener('click', function(e) {
    const slideId = e.target.dataset.slide;
    switchSliderSlide(slideId);
  });
});

/* METHODS */

function animateModalShow(modal) {
  setAnimationClass(modal, 'modal-show-animation', 300);
}

function enableValidationHightlight() {
  feedbackInputs.forEach(function(input) {
    input.classList.add('hightlight-invalid');
  });
}

function disableValidationHightligh() {
  feedbackInputs.forEach(function(input) {
    input.classList.remove('hightlight-invalid');
  });
}

function openFeedbackModal() {
  feedbackModal.classList.add('modal-show');
}

function closeFeedbackModal() {
  feedbackModal.classList.remove('modal-show');
}

function animateFeedbackInvalid() {
  setAnimationClass(feedbackModal, 'form-invalid-animation', 300);
}

function openMapModal() {
  mapModal.classList.add('modal-show');
}

function closeMapModal() {
  mapModal.classList.remove('modal-show');
}

function closeVisibleModal() {
  const visibleModal = document.querySelector('.modal-show');
  if (visibleModal) {
    visibleModal.classList.remove('modal-show');
    return true;
  } else {
    return false;
  }
}

function switchServiceSlide(serviceName) {
  const targetButtonSelector =
    '.button-service[data-service-name="' + serviceName + '"]';
  const targetButton = document.querySelector(targetButtonSelector);
  const targetServiceSelector =
    '.service[data-service-name="' + serviceName + '"]';
  const targetSlide = document.querySelector(targetServiceSelector);
  if (!targetButton || !targetSlide) return;
  switchCurrentElement(serviceButtons, targetButton, 'button-service-current');
  switchCurrentElement(serviceSlides, targetSlide, 'current-service');
}

function switchSliderSlide(slideId) {
  const targetButtonSelector =
    '.slider-controls i[data-slide="' + slideId + '"]';
  const targetButton = document.querySelector(targetButtonSelector);
  const targetSlideSelector = '.slider-item[data-slide="' + slideId + '"]';
  const targetSlide = document.querySelector(targetSlideSelector);
  if (!targetButton || !targetSlide) return;
  switchCurrentElement(sliderButtons, targetButton, 'current');
  switchCurrentElement(sliderSlides, targetSlide, 'slider-item-current');
}

/* HELPERS */

function setAnimationClass(element, classname, ttl) {
  classname = classname || '';
  ttl = ttl > 0 ? ttl : 1000;

  const classList = element && element.classList;
  if (!classList || !classList.add) return;

  classList.add(classname);
  window.setTimeout(function() {
    classList.remove(classname);
  }, ttl);
}

function switchCurrentElement(elementsInGroup, currentElement, className) {
  elementsInGroup.forEach(function(element) {
    element.classList.remove(className);
  });
  currentElement.classList.add(className);
}
