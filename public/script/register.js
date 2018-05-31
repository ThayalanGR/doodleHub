
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCX5LsEKMbnO6pdaf3BQAqBOsbctQ4U77I",
  authDomain: "doodle-hub.firebaseapp.com",
  databaseURL: "https://doodle-hub.firebaseio.com",
  projectId: "doodle-hub",
  storageBucket: "doodle-hub.appspot.com",
  messagingSenderId: "118239660738"
}
firebase.initializeApp(config);

// <!-- validation and data preparation -->
document.querySelector('.signUpForm').addEventListener('submit',(event)=> {
  firebase.auth().signOut();
  event.preventDefault();
  
  // console.log(event);
  let fname = event.target.fname.value
  let lname = event.target.lname.value
  let email = event.target.email.value
  let pwd0 = event.target.pwd0.value
  let pwd1 = event.target.pwd1.value
  let city = event.target.city.value
  let college = event.target.college.value
  let dob = event.target.dob.value
  let mobile = event.target.mobile.value
  let check = event.target.check.value

  
  function clearForm(){
      event.target.fname.value = ''

      event.target.lname.value = ''

      event.target.email.value = ''

      event.target.pwd0.value = ''

      event.target.pwd1.value = ''

      event.target.city.value = ''

      event.target.college.value = ''
      event.target.dob.value = ''

      event.target.mobile.value = ''
      event.target.check.value = ''
  }
 
  // console.log(fname, lname, email, pwd0, pwd1, city, college, dob, status, check)
  let value = '';
  value = formValidation(fname, lname, email, pwd0, pwd1, city, college, dob, mobile, check)
  // console.log(value)
  if(value == 'verified'){
    $("#messageModalLabel").html(`<div class="mx-auto">please wait !</div><i class="fa fa-cog fa-spin"></i>`, ['center', 'info'])
    $("#messageModal").modal('show');
    //send email and password to firebase authentication system
      firebase.auth().createUserWithEmailAndPassword(email, pwd0).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        // [START_EXCLUDE]
        $("#messageModal").modal('hide');
        if (errorCode == 'auth/weak-password') {
          let feedBack = document.querySelector('.pwd0feedback')
          let feedBack1 = document.querySelector('.pwd1feedback')
          feedBack.textContent = ' The password is too weak.'
          feedBack1.textContent = ' The password is too weak.'
        } else {
          // alert(errorMessage)
          let feedBack = document.querySelector('.errorMessage')
          feedBack.textContent = errorMessage
        }
        // console.log(error)
        // [END_EXCLUDE]
      })
    
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var userId = user.uid

        // console.log(userId)
        //send data to firebase database
        // Get a reference to the database service
        var database = firebase.database()
        // pushing data into database
        var name = fname + ' ' + lname 
        let imageUrl = 'default'
        let thumb = 'default'
        writeUserData(userId, name, email, imageUrl, pwd0, city, dob, college, mobile, thumb)

        function writeUserData(userId, name, email, imageUrl, pwd0, city, dob, college, mobile, thumb) {
          // console.log(userId);
          firebase.database().ref('Users/' + userId).set({
            username: name,
            email: email,
            image : imageUrl,
            thumbimage: thumb,
            password : pwd0,
            city : city,
            dob : dob,
            college : college,
            phone : mobile
          })
        }
        sendEmailVerification()
      //send email cerification
      function sendEmailVerification() {
        // [START sendemailverification]
        firebase.auth().currentUser.sendEmailVerification().then(function() {
          // Email Verification sent!
          // [START_EXCLUDE]
          
          let feedBack1 = document.querySelector('.errorMessage')
          feedBack1.textContent = ''
          // let feedBack = document.querySelector('.message')
          // feedBack.innerHTML = 'Account successfully created, please check your email id for verification <a class = "btn btn-link" href="./index.html">click here!</a> to go to doodleHub home page.'
        //   $("#exampleModalCenter").modal()
          $("#messageModalLabel").html(`Account successfully created, please check your email id for verification <a class = "btn btn-link btn-outline-warning" style = "text-decoration:none;" href="./index.html">click here!</a> to go to doodleHub home page.`)
          firebase.auth().signOut();
          // alert('Email Verification Sent!');
          // [END_EXCLUDE]
        })
        // [END sendemailverification]
      }
   



       // ...
      } else {
        // User is signed out.
        // ...
      }
    });
    //getting user id from authentication server
    // if (firebase.auth().currentUser !== null) 
    //   console.log("user id: " + firebase.auth().currentUser.uid);

    // clearing the text fields after updating to the firebase authentication and database system
    clearForm()

    //else part for main functon
  }
  
  if(value == 'notverified'){
    let feedBack = document.querySelector('.errorMessage')
      feedBack.textContent = 'something wrong with form please check the details'
  }     

})// end of main function


//another function


function formValidation(fname, lname, email, pwd0, pwd1, city, college, dob, mobile, check){
  //firsdtname and lastname validation
  if(fname.length < 3 || lname.length < 1 || fname == null || lname == null ||  fname == undefined || lname == undefined){
    let feedBack = document.querySelector('.fnamefeedback')
    let feedBack1 = document.querySelector('.lnamefeedback')
    feedBack.textContent = ' Looks bad! ';
    feedBack1.textContent = ' Looks bad! ';
    event.stopPropagation();
    return 'notverified'
  }else{
    let feedBack = document.querySelector('.fnamefeedback')
    let feedBack1 = document.querySelector('.lnamefeedback')
    feedBack.textContent = ' Looks good! ';
    feedBack1.textContent = ' Looks good! ';
  }

   if(email.length < 5 || email == null || email == undefined || email == ''){
    let feedBack = document.querySelector('.emailfeedback')
    feedBack.textContent = 'Please enter valid email-id for authentication'
    event.stopPropagation();
    return 'notverified'
  }
  else{
    let feedBack = document.querySelector('.emailfeedback')
    feedBack.textContent = 'looks good!'
  }
  
  // passwordvalidation

  if(pwd0.length != pwd1.length || pwd0.length < 6 || pwd0 != pwd1 ){
    let feedBack = document.querySelector('.pwd0feedback')
    let feedBack1 = document.querySelector('.pwd1feedback')
    feedBack.textContent = ' Looks bad! ';
    feedBack1.textContent = ' Looks bad! ';
    event.stopPropagation();
    return 'notverified'
  }else{
    let feedBack = document.querySelector('.pwd0feedback')
    let feedBack1 = document.querySelector('.pwd1feedback')
    feedBack.textContent = ' Looks good! ';
    feedBack1.textContent = ' Looks good! ';
  }


  if(city.length < 3 || city == null || city == undefined ){
    let feedBack = document.querySelector('.cityfeedback')
    feedBack.textContent = 'Please enter valid city'
    event.stopPropagation();
    return 'notverified'
  }else{
    let feedBack = document.querySelector('.cityfeedback')
    feedBack.textContent = 'looks good !'
    

  }
  
  if(college.length < 3 || college == null || college == undefined ){
    let feedBack = document.querySelector('.collegefeedback')
    feedBack.textContent = 'Please enter valid college name'
    event.stopPropagation();
    return 'notverified'

  }else{
    let feedBack = document.querySelector('.collegefeedback')
    feedBack.textContent = 'looks good !'

  }
  if(dob == null || dob == undefined || dob == ''){
    let feedBack = document.querySelector('.dobfeedback')
    feedBack.textContent = 'Please fill-out dob coloumn'
    event.stopPropagation();
    return 'notverified'
  }else{
    let feedBack = document.querySelector('.dobfeedback')
    feedBack.textContent = 'looks good!'
  }

  if(mobile.length < 10 || mobile.length > 10 || mobile == undefined || mobile == ''){
    let feedBack = document.querySelector('.statusfeedback')
    feedBack.textContent = 'Please Provide valid mobile number'
    event.stopPropagation();
    return 'notverified'
  }else{
    let feedBack = document.querySelector('.statusfeedback')
    feedBack.textContent = 'looks good!'
  }
  if(check != 'checked' || check == null || check == undefined){
    let feedBack = document.querySelector('.checkfeedback')
    feedBack.textContent = 'You must agree before submitting.'
    event.stopPropagation();
    return 'notverified'
  }else{
    let feedBack = document.querySelector('.checkfeedback')
    feedBack.textContent = 'form validation success!'
  }
  return 'verified'
}

