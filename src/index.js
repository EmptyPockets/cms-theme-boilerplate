/* SCSS */
import './scss/main.scss';

/* Universal JS */
import './js/main.js';

/* Modules JS */
import './hubspot-modules/_js/video-hero.js';
import './hubspot-modules/_js/menu-section.js';
import './hubspot-modules/_js/search-input.js';
// import './hubspot-modules/_js/banner-award.js';
// import './hubspot-modules/_js/banner-reviews.js';
// import './hubspot-modules/_js/banner-settlement.js';
// import './hubspot-modules/_js/content-slider.js';
import './hubspot-modules/_js/faq.js';
// import './hubspot-modules/_js/settlements-card.js';

function requireAll(r) {
  r.keys().forEach(r);
}
requireAll(require.context('./images/', true, /\.svg$/));
