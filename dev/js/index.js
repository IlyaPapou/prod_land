var body = document.getElementById('body');
body.style.overflow = 'hidden';

var preloader = document.getElementById('preloader'),
  preloaderPercent = document.getElementById('preloader-percent'),
  videoHeader = document.getElementById('video-header'),
  videoPhotoById = document.getElementById('photo-video'),
  videoPhoto = $('#photo-video'),
  winScrollTop = $(window).scrollTop(),
  images = document.images,
  imagesTotalCount = images.length,
  imagesLoadedCount = 0,
  imageClone,
  scrollIndex = 0,
  i,
  navbarOffsetTop,
  navbar = $('.navbar'),
  toPort,
  toPort2,
  toPhoto,
  toInfo,
  videoPhotoPosition,
  scrollToVideoPhotoPosition,
  winHeight,
  count = 0;

// counting percentage for loading screen
for (i = 0; i < imagesTotalCount; i++) {
  imageClone = new Image();
  imageClone.onload = image_loaded;
  imageClone.onerror = image_loaded;
  imageClone.src = images[i].src;
}

function image_loaded() {
  imagesLoadedCount++;
  preloaderPercent.innerHTML =
    ((100 / imagesTotalCount) * imagesLoadedCount) << 0;
  if (imagesLoadedCount >= imagesTotalCount) {
    setTimeout(function() {
      // deleting preloader
      if (!preloader.classList.contains('done')) {
        preloader.classList.add('done');
        body.style.overflow = '';
        document.getElementById('preloader').remove();
      }

      // init gallery
      jQuery('#gallery').unitegallery();

      // menu toggle
      $('button').on('click', function() {
        $('body').toggleClass('open');
      });

      // behavior for header video
      videoHeader.addEventListener('ended', myHandler, false);

      function myHandler(e) {
        if (scrollIndex === 0) {
          $('html,body').animate(
            {
              scrollTop: $('#portfolio').offset().top
            },
            1000,
            'swing'
          );
        }
      }

      $(document).scroll(function() {
        scrollIndex = 1;
        videoHeader.loop = true;
        if (winScrollTop === 0) {
          videoHeader.play();
        } else {
          videoHeader.pause();
        }
        if (winScrollTop > scrollToVideoPhotoPosition && count === 0) {
          $('html,body').animate(
            {
              scrollTop: $('#photo-video').offset().top
            },
            1000,
            'swing'
          );
          count = 1;
        }
      });

      $(document).scroll(function() {
        if (winScrollTop > scrollToVideoPhotoPosition && count === 0) {
          $('html,body').animate(
            {
              scrollTop: $('#photo-video').offset().top
            },
            1000,
            'swing'
          );
          count = 1;
        }
      });

      // behavior for photo video
      videoPhotoPosition = videoPhoto.offset().top;
      winHeight = $(window).height();
      scrollToVideoPhotoPosition = videoPhotoPosition - winHeight;

      videoPhotoById.addEventListener('ended', myHandler2, false);

      function myHandler2(e) {
        if (count === 1) {
          $('html,body').animate(
            {
              scrollTop: $('#portfolio2').offset().top
            },
            1000,
            'swing'
          );
          count = 2;
        }
      }

      // adding fixed position for navbar
      navbarOffsetTop = navbar.offset().top;
      $(window).on('scroll', function() {
        if (
          navbarOffsetTop - ($('body').scrollTop() || $('html').scrollTop()) <=
          0
        ) {
          navbar.addClass('fixed');
        }
      });
      ///////////////////
      var videoPhotoOffsetTop = videoPhoto.offset().top;
      $(window).on('scroll', function() {
        if (
          videoPhotoOffsetTop -
            ($('body').scrollTop() || $('html').scrollTop()) <=
          0
        ) {
          document.getElementById('navbar-header').innerText = 'Photo';
        }
      });
      ////////////////////
      // animation for scrolling to position on click from menu
      toPort = document.getElementById('toPort');
      toPort.addEventListener(
        'click',
        function() {
          scroll('#portfolio');
        },
        false
      );

      toPort2 = document.getElementById('toPort2');
      toPort2.addEventListener(
        'click',
        function() {
          scroll('#portfolio2');
        },
        false
      );

      toPhoto = document.getElementById('toPhoto');
      toPhoto.addEventListener(
        'click',
        function() {
          scroll('#photo');
        },
        false
      );

      toInfo = document.getElementById('toInfo');
      toInfo.addEventListener(
        'click',
        function() {
          scroll('#info');
        },
        false
      );

      function scroll(param) {
        $('body').toggleClass('open');
        $('html,body').animate(
          {
            scrollTop: $(param).offset().top
          },
          1000,
          'swing'
        );
      }

      // disable carousel auto movement
      $('.carousel').each(function() {
        $(this).carousel({
          interval: false
        });
      });

      // animation for portfolio items
      $('a.portfolio-link').hover(
        function() {
          $(this)
            .children()
            .last()
            .animate({ padding: '25px' });
        },
        function() {
          $(this)
            .children()
            .last()
            .animate({ padding: '25px 25px 25px 0' });
        }
      );
    }, 500);
  }
}
