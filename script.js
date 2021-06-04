

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
}

document.querySelector('#btn').addEventListener('click', () => {
    let searchTerm = document.querySelector('#inputCity').value
    if(searchTerm){
        searchWeather(searchTerm)
    }
})


