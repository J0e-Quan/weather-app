import { getData } from "./data.js"

const buttons = document.querySelector('.right-container')
const search = document.querySelector('.search')
const metric = document.querySelector('.metric')
const imperial = document.querySelector('.imperial')
let unitType = 'metric'

buttons.addEventListener('click', handleButtonPress)

async function handleButtonPress(e) {
  const targetBtn = e.target
  if (targetBtn.classList.contains('search-submit')) {
    const data = await getData(search.value, unitType)
    console.log(data)
    // call ui.js function to display data
  } else if (targetBtn.classList.contains('metric')) {
    metric.classList.add('checked')
    imperial.classList.remove('checked')
    unitType = 'metric'
  } else if (targetBtn.classList.contains('imperial')) {
    imperial.classList.add('checked')
    metric.classList.remove('checked')
    unitType = 'us'   // visual crossing uses 'us' instead of 'imperial'
  }
}