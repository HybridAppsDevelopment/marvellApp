function getAllNews() {
var newNews = [];
const allNews = document.getElementById('allNews');

    firebase.database().ref("News").orderByChild("DateTime").once("value", function(snapshot) {

        snapshot.forEach(function(snapshot) {

            const val = snapshot.val();
                newNews.push(
                    "<div class='col s12 m6 l4 newsWrap'>" +
                    "<div class='col-content newsBlock'>" +
                    "<div class='title'>" +
                    val.Title +
                    "</div>" +
                    "<img class='responsive-img' src='" +
                    val.ThumbImg +
                    "'>" +
                    "<p class='abstract'>" +
                    val.ShortTxt +
                    "</p>" +
                    "<div class='authRead'"+
                    "<p class='author'>" +
                    val.Author +
                    "</p>" +
                    "<a class='_viewFullNews readMore' _itemid='" +
                    snapshot.key +
                    "'>Read more</a>" +
                    "</div>" +
                    "</div>" +
                    "</div>"
                );
        });
            var newNewsRev = newNews.reverse();
            allNews.innerHTML = newNewsRev.join("");
    });
   return false;

} //close function
