(function(){

  // Get Elements
  const usernameText = document.getElementById('username');
  const fnameText = document.getElementById('fname');
  const lnameText = document.getElementById('lname');
  const emailText = document.getElementById('email');
  const passwordText = document.getElementById('password');
  const signUpBttn = document.getElementById('signUp');
  const errorMsg = document.getElementById('msg');
  
  // Sign up event
  signUpBttn.addEventListener('click', e => {

    e.preventDefault();
    // Get Email and password
    const username = usernameText.value;
    const firstName = fnameText.value;
    const lastName = lnameText.value;
    const email = emailText.value;
    const password = passwordText.value;
    const accType = 'user';
    const auth = firebase.auth();
	
    firebase.database().ref('users').orderByChild("Username").equalTo(username).once("value", function(snapshot) {
  		if(snapshot.numChildren() === 0){

			   const promise = auth.createUserWithEmailAndPassword(email, password).then(response =>{

	    		const promise2 = auth.signInWithEmailAndPassword(email, password).then(response => {
	 		
	    			addToDatabase(username, firstName, lastName, email, accType);

            changeAppPage("_home");

				  });

        });

    		promise.catch(e => console.log(e.message));
        promise.catch(e => errorMsg.innerHTML = (e.message));



  		}else if(snapshot.numChildren() > 0)
  		{
  			errorMsg.innerHTML = "This username is already in use, please use another one.";
  		}
	});
   

  });

  function addToDatabase(username, firstName, lastName, email, accType){
  	var userId = firebase.auth().currentUser.uid;
    firebase.database().ref('users').child(userId).once("value", function(snapshot){
        var ifExists = snapshot.exists(); 
        if (ifExists){
          console.log('already exists in database');
        }else{
          firebase.database().ref('users').child(userId).set({
          	Username: username,
          	FirstName: firstName,
          	LastName: lastName,
          	Email: email,
          	AccType: accType       	
          });
          console.log('added to database');
        }
    })
  }

  
  // Realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
    } else {
      console.log('not logged in');
    }
  });

}());
