const nav = document.querySelector('.nav'),
  searchIcon = document.querySelector('#searchIcon'),
  navOpenBtn = document.querySelector('.navOpenBtn'),
  navCloseBtn = document.querySelector('.navCloseBtn')

searchIcon.addEventListener('click', () => {
  nav.classList.toggle('openSearch')
  nav.classList.remove('openNav')
  if (nav.classList.contains('openSearch')) {
    return searchIcon.classList.replace('uil-search', 'uil-times')
  }
  searchIcon.classList.replace('uil-times', 'uil-search')
})

navOpenBtn.addEventListener('click', () => {
  nav.classList.add('openNav')
  nav.classList.remove('openSearch')
  searchIcon.classList.replace('uil-times', 'uil-search')
})
navCloseBtn.addEventListener('click', () => {
  nav.classList.remove('openNav')
})

function dropdown () {
  document.querySelector('#submenu').classList.toggle('hidden')
  document.querySelector('#arrow').classList.toggle('rotate-0')
}
dropdown()
function Open () {
  document.querySelector('.sidebar').classList.toggle('left-[-300px]')
}

const button = document.querySelector('.button')

button.addEventListener('click', (e) => {
  e.preventDefault
  button.classList.add('animate')
  setTimeout(() => {
    button.classList.remove('animate')
  }, 600)
})

const seconds = document.querySelector('.seconds .number'),
  minutes = document.querySelector('.minutes .number'),
  hours = document.querySelector('.hours .number'),
  days = document.querySelector('.days .number')

let secValue = 11,
  minValue = 2,
  hourValue = 2,
  dayValue = 9

const timeFunction = setInterval(() => {
  secValue--

  if (secValue === 0) {
    minValue--
    secValue = 60
  }
  if (minValue === 0) {
    hourValue--
    minValue = 60
  }
  if (hourValue === 0) {
    dayValue--
    hourValue = 24
  }

  if (dayValue === 0) {
    clearInterval(timeFunction)
  }
  seconds.textContent = secValue < 10 ? `0${secValue}` : secValue; minutes.textContent = minValue < 10 ? `0${minValue}` :
    minValue; hours.textContent = hourValue < 10 ? `0${hourValue}` : hourValue; days.textContent = dayValue < 10 ?
    `0${dayValue}` : dayValue
}, 1000); // 1000ms=1s
