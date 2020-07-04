var Flickity = require('flickity-fade');

new Flickity('.gallery', {
  accessibility: true,
  adaptiveHeight: false,
  autoPlay: false,
  cellAlign: 0.2,
  cellSelector: undefined,
  contain: false,
  draggable: '>1',
  dragThreshold: 3,
  freeScroll: false,
  friction: 0.2,
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


