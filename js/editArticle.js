(function(){

  var itemid = $(".itemidstore").attr("_itemidstore");

  // Get Elements
  const titleText = document.getElementById('title');
  const shortText = document.getElementById('shortTxt');
  const fullText = document.getElementById('fullTxt');
  const updateBttn = document.getElementById('update');
  const form = document.getElementById('createNews');
  const msg = document.getElementById('msg');

  $(document).ready(function(){
    firebase.database().ref('Articles/' + itemid).once("value", function(snapshot){
      var data = snapshot.val();
      titleText.value = data.Title;
      shortTxt.value = data.ShortTxt;
      fullTxt.value = data.FullTxt;
    });
  });

  updateBttn.addEventListener('click', e => {
    const title = titleText.value;
    const shortTxt = shortText.value;
    const fullTxt = fullText.value;

    firebase.database().ref('Articles/' + itemid).update({
      Title: title,
      ShortTxt: shortTxt,
      FullTxt: fullTxt 
    });
    console.log('uploaded');
    changeAppPage("_viewFullArticle");
  });
  
}());
