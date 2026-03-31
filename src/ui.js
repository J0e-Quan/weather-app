export function showData(data) {
  updateLocation(data.resolvedAddress)
  updateMainWeather(data.currentConditions.feelslike, data.currentConditions.conditions) 

}

function updateLocation(location) {
  const locationText = document.querySelector('.location')
  const lowerCasedLocation = location.toLowerCase()
  // lowerCasedLocation is split with space, each word has its first letter capitalised and is then joined back together
  const formattedLocation = lowerCasedLocation.split(' ').map(word => { 
    return word.charAt(0).toUpperCase() + word.slice(1)
  }).join(' ')
  locationText.textContent = formattedLocation.charAt(0).toUpperCase() + formattedLocation.slice(1)
}

function updateMainWeather(temp, condition) {
  const tempText = document.querySelector('.current-temp')
  const conditionText = document.querySelector('.current-condition')
  tempText.textContent = temp + '°' + '  |  '
  conditionText.textContent = condition.charAt(0).toUpperCase() + condition.slice(1)
}