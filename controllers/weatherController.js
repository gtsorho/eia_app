const {Address, LiveWeather , DailyWeather} = require('../models/weather') 
const mongoose =  require('mongoose')
const axios =  require('axios')


var express = require('express')


mongoose.connect('mongodb://root:t5f2KfqwvNRX8ii@srv-captain--weather:27017/weatherDB')
    .then(() => console.log('connected to mongodb'))
    .catch(err => console.error('could not connect to mongoDB', err))


module.exports = {
    all_locations: async (req, res) => {
       const addresses = await Address.find()
       res.send(addresses)
    },
    searchLocations:async (req, res) => {
        let searchVal = req.params.location
        const addresses = await Address.find({location:{$regex: searchVal, $options:'i'}})     
        res.send(addresses)   
    },
    weatherData: async (req, res) => {
        let latitudeVal = req.body.latitude.toString()
        let longitudeVal = req.body.longitude.toString()

        console.log(typeof(latitudeVal))

        const weatherData = await DailyWeather.find({latitude : parseFloat(latitudeVal) , longitude : parseFloat(longitudeVal)}).sort({_id:-1}).limit(10)
        console.log(weatherData)
        res.json(weatherData)
    },
    liveData: async (req, res) => {
        let latitudeVal = req.body.latitude.toString()
        let longitudeVal = req.body.longitude.toString()
            const liveData = await LiveWeather.find({latitude : parseFloat(latitudeVal) , longitude : parseFloat(longitudeVal)}).sort({_id:-1}).limit(10)
            res.json(liveData)
        },

    createWeather: (req , res) => {
        axios.get('https://service.weatherimpact.com/api/data/ciat_forecast/weather_sms_text?datetime=latest',{ 
            headers:{'authkey':'634e0aea96ce7d3961075b2a23446111'}
        })
        .then( response => {
            const resData = response.data
            resData['Data'][0]['Data'].forEach( (value, key) => {
                let neededBreakdown = []
                value = value.toLowerCase()
                value = value.replace(/[^a-z\s 0-9 -]/gi, "")
                let breakdown = value.split(' ');

                let current_val1 = breakdown.indexOf('temperature');
                let current_val2 = breakdown.indexOf('temp');

                let currForcast

                if (!breakdown[current_val1 - 1].match(/[0-9]/g)) {
                    breakdown[current_val1 - 1] = '0-0mm';
                    currForcast = 'No rain';
                }else{
                    currForcast = 'Possible Rain';
                }

                if (!breakdown[current_val2 - 1].match(/[0-9]/g)) {
                    breakdown[current_val2 - 1] = '0-0mm';
                    nextForcast = 'No rain';
                }else{
                    nextForcast = 'Possible Rain';
                }

                function parse(str) {
                    if(!/^(\d){8}$/.test(str)) return "invalid date";
                    var y = str.substr(0,4),
                        m = str.substr(4,2) - 1,
                        d = str.substr(6,2);
                    var dates = new Date(y,m,d)
                    return dates.toISOString().substring(0, 10)
                }
                function average(str) {
                    let vals = str.split("-")
                    return ((vals[0]*1 + vals[1]*1) /2);
                }
                    neededBreakdown.push( 
                    resData['GridDefinition']['Latitude'][key],  
                    resData['GridDefinition']['Longitude'][key],
                    parse(resData['Data'][0]['Date']),
                    average(breakdown[current_val1 + 1].replace('c', '')), 
                    currForcast,
                    average(breakdown[current_val1 - 1].replace("mm", "")),
                    average(breakdown[current_val2 + 1].replace('c', '')),
                    nextForcast,
                    average(breakdown[current_val2 - 1].replace("mm", ""))    
                )

                async function getAddress(){
                    const address = await Address
                    .find({latitude : String(neededBreakdown[0]) , longitude : String(neededBreakdown[1])})
                    return address
                }

                getAddress().
                then((result) => {
                    if(result.length > 0){
                        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${neededBreakdown[0]}&lon=${neededBreakdown[1]}&appid=c2df596100d32243755dd4827069e38b&units=metric`,
                        {headers:{Accept:'application/json', ContentType:'application/json'}}
                        )
                        .then(response => {  
                            if(response.data){
                                if(response.data.rain){
                                     rain = response.data['rain']['1h'];
                                }else{
                                    rain = 0.00;
                                }

                            const createLiveData = async function (){
                                const data = new LiveWeather({
                                    'latitude': response.data['coord']['lat'],
                                    'longitude': response.data['coord']['lon'],
                                    'temperature' : response.data['main']['temp'],
                                    'humidity' : response.data['main']['humidity'],
                                    'rain' : rain,
                                    'description' : response.data['weather'][0]['description'],
                                })
                                 await data.save();
                            }    
                            createLiveData()

                            }else{
                                const createLiveData =  async function (){
                                    const data =  new LiveWeather({
                                        'latitude' : neededBreakdown[0],
                                        'longitude' : neededBreakdown[1],
                                        'temperature':  0.0,
                                        'humidity' : 0.0,
                                        'rain': 0.0,
                                        'description' : 0.0,
                                    })
                                    const liveData =  await data.save();
                                }
                                createLiveData()
                            }
                        }).catch(err => {
                            console.log(err.data)
                        })
                        

                        const createDailyData = async function(){
                            let  addressId = result[0]._id.toString()
                            const data = new DailyWeather({
                                address: addressId,
                                'latitude' : neededBreakdown[0],
                                'longitude': neededBreakdown[1],  
                                'date': neededBreakdown[2],
                                'current_temperature': neededBreakdown[3],
                                'current_rain_level': neededBreakdown[5],
                                'current_chance_rain': neededBreakdown[4],
                                'next_temperature': neededBreakdown[6],
                                'next_rain_level': neededBreakdown[8],
                                'next_chance_rain' : neededBreakdown[7]
                            })
                            const newresult = await data.save()
                        }
                        createDailyData()
                    }
                })
            })
        })
        .catch(err=>{
            console.log(err)
        })
        res.send('all data saved')
    }

}