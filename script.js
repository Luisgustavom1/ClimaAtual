let units = 'imperial'
let APIkey = 'c6a70bcc9254815d5e33ea1ff78f8c5b'
let searchMethod = 'zip'

document.querySelector('#inputCity').value = localStorage.City

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
    if(resultFromServer.cod == '404'){
        alert('Cidade inexistente ou fora do nosso banco de dados')
    } else {
        let city = resultFromServer.name
        document.querySelector('.cidade').innerHTML = city;

        let temperature = (( resultFromServer.main.temp - 32) * 5/9).toFixed(2);
        document.querySelector('.temperatura').innerHTML = `Temperatura: ${ temperature}°C` 

        let timeCondition = resultFromServer.weather[0].description;
        document.querySelector('.condiçãoDoTempo').innerHTML = timeCondition

        let clouds = resultFromServer.clouds.all;
        document.querySelector('.nuvens').innerHTML = `Nuvens: ${ clouds}%`

        let humidity = resultFromServer.main.humidity
        document.querySelector('.umidade').innerHTML =
        `Umidade: ${ humidity}%`

        let icon = resultFromServer.weather[0].icon
        document.querySelector('#img').setAttribute('src', `http://openweathermap.org/img/wn/${icon}@2x.png`)
    
        conditionalBackground(icon)
        saveNoStorage(city)

    }
}

function saveNoStorage(city){
    let savedCity = localStorage.getItem('City')
    localStorage.setItem('City', city);
}

function conditionalBackground(icon){
    switch (icon){
        case '01d':
            document.body.style.backgroundImage = "url('Foto01d.jpg')"
        break;

        case '01n':
            document.body.style.backgroundImage = "url('foto01n.jpg')"
        break;

        case '02d', '03d', '04d':
            document.body.style.backgroundImage = "url('foto02d.jpg')"
        break;

        case '02n', '03n', '04n':
            document.body.style.backgroundImage = "url('foto02n.jpg')"
        break;

        case '05d', '05n':
            document.body.style.backgroundImage = "url('foto04dn.webp')"
        break;

        case '10d', '10n':
            document.body.style.backgroundImage = "url('foto10dn.jpg')"
        break;

        case '11d', '11n':
            document.body.style.backgroundImage = "url('foto11dn.jpg')"
        break;
        
        case '13d', '13n':
            document.body.style.backgroundImage = "url('foto13dn.jpg')"
        break;
    } 
}

document.querySelector('#btn').addEventListener('click', () => {
    let searchTerm = document.querySelector('#inputCity').value
    if(searchTerm){
        searchWeather(searchTerm)
    }
})


