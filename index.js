document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#inputBox').addEventListener("keypress", getWeatherInfo)

    // initialise
    fetch('https://api.weatherapi.com/v1/current.json?key=e9bd6238e8e14a7bb7884159230308&q=HongKong')
        .then(res => res.json())
        .then(data => {
            updateUI(data)
            document.querySelector('.info3').addEventListener('click', unitConv)
            document.querySelector('.info6 > span').addEventListener('click', unitConv)
        })
})

async function getWeatherInfo(e) {
    if (e.key !== 'Enter') return
    console.log('loading...')
    const inputValue = document.querySelector('#inputBox').value
    const key = 'e9bd6238e8e14a7bb7884159230308'
    const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${inputValue}`
    try {
        const response = await fetch(url, { mode: 'cors' })
        const data = await response.json()
        updateUI(data)
    } catch (err) {
        alert('Location not found')
    }
}

function updateUI(data) {
    console.log(data)
    let x = data.current
    const cloudness = x.cloud
    const dayOrNight = x.is_day === 1 ? 'Day' : 'Night'
    const feelsLike_C = x.feelslike_c
    const humidity = x.humidity
    const temp = x.temp_c
    const windDir = x.wind_dir
    const windSpeed = x.wind_kph
    const imgUrl = x.condition.icon
    const weatherText = x.condition.text

    x = data.location
    const country = x.country
    const latitude = x.lat
    const longitude = x.lon
    const location = x.name
    const region = x.region

    let text1 = `${location}, ${region} (${latitude}/${longitude})`
    let text2 = `${country}`
    let text3 = `${temp} <sup>o</sup>C  `
    let text5 = `${weatherText} `
    let text6 = `Feels Like </br><span> ${feelsLike_C} <sup>o</sup>C </span>   `
    let text7 = `Humidity </br><span> ${humidity}%</span>  `
    let text8 = `Cloudness: </br><span>${cloudness}%</span>  `
    let text9 = `Wind: </br><span>${windSpeed} km/h </span>  `

    const box1 = document.querySelector('.info1')
    const box2 = document.querySelector('.info2')
    const box3 = document.querySelector('.info3')
    const box4 = document.querySelector('.info4')
    const box5 = document.querySelector('.info5')
    const box6 = document.querySelector('.info6')
    const box7 = document.querySelector('.info7')
    const box8 = document.querySelector('.info8')
    const box9 = document.querySelector('.info9')
    box1.innerHTML = text1
    box2.innerHTML = text2
    box3.innerHTML = text3
    box4.src = imgUrl
    box5.innerHTML = text5
    box6.innerHTML = text6
    box7.innerHTML = text7
    box8.innerHTML = text8
    box9.innerHTML = text9

    document.querySelector('.info6 > span').addEventListener('click', unitConv)
}

function unitConv(){
    let unit = this.textContent.split('o')[1].trim()
    let value = this.textContent.split('o')[0].trim()
    let newUnit
    let newValue
    if(unit === 'C'){
        newUnit = 'F'
        newValue = (value * 9 / 5) + 32
    } else {
        newUnit = 'C'
        newValue = (value - 32) * (5 / 9)
    }
    this.innerHTML = `${newValue.toFixed(1)} <sup>o</sup>${newUnit}`
}
