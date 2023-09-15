
import API_KEY from './key.js'

const ipAddressField = document.querySelector('.ipAddressField')
const timezoneInput = document.querySelector('.timezoneInput')
const countryLocationInput = document.querySelector('.locationInput')
const cityLocationInput = document.querySelector('.cityLocation')
const postalCodeInput = document.querySelector('.postalCode')
const ispInput = document.querySelector('.ispInput')
const submitBtn = document.querySelector('.submit-btn')
const inputField = document.querySelector('.input-field')
const continent_nameInput= document.querySelector('.continent_name')
const country_capitalInput= document.querySelector('.country_capital')
const state_provInput= document.querySelector('.state_prov')


//Map

let map = L.map('map').setView([51.505, -0.09], 13)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map)

//API
let ipAddress
let randomIP = ''
let timeZone
let countryLocation
let cityLocation
let postalCode
let isp
let lat
let lng
let continent_name
let country_capital
let state_prov


let url = `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}=`
fetch(url)
  .then((response) => response.json())
  .then((response) => {
    ipAddress = response.ip
    timeZone = response.time_zone.offset
    countryLocation = response.country_name
    cityLocation = response.city
    postalCode = response.zipcode
    isp = response.isp
    lat = response.latitude
    lng = response.longitude
    continent_name = response.continent_name
    country_capital = response.country_capital
    state_prov = response.state_prov
    

    ipAddressField.innerHTML = ipAddress
    timezoneInput.innerHTML = ` UTC ${timeZone}`
    countryLocationInput.innerHTML = countryLocation
    cityLocationInput.innerHTML = cityLocation
    postalCodeInput.innerHTML = postalCode
    ispInput.innerHTML = isp
    continent_nameInput.innerHTML = continent_name
    country_capitalInput.innerHTML = country_capital
    state_provInput.innerHTML = state_prov

    mapLocation(lat, lng)
  }).catch(error => console.log(error))

const mapLocation = (lat, lng) => {
  var markerIcon = L.icon({
    iconUrl: 'images/location.gif',

    iconSize: [60, ], // size of the icon
    iconAnchor: [23, 55], // point of the icon which will correspond to marker's location
  })
  map.setView([lat, lng], 17)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: false,
  }).addTo(map)

  L.marker([lat, lng], { icon: markerIcon }).addTo(map)
}

//Search by IP + validation
submitBtn.addEventListener('click', (event) => {
  event.preventDefault()
  if (
    inputField.value.match(
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    )
  ) {
    randomIP = inputField.value
    url = `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}=` + randomIP
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        ipAddress = response.ip
        timeZone = response.time_zone.offset
        countryLocation = response.country_name
        cityLocation = response.city
        postalCode = response.zipcode
        isp = response.isp
        lat = response.latitude
        lng = response.longitude
        continent_name = response.continent_name
    country_capital = response.country_capital
    state_prov = response.state_prov


        ipAddressField.innerHTML = ipAddress
        timezoneInput.innerHTML = ` UTC ${timeZone}`
        countryLocationInput.innerHTML = countryLocation
        cityLocationInput.innerHTML = cityLocation
        postalCodeInput.innerHTML = postalCode
        ispInput.innerHTML = isp
        continent_nameInput.innerHTML = continent_name
        country_capitalInput.innerHTML = country_capital
        state_provInput.innerHTML = state_prov
        mapLocation(lat, lng)
      }).catch(error => console.log(error))
  } else {
    alert('You have entered an invalid IP address!')
    return false
  }
})
