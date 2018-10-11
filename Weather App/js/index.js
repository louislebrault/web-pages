// Document ready
$(document).ready(function() { 
  // Get coordinates  
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  // Success function
  function geoSuccess(Position) {
    //console.log("geosuccess");
    
    // Define vars
    var lat_current = Position.coords.latitude;
    var lng_current = Position.coords.longitude;
    var weatherURL_current = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat_current + "&lon=" + lng_current ;
    var googleURL_current = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat_current + "," + lng_current + "&key=AIzaSyBerNeGKkI_LEN5o88RgL-sJHQ8xgmSk4o";
    
    // Get location data
    $.getJSON(googleURL_current, function(data) {
      //console.log("getJSON1 success");
      $(".location").empty();  // Empty location html
      
      // Initialise variables
      var address_length_curr = data.results[0].address_components.length;
      var town_curr;
      var county_curr;
      var country_curr;
      var i;
      
      // Loop address components, add to location html if component type is found
      for (i=0; i<address_length_curr; i++) {
        switch (data.results[0].address_components[i].types[0]) {
          case "postal_town":
            town = data.results[0].address_components[i].short_name;
             $(".location").append(town);
            break;
          case "administrative_area_level_2":
            county = data.results[0].address_components[i].short_name;
             $(".location").append(", " + county);
            break;
          case "country":
            country = data.results[0].address_components[i].long_name;
             $(".location").append(", " + country);
            break;
        } // Switch END
      } // For loop END
    }); // Location JSON END
    
    
    // Get weather data
    $.getJSON(weatherURL_current, function(data) {
      
      // Initialise and store variables
      var detail_current = data.weather[0].description;
      var temp_main_c = data.main.temp;
      var temp_main_f = data.main.temp * 1.8 + 32;
      var iconURL_current = data.weather[0].icon;
      var celcius = ' \u2103';
      var farenheight = ' \u2109';
      
      // Send weather data to html
      $(".weather").empty().append(detail_current);
      document.getElementById("icon").src = iconURL_current;
      $(".temp").empty().append(temp_main_c.toFixed(2) + celcius);
      
      $(".switch-label").click(function () {
        console.log("switched");
        var self = $(this);
        if(self.hasClass("c")) {
          console.log("F");
          self.removeClass("c");
          self.addClass("f");
          $(".temp").empty().append(temp_main_f.toFixed(2) + farenheight);
        } else if (self.hasClass("f")) {
          console.log("C");
          self.removeClass("f");
          self.addClass("c");
          $(".temp").empty().append(temp_main_c.toFixed(2) + celcius);
        }
      
      });
    }); // Weather JSON END
   } // geoSuccess END
    
  // Error function
  function geoError(PositionError) {
    console.log("Error with location");
  } // Error function END
}); // Document ready END
