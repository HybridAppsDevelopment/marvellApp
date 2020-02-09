(function(){


    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyC8wEjeoXvk-juvm07d2s94ks99tIPhhG0",
      authDomain: "marvelinfo-c2101.firebaseapp.com",
      databaseURL: "https://marvelinfo-c2101.firebaseio.com",
      storageBucket: "marvelinfo-c2101.appspot.com",
      messagingSenderId: "755405236812"
    };
	firebase.initializeApp(config);
	
	/*

    document.addEventListener('DOMContentLoaded', function () {
	    //Log user out when they click button
		document.getElementById('logoutNav').addEventListener('click', e => {
			e.preventDefault();
			$(function() {
              $.getScript('js/changeAppPage.js', function() {
                changeAppPage('_home');
              });
            });
		    firebase.auth().signOut();
		});

		document.getElementById('logoutMobNav').addEventListener('click', e => {
			e.preventDefault();
			$(function() {
              $.getScript('js/changeAppPage.js', function() {
                changeAppPage('_home');
              });
            });
		    firebase.auth().signOut();
		});

	    firebase.auth().onAuthStateChanged(firebaseUser => {
		    if(firebaseUser){
		    	document.getElementById('loginNav').classList.add('hide');
		    	document.getElementById('regNav').classList.add('hide');
		    	document.getElementById('logoutNav').classList.remove('hide');

		    	document.getElementById('loginMobNav').classList.add('hide');
		    	document.getElementById('regMobNav').classList.add('hide');
		    	document.getElementById('logoutMobNav').classList.remove('hide');

		        const currentUserID = firebaseUser.uid;
		        firebase.database().ref('users/' + currentUserID).once("value", function(data) {
		        	var usersData = data.val();
		        	var AccType = usersData.AccType;
		        	const username = "User: " + usersData.Username;
		        	document.getElementById('currentUsername').innerHTML = username;
		        	document.getElementById('currentUsernameMob').innerHTML = username;
					if(AccType == "contentM"){
						document.getElementById('addNewsNav').classList.remove('hide');
						document.getElementById('addArticleNav').classList.remove('hide');
						document.getElementById('addNewsMobNav').classList.remove('hide');
						document.getElementById('addArticleMobNav').classList.remove('hide');
					}else{
						document.getElementById('addNewsNav').classList.add('hide');
						document.getElementById('addArticleNav').classList.add('hide');
						document.getElementById('addNewsMobNav').classList.add('hide');
						document.getElementById('addArticleMobNav').classList.add('hide');
					}
				});



		    } else {
		    	document.getElementById('loginNav').classList.remove('hide');
		    	document.getElementById('regNav').classList.remove('hide');
		      	document.getElementById('logoutNav').classList.add('hide');
				document.getElementById('addNewsNav').classList.add('hide');
				document.getElementById('addArticleNav').classList.add('hide');
		    	document.getElementById('loginMobNav').classList.remove('hide');
		    	document.getElementById('regMobNav').classList.remove('hide');
		      	document.getElementById('logoutMobNav').classList.add('hide');
				document.getElementById('addNewsMobNav').classList.add('hide');
				document.getElementById('addArticleMobNav').classList.add('hide');

		        document.getElementById('currentUsername').innerHTML = "";
		        document.getElementById('currentUsernameMob').innerHTML = "";
		    	console.log('not logged in');
		    }
  		});
	});

	*/
}());
