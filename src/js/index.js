(function () {

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

})();


