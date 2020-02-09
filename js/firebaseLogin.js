(function(){

  // Get Elements
  const usernameText = document.getElementById('username');
  const fnameText = document.getElementById('fname');
  const lnameText = document.getElementById('lname');
  const emailText = document.getElementById('email');
  const passwordText = document.getElementById('password');
  const loginBttn = document.getElementById('login');
  const errorMsg = document.getElementById('msg');

  // Add login event
  loginBttn.addEventListener('click', e => {

    e.preventDefault();
    // Get Email and password
    const email = emailText.value;
    const password = passwordText.value;
    const auth = firebase.auth();
    //Sign in
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message));
    promise.catch(e => errorMsg.innerHTML = (e.message));
  });

  //Send home if logged in
  firebase.auth().onAuthStateChanged(user => {
    if(user) {
      changeAppPage("_home");
    }
  });
}());
