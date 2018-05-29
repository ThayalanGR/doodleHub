
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCX5LsEKMbnO6pdaf3BQAqBOsbctQ4U77I",
    authDomain: "doodle-hub.firebaseapp.com",
    databaseURL: "https://doodle-hub.firebaseio.com",
    projectId: "doodle-hub",
    storageBucket: "doodle-hub.appspot.com",
    messagingSenderId: "118239660738"
};
firebase.initializeApp(config);
// Get a reference to the database service
var database = firebase.database()
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        $(".changelogin").html(`<i class="fa fa-cog fa-3x fa-spin loginbutton mr-4"></i>`, ['center', 'info'])
        // User is signed in.
        var uid = user.uid
        var email = user.email
        var emailVerified = user.emailVerified
        var isAnonymous = user.isAnonymous
        var ref = database.ref('/Users/' + uid)
        var userinfo = null;
        // console.log(emailVerified)
        if(emailVerified){
            ref.on("value", function(snapshot) {
                                //console.log(snapshot.val());
                                userinfo = snapshot.val()


                                let a = document.querySelector('.changelogin')
                                
                                //html generation
                                a.innerHTML =  `<div class="">\
                                <button type="button" class="btn btn-primary btn-sm shadow loginbutton dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                                Hi ${userinfo.username}\
                                </button><div class="dropdown-menu">\
                                <a class="dropdown-item" href="#">Profile</a>\
                                <a class="dropdown-item" href="#">#</a>\
                                <a class="dropdown-item" href="#">#</a>\
                                <div class="dropdown-divider"></div>\
                                <a class="dropdown-item btn btn-outline-danger" onclick="signOut()" >SignOut</a>\
                                </div></div> <a class="btn btn-primary btn-sm shadow loginbutton1 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >\
                                            <i class="fa fa-sign-in logo2" aria-hidden="true"></i>\
                                </a>`
                                //html generation end

    
                            },  function (errorObject) {
                                    console.log("The read failed: " + errorObject.code)

                                }
            )
        }else{
            $("#messageModalLabel").html(`<div class="mx-auto"> you haven't verified your email yet! please verify your email and then login. </div><button type="button" class="btn btn-link btn-outline-warning" data-dismiss="modal">Close</button>`, ['center', 'info']);
            $("#messageModal").modal('show');
           // firebase.auth().signOut();
            let a = document.querySelector('.changelogin')
            a.innerHTML =  `<div class="col login changelogin ">\
                        <a class="btn btn-primary btn-sm shadow loginbutton" data-toggle="modal" data-target="#exampleModalCenter" aria-label="Skip to main navigation">\
                            <span class="logo1" >Login <span class="logo2">or</span> Register</span>\
                     </a>\
                        <a class="btn btn-primary btn-sm shadow loginbutton1" data-toggle="modal" data-target="#exampleModalCenter" aria-label="Skip to main navigation" aria-label="Skip to main navigation">\
                                <i class="fa fa-sign-in logo2" aria-hidden="true"></i>\
                        </a>\
                    </div>` 
            $("#messageModal").modal('hide');
        }
    }else{
        let a = document.querySelector('.changelogin')
        a.innerHTML =  `<div class="col login changelogin ">\
                    <a class="btn btn-primary btn-sm shadow loginbutton" data-toggle="modal" data-target="#exampleModalCenter" aria-label="Skip to main navigation">\
                        <span class="logo1" >Login <span class="logo2">or</span> Register</span>\
                 </a>\
                    <a class="btn btn-primary btn-sm shadow loginbutton1" data-toggle="modal" data-target="#exampleModalCenter" aria-label="Skip to main navigation" aria-label="Skip to main navigation">\
                            <i class="fa fa-sign-in logo2" aria-hidden="true"></i>\
                    </a>\
                </div>` 
    }
})
// <!-- validation and data preparation -->  
document.querySelector('.signInForm').addEventListener('submit',(event)=> {  
    event.preventDefault();
     // console.log(event);
    let email = event.target.email.value
    let pwd0 = event.target.pwd0.value
    let check = event.target.check.value

     
    function clearForm(){       
        event.target.email.value = ''
        event.target.pwd0.value = ''
        event.target.check.value = ''
    }
    
    console.log(email, pwd0, check)
    let value = '';
    value = formValidation(email, pwd0)
    console.log(value)

    $("#exampleModalCenter").modal('hide')

    // processing sigin bar
    $("#messageModalLabel").html(`
    <div class="mx-auto"> please wait ! </div> <i class="fa fa-cog fa-spin"></i>`, ['center', 'info']);
    $("#messageModal").modal('show');


    if(value == 'verified'){
        firebase.auth().signInWithEmailAndPassword(email, pwd0).catch(function(error) {
            // Handle Errors here.
            errorCode = error.code
            var errorMessage = error.message
            $('#messageModalLabel').html('ERROR: '+error.code, ['danger'])
            $("#messageModalLabel").modal('hide')
            $("#exampleModalCenter").modal('show')
         
        })
      
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                var uid = user.uid
                var email = user.email
                var emailVerified = user.emailVerified
                var isAnonymous = user.isAnonymous
                var ref = database.ref('/Users/' + uid)
                var userinfo = null;
                console.log(emailVerified)
                if(emailVerified){
                    ref.on("value", function(snapshot) {
                                        //console.log(snapshot.val());
                                        userinfo = snapshot.val()

                                        $('#messageModalLabel').html('Login Success!', ['center', 'success'])

                                        let a = document.querySelector('.changelogin')
                                        
                                        //html generation
                                        a.innerHTML =  `<div class="">\
                                        <button type="button" class="btn btn-primary btn-sm shadow loginbutton dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                                        Hi ${userinfo.username}\
                                        </button><div class="dropdown-menu">\
                                        <a class="dropdown-item" href="#">Profile</a>\
                                        <a class="dropdown-item" href="#">#</a>\
                                        <a class="dropdown-item" href="#">#</a>\
                                        <div class="dropdown-divider"></div>\
                                        <a class="dropdown-item btn btn-outline-danger" onclick="signOut()" >SignOut</a>\
                                        </div></div> <a class="btn btn-primary btn-sm shadow loginbutton1 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >\
                                                    <i class="fa fa-sign-in logo2" aria-hidden="true"></i>\
                                        </a>`
                                        //html generation end

                                        $("#messageModal").modal('hide')

                                    },  function (errorObject) {
                                            console.log("The read failed: " + errorObject.code)

                                        }
                    )
                    clearForm()
                }else{      

                    $("#exampleModalCenter").modal('show')   
                    $("#pushmessage").html(`<div class="mx-auto text-warning"> you haven't verified your email yet! please verify your email and then login.<span class="text-danger">Haven't recieved verification email yet ?</span> </div><a class="btn btn-outline-warning logo2" onClick= "resendVerification()"> Resend verification email </a> `, ['center', 'info'])
                    // firebase.auth().signOut()
                }
            }   
        })
    }       
    if(value == 'notverified'){
         alert('something went wrong with form please ');
    }
})// end of main function
//form validation
function formValidation(email, pwd0){
    if (email.length < 4) {
        alert('Please enter an email address.');
        return 'notVerified';
    }
    if (pwd0.length < 4) {
        alert('Please enter a password.');
        return 'notVerified';
    }

    return 'verified'
}
//signout function
function signOut(){
    $("#messageModalLabel").html(`<div class="mx-auto">please wait !</div><i class="fa fa-cog fa-spin"></i>`, ['center', 'info'])
    $("#messageModal").modal('show');
    firebase.auth().signOut();
    let a = document.querySelector('.changelogin')
    setTimeout(function() {
        $('#messageModalLabel').html('Logout Success!', ['center', 'success'])   
        $("#messageModal").modal('hide')      
    }, 1500)
    a.innerHTML =  `<div class="col login changelogin ">\
                <a class="btn btn-primary btn-sm shadow loginbutton" data-toggle="modal" data-target="#exampleModalCenter" aria-label="Skip to main navigation">\
                    <span class="logo1" >Login <span class="logo2">or</span> Register</span>\
             </a>\
                <a class="btn btn-primary btn-sm shadow loginbutton1" data-toggle="modal" data-target="#exampleModalCenter" aria-label="Skip to main navigation" aria-label="Skip to main navigation">\
                        <i class="fa fa-sign-in logo2" aria-hidden="true"></i>\
                </a>\
            </div>` 
}
function resetTemplate(){
    $("#exampleModalCenter").modal('hide')
    $("#messageModalLabel").html(`<div class="mx-auto justify-content-center" >
    <div class="text-warning ml-5">Reset Password</div>
    <label class="text-primary logo2" for="resetformemail">Enter your registered email-id :</label>
    <input type="text" name="resetemail" id="resetformemail" class="form-control input-sm">
    <button class="btn btn-sm btn-block btn-warning logo1 " onclick="sendPasswordReset()">Submit</button>
  </div>`, ['center', 'info'])
    $("#messageModal").modal('show')
}
function sendPasswordReset() {
    var email = document.getElementById('resetformemail').value;
    $("#messageModalLabel").html(`<div class="text-success">please wait!</div><br><i class="fa fa-cog fa-2x fa-spin"></i>`, ['center', 'info'])
    firebase.auth().sendPasswordResetEmail(email).then(function() {
      $("#messageModalLabel").html(`Password Reset Email Sent! please check your email-id <button type="button" class="btn btn-link btn-outline-warning" data-dismiss="modal">Close</button> `, ['center', 'info'])
 
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      $("#messageModalLabel").html(`<div class="text-warning ml-5">Reset Password</div>
      <label class="text-primary logo2" for="resetformemail">Enter your registered email-id :</label>
      <input type="text" name="resetemail" id="resetformemail" class="form-control input-sm">
      <button class="btn btn-sm btn-block btn-warning logo1 " onclick="sendPasswordReset()">Submit</button>`, ['center', 'info'])
      if (errorCode == 'auth/invalid-email') {
        $("#messageModalLabel1").html(errorMessage, ['center', 'info'])
      } else if (errorCode == 'auth/user-not-found') {
        $("#messageModalLabel1").html(errorMessage, ['center', 'info'])
      }
    })
}
//   resend email verification
function resendVerification(){
    firebase.auth().onAuthStateChanged(function(user) {
        alert('ss')
        if (user) {
            firebase.auth().currentUser.sendEmailVerification().then(function() {
                // let feedBack1 = document.querySelector('.errorMessage')
                // feedBack1.textContent = ''
                $("#pushmessage").html(`Verification email has been sent again to your email-id, please verify your email and then login. thank you by <b>doodleHub</b> team.`, ['center', 'info'])
                alert('ss')
                firebase.auth().signOut();
            })
        }
   })
}
function createEventRedirect(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var url = "../create.html"
            window.location = url
        }else{
            $('#messageModalLabel').html(`Sorry you must be logged in to create the event. Please Login!.<button type="button" class="btn btn-link btn-outline-warning" data-dismiss="modal" onClick="$('#exampleModalCenter').modal('show')" >Login</button> `, ['center', 'info'])
            $('#messageModal').modal('show')
        }
   })
    
}
