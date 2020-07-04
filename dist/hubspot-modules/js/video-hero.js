(function () {

  // Get the modal
  let modal = document.getElementById("videoModal");

  // Get the button that opens the modal
  let btn = document.getElementById("playButton");

  // Get the <span> element that closes the modal
  let span = document.getElementById("close-button");

  // When the user clicks the button, open the modal
  btn.onclick = function () {

    // Dynamically load Wistia JavaScript API
    var ev1 = document.createElement('script');
    ev1.src = '//fast.wistia.com/assets/external/E-v1.js';
    ev1.async = true;
    ev1.charset = 'ISO-8859-1'
    document.head.appendChild(ev1);

    /* Connect to Video in Modal */
    window._wq = window._wq || [];
    _wq.push({
      id: 'k0r1g3cju9', onReady: function (video) {
        video.play();
      }
    });

    document.body.classList.add("open-modal");
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
    document.body.classList.remove("open-modal");

  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  if (window.innerWidth > 700) {
    let video = document.getElementById('videoItem');
    let mp4Source = document.createElement('source');
    mp4Source.setAttribute('src', 'https://f.hubspotusercontent20.net/hubfs/5191528/Crisp%20Videos/Homepage/v2/Hero%20-%2015s%20-%20No%20Sound%20-%204.mp4');
    mp4Source.setAttribute('type', 'video/mp4');
    video.appendChild(mp4Source);

  }




})();



