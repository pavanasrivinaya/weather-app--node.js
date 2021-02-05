const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
     const url = 'http://api.weatherstack.com/current?access_key=801b68c762f55da134353876a5a0f436&query=' +latitude+','+longitude+'&units=f'
    
    request({ url, json: true}, (error,{ body }) => {
        if(error) {
            callback('Unable to connect to the weather api service due to the network', undefined)
        }
        else if(body.error) {
            callback('Unable to find the location', undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] +". It is currently " +body.current.temperature+ " degree out . It feels like " +body.current.feelslike+ "out there")
        }
    })
}

module.exports = forecast