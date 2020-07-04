var Flickity = require('flickity-fade');

new Flickity('.award-slider', {
  fade: true,
  prevNextButtons: false,
  wrapAround: true,
  autoPlay: 4000,
  pageDots: false,
  adaptiveHeight: true,
  setGallerySize: true,
  imagesLoaded: true,
  lazyLoad: true,
});


