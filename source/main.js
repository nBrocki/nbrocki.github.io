// Carousel reference: https:// .metafizzy.co/
const carouselConfig = {
    draggable: true,
    freeScroll: false,
    contain: false,
    // disable previous & next buttons and dots
    prevNextButtons: true,
    pageDots: false,
    wrapAround: true,
    setGallerySize: false
};

const detailCarouselConfig = {
    draggable: true,
    freeScroll: false,
    contain: true,
    // disable previous & next buttons and dots
    prevNextButtons: true,
    pageDots: false,
    wrapAround: false,
    setGallerySize: false
};

var flkty;
var detailFlkty;

window.addEventListener("load", function (event) {

    console.log("loaded");
    flkty = new Flickity('.main-carousel', carouselConfig);
    detailFlkty = new Flickity('.detail-carousel', detailCarouselConfig);
    setWidthProperty()
    flkty.resize();
    flkty.reposition();
    // Open overlay
    flkty.on('staticClick', function (event, pointer, cellElement, cellIndex) {

        let urlList = cellElement.querySelector("img").getAttribute("data-content-url");
        const isMobile = window.innerWidth <= 600;
        getDetailImgs(urlList, isMobile).forEach(imgElement => {
            detailFlkty.append(imgElement);
        });

        detailFlkty.select(0, false, true);
        contentOverlay.style.display = "block";
        setTimeout(() => { detailFlkty.resize() }, 100);
    });


})


// Overlay

const contentOverlay = document.getElementById("detail-overlay");
const detailCarousel = contentOverlay.querySelector(".detail-carousel");

function closeOverlay() {
    contentOverlay.style.display = "none";
    detailFlkty.remove(detailCarousel.querySelectorAll(".carousel-cell"));
}

function getDetailImgs(urlString, isMobile) {
    dataImg = [];
    urlString.split(",").forEach((photoUrl, index) => {
        
        // workaround - should be replaced later :)
        const isDoubleImage = index != 0 && index != 4;
        dataImg.push(getDetailImgElement(photoUrl, isDoubleImage ? "double-img" : "", isMobile));
        // If its mobile, create a second copy of the elements
          if (isMobile && isDoubleImage)
            dataImg.push(getDetailImgElement(photoUrl, isDoubleImage ? "push-left double-img" : "push-left", true));
    });
    return dataImg;
}

function getDetailImgElement(url, imgClassName, hasContainer) {
    const newDiv = document.createElement("div");
    newDiv.className = "carousel-cell";

    const img = document.createElement("img");
    if (imgClassName)
        img.className = imgClassName;
    img.setAttribute("src", url);

    if (hasContainer) {
        const containerDiv = document.createElement("div");
        containerDiv.className = "container";
        containerDiv.appendChild(img);
        newDiv.appendChild(containerDiv);
    } else {
        newDiv.appendChild(img);
    }

    return newDiv;
}

addEventListener("resize", setWidthProperty);

function setWidthProperty(event) {
    const img = document.querySelector(".main-carousel img");
    const ratio = img.naturalWidth / img.naturalHeight;
    console.log(img.height);
    document.documentElement.style.setProperty('--img-width', `${img.height * ratio}px`);
};

