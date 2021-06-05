const request = require("request")

const geocode = (address,callback)=>{  
        
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibWF5YW5rLXBlYyIsImEiOiJja29vaW5xMmcwYTAzMnBvMzN2cGFydzhwIn0.SZIcI63l5Ly--HgcDwjUDw'

    request({url,json:true},(err,{body}={})=>{
             
        if(err){
            callback("Unable to Connect to location Services :(",undefined)
        }else if(body.features.length===0){
            callback("Unable to find the location. Try another search.",undefined)
        }else{
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location: body.features[0].place_name
            })
        }  
    })
}

module.exports = geocode