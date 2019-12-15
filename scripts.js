/******************************************************************************
 *
 *   Name: The Wire
 *   Version: 1.0
 *   Author: Katie DeAngelis
 *   Dependencies:
 *
 ******************************************************************************/


/**
 * TW
 * @namespace
 */
var TW = window.TW || {};

/**
 * Checks if DOM is ready for JS to fire
 * @function
 * @param {object} _fn init function to run once DOM is ready
 */
TW.ready = function (_fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        _fn();
    } else {
        document.addEventListener('DOMContentLoaded', _fn);
    }
};

/**
 * Fires off all functions on page load
 * @function
 */
TW.init = function () {
    TW.getNewsArticles();
    document.querySelector(".btn-search").addEventListener("click", TW.searchNewsArticles);
    document.querySelector(".search-field").addEventListener("keypress", TW.enterSearch);
};

TW.enterSearch = function (event) {
    var keyPressed = event.which || event.keyCode;

    if (keyPressed === 13) {
        TW.searchNewsArticles();
    }
}

TW.searchNewsArticles = function () {

    var searchValue = document.querySelector(".search-field").value;

    TW.getNewsArticles(searchValue)
}

TW.getNewsArticles = function (searchValue) {

    var url = 'https://newsapi.org/v2/everything?' +
        'q='+ (searchValue || 'USA') + '&' +
        'apiKey=0873144ad01742579b01e33f145e5163';

    var req = new Request(url);

    fetch(req)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.articles);

            var articles = data.articles;
            var singleArticle = "";
            var getArticleContainer = document.querySelector(".article-container");

            for (var i = 0; i < articles.length; i++) {
                var articleObj = new SingleArticle(articles[i].urlToImage, articles[i].title, articles[i].description, articles[i].url);
                singleArticle += articleObj.getCard();

            }

            getArticleContainer.innerHTML = singleArticle;

        })

};

/**
 * Invoke ready function
 */
TW.ready(TW.init);