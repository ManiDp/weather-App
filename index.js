const express = require('express');
const https = require('https');
const app = express();
const body = require('body-parser');

app.use(body.urlencoded({extended: true}));

app.get('/',(req,res)=>{

    res.sendFile(__dirname+'/index.html');

});

app.post("/",function(req,res){

    console.log(req.body.cityName);

    const cityName = req.body.cityName;
    const keyId = "464648a8a09dd246574de0d7f45716aa";
    const measure = "metric";

    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&Appid="+keyId+"&units="+measure;

    https.get(url,function(response){

        response.on("data",function(data){
            // console.log(data);
            const weatherData= JSON.parse(data);
            // console.log(weatherData.weather[0].description);
            const weatherTemp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const url ="http://openweathermap.org/img/wn/"+icon+"@2x.png";

            res.write("<p>The weather is currently "+ weatherDescription + "</p>" );
            res.write("<h1>The temparature in "+cityName +" is "+ weatherTemp + " degrees Celcius"+"</h1>" );
            res.write("<img src="+url+">");

            res.send();
        });
    })
    
})







app.listen(3000,function(){
    console.log("Listening to port 3000");
})