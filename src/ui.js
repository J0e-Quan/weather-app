export function showData(data) {
  clearData()
  updateLocation(data.resolvedAddress)
  updateMainWeather(data.currentConditions.feelslike, data.currentConditions.conditions) 
  updateTodayWeather(data)
}

function clearData() {
  const todayDiv = document.querySelector('.data-grid.today')
  todayDiv.innerHTML = ''
  const weekDiv = document.querySelector('.data-grid.week')
  weekDiv.innerHTML = ''
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

async function updateTodayWeather(data) {
  const currentHourIndex = getCurrentHourIndex(data)
  const todayDiv = document.querySelector('.data-grid.today')
  for (let i = 1; i < 8; i++) {
    // from top to bottom: hour, temp, precipitation, uv index
    let hourData = await data.days[0].hours[(currentHourIndex + i)]
    if (hourData === undefined) {
      hourData = data.days[0].hours[0]
    }
    const dataBox = document.createElement('div')
    dataBox.classList.add('data-box')
    const time = document.createElement('p')
    time.classList.add('time-text')
    time.textContent = hourData.datetime.slice(0, 5)
    dataBox.appendChild(time)
    const temp = document.createElement('p')
    temp.classList.add('temp-text')
    temp.textContent = hourData.feelslike + '°'
    dataBox.appendChild(temp)
    const precipitation = document.createElement('p')
    precipitation.classList.add('precipitation-text')
    precipitation.textContent = hourData.precipprob + '%'
    dataBox.appendChild(precipitation)
    const uv = document.createElement('p')
    uv.classList.add('uv-text')
    uv.textContent = 'UV: ' + hourData.uvindex
    dataBox.appendChild(uv)
    todayDiv.appendChild(dataBox)
    if (hourData === data.days[0].hours[0]) {
      break
    }
  }
}

function getCurrentHourIndex(data) {
  const currentHour = data.currentConditions.datetime.slice(0, 2)
  const currentHourIndex = data.days[0].hours.findIndex((hour) => {
    return hour.datetime.slice(0, 2) === currentHour
  })
  return currentHourIndex
}