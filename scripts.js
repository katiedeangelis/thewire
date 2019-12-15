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
};

TW.searchNewsArticles = function () {

    var searchValue = document.querySelector(".search-field").value;
    var querySearchValue = "q" + searchValue + "&";

    TW.getNewsArticles(searchValue)
    console.log(searchValue);
}

TW.getNewsArticles = function (searchValue) {
    console.log(searchValue);
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

                console.log(singleArticle);
            }

            console.log(getArticleContainer);
            getArticleContainer.innerHTML = singleArticle;

        })

};

/**
 * Invoke ready function
 */
TW.ready(TW.init);