const request = require("request")

const forecast = (latitude,longitude,callback) =>{
    
 const url = 'http://api.weatherapi.com/v1/current.json?key=eeb625052a9144e9aaf151848211405&q='+latitude+','+longitude+'&aqi=no';

 request({url,json:true},(err,{body})=>{
      
     if(err){
         callback("Unable to connect to the location Services :(",undefined);
     }else if(body.error){
         callback("Unable to find the location. Try another search",undefined);
     }else{
         callback(undefined,body.current.condition.text +" today. It is currently "+body.current.temp_c+" degree outside. There is a "+body.current.precip_mm+"% chance of rain.");
     }
 })     
}


module.exports = forecast