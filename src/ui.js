export function showData(data) {
  updateLocation(data.resolvedAddress)
}

function updateLocation(location) {
  const locationText = document.querySelector('.location')
  locationText.textContent = location.charAt(0).toUpperCase() + location.slice(1)
}