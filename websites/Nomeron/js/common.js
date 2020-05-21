

const modals = () => {
  document.querySelectorAll('.modal__content').forEach((elem) => {
    elem.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  });

  document.querySelectorAll('.form__close, .modal').forEach((elem) => {
    elem.addEventListener('click', () => {
      if (elem.classList.contains('modal')) elem.classList.remove('visible');
      else elem.closest('.modal').classList.remove('visible');
    });
  });

  document.querySelectorAll('[data-target-modal]').forEach((elem) => {
    elem.addEventListener('click', (event) => {
      const target = event.target.dataset.targetModal;

      const activeModal = document.querySelector('.modal.visible');
      if (activeModal) activeModal.classList.remove('visible');

      document.getElementById(target).classList.add('visible');
    });
  });
};


function documentReady() {
  // Element.closest polyfill
    if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.msMatchesSelector
        || Element.prototype.webkitMatchesSelector;
    }

    if (!Element.prototype.closest) {
      Element.prototype.closest = function (s) {
        let el = this;

        do {
          if (Element.prototype.matches.call(el, s)) return el;
          el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
      };
    }
  //

  modals();
}

// ========>> UTILS <<========

!(function checkLoad() {
  if (document.readyState !== 'complete') setTimeout(checkLoad, 10);
  else documentReady();
}());
