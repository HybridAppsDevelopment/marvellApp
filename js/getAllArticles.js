function getAllArticles() {
var articles = [];
const articlesDiv = document.getElementById('articles');

    firebase.database().ref("Articles").orderByChild("Title").once("value", function(snapshot) {
        
        snapshot.forEach(function(snapshot) {

            const val = snapshot.val();
                articles.push( 
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
                    "<a class='_viewFullArticle readMore' _itemid='" +
                    snapshot.key +
                    "'>Read more</a>" +
                    "</div>" +
                    "</div>"
                )
        });
            articlesDiv.innerHTML = articles.join("");
    });

    return false;

} //close function
