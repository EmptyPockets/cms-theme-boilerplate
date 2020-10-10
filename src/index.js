/* SCSS */
import './scss/main.scss';

/* Universal JS */
import './js/main.js';

/* Modules JS */
import './hubspot-modules/_js/video-hero.js';
import './hubspot-modules/_js/menu-section.js';
import './hubspot-modules/_js/search-input.js';
import './hubspot-modules/_js/faq.js';

function requireAll(r) {
  r.keys().forEach(r);
}
requireAll(require.context('./images/', true, /\.svg$/));
