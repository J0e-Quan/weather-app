import { getData } from "./data.js"
import { removeLoading, showData, showLoading } from "./ui.js"

const buttons = document.querySelector('.right-container')
const search = document.querySelector('.search')
const metric = document.querySelector('.metric')
const imperial = document.querySelector('.imperial')
let unitType = 'metric'

buttons.addEventListener('click', handleButtonPress)

async function handleButtonPress(e) {
  const targetBtn = e.target
  if (targetBtn.classList.contains('search-submit')) {
    showLoading()
    const data = await getData(search.value, unitType)
    showData(data)
  } else if (targetBtn.classList.contains('metric')) {
    metric.classList.add('checked')
    imperial.classList.remove('checked')
    unitType = 'metric'
    showLoading()
    const data = await getData(search.value, unitType)
    showData(data)
  } else if (targetBtn.classList.contains('imperial')) {
    imperial.classList.add('checked')
    metric.classList.remove('checked')
    unitType = 'us'   // visual crossing uses 'us' instead of 'imperial'
    showLoading()
    const data = await getData(search.value, unitType)
    showData(data)
  }
}