var lat = "undef";
var lon = "undef";
var units = "cel";


// most icons come from
// https://github.com/pasnox/oxygen-icons-png

var p01d = "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Status-weather-clear-icon.png";

var p01n = "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Status-weather-clear-night-icon.png";

var p02d = "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Status-weather-few-clouds-icon.png";

var p02n = "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Status-weather-few-clouds-night-icon.png";

var p03d = "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Status-weather-clouds-icon.png";

var p03n = "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Status-weather-clouds-night-icon.png";

var clouds = "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Status-weather-many-clouds-icon.png";

var rain_clouds = "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Status-weather-showers-scattered-icon.png";

var p10d = "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Status-weather-showers-scattered-day-icon.png";

var p10n = "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Status-weather-showers-scattered-night-icon.png";

var thunderstorm = "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Status-weather-storm-icon.png";

var snow = "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Status-weather-snow-icon.png";

var smile = "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Emotes-face-smile-icon.png";

var neut = "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Emotes-face-plain-icon.png";

var sad = "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Emotes-face-sad-icon.png";

function getCoords(){
  var api_url = "http://freegeoip.net/json/";
  
  $.ajax({
    url: api_url,
    method: 'GET'
  }).then(function(data) {
    lat = data.latitude;
    lon = data.longitude;
    
    var region_str = data.city + ", " + data.region_name + ", " + data.country_name;
    
    $("#city_line").text(region_str);
    
    document.getElementById("city_background").style.width = (20 * region_str.length) + "px";
    document.getElementById("city_line").style.width = (20 * region_str.length) + "px";
    
    getWeather(data.latitude, data.longitude);
  });

}

function getWeather(lat, lon){
 
  var unit_choice = "";
  var unit_sym = "";
  
  if (units == "cel"){
    unit_choice = "metric";
    unit_sym = "C";
  } else {
    unit_choice = "imperial";
    unit_sym = "F";
  }
  
  var api_key = "cc26e962c1411e5246ed20ef6b98171a"; 
  var api_url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=" + unit_choice + "&appid=" + api_key;
  
  
  $.ajax({
    url: api_url,
    method: 'GET'
  }).then(function(data) {
    
    // Interprets the weather data
    $("#temp").text( Math.round(data.main.temp) + " °" + unit_sym);
    $("#weather_desc").text(data.weather[0].description);
    
    // Changes the icon for the weather

    var icon = data.weather[0].icon;
    var icon_pic = "";
    
    if (icon == "01d"){
      icon_pic = p01d;
    } else if (icon == "01n"){
      icon_pic = p01n;
    } else if (icon == "02d"){
      icon_pic = p02d;
    } else if (icon == "02n"){
      icon_pic = p02n;
    } else if (icon == "03d"){
      icon_pic = p03d;
    } else if (icon == "03n"){
      icon_pic = p03n;
    } else if (icon == "04d" || icon == "04n"){
      icon_pic = clouds;
    } else if (icon == "09d" || icon == "09n"){
      icon_pic = rain_clouds;
    } else if (icon == "10d"){
      icon_pic = p10d;
    } else if (icon == "10n"){
      icon_pic = p10n;
    } else if (icon == "11d" || icon == "11n"){
      icon_pic = thunderstorm;
    } else if (icon == "13d" || icon == "13n"){
      icon_pic = snow;
    } else if (icon == "50d"){
      icon_pic = p02d;
    } else if (icon == "50n"){
      icon_pic = p02n;
    } else {
      icon_pic = clouds;
    }
    
    document.getElementById("icon").src =  icon_pic;
    
    var face_pic;
    
    if (icon == "01d" || icon == "01n"){
      face_pic = smile;
    } else if (icon[0] == "1" || icon[1] == "9"){
      face_pic = sad;
    } else {
      face_pic = neut;
    }
    
    document.getElementById("face").src =  face_pic;
                            
  });

}


function update(){
  getCoords();
}
  
$().ready(function() {
    update();
});

function change_units(){
  if (units == "cel"){
    units = "fah";
    $("#units").text("Fahrenheit");
 
  } else {
    units = "cel";
    $("#units").text("Celsius");

  }
  getWeather(lat,lon);
}