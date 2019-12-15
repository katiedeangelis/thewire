function SingleArticle(image, title, description, url) {
    this.image = image || "https://dubsism.files.wordpress.com/2017/12/image-not-found.png";
    this.title = title;
    this.description = description;
    this.url = url;

    this.getCard = function () {
        return `<div class="card mb-3 news-article">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src="${this.image}" class="card-img" alt="Article Image">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${this.title}</h5>
                                <p class="card-text">${this.description}</p>
                                <a href="${this.url}" target="_blank" class="btn btn-primary btn-block">Go to article</a>
                            </div>
                        </div>
                    </div>
                </div>`
    }
}