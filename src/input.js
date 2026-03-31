import { getData } from './data.js'
import { removeLoading, showData, showLoading } from './ui.js'

const buttons = document.querySelector('.right-container')
export const search = document.querySelector('.search')
export const searchSubmit = document.querySelector('.search-submit')
export const metric = document.querySelector('.metric')
const imperial = document.querySelector('.imperial')
let unitType = 'metric'

buttons.addEventListener('click', handleButtonPress)

async function handleButtonPress(e) {
  const targetBtn = e.target
  if (targetBtn.classList.contains('search-submit')) {
    if (search.value === '') {
      alert('location cannot be empty!')
      return
    }
    showLoading()
    const data = await getData(search.value, unitType)
    if (data === false) {
      search.value = ''
      removeLoading()
      alert('location not found!')
      return
    }
    showData(data)
  } else if (targetBtn.classList.contains('metric')) {
    if (search.value === '') {
      alert('location cannot be empty!')
      return
    }
    metric.classList.add('checked')
    imperial.classList.remove('checked')
    unitType = 'metric'
    showLoading()
    const data = await getData(search.value, unitType)
    if (data === false) {
      search.value = ''
      removeLoading()
      alert('location not found!')
      return
    }
    showData(data)
  } else if (targetBtn.classList.contains('imperial')) {
    if (search.value === '') {
      alert('location cannot be empty!')
      return
    }
    imperial.classList.add('checked')
    metric.classList.remove('checked')
    unitType = 'us' // visual crossing uses 'us' instead of 'imperial'
    showLoading()
    const data = await getData(search.value, unitType)
    if (data === false) {
      search.value = ''
      removeLoading()
      alert('location not found!')
      return
    }
    showData(data)
  }
}
