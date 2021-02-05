const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicGFyaXNyaSIsImEiOiJja2ppNXpmaHUxNmIwMnpsbzd5YzczM2Q1In0.8VJaqwqZ_zh8qyeAuqWQgw&limit=1'

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
// const geocode = (address, callback) => {
//     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicGFyaXNyaSIsImEiOiJja2ppNXpmaHUxNmIwMnpsbzd5YzczM2Q1In0.8VJaqwqZ_zh8qyeAuqWQgw&limit=1'
    
//     request({ url: url, json: true }, (error, response)=> {
//         if (error) {
//             callback("Unable to connect to the weather api service due to network", undefined)
//         } else if (response.body.features.length === 0) {
//             callback("Unable to display the info please search again!!", undefined)
//         }
//         else {
//             callback(undefined, 
//                 {
//                     latitude: response.body.features[0].center[1],
//                     longitude: response.body.features[0].center[0],
//                     Location: response.body.features[0].place_name
//                 })
//         }

//     })
// }

// module.exports = geocode