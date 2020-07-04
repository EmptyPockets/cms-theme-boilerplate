var Flickity = require('flickity-fade');

var reviewFlkty = new Flickity('.review-slider', {
  fade: true,
  prevNextButtons: false,
  wrapAround: true,
  autoPlay: true,
  autoPlay: 4000,
  pageDots: false,
  adaptiveHeight: true,
  setGallerySize: true,
  lazyLoad: true,
});



