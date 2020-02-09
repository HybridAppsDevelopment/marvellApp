//Network or cache version


var CACHE = 'network-or-cache';


self.addEventListener('install', function(evt) {
	console.log('The service worker is being installed.');

	evt.waitUntil(precache());
});



self.addEventListener('fetch', function(evt) {
	console.log('The service worker is serving the asset.');
//can add a var here so that if the AJAX cannot get a response, it produces a standard response
var offline = true;


evt.respondWith(fromNetwork(evt.request, 400).catch(function () {


	return fromCache(evt.request);
}));
});


function precache() {
	return caches.open(CACHE).then(function (cache) {
		return cache.addAll([
    //A list of files that you want to cache on first run of the app
    '/MAD/MarvelInfo12/',

    '/MAD/MarvelInfo12/index.html',
    '/MAD/MarvelInfo12/manifest.json',

    '/MAD/MarvelInfo12/img/logo.png',
    '/MAD/MarvelInfo12/img/logosmall.png',
    '/MAD/MarvelInfo12/img/144x144.png',

    '/MAD/MarvelInfo12/iconfont/MaterialIcons-Regular.woff',
    '/MAD/MarvelInfo12/iconfont/MaterialIcons-Regular.ttf',

    '/MAD/MarvelInfo12/css/materialize.min.css',
    '/MAD/MarvelInfo12/css/style.css',
    '/MAD/MarvelInfo12/css/swiper.min.css',

    '/MAD/MarvelInfo12/partialViews/_createArticle.html',
    '/MAD/MarvelInfo12/partialViews/_createNews.html',
    '/MAD/MarvelInfo12/partialViews/_editArticle.html',
    '/MAD/MarvelInfo12/partialViews/_editNews.html',
    '/MAD/MarvelInfo12/partialViews/_home.html',
    '/MAD/MarvelInfo12/partialViews/_login.html',
    '/MAD/MarvelInfo12/partialViews/_register.html',
    '/MAD/MarvelInfo12/partialViews/_viewAllArticles.html',
    '/MAD/MarvelInfo12/partialViews/_viewAllNews.html',
    '/MAD/MarvelInfo12/partialViews/_viewFullArticle.html',
    '/MAD/MarvelInfo12/partialViews/_viewFullNews.html',

    '/MAD/MarvelInfo12/js/fastclick.js',
    '/MAD/MarvelInfo12/js/materialize.min.js',
    '/MAD/MarvelInfo12/js/masonry.pkgd.min.js',
    '/MAD/MarvelInfo12/js/swiper.min.js',
    '/MAD/MarvelInfo12/js/PartialViewControl.js',
    '/MAD/MarvelInfo12/js/changeAppPage.js',
    '/MAD/MarvelInfo12/js/swipeFlash.js',
    '/MAD/MarvelInfo12/js/jquery.browser.min.js',
    '/MAD/MarvelInfo12/js/init.js',
    '/MAD/MarvelInfo12/js/exif.js',
    '/MAD/MarvelInfo12/js/binaryajax.js',
    '/MAD/MarvelInfo12/js/jquery-2.1.1.min.js',
    '/MAD/MarvelInfo12/js/swiper.jquery.min.js',

    '/MAD/MarvelInfo12/js/createArticle.js',
    '/MAD/MarvelInfo12/js/createNews.js',
    '/MAD/MarvelInfo12/js/editArticle.js',
    '/MAD/MarvelInfo12/js/editNews.js',
    '/MAD/MarvelInfo12/js/getAllArticles.js',
    '/MAD/MarvelInfo12/js/getAllNews.js',
    '/MAD/MarvelInfo12/js/getFullArticle.js',
    '/MAD/MarvelInfo12/js/getFullNews.js',
    '/MAD/MarvelInfo12/js/home.js'
    ]);
	});
}


function fromNetwork(request, timeout) {
	return new Promise(function (fulfill, reject) {


		var timeoutId = setTimeout(reject, timeout);


		fetch(request).then(function (response) {
			clearTimeout(timeoutId);
			fulfill(response);


		}, reject);
	});
}


function fromCache(request) {
	return caches.open(CACHE).then(function (cache) {
		return cache.match(request).then(function (matching) {
			return matching || Promise.reject('no-match');
		});
	});
}
