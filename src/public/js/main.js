// let sidebar = document.querySelector('.sidebar')
// let closeBtn = document.querySelector('#btn')
// let searchBtn = document.querySelector('.bx-search')

// closeBtn.addEventListener('click', () => {
//   sidebar.classList.toggle('open')
//   menuBtnChange(); // calling the function(optional)
// })

// searchBtn.addEventListener('click', () => {
//   // Sidebar open when you click on the search iocn
//   sidebar.classList.toggle('open')
//   menuBtnChange(); // calling the function(optional)
// })

// // following are the code to change sidebar button(optional)
// function menuBtnChange () {
//   if (sidebar.classList.contains('open')) {
//     closeBtn.classList.replace('bx-menu', 'bx-menu-alt-right') // replacing the iocns class
//   } else {
//     closeBtn.classList.replace('bx-menu-alt-right', 'bx-menu') // replacing the iocns class
//   }
// }
const initApp = () => {
  const hamburgerBtn = document.getElementById('hamburger-button')
  const mobileMenu = document.getElementById('mobile-menu')

  const toggleMenu = () => {
    mobileMenu.classList.toggle('hidden')
    mobileMenu.classList.toggle('flex')
    hamburgerBtn.classList.toggle('toggle-btn')
  }

  // NOTE: HAMBURGER BUTTON SEEMS TO BE DEFINED IN SOME PAGES, LIKE SIGNUP 
  if( hamburgerBtn )
  {
    hamburgerBtn.addEventListener('click', toggleMenu)
  }

  if( mobileMenu ) 
  {mobileMenu.addEventListener('click', toggleMenu)}
}

document.addEventListener('DOMContentLoaded', initApp)
