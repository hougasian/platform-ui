// let modalOverlay = document.querySelector('.pui-modal--overlay');
let body = document.querySelector('body');
let closeModal = document.querySelectorAll('.pui-modal__close');
let openModal = document.querySelectorAll('.pui-modal__open');

if(closeModal) {
  closeModal.forEach(function(el) {
    el.addEventListener('click', function() {
      let modal = document.getElementById(el.dataset.modal);
      if(modal) modal.classList.toggle('pui-modal--closed');
      body.classList.remove('modal-open');
    });
  });
}

if(openModal) {
  openModal.forEach(function(el) {
    el.addEventListener('click', function(evt) {
      let modal = document.getElementById(el.dataset.modal);
      if(modal) modal.classList.toggle('pui-modal--closed');
      body.classList.add('modal-open');
    });
  });
}
