// Carousel reference: https:// .metafizzy.co/
const carouselConfig =  {
    draggable: true,
    freeScroll: false,
    contain: true,
    // disable previous & next buttons and dots
    prevNextButtons: true,
    pageDots: false,
    wrapAround: true,
    setGallerySize: false
};

const detailCarouselConfig =  {
    draggable: true,
    freeScroll: false,
    contain: true,
    // disable previous & next buttons and dots
    prevNextButtons: true,
    pageDots: false,
    wrapAround: false,
    setGallerySize: false
};

var flkty = new Flickity('.main-carousel', carouselConfig);
var detailFlkty = new Flickity('.detail-carousel', detailCarouselConfig);

setTimeout(function(){flkty.resize()}, 200);

// Overlay

const contentOverlay = document.getElementById("detail-overlay");
const detailCarousel = contentOverlay.querySelector(".detail-carousel");

function closeOverlay(){
    contentOverlay.style.display = "none";
   
    console.log(detailCarousel.childNodes);
    detailFlkty.remove(detailCarousel.querySelectorAll(".carousel-cell"));
}

// Open overlay
flkty.on('staticClick', function( event, pointer, cellElement, cellIndex ) {
    console.log(cellElement)
    // every item can be opened
    //if(!cellElement.classList.contains("is-selected")) return;
    
    let urlList = cellElement.querySelector("img").getAttribute("data-content-url");
    const isMobile = window.innerWidth <= 600;
    getDetailImgs(urlList, isMobile).forEach(imgElement => {
        detailFlkty.append(imgElement);
    });

    detailFlkty.select(isMobile ? 1 : 0, false, true);
    contentOverlay.style.display = "block";
    setTimeout(() => {detailFlkty.resize()}, 100);
});

function getDetailImgs(urlString, isMobile){
    dataImg = [];
    urlString.split(",").forEach(photoUrl => {
        
        dataImg.push(getDetailImgElement(photoUrl));
        // If its mobile, create a second copy of the elements
        if(isMobile)    
            dataImg.push(getDetailImgElement(photoUrl, "push-left", true));
    }); 
    return dataImg;
}

function getDetailImgElement(url, imgClassName, hasContainer){
    const newDiv = document.createElement("div");
    newDiv.className = "carousel-cell";
    
    const img = document.createElement("img");
    if(imgClassName)
        img.className = imgClassName;
    img.setAttribute("src", url);
    
    if(hasContainer){
        const containerDiv = document.createElement("div");
        containerDiv.className = "container";
        containerDiv.appendChild(img);
        newDiv.appendChild(containerDiv);
    }else{
        newDiv.appendChild(img);
    }
    
    return newDiv;
}
