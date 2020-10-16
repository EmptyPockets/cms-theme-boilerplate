import LazyLoad from "vanilla-lazyload";

(() => {
  var lazyLoadInstance = new LazyLoad({});// Lazy Load Images

  const clickEvent = 'click';
  const resizeEvent = 'resize';
  const scrollEvent = 'scroll';

  /** @type {(...x: any[]) => HTMLElement[]} */
  const Q = (...x) => Array.from(document.querySelectorAll(...x));

  /** @type {(...x: any[]) => HTMLElement} */
  const Q1 = (...x) => document.querySelector(...x);

  /** @type {(className: string, isOn: boolean) => (x: HTMLElement) => void} */
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

    searchTriggers.forEach(x => x.addEventListener(clickEvent, () => toggleIt(true)));

    document.addEventListener(clickEvent, e => {
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

    window.addEventListener(scrollEvent, () => {
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

    mobileTriggers.forEach(x => x.addEventListener(clickEvent, toggleMobileMenu));
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

    document.addEventListener('readystatechange', event => {
      if (event.target.readyState === 'complete') {
        var hsform = document.createElement('script');
        hsform.src = '//js.hsforms.net/forms/v2.js';
        hsform.async = true;
        document.head.appendChild(hsform);
        // checkForForm();
        window.addEventListener(scrollEvent, userScroll, false);
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
        parent.addEventListener(clickEvent, () => toggle(!isOpen));
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
      const progressBar = el.querySelector('progress');

      if (progressBar) {
        let isShowing = false;

        const updateScroll = () => progressBar.value = window.scrollY;
        const init = () => {
          progressBar.max = document.documentElement.scrollHeight - window.innerHeight;
          updateScroll();
        };

        window.addEventListener(resizeEvent, init);
        init();

        window.addEventListener(scrollEvent, () => {
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

        Q('.video-wrapper').forEach((el) => {
          const src = el.dataset.src;

          if (src) {
            const video = document.createElement('video');
            const mp4Source = document.createElement('source');

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

    window.addEventListener(resizeEvent, init);
    init();
  })();

  /**
   * Video modal handling
   */
  (() => {
  })();
})();
