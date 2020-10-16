import LazyLoad from "vanilla-lazyload";

(() => {
  var lazyLoadInstance = new LazyLoad({});// Lazy Load Images

  const clickEvent = 'click';
  const resizeEvent = 'resize';
  const scrollEvent = 'scroll';

  /**
   * QuerySelectorAll
   * @param {string} x Query
   * @param {HTMLElement?} y Context (defaults to Document)
   */
  const Q = (x, y) => Array.from((y || document).querySelectorAll(x));

  /**
   * QuerySelector
   * @param {string} x Query
   * @param {HTMLElement?} y Context (defaults to Document)
   */
  const Q1 = (x, y) => (y || document).querySelector(x);

  /**
   * AddEventListener
   * @param {string} x Event
   * @param {EventListenerOrEventListenerObject} y Listener
   * @param {HTMLElement?} z Context
   */
  const E = (x, y, z) => (z || document).addEventListener(x, y);

  /**
   * Window.AddEventListener
   * @param {string} x Event
   * @param {EventListenerOrEventListenerObject} y Listener
   */
  const W = (x, y) => window.addEventListener(x, y);

  /**
   * CreateElement
   * @param {string} x Tag name
   */
  const C = (x) => document.createElement(x);

  /**
   * Toggle a class
   * @param {string} className Class
   * @param {boolean} isOn Active or not
   * @returns {(x: HTMLElement) => void}
   */
  const toggle = (className, isOn) => x => x.classList.toggle(className, isOn);

  /**
   * Search Open / Close / Trigger
   */
  (() => {
    let searchIsActive = false;

    const activeClass = 'active';
    const searchIsActiveClass = 'search-is-active';
    const searchInputWrappers = Q('#searchInputWrapper, #mobileSearchInputWrapper');
    const searchTriggers = Q('#searchTrigger, #mobileSearchTrigger');
    const menu = Q('#navWrapper');
    const headers = Q('#globalHeader, #stickyGlobalHeader');

    const activateSearch = toggle(activeClass, true);
    const deactivateSearch = toggle(activeClass, false);
    const reactToSearchActivation = toggle(searchIsActiveClass, true);
    const reactToSearchDeactivation = toggle(searchIsActiveClass, false);

    /** @type {(isOn: boolean) => void} */
    const toggleIt = (isOn) => {
      if (!!searchIsActive !== !!isOn) {
        searchIsActive = !!isOn;

        const activateFn = searchIsActive ? activateSearch : deactivateSearch;
        const reactFn = searchIsActive ? reactToSearchActivation : reactToSearchDeactivation;

        searchInputWrappers.forEach(activateFn);
        searchTriggers.forEach(activateFn);
        menu.forEach(activateFn);
        headers.forEach(reactFn);
      }
    };

    searchTriggers.forEach(x => E(clickEvent, () => toggleIt(true), x));

    E(clickEvent, e => {
      /** @type {(x: Node) => boolean} */
      const isInsideTarget = x => x.contains(e.target);

      if (searchTriggers.some(isInsideTarget)) {
        toggleIt(true);
      } else if (!searchInputWrappers.some(isInsideTarget)) {
        toggleIt(false);
      }
    });
  })();

  /**
   * Sticky Not Clone
   */
  (() => {
    let isSticky = false;

    const navHeight = 117;
    const stickyClass = 'sticky';
    const clone = Q1('#stickyGlobalHeader');

    W(scrollEvent, () => {
      const shouldBeSticky = window.pageYOffset > navHeight;

      if (!!isSticky !== shouldBeSticky) {
        isSticky = shouldBeSticky;
        clone.classList.toggle(stickyClass, isSticky);
      }
    });
  })();

  /**
   * Mobile Menu Dropdown
   */
  (() => {
    let mobileMenuIsOpen = false;

    const openClass = 'open';
    const openMenuClass = 'open-menu';
    const mobileTriggers = Q('#mobileTrigger, #secondaryMobileTrigger');
    const mobileDropdowns = Q('#mobileDropdown, #secondaryMobileDropdown');

    const openMobileMenu = toggle(openClass, true);
    const closeMobileMenu = toggle(openClass, false);
    const reactToOpenMobileMenu = toggle(openMenuClass, true);
    const reactToCloseMobileMenu = toggle(openMenuClass, true);

    const toggleMobileMenu = () => {
      mobileMenuIsOpen = !mobileMenuIsOpen;

      const menuFn = mobileMenuIsOpen ? openMobileMenu : closeMobileMenu;
      const reactFn = mobileMenuIsOpen ? reactToOpenMobileMenu : reactToCloseMobileMenu;

      mobileDropdowns.forEach(menuFn);
      mobileTriggers.forEach(menuFn);
      reactFn(document.body);
    };

    mobileTriggers.forEach(x => E(clickEvent, toggleMobileMenu, x));
  })();

  /**
   * Load Hubspot form on scroll
   */
  (() => {
    function userScroll() {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 0) {
        if (window.hbspt) {
          window.hbspt.forms.create({
            portalId: "5191528",
            formId: "95a767f4-059f-4918-be0b-0a3007f5b473",
            target: '#form-holder'
          });
          window.removeEventListener(scrollEvent, userScroll, false);
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

    E('readystatechange', event => {
      if (event.target.readyState === 'complete') {
        /** @type {HTMLScriptElement} */
        var hsform = C('script');
        hsform.src = '//js.hsforms.net/forms/v2.js';
        hsform.async = true;
        document.head.appendChild(hsform);
        // checkForForm();
        W(scrollEvent, userScroll, false);
      }
    });
  })();

  /**
   * Flickity handling
   */
  (() => {
    const Flickity = require('flickity-fade');
    require('flickity-imagesloaded');

    const flickityBase = {
      wrapAround: true,
      autoPlay: 4000,
      fade: true,
      adaptiveHeight: true,
      lazyLoad: true,
      setGallerySize: true,
      prevNextButtons: false,
      pageDots: false,
    };

    const flickityTypes = {
      'with-images': {
        imagesLoaded: true,
      },
      'play-immediately': {
        autoPlay: true,
        lazyLoad: false,
      },
      'not-lazy': {
        lazyLoad: false,
      },
      'with-buttons': {
        prevNextButtons: true,
        lazyLoad: false,
      },
      'has-content': {
        freeScroll: false,
        wrapAround: false,
        groupCells: false,
        autoPlay: false,
        fade: false,
        adaptiveHeight: false,
        watchCSS: false,
        selectedAttraction: 0.01,
        friction: 0.2,
        cellSelector: undefined,
        initialIndex: 0,
        accessibility: true,
        resize: true,
        cellAlign: 0.2,
        contain: false,
        percentPosition: true,
        rightToLeft: false,
        prevNextButtons: true,
      },
    };

    Q('.is-flickity').forEach((el) => {
      const type = Array.from(el.classList).find(x => flickityTypes.hasOwnProperty(x));

      if (type) {
        new Flickity(el, { ...flickityBase, ...flickityTypes[type] });
      }
    });
  })();

  /**
   * "Read More" handling
   */
  (() => {
    const isOpenClass = 'is-open';
    const isClosedClass = 'is-closed';
    const readMoreParentElement = 'li';

    Q('.read-more-text').forEach((el) => {
      const parent = el.closest(readMoreParentElement);
      let isOpen = false;

      const toggle = (shouldBeOpen) => {
        isOpen = !!shouldBeOpen;
        parent.classList.toggle(isOpenClass, isOpen);
        parent.classList.toggle(isClosedClass, !isOpen);
      };

      if (parent) {
        E(clickEvent, () => toggle(!isOpen), parent);
        toggle(false);
      }
    });
  })();

  /**
   * Progress scroller handling
   */
  (() => {
    const isShowingClass = 'is-showing';

    Q('.footer-contact').forEach((el) => {
      const progressBar = Q1('progress', el);

      if (progressBar) {
        let isShowing = false;

        const updateScroll = () => progressBar.value = window.scrollY;
        const init = () => {
          progressBar.max = document.documentElement.scrollHeight - window.innerHeight;
          updateScroll();
        };

        W(resizeEvent, init);
        init();

        W(scrollEvent, () => {
          updateScroll();

          if (!!isShowing !== progressBar.value >= 1) {
            isShowing = !isShowing;
            el.classList.toggle(isShowingClass, isShowing);
          }
        });
      }
    });
  })();

  /**
   * Video preview handling
   */
  (() => {
    /** @type {{video: HTMLVideoElement, source: HTMLSourceElement}} */
    const properties = {
      video: {
        autoplay: true,
        loop: true,
        preload: 'auto',
        defaultMuted: true,
        muted: true,
        style: 'width:100%;height:auto',
      },

      source: {
        type: 'video/mp4',
      },
    };

    let videoElementsAreCreated = false;

    const init = () => {
      if (!videoElementsAreCreated && window.innerWidth > 700) {
        videoElementsAreCreated = true;

        Q('.hero-video').forEach((el) => {
          /** @type {string} */
          const src = el.dataset.src;

          if (src) {
            /** @type {HTMLVideoElement} */
            const video = C('video');

            /** @type {HTMLSourceElement} */
            const mp4Source = C('source');

            Object.assign(video, properties.video);
            Object.assign(mp4Source, properties.source);

            mp4Source.src = src;

            video.appendChild(mp4Source);
            el.appendChild(video);

            video.autoplay = true;
            video.play();
          }
        });
      }
    };

    W(resizeEvent, init);
    init();
  })();

  /**
   * Video modal handling
   */
  (() => {
    const openModalClass = 'open-modal';

    /** @type {HTMLScriptElement} */
    let ev1Script;

    /** @type {HTMLScriptElement} */
    const ev1Properties = {
      src: '//fast.wistia.com/assets/external/E-v1.js',
      async: true,
      charset: 'ISO-8859-1',
    };

    Q('.video-wrapper').forEach((el) => {
      const modal = Q1('.modal', el);
      const playButton = Q1('.play-button', el);
      const closeButton = Q1('.close-button', el);

      const toggle = (isOn) => {
        document.body.classList.toggle(openModalClass, isOn);
        modal.style.display = isOn ? 'block' : 'none';
      };

      if (modal && playButton && closeButton) {
        const initializeModal = () => {
          // Load Wistia API
          if (!ev1Script) {
            ev1Script = C('script');
            Object.assign(ev1Script, ev1Properties);
            document.head.appendChild(ev1Script);
          }

          // Add to queue
          (window._wq = window._wq || []).push({
            id: '_all',
            onReady: x => x.play(),
          });

          // Move modal out of container
          document.body.appendChild(modal);
        };

        E(clickEvent, () => (initializeModal(), toggle(true)), playButton);
        E(clickEvent, () => toggle(false), closeButton);
        W(clickEvent, e => e.target === modal && toggle(false));
      }
    });
  })();
})();
