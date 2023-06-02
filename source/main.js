// Carousel reference: https://flickity.metafizzy.co/
var flkty = new Flickity('.main-carousel', {
    draggable: true,
    freeScroll: false,
    contain: true,
    // disable previous & next buttons and dots
    prevNextButtons: true,
    pageDots: false,
    wrapAround: true

});

const contentOverlay = document.getElementById("detail-overlay");
const contentImage = contentOverlay.querySelectorAll("img")[0];

function closeOverlay(){
    contentOverlay.style.display = "none";
    contentImage.setAttribute("src", "");
}


flkty.on( 'staticClick', function( event, pointer, cellElement, cellIndex ) {
    
    if(!cellElement.classList.contains("is-selected")) return;
    
    let url = cellElement.children[0].getAttribute("data-content-url");
    contentImage.setAttribute("src", url);
    contentOverlay.style.display = "block";
});

