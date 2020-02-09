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
