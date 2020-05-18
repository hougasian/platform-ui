let  dropdownMenu = document.querySelectorAll('.dropdown-content');
let  hasDropdown = document.querySelectorAll('.dropdown');

let openDropdown = (item) => {
  let menuItem = item.closest('.dropdown');
  if(menuItem.classList.contains('dropdown-active')) {
    menuItem.classList.remove('dropdown-active');
  } else {
    hasDropdown.forEach(node => {
      node.classList.remove('dropdown-active');
    });
    menuItem.classList.toggle('dropdown-active');
  }
}

if (hasDropdown) {
  const links = document.querySelectorAll('.dropdown .dropdown__trigger')
  const dropdownLinks = document.querySelectorAll('.dropdown__content a')

  links.forEach( (el) => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      openDropdown(el);
    })
    el.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        openDropdown(el);
      }
    })
  });

  dropdownLinks.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
    })
  });
}

let menuAction = document.querySelectorAll('.site-menu-mobile-action');

if (menuAction) {
  menuAction.forEach(function(el) {
    el.addEventListener('click', (e) => {
      e.preventDefault;
      if (e.target.nextElementSibling.matches('.site-menu')) {
        e.target.nextElementSibling.classList.toggle('active');
      }
    })
  })
}
