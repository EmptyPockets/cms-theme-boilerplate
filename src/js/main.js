import LazyLoad from "vanilla-lazyload";

(function () {
  /* Lazy Load Images */
  var lazyLoadInstance = new LazyLoad({});

  /** @type {(...x: any[]) => Node[]} */
  const Q = (...x) => Array.from(document.querySelectorAll(...x));

  /** @type {(...x: any[]) => Node} */
  const Q1 = (...x) => document.querySelector(...x);

  /** @type {(className: string, isOn: boolean) => (x: Node) => void} */
  const toggle = (className, isOn) => x => x.classList.toggle(className, isOn);

  /******************************
  Search Open / Close / Trigger
  *******************************/

  const activeClass = 'active';
  const searchIsActiveClass = 'search-is-active';
  const clickEvent = 'click';
  const searchInputWrappers = Q('#searchInputWrapper, #mobileSearchInputWrapper');
  const searchTriggers = Q('#searchTrigger, #mobileSearchTrigger');
  const menu = Q('#navWrapper');
  const headers = Q('#globalHeader, #stickyGlobalHeader');

  const activate = toggle(activeClass, true);
  const deactivate = toggle(activeClass, false);
  const reactToActivation = toggle(searchIsActiveClass, true);
  const reactToDeactivation = toggle(searchIsActiveClass, false);

  /** @type {(isOn: boolean) => void} */
  const toggleIt = (isOn) => {
    const activateFn = isOn ? activate : deactivate;
    const reactFn = isOn ? reactToActivation : reactToDeactivation;

    searchInputWrappers.forEach(activateFn);
    searchTriggers.forEach(activateFn);
    menu.forEach(activateFn);
    headers.forEach(reactFn);
  };

  const openSearch = () => toggleIt(true);

  searchTriggers.forEach(x => x.addEventListener(clickEvent, openSearch));

  document.addEventListener(clickEvent, (this, ev) => {
    /** @type {(x: Node) => boolean} */
    const isInsideTarget = x => x.contains(ev.target);

    if (searchTriggers.some(isInsideTarget)) {
      toggleIt(true);
    } else if (!searchInputWrappers.some(isInsideTarget)) {
      toggleIt(false);
    }
  });

  // const mainStickyNav = Q('#mainStickyNav');
  const navHeight = 117;

  /******************************
   Sticky Not Clone
  *******************************/

  const stickyClass = 'sticky';
  const clone = Q1('#stickyGlobalHeader');
  window.addEventListener('scroll', () => clone.classList.toggle(stickyClass, window.pageYOffset > navHeight));

  /********************
   Mobile Menu Dropdown
  ******************/

  const mobileTrigger = Q1('#mobileTrigger');
  const secondaryMobileTrigger = Q1('#secondaryMobileTrigger');
  const mobileDropdown = Q1('#mobileDropdown');
  const secondaryMobileDropdown = Q1('#secondaryMobileDropdown');

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

    const lazyFormObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log('intersecting')
          const lazyForm = entry.target
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


