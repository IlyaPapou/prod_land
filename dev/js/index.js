var body = document.getElementById("body");
body.style.overflow = "hidden";

var preloader = document.getElementById("preloader"),
  preloader_percent = document.getElementById("preloader-percent"),
  video_header = document.getElementById("video-header"),
  photo_video2 = document.getElementById("photo-video"),
  photo_video = $("#photo-video"),
  images = document.images,
  images_total_count = images.length,
  images_loaded_count = 0,
  image_clone,
  scrollIndex = 0,
  i, navbarDefTop, navbar, toPort, toPort2, toPhoto, toInfo, scrollToPhoto_videoPos, winHeight, photo_videoPos,
  count = 0;

// counting percentage for loading screen
for (i = 0; i < images_total_count; i++) {
  image_clone = new Image();
  image_clone.onload = image_loaded;
  image_clone.onerror = image_loaded;
  image_clone.src = images[i].src;
}

function image_loaded() {
  images_loaded_count++;
  preloader_percent.innerHTML = (((100 / images_total_count) * images_loaded_count) << 0);
  if (images_loaded_count >= images_total_count) {
    setTimeout(function() {
      // deleting preloader
      if (!preloader.classList.contains("done")) {
        preloader.classList.add("done");
        body.style.overflow = "";
        document.getElementById("preloader").remove();
      }

      // menu toggle
      $("button").on("click", function() {
        $("body").toggleClass("open");
      });

      // behavior for header video
      video_header.addEventListener("ended", myHandler, false);

      function myHandler(e) {
        if (scrollIndex === 0) {
          $("html,body").animate({
            scrollTop: $("#portfolio").offset().top
          }, 1000, "swing");
        }
      }

      $(document).scroll(function() {
        scrollIndex = 1;
        video_header.loop = true;
        if ($(window).scrollTop() === 0) {
          video_header.play();
        }
        else {
          video_header.pause();
        }
      });

      // behavior for photo video
      photo_videoPos = photo_video.offset().top;
      winHeight = $(window).height();
      scrollToPhoto_videoPos = photo_videoPos - winHeight;

      photo_video2.addEventListener("ended", myHandler2, false);

      function myHandler2(e) {
        if (count === 1) {
          $("html,body").animate({
            scrollTop: $("#portfolio2").offset().top
          }, 1000, "swing");
          count = 2;
        }
      }

      $(window).scroll(function() {
        var winScrollTop = $(this).scrollTop();
        if (winScrollTop > scrollToPhoto_videoPos && count === 0) {
          $("html,body").animate({
            scrollTop: $("#photo-video").offset().top
          }, 1000, "swing");
          count = 1;
        }
      });

      // adding fixed position for navbar
      navbar = $(".navbar");
      navbarDefTop = navbar.offset().top;
      $(window).on("scroll", function() {
        if (navbarDefTop - ($("body").scrollTop() || $("html").scrollTop()) <= 0) {
          navbar.addClass("fixed");
        }
      });

      // animation for scrolling to position on click from menu
      toPort = document.getElementById("toPort");
      toPort.addEventListener("click", function() {
        scroll("#portfolio");
      }, false);

      toPort2 = document.getElementById("toPort2");
      toPort2.addEventListener("click", function() {
        scroll("#portfolio2");
      }, false);

      toPhoto = document.getElementById("toPhoto");
      toPhoto.addEventListener("click", function() {
        scroll("#photo");
      }, false);

      toInfo = document.getElementById("toInfo");
      toInfo.addEventListener("click", function() {
        scroll("#info");
      }, false);

      function scroll(param) {
        $("body").toggleClass("open");
        $("html,body").animate({
          scrollTop: $(param).offset().top
        }, 1000, "swing");
      }

      // disable carousel auto movement
      $(".carousel").each(function() {
        $(this).carousel({
          interval: false
        });
      });

      // animation for portfolio items
      $("a.portfolio-link").hover(function() {
        $(this).children().last().animate({ padding: "25px" });
      }, function() {
        $(this).children().last().animate({ padding: "25px 25px 25px 0" });
      });
    }, 500);
  }
}