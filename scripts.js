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
    TW.TopeHeadlines();
};

TW.TopeHeadlines = function () {

    var url = 'https://newsapi.org/v2/everything?' +
        'q=al-jazeera-english&' +
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
            var i;

            for (i = 0; i < articles.length; i++) {
                singleArticle += `<div class="card news-article">
                    <img src="${articles[i].urlToImage || "https://dubsism.files.wordpress.com/2017/12/image-not-found.png"}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${articles[i].title}</h5>
                        <p class="card-text">${articles[i].description}</p>
                        <a href="${articles[i].url}" target="_blank" class="btn btn-primary">Go to article</a>
                    </div>
                </div>
                `;
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