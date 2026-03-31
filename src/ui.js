export function showData(data) {
  clearData()
  updateLocation(data.resolvedAddress)
  updateMainWeather(data.currentConditions.feelslike, data.currentConditions.conditions) 
  updateTodayWeather(data)
  updateWeekWeather(data)
  updateTheme(data.currentConditions.icon)
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
  tempText.textContent = temp + '°' + ' | '
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

async function updateWeekWeather(data) {
  const weekDiv = document.querySelector('.data-grid.week')
  for (let i = 1; i < 8; i++) {
    const dayData = await data.days[(0 + i)]
    const dataBox = document.createElement('div')
    dataBox.classList.add('data-box')
    const date = document.createElement('p')
    date.classList.add('time-text')
    date.textContent = dayData.datetime.slice(5, 10)
    dataBox.appendChild(date)
    const temp = document.createElement('p')
    temp.classList.add('temp-text')
    temp.textContent = dayData.feelslike + '°'
    dataBox.appendChild(temp)
    const precipitation = document.createElement('p')
    precipitation.classList.add('precipitation-text')
    precipitation.textContent = dayData.precipprob + '%'
    dataBox.appendChild(precipitation)
    const uv = document.createElement('p')
    uv.classList.add('uv-text')
    uv.textContent = 'UV: ' + dayData.uvindex
    dataBox.appendChild(uv)
    weekDiv.appendChild(dataBox)
  }
}

function updateTheme(condition) {
  const background = document.querySelector('body')
  // remove all classes from background first
  background.classList.forEach(className => {
    background.classList.remove(className)
  })
  if (condition.includes('clear-day')) {
    background.classList.add('clear-day')
  } else if (condition.includes('clear-night')) {
    background.classList.add('clear-night')
  } else if (condition.includes('cloudy') || condition.includes('fog')) {
    background.classList.add('cloudy') 
  } else if (condition.includes('rain')) {
    background.classList.add('rain')
  }
}