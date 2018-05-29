
function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 11.1271, lng: 78.6569},
    zoom: 13,
    mapTypeId: 'roadmap'
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

(function( $ ){
  $.fn.multipleInput = function() {
       return this.each(function() {
            // list of email addresses as unordered list
            $list = $('<ul/>');
            // input
            var $input = $('<input type="email" id="email_search" class="email_search multiemail"/>').keyup(function(event) { 
                 if(event.which == 13 || event.which == 188) {  // event.which == 32 for space                       
                  // event.which == 13 || event.which == 188 for comma and enter
                      if(event.which==188){
                        var val = $(this).val().slice(0, -1);// remove space/comma from value
                      }
                      else{
                      var val = $(this).val(); // key press is space or comma                        
                      }                         
                      // append to list of emails with remove button
                      $list.append($('<li class="multipleInput-email"><span>' + val + '</span></li>')
                           .append($('<a href="#" class="multipleInput-close" title="Remove"><i class="fa fa-close"></i></a>')
                                .click(function(e) {
                                     $(this).parent().remove();
                                     e.preventDefault();
                                })
                           )
                      );
                      $(this).attr('placeholder', '');
                      // empty input
                      $(this).val('');
                      
                 }
            });
            // container div
            var $container = $('<div class="multipleInput-container" />').click(function() {
                 $input.focus();
            });
            // insert elements into DOM
            $container.append($list).append($input).insertAfter($(this));
            return $(this).hide();
       });
  };
})( jQuery );
$('#recipient_email').multipleInput();