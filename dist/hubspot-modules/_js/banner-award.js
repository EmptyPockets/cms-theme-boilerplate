var Flickity = require('flickity-fade');
require('flickity-imagesloaded');

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


