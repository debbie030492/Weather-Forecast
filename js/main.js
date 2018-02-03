
$(document).ready(function(){
    
    var cityid, url, temp, humidity, wind, weatherstate, icon, location, country, city, keyword;
    var cityids1 = [98182, 108410, 112931, 360630, 379252, 498817, 524901, 745044, 993800, 1172451, 1174872, 1176734, 1264527, 1273294];
    var cityids2 = [1275004, 1275339, 1277333, 1566083, 1609350, 1642911, 1668341, 1701668, 1735161, 1792947, 1795565, 1796236, 1816670, 1835848, 1850147];
    var cityids3 = [1853908, 1856057, 1880252, 2034937, 2270968, 2314302, 2332459, 2643743, 2934246, 3435910, 3448439, 3451190, 3675707, 3688689, 3871336];
    var cityids4 = [3936456, 3996063, 4140963, 4164138, 4560349, 4684888, 4699066, 4887398, 4930956, 4990729, 5128638, 5174095, 5368361, 6356055, 6455259, 6542283];

    autocomplete();

    randomiseCities(cityids1, "city1");
    setInterval(randomiseCities, 10000, cityids1, "city1");
    randomiseCities(cityids2, "city2");
    setInterval(randomiseCities, 10000, cityids2, "city2");
    randomiseCities(cityids3, "city3");
    setInterval(randomiseCities, 10000, cityids3, "city3");
    randomiseCities(cityids4, "city4");
    setInterval(randomiseCities, 10000, cityids4, "city4");
   
    function autocomplete(){
        var options = {
            url: "resources/citylist.json",
            getValue: function(element) {
                return $(element).prop("name") + ", " + $(element).prop("country");
            },
            requestDelay: 500,
            placeholder: "Search",
            theme: "blue",   
            list: {
                onChooseEvent: function(){
                    myWeatherInput();
                }, 
                maxNumberOfElements: 15,
                match: {
                    enabled: true,
                },
            },
        };
        
        $("#autocomplete").easyAutocomplete(options);
    }
    
    function randomiseCities(cityids, keyword){
        var random = Math.floor((Math.random() * 15) + 1);
        cityid = cityids[random];
        url = "http://allorigins.me/get?url=https%3A//openweathermap.org/data/2.5/weather/%3Fappid%3Db6907d289e10d714a6e88b30761fae22%26id%3D" + cityid + "%26units%3Dmetric&callback=?";
        myDataInfo(url, keyword);
    }

    function myWeatherInput(){
        $.getJSON("resources/citylist.json")
            .done(function( json ) {
                var value = $("#autocomplete").val();
                keyword = "searched";
                country = value.slice(-2);
                city = value.substr(0, value.length-4);
            for (x in json){
                if (json[x].name == city && json[x].country == country){
                    cityid = json[x].id;
                    url = "http://allorigins.me/get?url=https%3A//openweathermap.org/data/2.5/weather/%3Fappid%3Db6907d289e10d714a6e88b30761fae22%26id%3D" + cityid + "%26units%3Dmetric&callback=?";
                }
                }
                myDataInfo(url, keyword);
                setTimeout(myDataInfo, 5000, url, keyword);
            })
    };
    
    function myDataInfo(url, keyword){
        $.getJSON(url, function(data){
            var rawdata = data.contents;
            data = JSON.parse(rawdata);
            location = "<b>" + data.name + " <br/> " + data.sys.country + "</b>";
            icon = "<img src='images/" + data.weather[0].icon + ".png' />";
            temp = "<b>Temperature:</b><br/> " + Math.round(data.main.temp) + " C°";
            humidity = "<b>Humidity:</b><br/> " + data.main.humidity + " %";
            wind = "<b>Wind:</b><br/> " + data.wind.speed + " m/s";
            weatherstate = "<b>" + data.weather[0].description + "</b>";
                weatherstate = weatherstate.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                    return letter.toUpperCase();
                });
            
            var locationid = "#" + keyword + "location";
            var iconid = "#" + keyword + "icon";
            var weatherstateid = "#" + keyword + "weatherstate";
            var tempid = "#" + keyword + "temp";
            var humidityid = "#" + keyword + "humidity";
            var windid = "#" + keyword + "wind";
            
            $(locationid).html(location);
            $(iconid).html(icon);
            $(weatherstateid).html(weatherstate);
            $(tempid).html(temp);
            $(humidityid).html(humidity);
            $(windid).html(wind);
        });
    };
});



