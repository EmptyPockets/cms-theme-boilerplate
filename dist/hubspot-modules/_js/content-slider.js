var Flickity = require('flickity-fade');

new Flickity('.gallery', {
  accessibility: true,
  adaptiveHeight: false,
  autoPlay: false,
  cellAlign: 0.2,
  cellSelector: undefined,
  contain: false,
  selectedAttraction: 0.2,
  friction: 0.8,
  freeScroll: false,
  groupCells: false,
  initialIndex: 0,
  lazyLoad: true,
  percentPosition: true,
  prevNextButtons: true,
  pageDots: false,
  resize: true,
  rightToLeft: false,
  setGallerySize: true,
  watchCSS: false,
  wrapAround: false,
});


