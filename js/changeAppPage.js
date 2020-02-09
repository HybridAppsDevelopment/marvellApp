
//----------changeAppPage controls routing of the application-------//

//Event Listener for back button press
$('.navBack').click(function() {
history.back();
//Only grab the current location.hash on change of url -- use onhashchange  (onpopstate not supported cross browser)
window.onhashchange = function() {
  var hashValue = location.hash;
  //we don't pass the # char - just return the value after the #
  hashValue = hashValue.replace(/^#/, '');
  changeAppPage(hashValue);
  };

});

$('._login').click(function() {
changeAppPage("_login");
});

$(document).on('click', '._needAccount', {}, function(e) {
changeAppPage("_register");
});

$('._register').click(function() {
changeAppPage("_register");
});

$(document).on('click', '._alreadyAccount', {}, function(e) {
changeAppPage("_login");
});

$('._allArticles').click(function() {
changeAppPage("_viewAllArticles");
})

$('._allNews').click(function() {
changeAppPage("_viewAllNews");
});

$('._createNews').click(function() {
changeAppPage("_createNews");
});

$('._createArticle').click(function() {
changeAppPage("_createArticle");
});

//for full news/article --track item id
function registerItemID(itemid){
$(".itemidstore").attr("_itemidstore", null);
var itemid ;
//will need to empty first
$(".itemidstore").attr("_itemidstore", itemid);
}

//get the full news -- will need to inject an id into a root attribute
$(document).on('click', '._viewFullNews', {}, function(e) {

var itemid = $(this).attr("_itemid");

registerItemID(itemid);

changeAppPage("_viewFullNews");

});

$(document).on('click', '#_editNews', {}, function(e) {

var itemid = $(this).attr("_itemid");

registerItemID(itemid);

changeAppPage("_editNews");

});

//get the full article -- will need to inject an id into a root attribute
$(document).on('click', '._viewFullArticle', {}, function(e) {

var itemid = $(this).attr("_itemid");

registerItemID(itemid);

changeAppPage("_viewFullArticle");

});

$(document).on('click', '#_editArticle', {}, function(e) {

var itemid = $(this).attr("_itemid");

registerItemID(itemid);

changeAppPage("_editArticle");

});

$(document).on('click', '.nextScreen', {}, function(e) {
    swiper.slideNext();
});

$(document).on('click', '.prevScreen', {}, function(e) {
    swiper.slidePrev();
});

$(document).on('click', '.returnToStart', {}, function(e) {
    swiper.slideTo(0, 1500, true);
});

$(document).on('click', '.createRecipeBtn', {}, function(e) {
    changeAppPage('_createRecipe');
});


//Get content
function getScreenContent(screen) {
  var contentLoaded ;
  console.log("screen content injection for "+screen);
  $.get('partialViews/'+screen, function(data) {
    //inject the content into the DOM
    $(".contentRoot").append(data);
    contentLoaded = true;

  }); //end get


} //close function

function navHashHistory(saveHash){
//Hash Hijack Method for SPA
//for each new SPA partial view, add the hash to the URL bar
    var hashValue = location.hash;
    hashValue = hashValue.replace(/^#/, '');
    if(hashValue!=saveHash){
    window.history.pushState("", "", "#"+saveHash);
  }else{
    //Must be first initialise
    window.history.pushState("", "", "#"+saveHash);
  }

}//end navHashHistory


//declare current step outside of function so that is global and accessible to other functions
var currentStep;

function changeAppPage(screen) {

    //reenable the progress bar
    $('.progress').css({"visibility": "visible"});
    $('.progressWrapper').css({"visibility": "visible"});
    //the screen to goto
    var screen;
    //the screen number
    var screenNum;



    switch (screen) {




      case '_register':

        //  swiper.destroy(true, true);
          $(".navBack").css("visibility", "hidden");

          $(".swiper-pagination").css("visibility", "visible");

          $(".contentRoot").empty();


          getScreenContent(screen + ".html");
          currentStep = screen + ".html";
          navHashHistory(screen + ".html");

          break;

    case '_home':

            $(".navBack").css("visibility", "visible");

            $(".swiper-pagination").css("visibility", "visible");

            $(".contentRoot").empty();


            getScreenContent(screen + ".html");
            currentStep = screen + ".html";
            navHashHistory(screen + ".html");

            $(function() {
              $.getScript('js/home.js', function() {
                insertData();
              })
            })

            break;

                case '_login':

                $(".navBack").css("visibility", "visible");

                $(".swiper-pagination").css("visibility", "visible");

                $(".contentRoot").empty();


                getScreenContent(screen + ".html");
                currentStep = screen + ".html";
                navHashHistory(screen + ".html");

                break;

                case '_viewAllNews':

                $(".navBack").css("visibility", "visible");

                $(".swiper-pagination").css("visibility", "visible");

                $(".contentRoot").empty();


                getScreenContent(screen + ".html");
                currentStep = screen + ".html";
                navHashHistory(screen + ".html");

                break;


                case '_viewAllArticles':

                $(".navBack").css("visibility", "visible");

                $(".swiper-pagination").css("visibility", "visible");

                $(".contentRoot").empty();


                getScreenContent(screen + ".html");
                currentStep = screen + ".html";
                navHashHistory(screen + ".html");

                break;

                case '_viewFullNews':

                $(".navBack").css("visibility", "visible");

                $(".swiper-pagination").css("visibility", "visible");

                $(".contentRoot").empty();


                getScreenContent(screen + ".html");
                currentStep = screen + ".html";
                navHashHistory(screen + ".html");

                break;

                case '_editNews':

                $(".navBack").css("visibility", "visible");

                $(".swiper-pagination").css("visibility", "visible");

                $(".contentRoot").empty();


                getScreenContent(screen + ".html");
                currentStep = screen + ".html";
                navHashHistory(screen + ".html");

                break;

                case '_viewFullArticle':

                $(".navBack").css("visibility", "visible");

                $(".swiper-pagination").css("visibility", "visible");

                $(".contentRoot").empty();


                getScreenContent(screen + ".html");
                currentStep = screen + ".html";
                navHashHistory(screen + ".html");
                
                break;

                case '_editArticle':

                $(".navBack").css("visibility", "visible");

                $(".swiper-pagination").css("visibility", "visible");

                $(".contentRoot").empty();


                getScreenContent(screen + ".html");
                currentStep = screen + ".html";
                navHashHistory(screen + ".html");

                break;

                case '_createNews':

                $(".navBack").css("visibility", "visible");

                $(".swiper-pagination").css("visibility", "visible");

                $(".contentRoot").empty();


                getScreenContent(screen + ".html");
                currentStep = screen + ".html";
                navHashHistory(screen + ".html");
                
                break;


                case '_createArticle':

                $(".navBack").css("visibility", "visible");

                $(".swiper-pagination").css("visibility", "visible");

                $(".contentRoot").empty();


                getScreenContent(screen + ".html");
                currentStep = screen + ".html";
                navHashHistory(screen + ".html");
                
                break;


    } //close switch

} //end function
