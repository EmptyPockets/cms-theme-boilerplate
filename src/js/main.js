import LazyLoad from "vanilla-lazyload";

(function () {

  /* Lazy Load Images */
  var lazyLoadInstance = new LazyLoad({
    // Your custom settings go here
  });

  /******************************
  Search Open / Close / Trigger
  *******************************/

  let searchTrigger = document.getElementById('searchTrigger');
  let searchInputWrapper = document.getElementById('searchInputWrapper');
  let menu = document.getElementById('navWrapper');


  searchTrigger.addEventListener("click", openSearch);
  document.addEventListener("click", closeSearch);
  // Call Function On Click
  function openSearch() {
    searchInputWrapper.classList.toggle('active');
    searchTrigger.classList.toggle('active');
    menu.classList.toggle('active');
  }

  function closeSearch() {
    let isClickInsideElement = searchInputWrapper.contains(event.target);
    let isClickInsideSearchTrigger = searchTrigger.contains(event.target);
    if (isClickInsideSearchTrigger) {
      searchInputWrapper.classList.add('active');
      searchTrigger.classList.add('active');
      menu.classList.add('active')
    } else if (!isClickInsideElement && !isClickInsideSearchTrigger) {
      searchInputWrapper.classList.remove('active');
      searchTrigger.classList.remove('active');
      menu.classList.remove('active');
    }
  }

  let mainStickyNav = document.getElementById('mainStickyNav');
  let navHeight = 117;

  /******************************
   Sticky Clone
  *******************************/

  let clone = mainStickyNav.cloneNode(true);
  clone.id = 'cloneStickyNav';
  clone.style.position = "fixed";
  clone.style.top = "-54px";
  clone.style.left = "0px";
  clone.style.right = "0px";
  mainStickyNav.after(clone);

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > navHeight) {
      clone.classList.add('sticky');
    } else {
      clone.classList.remove('sticky');
    }

  });

  /********************
   Mobile Menu Dropdown
  ******************/
  let mobileTrigger = document.getElementById('mobileTrigger');
  let mobileDropdown = document.getElementById('mobileDropdown');

  mobileTrigger.addEventListener("click", toggleMobileMenu);

  function toggleMobileMenu() {
    mobileDropdown.classList.toggle('open');
    mobileTrigger.classList.toggle('open');
    document.body.classList.toggle('open-menu');
  }


  /* Delay Contact Form Load */
  function windowScroll(event) {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 0) {
      window.hbspt.forms.create({
        portalId: "8020292",
        formId: "def10fb4-61ea-4f2e-894a-3e5f76d6b97f",
        target: '.form-holder'
      });
      // Remove it:
      window.removeEventListener('scroll', windowScroll, false);
    }
  }

  document.addEventListener('readystatechange', event => {
    // When window loaded ( external resources are loaded too- `css`,`src`, etc...) 
    if (event.target.readyState === "complete") {
      var hsform = document.createElement('script');
      hsform.src = '//js.hsforms.net/forms/v2.js';
      hsform.async = true;
      document.head.appendChild(hsform);
      // Add the listener:
      window.addEventListener('scroll', windowScroll, false);
    }
  });


})();


