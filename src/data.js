export function getData(location, unitType) {
  const link = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' + location + '/next7days?unitGroup=' + unitType + '&include=days%2Chours%2Ccurrent%2Calerts%2Cevents&key=UWVEYCS26MXWWQV3SSLBXFR8W&contentType=json'
  return fetch(link).then(function(response) {
    return response.json()
  }).then(function(response) {
    return response
  })
  .catch(() => {
    return false
  })
}
