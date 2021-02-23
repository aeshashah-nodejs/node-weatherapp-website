const request = require('request')

const geocode = ( address ,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/ + encodeURLComponent(address) +.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiYWVzaGFzaGFoMTgiLCJhIjoiY2tsMjRsZDE1MDVjNDJwbnJzYnlweGc3MCJ9.Cus0S0L6l061rdQjHjft3g'
 request({url, json: true} , (error, {body}) => {
  if (error) {
           callback('unable to connect weather!',undefined)
       }
    
       else if (body.features.length === 0) {
         callback('unable to display',undefined)
       }
    
            else {
               callback(undefined,{
           lati : body.features[0].center[1] ,
           long : body.features[0].center[0], 
          place: body.features[0].place_name
               })
        }
    })
          
}
    
module.exports = geocode