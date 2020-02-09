function getFullNews() {

    var itemid = $(".itemidstore").attr("_itemidstore");

    // $('.progress').css({"visibility": "visible"});
    // $('.progressWrapper').css({"visibility": "visible"});


    var contentLoaded;
    const newsTitle = document.getElementById('newsTitle');
    const newsImage = document.getElementById('newsImage');
    const newsAuthor = document.getElementById('newsAuthor');
    const newsDateTime = document.getElementById('newsDateTime');
    const newsFullText = document.getElementById('newsFullText');
    document.getElementById("_editNews").setAttribute("_itemid", itemid);

    firebase.database().ref("News/" + itemid).once("value", function(snapshot) {
        var content = snapshot.val();
        newsTitle.innerHTML = "<h1 class='center red-text'>" + content.Title + "</h1>";
        newsImage.innerHTML = "<img class='responsive-img' src='" + content.ArticleImg + "'>";
        newsAuthor.innerHTML = "<p class='fullTextAuthor'>Author: " + content.Author + "</p>";
        newsDateTime.innerHTML = "<p class='fullTextDateTime'> Written: " + content.DateTime + "</p>";
        newsFullText.innerHTML = "<p>" + content.FullTxt + "</p>";
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            document.getElementById('writeComment').classList.remove('hide');
            firebase.database().ref("user" + user.uid).once("value", function(userData) {
                var userInfo = userData.val();
                var accType = userInfo.AccType;
                if(AccType == "contentM"){
                    document.getElementById('_editNews').classList.remove('hide');
                    document.getElementById('deleteNews').classList.remove('hide');
                }else{                    
                    document.getElementById('_editNews').classList.add('hide');
                    document.getElementById('deleteNews').classList.add('hide');
                }
            });
          } else {
            document.getElementById('writeComment').classList.add('hide');
            document.getElementById('_editNews').classList.add('hide');
            document.getElementById('deleteNews').classList.add('hide');
          }
        });
    });
    
    $('.deleteNews').on('click', e =>  {
    	var confirmation = confirm("Are you sure you want to delete this news article? action can not be undone.");
    	if(confirmation){
        	firebase.database().ref('News/' + itemid).remove(function(){
                alert("News article deleted");
                changeAppPage("_home");
            });
    	}
    });


    $('.addComment').on('click', e =>  {
        e.preventDefault();
        var comment = document.getElementById('comment').value;
        var currentUserID = firebase.auth().currentUser.uid;
        firebase.database().ref('users/' + currentUserID).once("value", function(data){
            var usersData = data.val();
            var usersUsername = usersData.Username;
            var currentDateTime = new Date(); 
		    var hours = currentDateTime.getHours();
		    var minutes = currentDateTime.getMinutes();
		    var ampm = hours >= 12 ? 'pm' : 'am';
		      hours = hours % 12;
		      hours = hours ? hours : 12; // the hour '0' should be '12'
		      minutes = minutes < 10 ? '0'+ minutes : minutes;
		    var datetime = currentDateTime.getDate() + "/"
		                + (currentDateTime.getMonth()+1)  + "/" 
		                + currentDateTime.getFullYear() + " "  
		                + hours + ":"  
		                + minutes + ampm;
            if (comment) {
                firebase.database().ref("Comments/" + itemid).push({ 
                    'User': usersUsername,
                    'Comment': comment,
                    'DateTime': datetime
                });
            }
            $('.comment').val('');
        });
    });

	firebase.database().ref("Comments/" + itemid).on('child_added', function (snapshot) {
	    var message = snapshot.val();
	    var currentComment = "<div class='col s12 commentWrap' id='comment" + snapshot.key + "'><p class='commentUser'>" + message.User + "</p><p class='dateTime'>" + message.DateTime + "</p><p>" + message.Comment + "</p>" + "<button class='deleteComment' id='" + snapshot.key + "'>delete</button></div>";
	    const commentSection = document.getElementById('commentSection');
	    commentSection.innerHTML += currentComment;
	});

	firebase.database().ref("Comments/" + itemid).on('child_removed', function (snapshot) {
	    var message = snapshot.val();
	    var parentAllComments = document.getElementById('commentSection');
	   	var childComment = document.getElementById('comment' + snapshot.key);
	   	parentAllComments.removeChild(childComment);
	});

	$(document).on('click', '.deleteComment', {}, function(e) {
		var commentId = this.id;
		console.log(commentId);
		var confirmation = confirm("Are you sure you want to delete this comment? action can not be undone.");
    	if(confirmation){
        	firebase.database().ref('Comments/' + itemid).child(commentId).remove(function(){        		
            });
    	}
	});

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            const currentUserID = firebaseUser.uid;
            firebase.database().ref('users/' + currentUserID).once("value", function(data) {
                var usersData = data.val();
                var AccType = usersData.AccType;
                if(AccType == "contentM"){
                    document.getElementById('deleteNews').classList.remove('hide');
                    document.getElementById('_editNews').classList.remove('hide');
		            $(".deleteComment").removeClass("hide");
                }else{
                    document.getElementById('deleteNews').classList.add('hide');
                    document.getElementById('_editNews').classList.add('hide');
		            $(".deleteComment").addClass("hide");
                }
            });

        } else {
            document.getElementById('deleteNews').classList.add('hide');
            document.getElementById('_editNews').classList.add('hide');
		    $(".deleteComment").addClass("hide");
        }
    });

} //close function
