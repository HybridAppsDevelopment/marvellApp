(function(){

  // Get Elements
  const titleText = document.getElementById('title');
  const shortText = document.getElementById('shortTxt');
  const fullText = document.getElementById('fullTxt');
  const thumb = document.getElementById('thumbImage');
  const image = document.getElementById('image');
  const createBttn = document.getElementById('create');
  const ratingCheckBox = document.getElementById('rating');
  const form = document.getElementById('createArticle');
  const msg = document.getElementById('msg');

  createBttn.addEventListener('click', e => {

    e.preventDefault();

    // Get article contents
    const title = titleText.value;
    const shortTxt = shortText.value;
    const fullTxt = fullText.value;
    const thumbImage = thumb.files[0];
    const thumbImageTitle = thumb.files[0].name;
    const articleImage = image.files[0];
    const articleImageTitle = image.files[0].name;
    const ratingAllow = ratingCheckBox.checked;
    
    var thumbReader = new FileReader();
    var articleReader = new FileReader();

    var thumbDownloadURL = "";
    var articleDownloadURL = "";
    var thumbDone = "false";
    var articleDone = "false";
    
    thumbReader.readAsDataURL(thumbImage);
    articleReader.readAsDataURL(articleImage);
  
    thumbReader.onload = function (e) {
      //Initiate the JavaScript Image object.
      var image = new Image();

      //Set the Base64 string return from FileReader as source.
      image.src = e.target.result;
                       
      //Validate the File Height and Width.
      image.onload = function () {
        var height = this.height;
        var width = this.width;
        if (height < 250 || width < 500 || height > 250 || width > 500) {
          alert("Please ensure that the thumbnail image as a height of 250px and width of 500px");
          return false;
        }

        var imageSaved = firebase.storage().ref("ArticleImages/" + thumbImageTitle).put(thumbImage);
        var downloadURL = "";

        imageSaved.on('state_changed', function(snapshot){
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, function(error) {
          // Handle unsuccessful uploads
        }, function() {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          thumbDownloadURL = imageSaved.snapshot.downloadURL;   
          thumbDone = "true"; 
        });
      };
    };

    articleReader.onload = function (e) {
      //Initiate the JavaScript Image object.
      var image = new Image();

      //Set the Base64 string return from FileReader as source.
      image.src = e.target.result;
                       
      //Validate the File Height and Width.
      image.onload = function () {
        var height = this.height;
        var width = this.width;
        var imageSaved = firebase.storage().ref("ArticleImages/" + articleImageTitle).put(articleImage);

        imageSaved.on('state_changed', function(snapshot){
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, function(error) {
          // Handle unsuccessful uploads
        }, function() {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          articleDownloadURL = imageSaved.snapshot.downloadURL; 
          articleDone = "true";
          if (thumbDone == "true" && articleDone == "true") {
              upload();
              form.reset();
              msg.innerHTML = "Article Uploaded";
          }
        });
      };
    };

    function upload(){
      firebase.database().ref('Articles').push({
        Title: title,
        ShortTxt: shortTxt,
        FullTxt: fullTxt,
        ThumbImg: thumbDownloadURL,
        ArticleImg: articleDownloadURL,
        RatingAllowence: ratingAllow 
      });
        console.log('uploaded');
    };
  });
}());
