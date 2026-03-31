import { getData } from "./data.js"

const buttons = document.querySelector('.right-container')
const search = document.querySelector('.search')
const celsius = document.querySelector('.celsius')
const fahrenheit = document.querySelector('.fahrenheit')

buttons.addEventListener('click', handleButtonPress)

function handleButtonPress(e) {
  const targetBtn = e.target
  if (targetBtn.classList.contains('search-submit')) {
    const data = getData(search.value)
    // call ui.js function to display data
  } else if (targetBtn.classList.contains('celsius')) {
    console.log('hi')
    celsius.classList.add('checked')
    fahrenheit.classList.remove('checked')
    // set unit to celsius
  } else if (targetBtn.classList.contains('fahrenheit')) {
    fahrenheit.classList.add('checked')
    celsius.classList.remove('checked')
    // set unit to fahrenheit
  }
}