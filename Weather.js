var ACCESS_TOKEN = "1b715d79da62620893e58bb6d1281e56"

var WEATHER_ENDPOINT = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/"

var SEARCH_ENDPOINT = WEATHER_ENDPOINT + ACCESS_TOKEN


$(document).ready(function() {
  var coords = undefined
  $("#error-message").append('Waiting for GPS coordinates...')

  if(navigator.geolocation !== undefined) {
    navigator.geolocation.watchPosition(function(position) {
      coords = position.coords
      $("#error-message").empty()
      requestSearch(coords);
    })
  }
})

function requestSearch(coordinates) {
  $.ajax({
    url: SEARCH_ENDPOINT + "/" + coordinates.latitude + "," + coordinates.longitude,
    type: 'GET',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', 'bearer ' + ACCESS_TOKEN);
    },
    success: searchSuccess,
    error: searchError,
    data: {
      "latitude": coordinates.latitude,
      "longitude": coordinates.longitude,
    }
  });
}

function searchSuccess(data, textStatus, jqXHR) {
  console.log("it worked probably", textStatus, data);
  renderCurrent(data.currently);
}

function renderCurrent(current) {
  $("#currentTemperature").html(current.temperature);
  $("#currentPrecip").html(String(current.precipProbability * 100) + "%" );
  $("#currentIcon").html(current.icon);
//  $("#currentLocation").html(current.location);
  function timeConverter(){
    var a = new Date(current.time * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var time = month + ' ' + date + ' ' + year + ' ' + hour + ':' + min ;
    return time;
  }
  $("#currentDateTime").html(timeConverter());
}

function searchError(jqXHR, error, errorThrown) {
  var errorMessageDiv = $("<div class = 'error-message'> Something went wrong! Want to try again? </div>");
  errorMessageDiv.appendTo($('#search-results'));
  console.log("oops???");
  console.error(error);
}
