(function($) {
  var body = document.getElementById("body");
  body.style.overflow = "hidden";

  var preloaderById = document.getElementById("preloader"),
    preloaderPercentById = document.getElementById("preloader-percent"),
    videoHeaderById = document.getElementById("video-header"),
    videoPhotoById = document.getElementById("video-photo"),
    videoAnimById = document.getElementById("video-anim"),
    toPort = document.getElementById("toPort"),
    toPort2 = document.getElementById("toPort2"),
    toPhoto = document.getElementById("toPhoto"),
    toInfo = document.getElementById("toInfo"),
    videoAnim = $("#video-anim"),
    videoPhoto = $("#video-photo"),
    info = $("#info"),
    videoAnimOffsetTop = videoAnim.offset().top,
    videoPhotoOffsetTop = videoPhoto.offset().top,
    infoOffsetTop = info.offset().top,
    scrollToAnimPosition = videoAnimOffsetTop - $(window).height(),
    scrollToPhotoPosition = videoPhotoOffsetTop - $(window).height(),
    navbar = $(".navbar"),
    navbarOffsetTop = navbar.offset().top,
    images = document.images,
    imagesTotalCount = images.length,
    countForAnim = 0,
    countForPhoto = 0,
    imagesLoadedCount = 0,
    scrollIndex = 0,
    i = 0,
    thisScrollTop,
    imageClone;


// counting percentage for loading screen
  for (i; i < imagesTotalCount; i++) {
    imageClone = new Image();
    imageClone.onload = image_loaded;
    imageClone.onerror = image_loaded;
    imageClone.src = images[i].src;
  }

  function image_loaded() {
    imagesLoadedCount++;
    preloaderPercentById.innerHTML =
      ((100 / imagesTotalCount) * imagesLoadedCount) << 0;
    if (imagesLoadedCount >= imagesTotalCount) {
      setTimeout(function() {
        // deleting preloader
        if (!preloaderById.classList.contains("done")) {
          preloaderById.classList.add("done");
          body.style.overflow = "";
          document.getElementById("preloader").remove();
        }

        // menu toggle
        $("button").on("click", function() {
          $("body").toggleClass("open");
        });

        // on scroll actions
        $(document).scroll(function() {
          thisScrollTop = $(this).scrollTop();
          scrollIndex = 1;
          videoHeaderById.loop = true;

          if (thisScrollTop === 0) {
            videoHeaderById.play();
          } else {
            videoHeaderById.pause();
          }

          if (thisScrollTop > scrollToAnimPosition && countForAnim === 0) {
            $("html,body").animate(
              { scrollTop: $("#video-anim").offset().top }, 1000, "swing"
            );
            countForAnim = 1;
          }

          if (thisScrollTop > scrollToPhotoPosition && countForPhoto === 0) {
            $("html,body").animate(
              { scrollTop: $("#video-photo").offset().top }, 1000, "swing"
            );
            countForPhoto = 1;
          }

          if (videoPhotoOffsetTop > thisScrollTop && thisScrollTop > videoAnimOffsetTop) {
            document.getElementById("navbar-header").innerText = "Animation";
          }
          if (infoOffsetTop > thisScrollTop && thisScrollTop > videoPhotoOffsetTop > 0) {
            document.getElementById("navbar-header").innerText = "Photo";
          }

          if (infoOffsetTop < thisScrollTop) {
            document.getElementById("navbar-header").innerText = "Info";
          }

          if (navbarOffsetTop - thisScrollTop < 0) {
            navbar.addClass("fixed");
          }
        });

        // behavior for header video
        videoHeaderById.addEventListener("ended", myHandler, false);

        function myHandler(e) {
          if (scrollIndex === 0) {
            $("html,body").animate(
              {
                scrollTop: $("#portfolio").offset().top
              },
              1000,
              "swing"
            );
          }
        }

        // behavior for animation video
        videoAnimById.addEventListener("ended", myHandler2, false);

        function myHandler2(e) {
          if (countForAnim === 1) {
            $("html,body").animate(
              {
                scrollTop: $("#portfolio2").offset().top
              },
              1000,
              "swing"
            );
            countForAnim = 2;
          }
        }

        // behavior for photo videe
        videoPhotoById.addEventListener("ended", myHandler3, false);

        function myHandler3(e) {
          if (countForPhoto === 1) {
            $("html,body").animate(
              {
                scrollTop: $("#photo-gallery").offset().top
              },
              1000,
              "swing"
            );
            countForPhoto = 2;
          }
        }

        // videoPhotoPosition = videoPhoto.offset().top;
        // winHeight = $(window).height();
        // scrollToVideoPhotoPosition = videoPhotoPosition - winHeight;
        // scrollToVideoPhotoPosition = videoPhoto.offset().top - $(window).height();

        // $(window).on("scroll", function() {
        //   if (navbarOffsetTop - ($("body").scrollTop() || $("html").scrollTop()) <= 0) {
        //     navbar.addClass("fixed");
        //   }
        // });

        //  videoPhotoOffsetTop = videoPhoto.offset().top;
        // $(window).on("scroll", function() {
        //   if (videoPhotoOffsetTop - ($("body").scrollTop() || $("html").scrollTop()) <=
        //     0) {
        //     document.getElementById("navbar-header").innerText = "Photo";
        //   }
        // });


        // animation for scrolling to position on click from menu
        toPort.addEventListener(
          "click",
          function() {
            scroll("#portfolio");
          },
          false
        );

        toPort2.addEventListener(
          "click",
          function() {
            scroll("#portfolio2");
          },
          false
        );

        toPhoto.addEventListener(
          "click",
          function() {
            scroll("#photo-gallery");
          },
          false
        );

        toInfo.addEventListener(
          "click",
          function() {
            scroll("#info");
          },
          false
        );

        function scroll(param) {
          $("body").toggleClass("open");
          $("html,body").animate(
            {
              scrollTop: $(param).offset().top
            },
            1000,
            "swing"
          );
        }

        // disable carousel auto movement
        $(".carousel").each(function() {
          $(this).carousel({
            interval: false
          });
        });

        // animation for portfolio items
        $("a.portfolio-link").hover(
          function() {
            $(this)
              .children()
              .last()
              .animate({ padding: "25px" });
          },
          function() {
            $(this)
              .children()
              .last()
              .animate({ padding: "25px 25px 25px 0" });
          }
        );

        // init gallery
        jQuery("#gallery").unitegallery();
      }, 500);
    }
  }
})(jQuery);
