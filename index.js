console.log('hi')

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#inputBox').addEventListener("keypress", getWeatherInfo)
})

async function getWeatherInfo(e){
    if (e.key !== 'Enter') return
    console.log('loading...')
    const inputValue = document.querySelector('#inputBox').value
    const key = 'e9bd6238e8e14a7bb7884159230308'
    const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${inputValue}`
    try{
        const response = await fetch(url, { mode: 'cors' })
        const data = await response.json()
        updateUI(data)
    } catch(err){   
        alert('Location not found')
    }
}

function updateUI(data) {
    const textEl = document.querySelector('.displayDiv')
    textEl.innerHTML = ''
    // 
    console.log(data)
    let x = data.current
    const humidity = x.humidity
    const dayOrNight = x.is_day === 1 ? 'Day' : 'Night' 
    const temp = x.temp_c
    const windDir = x.wind_dir
    const windSpeed = x.wind_kph
    const imgUrl = x.condition.icon
    const weatherText = x.condition.text

    x = data.location
    const location = x.name 
    const region = x.region 
    const country = x.country
    const latitude = x.lat 
    const longitude = x.lon 

    let text = ''
    text += `${location}, ${region} (${latitude}/${longitude})</br> `
    text += `${country} </br> `
    text += `${weatherText} </br> `
    text += `${temp} <sup>o</sup>C </br> `
    text += `${dayOrNight} </br> `
    text += `Humidity: ${humidity}% </br> `
    text += `Wind: ${windSpeed} km/h, ${windDir} </br> `
    textEl.innerHTML = text

    const img = document.createElement('img')
    img.src = imgUrl

    textEl.appendChild(img)
    
}