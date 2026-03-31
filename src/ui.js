export function showData(data) {
  updateLocation(data.resolvedAddress)
  updateMainWeather(data.currentConditions.feelslike, data.currentConditions.conditions) // place current temp and condition here 

}

function updateLocation(location) {
  const locationText = document.querySelector('.location')
  locationText.textContent = location.charAt(0).toUpperCase() + location.slice(1)
}

function updateMainWeather(temp, condition) {
  const tempText = document.querySelector('.current-temp')
  const conditionText = document.querySelector('.current-condition')
  tempText.textContent = temp + '°' + '  |  '
  conditionText.textContent = condition.charAt(0).toUpperCase() + condition.slice(1)
}