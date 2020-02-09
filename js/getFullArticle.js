function getFullArticle() {

    var itemid = $(".itemidstore").attr("_itemidstore");

    // $('.progress').css({"visibility": "visible"});
    // $('.progressWrapper').css({"visibility": "visible"});

    var contentLoaded;
    const articleTitle = document.getElementById('articleTitle');
    const articleImage = document.getElementById('articleImage')
    const articleFullText = document.getElementById('articleFullText');
    const articleRating = document.getElementById('articleRating');
    const articleRated = document.getElementById('articleRated');
    document.getElementById("_editArticle").setAttribute("_itemid", itemid);

    firebase.database().ref("Articles/" + itemid).once("value", function(snapshot) {
        var content = snapshot.val();
        articleTitle.innerHTML = "<h1 class='center red-text'>" + content.Title + "</h1>";
        articleImage.innerHTML = "<img class='responsive-img' src='" + content.ArticleImg + "'>";
        if(content.RatingAllowence){
            articleRating.innerHTML = "<a class='rating' id='rating1'>&#9733</a>" +
                                        "<a class='rating' id='rating2'>&#9733</a>" +
                                        "<a class='rating' id='rating3'>&#9733</a>" + 
                                        "<a class='rating' id='rating4'>&#9733</a>" + 
                                        "<a class='rating' id='rating5'>&#9733</a>";
            if(snapshot.hasChild("Rating")){
                var noRated = content.Rating.AmountRated;
                var totalRating = content.Rating.Rate;
                var averageRating = totalRating / noRated;
                var averageRatingRounded = Math.round( averageRating * 10 ) / 10;
                articleRated.innerHTML = "<p>" + noRated + " users rated this an average of " + averageRatingRounded;
            
            }
        }else{
            articleRating.innerHTML = "";
        };


        articleFullText.innerHTML = "<p>" + content.FullTxt + "</p>";

        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            firebase.database().ref("user" + user.uid).once("value", function(userData) {
                var userInfo = userData.val();
                var accType = userInfo.AccType;
                if(AccType == "contentM"){
                    document.getElementById('_editArticle').classList.remove('hide');
                    document.getElementById('deleteArticle').classList.remove('hide');
                }else{                    
                    document.getElementById('_editArticle').classList.add('hide');
                    document.getElementById('deleteArticle').classList.add('hide');
                }
            });
          } else {
            document.getElementById('_editArticle').classList.add('hide');
            document.getElementById('deleteArticle').classList.add('hide');
          }
        });
        doRatings(snapshot);
    });



    function doRatings(snapshot){
        document.getElementById("rating1").onclick = function() {addRating(1)};
        document.getElementById("rating2").onclick = function() {addRating(2)};
        document.getElementById("rating3").onclick = function() {addRating(3)};
        document.getElementById("rating4").onclick = function() {addRating(4)};
        document.getElementById("rating5").onclick = function() {addRating(5)};

        function addRating(rating){
            reference = firebase.database().ref("Articles/" + itemid);
            console.log('starts rating');
            reference.once('value', function(snapshot){
                console.log('article found');
                if (snapshot.hasChild("Rating")) {
                    console.log('article has rating child already');
                    reference.child("Rating").once('value', function(ratings){

                        console.log('rating child loaded');
                        var ratingInfo = ratings.val();
                        var currentRating = ratingInfo.Rate;
                        var currentNoVoted = ratingInfo.AmountRated;
                        var newRating = currentRating + rating;
                        var newNoVoted = currentNoVoted + 1;
                        var averageRating = newRating / newNoVoted;
                        var averageRatingRounded = Math.round( averageRating * 10 ) / 10;

                        reference.child("Rating").set({
                            Rate: newRating,
                            AmountRated: newNoVoted
                        });

                        console.log('ratings set');
                        articleRated.innerHTML = "<p>" + newNoVoted + " users rated this an average of " + averageRatingRounded;
                        
                    });
                }else{
                    console.log('article has no ratings yet');
                    reference.child("Rating").set({
                        Rate: rating,
                        AmountRated: 1
                    });
                    console.log("Ratings added");
                    articleRated.innerHTML = "<p>" + 1 + " users rated this an average of " + rating;
                }          
            });
        }
    }
    
    $('.deleteArticle').on('click', e =>  {
        var confirmation = confirm("Are you sure you want to delete this article? action can not be undone.");
        if(confirmation){
            firebase.database().ref('Articles/' + itemid).remove(function(){
                alert("Article deleted");
                changeAppPage("_home");
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
                    document.getElementById('deleteArticle').classList.remove('hide');
                    document.getElementById('_editArticle').classList.remove('hide');
                }else{
                    document.getElementById('deleteArticle').classList.add('hide');
                    document.getElementById('_editArticle').classList.add('hide');
                }
            });

        } else {
            document.getElementById('deleteArticle').classList.add('hide');
            document.getElementById('_editArticle').classList.add('hide');
        }
    });
} //close function
