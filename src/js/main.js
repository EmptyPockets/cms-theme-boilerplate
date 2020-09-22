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
  let mobileSearchTrigger = document.getElementById('mobileSearchTrigger');
  let searchInputWrapper = document.getElementById('searchInputWrapper');
  let mobileSearchInputWrapper = document.getElementById('mobileSearchInputWrapper');
  let menu = document.getElementById('navWrapper');


  searchTrigger.addEventListener("click", openSearch);
  mobileSearchTrigger.addEventListener("click", openSearch);
  document.addEventListener("click", closeSearch);
  // Call Function On Click
  function openSearch() {
    searchInputWrapper.classList.toggle('active');
    mobileSearchInputWrapper.classList.toggle('active');
    searchTrigger.classList.toggle('active');
    mobileSearchTrigger.classList.toggle('active');
    menu.classList.toggle('active');
  }

  function closeSearch() {
    let isClickInsideElement = searchInputWrapper.contains(event.target) || mobileSearchInputWrapper.contains(event.target);
    let isClickInsideSearchTrigger = searchTrigger.contains(event.target) || mobileSearchTrigger.contains(event.target);
    if (isClickInsideSearchTrigger) {
      searchInputWrapper.classList.add('active');
      mobileSearchInputWrapper.classList.add('active');
      searchTrigger.classList.add('active');
      mobileSearchTrigger.classList.add('active');
      menu.classList.add('active')
    } else if (!isClickInsideElement && !isClickInsideSearchTrigger) {
      searchInputWrapper.classList.remove('active');
      mobileSearchInputWrapper.classList.remove('active');
      searchTrigger.classList.remove('active');
      mobileSearchTrigger.classList.remove('active');
      menu.classList.remove('active');
    }
  }

  let mainStickyNav = document.getElementById('mainStickyNav');
  let navHeight = 117;

  /******************************
   Sticky Not Clone
  *******************************/

  let clone = document.querySelector('#stickyGlobalHeader');

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
  let secondaryMobileTrigger = document.getElementById('secondaryMobileTrigger');
  let mobileDropdown = document.getElementById('mobileDropdown');
  let secondaryMobileDropdown = document.getElementById('secondaryMobileDropdown');

  mobileTrigger.addEventListener("click", toggleMobileMenu);
  secondaryMobileTrigger.addEventListener("click", toggleMobileMenu);

  function toggleMobileMenu() {
    mobileDropdown.classList.toggle('open');
    secondaryMobileDropdown.classList.toggle('open');
    mobileTrigger.classList.toggle('open');
    secondaryMobileTrigger.classList.toggle('open');
    document.body.classList.toggle('open-menu');
  }

  /********************
   Load Hubspot form on scroll
  ******************/

  function userScroll() {

    const currentScroll = window.pageYOffset;
    if (currentScroll > 0) {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: "5191528",
          formId: "95a767f4-059f-4918-be0b-0a3007f5b473",
          target: '#form-holder'
        });
        window.removeEventListener('scroll', userScroll, false);
      }
    }
  }

  function checkForForm() {
    // for browsers without support
    if (!('IntersectionObserver' in window)) {
      // probably just load the form
      return
    }

    let lazyFormObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log('intersecting')
          let lazyForm = entry.target
          userScroll();
          lazyFormObserver.unobserve(lazyForm)
        }
      })
    }, { rootMargin: '0px 0px 200px 0px' })
  }

  document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'complete') {
      var hsform = document.createElement('script');
      hsform.src = '//js.hsforms.net/forms/v2.js';
      hsform.async = true;
      document.head.appendChild(hsform);
      // checkForForm();
      window.addEventListener('scroll', userScroll, false);

    }
  });






})();


