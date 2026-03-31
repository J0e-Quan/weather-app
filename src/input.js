const buttons = document.querySelector('.right-container')

buttons.addEventListener('click', handleButtonPress)

function handleButtonPress(e) {
  const targetBtn = e.target
  if (targetBtn.classList.contains('.search-submit')) {
    // sumbit value of search for fetching weather
  } else if (targetBtn.classList.contains('.celsius')) {
    // set unit to celsius
  } else if (targetBtn.classList.contains('.fahrenheit')) {
    // set unit to fahrenheit
  }
