var config = {
  apiKey: "AIzaSyCX5LsEKMbnO6pdaf3BQAqBOsbctQ4U77I",
  authDomain: "doodle-hub.firebaseapp.com",
  databaseURL: "https://doodle-hub.firebaseio.com",
  projectId: "doodle-hub",
  storageBucket: "doodle-hub.appspot.com",
  messagingSenderId: "118239660738"
};
firebase.initializeApp(config);

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


//   (function( $ ){
//     $.fn.multipleInput = function() {
//          return this.each(function() {
//               // list of email addresses as unordered list
//               $list = $('<ul/>');
//               // input
//               var $input = $('<input type="text" id="email_search" class="email_search multiemail"/>').keyup(function(event) { 
//                    if(event.which == 188 || event.which == 13 ) {  // event.which == 32 for space                       
//                     // event.which == 13 || event.which == 188 for comma and enter
//                         if(event.which==188){
//                           var val = $(this).val().slice(0, -1);// remove space/comma from value
//                         }
//                         else{
//                         var val = $(this).val(); // key press is space or comma                        
//                         }                         
//                         // append to list of emails with remove button
//                         $list.append($('<li class="multipleInput-email"><input type="hidden" name="listevent[]" type="text" value="' + val + '"> <span>' + val + '</span></li>')
//                              .append($('<a href="#" class="multipleInput-close" title="Remove"> <i class="fa fa-close"></i></a>')
//                                   .click(function(e) {"><i class="
//                                        $(this).parent().remove();
//                                        e.preventDefault();
//                                   })
//                              )
//                         );
//                         $(this).attr('placeholder', '');
//                         // empty input
//                         $(this).val('');
                        
//                    }
//               });
//               // container div
//               var $container = $('<div class="multipleInput-container" />').click(function() {
//                    $input.focus();
//               });
//               // insert elements into DOM
//               $container.append($list).append($input).insertAfter($(this));
//               return $(this).hide();
//          });
//     };
// })( jQuery )
// $('#eventlist').multipleInput()

var email = getUrlVars()["email"];
var pwd0 = getUrlVars()["password"];

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
  vars[key] = value;
  });
  return vars;
}

firebase.auth().signInWithEmailAndPassword(email, pwd0).catch(function(error) {
  // Handle Errors here.
  errorCode = error.code
  var errorMessage = error.message
  $('#messageModalLabel').html('ERROR: '+error.code, ['danger'])
  $("#messageModalLabel").modal('hide')
  $("#exampleModalCenter").modal('show')

})


document.querySelector('.createform').addEventListener('submit',(event)=> {
  event.preventDefault()
  //event variables
  let mapevent = event.target.mapevent.value

  let eventname = event.target.eventname.value

  let eventcaption = event.target.eventcaption.value

  let college = event.target.college.value

  let city = event.target.city.value

  let state = event.target.state.value

  let country = event.target.country.value

  let eventstart = event.target.eventstart.value

  let eventend = event.target.eventend.value
  if (eventend == '') 
  {
    eventend = eventstart
  }

  // let eventtype = event.target.eventtype.value
  let eventtypecheckbox = document.getElementsByName('eventtype[]')
  let eventtype = []
  for (var i=0, n=eventtypecheckbox.length;i<n;i++) 
  {
      if (eventtypecheckbox[i].checked) 
      {
          eventtype.push(eventtypecheckbox[i].value)
      }
  }

  let eventdescription = event.target.eventdescription.value

  let deadline = event.target.deadline.value

   let listevent = event.target.eventlist.value
  // let listeventarray = document.getElementsByName('listevent[]')
  // let listevent = []
  // for (var i=0, n=listeventarray.length;i<n;i++) 
  // {
  //   listevent.push(listeventarray[i].value)
  // }

  let registrationfee = event.target.registrationfee.value

  // let eventdept = event.target.eventdept.value
  let eventdeptcheckbox = document.getElementsByName('eventdept[]')
  let eventdept = []
  for (var i=0, n=eventdeptcheckbox.length;i<n;i++) 
  {
      if (eventdeptcheckbox[i].checked) 
      {
          eventdept.push(eventdeptcheckbox[i].value)
      }
  }

  let contactperson = event.target.contactperson.value

  let registrationlink = event.target.registrationlink.value
  let eventimagefile =  event.target.eventimage.files[0]
  
  let eventimage = ''
  if(eventimagefile){
    eventimage = eventimagefile.name  
    
  } 
  let latitude
  let longitude
  var geocoder = new google.maps.Geocoder()
  var address = mapevent
  console.log(mapevent)
  console.log(eventname)
  console.log(eventcaption)
  console.log(college)
  console.log(city)
  console.log(state)
  console.log(country)
  console.log(eventstart)
  console.log(eventend)
  console.log(eventtype)
  console.log(eventdescription)
  console.log(deadline)
  console.log(listevent)
  console.log(registrationfee)
  console.log(eventdept)
  console.log(contactperson)
  console.log(registrationlink)
  console.log(eventimage)
  // validating event fields
  let value = '';
  value = validateEventField(mapevent,eventname,eventcaption,college,city,state,country,eventstart,eventend,eventtype,eventdescription,deadline,listevent,registrationfee,eventdept,contactperson,registrationlink,eventimage)
  if(value == 'verified'){ 
    $("#messageModalLabel").html(`<div class="mx-auto">please wait !</div><i class="fa fa-cog fa-spin"></i>`, ['center', 'info'])
    $("#messageModal").modal('show')

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var userId = user.uid
        // console.log(userId)
        //send data to firebase database
        // Get a reference to the database service
        var database = firebase.database()
        const storageService = firebase.storage();
        const storageRef = storageService.ref();
        createEvent(mapevent,latitude,longitude,eventname,eventcaption,college,city,state,country,eventstart,eventend,eventtype,eventdescription,deadline,listevent,registrationfee,eventdept,contactperson,registrationlink,eventimage)

        function createEvent(mapevent,latitude,longitude,eventname,eventcaption,college,city,state,country,eventstart,eventend,eventtype,eventdescription,deadline,listevent,registrationfee,eventdept,contactperson,registrationlink,eventimage) {
          // console.log(userId);
          geocoder.geocode( { 'address': address}, function(results, status) {
    
            if (status == google.maps.GeocoderStatus.OK) {
              latitude = results[0].geometry.location.lat()
              longitude = results[0].geometry.location.lng()
            }
            // Create a new post reference with an auto-generated id
            let postListRef =  firebase.database().ref('Events/')
            var newPostRef = postListRef.push();
            newPostRef.set({
              userId : userId,
              latitude : latitude,
              longitude : longitude,
              eventname : eventname,
              eventcaption : eventcaption,
              college : college,
              city : city,
              state : state,
              country : country,
              eventstart : eventstart,
              eventend : eventend,
              eventtype : eventtype,
              eventdescription : eventdescription,
              deadline : deadline,
              listevent : listevent,
              registrationfee : registrationfee,
              eventdept : eventdept,
              contactperson : contactperson,
              registrationlink : registrationlink,
              eventimage : eventimage
              }) 
              storageRef.child(`eventimage/${eventimage}`).put(eventimagefile)
          })
        
        }
        $("#messageModalLabel").html(`Event Successfully created  <a class="btn btn-warning logo1" href="./blank.html" >Close</a>`)
        clearForm()
      }
    })
  
  }
  if(value == 'notverified'){
    // alert('not verified')
  }
 
})
// mapevent,eventname,eventcaption,college,city,state,country,eventstart,eventend,eventtype,eventdescription,deadline,listevent,registrationfee,eventdept,contactperson,registrationlink,eventimage






let mapeventfeedback,eventnamefeedback,eventcaptionfeedback,collegefeedback,cityfeedback,statefeedback,countryfeedback,eventstartfeedback,eventendfeedback,eventtypefeedback,eventdescriptionfeedback,deadlinefeedback,eventlistfeedback,registrationfeefeedback,eventdepartmentfeedback,contactpersonfeedback,registrationlinkfeedback,uploadimagefeedback

  mapeventfeedback = document.querySelector('.mapeventfeedback')
  eventnamefeedback = document.querySelector('.eventnamefeedback')
  eventcaptionfeedback = document.querySelector('.eventcaptionfeedback')
  collegefeedback = document.querySelector('.collegefeedback')
  cityfeedback = document.querySelector('.cityfeedback')
  statefeedback = document.querySelector('.statefeedback')
  countryfeedback = document.querySelector('.countryfeedback')
  eventstartfeedback = document.querySelector('.eventstartfeedback')
  eventendfeedback = document.querySelector('.eventendfeedback')
  eventtypefeedback = document.querySelector('.eventtypefeedback')
  eventdescriptionfeedback = document.querySelector('.eventdescriptionfeedback')
  deadlinefeedback = document.querySelector('.deadlinefeedback')
  eventlistfeedback = document.querySelector('.eventlistfeedback')
  registrationfeefeedback = document.querySelector('.registrationfeefeedback')
  eventdepartmentfeedback = document.querySelector('.eventdepartmentfeedback')
  contactpersonfeedback = document.querySelector('.contactpersonfeedback')
  registrationlinkfeedback = document.querySelector('.registrationlinkfeedback')
  uploadimagefeedback = document.querySelector('.uploadimagefeedback')
  uploadimagefeedback.textContent = ' you may uplaod event banner or image to attract more people'
  registrationlinkfeedback.textContent = `you may enter registration link for you event(college website) or leave blank if you won't`
  registrationfeefeedback.textContent = 'you may enter registration fees or ***if event is free enter fee as zero(0) (in number) ***'

function validateEventField(mapevent,eventname,eventcaption,college,city,state,country,eventstart,eventend,eventtype,eventdescription,deadline,listevent,registrationfee,eventdept,contactperson,registrationlink,eventimage){
  if(eventname == null || eventname == ''){
    eventnamefeedback.textContent = ' Event name is mandatory '
    event.stopPropagation();
    return 'notverified'
  }else{
    eventnamefeedback.textContent = ' Looks good!'
  }
  if(eventcaption == null || eventcaption == ''){
    eventcaptionfeedback.textContent = ' Event Caption is mandatory, brief info about your event '
    event.stopPropagation();
    return 'notverified'
  }else{
    eventcaptionfeedback.textContent = ' Looks good!'
  }
  if(college == null || college == ''){
    collegefeedback.textContent = ' please enter college name or the organisation '
    event.stopPropagation();
    return 'notverified'
  }else{
    collegefeedback.textContent = ' Looks good!'
  }
  if(city == null || city == ''){
    cityfeedback.textContent = ' please enter event city '
    event.stopPropagation();
    return 'notverified'
  }else{
    cityfeedback.textContent = ' Looks good!'
  }
  if(state == 'Choose...'){
    statefeedback.textContent = ' please choose the state '
    event.stopPropagation();
    return 'notverified'
  }else{
    statefeedback.textContent = ' Looks good!'
  }
  if(country == '' || country == null){
    countryfeedback.textContent = ' please enter Country name'
    event.stopPropagation();
    return 'notverified'
  }else{
    countryfeedback.textContent = ' Looks good!'
  }
  if(eventstart == '' || eventstart == null){
    eventstartfeedback.textContent = ' please Select starting date of the event'
    event.stopPropagation();
    return 'notverified'
  }else{
    eventstartfeedback.textContent = ' Looks good!'
  }
  if(eventend){
    if(eventend < eventstart){
      eventendfeedback.textContent = ' enter valid event ending date'
      event.stopPropagation();      
      return 'notverified'
    }
    else{
      eventendfeedback.textContent = ' Looks good!'
      
    }
  }else{
    eventend = eventstart
    eventendfeedback.textContent = 'you may enter ending date of the event'
  }
  if(mapevent == null || mapevent == ''){
    mapeventfeedback.textContent = ' Mapping event place is mandatory, use search bar for select event place '
    event.stopPropagation()
    return 'notverified'
  }else{
    mapeventfeedback.textContent = ' Looks good!';
  }
 
  if(eventtype == '' || eventtype == null){
    eventtypefeedback.textContent = ' select atleast one event type '
    event.stopPropagation();
    return 'notverified'
  }else{
    eventtypefeedback.textContent = ' Looks good!'
  }
  if(eventdescription == '' || eventdescription == null ){
    eventdescriptionfeedback.textContent = ' please enter the brief discription of your event , it is mandatory '
    event.stopPropagation();
    return 'notverified'
  }else{
    eventdescriptionfeedback.textContent = ' Looks good!'
  }
 
  if(listevent == '' || listevent == null ){
    eventlistfeedback.textContent = ' please enter atleast one event and leave comma (,) between each events '
    event.stopPropagation();
    return 'notverified'
  }else{
    eventlistfeedback.textContent = ' Looks good!'
  }
  
  if(registrationfee){
    registrationfeefeedback.textContent = ' Looks good!'
  }else{
    registrationfeefeedback.textContent = 'you may enter registration fees or ***if event is free enter fee as zero(0) (in number) ***'
  }
  if(deadline){
    if(deadline > eventend){
      deadlinefeedback.textContent = ' deadline date is invalid ,please enter valid deadline date '
      event.stopPropagation();      
      return 'notverified'
    }
    else{
      deadlinefeedback.textContent = ' Looks good!'
      
    }
  }else{
    deadlinefeedback.textContent = 'you may enter deadline date for registration'
  }



  if(eventdept == '' || eventdept == null){
    eventdepartmentfeedback.textContent = ' select atleast one event type '
    event.stopPropagation();
    return 'notverified'
  }else{
    eventdepartmentfeedback.textContent = ' Looks good!'
  }

  if(contactperson == '' || contactperson == null ){
    contactpersonfeedback.textContent = ' please enter contact phone number or email id (event coordinator/event organiser)'
    event.stopPropagation();
    return 'notverified'
  }else{
    contactpersonfeedback.textContent = ' Looks good!'
    uploadimagefeedback.textContent = ' you may uplaod event banner or image to attract more people'
  }

  if(registrationlink){
    registrationlinkfeedback.textContent = ' Looks good!'
    
  }else{
    registrationlinkfeedback.textContent = `you may enter registration link for you event(college website) or leave blank if you won't`
  }

  if(eventimage){
    uploadimagefeedback.textContent = ' Looks good!'
  }else{
    uploadimagefeedback.textContent = ' you may uplaod event banner or image to attract more people'
  }
  return 'verified'
}

function clearForm(){
  event.target.mapevent.value = ''
  event.target.eventname.value = ''
  event.target.eventcaption.value = ''
  event.target.college.value = ''
  event.target.city.value = ''
  event.target.state.value = ''
  event.target.country.value = ''
  event.target.eventstart.value = ''
  event.target.eventend.value = ''
  event.target.eventdescription.value = ''
  event.target.deadline.value = ''
  event.target.registrationfee.value = ''
  event.target.contactperson.value = ''
  event.target.registrationlink.value = ''
  event.target.eventimage.value = ''
} 
