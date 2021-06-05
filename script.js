let units = 'imperial'
let APIkey = 'c6a70bcc9254815d5e33ea1ff78f8c5b'
let searchMethod = 'zip'

function getSearchMethod(searchterm){
    if(searchterm.length === 5 && parseInt(searchterm) + '' === searchterm){
        searchMethod = 'zip'
    }else{
        searchMethod = 'q'
    }
}

function searchWeather(searchterm){
    getSearchMethod(searchterm)
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchterm}&APPID=${APIkey}&units=${units}`).then(response =>{
        return response.json()
    }).then(data => {
        init(data)
    })
}

function init(resultFromServer){
    console.log(resultFromServer)
    document.querySelector('.cidade').innerHTML = resultFromServer.name;

    document.querySelector('.temperatura').innerHTML = `Temperatura: ${(( resultFromServer.main.temp - 32) * 5/9).toFixed(2)}°C` 

    document.querySelector('.condiçãoDoTempo').innerHTML = resultFromServer.weather[0].description

    document.querySelector('.nuvens').innerHTML = `Nuvens: ${ resultFromServer.clouds.all}%`

    document.querySelector('.umidade').innerHTML =
    `Umidade: ${ resultFromServer.main.humidity}%`
}

document.querySelector('#btn').addEventListener('click', () => {
    let searchTerm = document.querySelector('#inputCity').value
    if(searchTerm){
        searchWeather(searchTerm)
    }
})


