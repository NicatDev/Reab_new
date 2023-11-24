/***************************************************
==================== JS INDEX ======================
****************************************************
01. PreLoader Js

****************************************************/

(function ($) {
  ("use strict");

  // Get Device width
  let device_width = window.innerWidth;

  var windowOn = $(window);

  ////////////////////////////////////////////////////
  // PreLoader Js
  windowOn.on("load", function () {
    $(".loader").fadeOut(500);
  });

  ////////////////////////////////////////////////////
  // Mobile Menu Js
  $("#mobile-menu").meanmenu({
    meanMenuContainer: ".mobile-menu",
    meanScreenWidth: "1199",
    meanExpand: ['<i class="fal fa-plus"></i>'],
  });

  ////////////////////////////////////////////////////
  // Sticky Header Js
  windowOn.on("scroll", function () {
    var scroll = $(window).scrollTop();
    if (scroll < 100) {
      $("#header-sticky").removeClass("sticky");
    } else {
      $("#header-sticky").addClass("sticky");
    }
  });

  /////////////////////////////
  // Jquery Appear radial circle-progress
  if (typeof $.fn.knob != "undefined") {
    $(".knob").each(function () {
      var $this = $(this),
        knobVal = $this.attr("data-rel");

      $this.knob({
        draw: function () {
          $(this.i).val(this.cv + "%");
        },
      });

      $this.appear(
        function () {
          $({
            value: 0,
          }).animate(
            {
              value: knobVal,
            },
            {
              duration: 2000,
              easing: "swing",
              step: function () {
                $this.val(Math.ceil(this.value)).trigger("change");
              },
            }
          );
        },
        {
          accX: 0,
          accY: -150,
        }
      );
    });
  }

  ///////////////////////////////
  // Wow Js progress
  new WOW().init();
  ///////////////////////////////

  /* magnificPopup video view */
  $(".popup-video").magnificPopup({
    type: "iframe",
  });

  //////////////////////////////
  // search form for header
  $(".fm-search").on("click", function () {
    $(".search_wrap.layouts_search.inited").addClass("search_opened");
  });
  $(".search_close.trx_addons_icon-delete").on("click", function () {
    $(".search_wrap.layouts_search.inited").removeClass("search_opened");
  });

  ////////////////////////////////////////////////////
  // Data Background Js
  $("[data-background").each(function () {
    $(this).css(
      "background-image",
      "url( " + $(this).attr("data-background") + "  )"
    );
  });
  $("[data-bg-color").each(function () {
    $(this).css("background-color", $(this).attr("data-bg-color"));
  });

  ////////////////////////////////////////////////////
  // Nice Select Js
  $(".fm-landing-filter-option-wrapper select").niceSelect();

  ////////////////////////////////////////////////////
  // Cart Plus Minus Js
  $(".cart-plus-minus").append(
    '<div class="dec qtybutton">-</div><div class="inc qtybutton">+</div>'
  );
  $(".qtybutton").on("click", function () {
    var $button = $(this);
    var oldValue = $button.parent().find("input").val();
    if ($button.text() == "+") {
      var newVal = parseFloat(oldValue) + 1;
    } else {
      // Don't allow decrementing below zero
      if (oldValue > 0) {
        var newVal = parseFloat(oldValue) - 1;
      } else {
        newVal = 0;
      }
    }
    $button.parent().find("input").val(newVal);
  });

  ///////////////////////////////
  // range slider activation
  $("#fm-slider-range").slider({
    range: true,
    min: 0,
    max: 500,
    values: [75, 300],
    slide: function (event, ui) {
      $("#fm-amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
    },
  });

  ////////////////////////////////
  // musk-img
  $("[data-mask").each(function () {
    $(this).css(
      "-webkit-mask-image",
      "url( " + $(this).attr("data-mask") + "  )"
    );
    $(this).css("mask-image", "url( " + $(this).attr("data-mask") + "  )");
  });

  ////////////////////////////////////////////////////
  // slider__active Slider Js
  if (jQuery(".fm-slider-active").length > 0) {
    let sliderActive1 = ".fm-slider-active";
    let sliderInit1 = new Swiper(sliderActive1, {
      // Optional parameters
      slidesPerView: 1,
      parallex: true,
      speed: 1000,
      freeMode: false,
      grabCursor: true,
      parallax: true,
      loop: true,
      effect: "fade",
      paginationClickable: true,

      autoplay: {
        delay: 7000,
      },
      pagination: {
        el: ".fm-slider-main-slide-pagination",
        clickable: true,
      },

      a11y: false,
    });

    function animated_swiper(selector, init) {
      let animated = function animated() {
        $(selector + " [data-animation]").each(function () {
          let anim = $(this).data("animation");
          let delay = $(this).data("delay");
          let duration = $(this).data("duration");

          $(this)
            .removeClass("anim" + anim)
            .addClass(anim + " animated")
            .css({
              webkitAnimationDelay: delay,
              animationDelay: delay,
              webkitAnimationDuration: duration,
              animationDuration: duration,
            })
            .one(
              "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
              function () {
                $(this).removeClass(anim + " animated");
              }
            );
        });
      };
      animated();
      // Make animated when slide change
      init.on("slideChange", function () {
        $(sliderActive1 + " [data-animation]").removeClass("animated");
      });
      init.on("slideChange", animated);
    }

    animated_swiper(sliderActive1, sliderInit1);
  }

  ////////////////////////////////////////////////////
  // slider__active Slider Js
  /* ===============================  Swiper slider  =============================== */

  if (jQuery(".fm-slider-active").length > 0) {
    let sliderActive1 = ".cm-slider-active";
    let sliderInit1 = new Swiper(sliderActive1, {
      // Optional parameters
      slidesPerView: 1,
      parallex: true,
      speed: 1000,
      freeMode: false,
      grabCursor: true,
      parallax: true,
      loop: true,
      effect: "fade",
      paginationClickable: true,

      autoplay: {
        delay: 7000,
      },
      pagination: {
        el: ".fm-slider-main-slide-pagination",
        clickable: true,
      },

      a11y: false,
    });

    function animated_swiper(selector, init) {
      let animated = function animated() {
        $(selector + " [data-animation]").each(function () {
          let anim = $(this).data("animation");
          let delay = $(this).data("delay");
          let duration = $(this).data("duration");

          $(this)
            .removeClass("anim" + anim)
            .addClass(anim + " animated")
            .css({
              webkitAnimationDelay: delay,
              animationDelay: delay,
              webkitAnimationDuration: duration,
              animationDuration: duration,
            })
            .one(
              "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
              function () {
                $(this).removeClass(anim + " animated");
              }
            );
        });
      };
      animated();
      // Make animated when slide change
      init.on("slideChange", function () {
        $(sliderActive1 + " [data-animation]").removeClass("animated");
      });
      init.on("slideChange", animated);
    }

    animated_swiper(sliderActive1, sliderInit1);
  }

  ////////////////////////////////////////////////////
  // Masonary Js
  $(".gallery-grid").imagesLoaded(function () {
    // init Isotope
    var $grid = $(".gallery-grid").isotope({
      itemSelector: ".grid-item",
      percentPosition: true,
      masonry: {
        // use outer width of grid-sizer for columnWidth
        columnWidth: ".grid-item",
      },
    });
  });

  /* magnificPopup img view */
  $(".popup-image").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  });

  ////////////////////////////////////////////////////////
  //  14. Sidebar
  $(".fm-header-bar-1").on("click", function () {
    $(".overlay").addClass("visible-overlay");
    $(".fm-header-sidebar-area").addClass("header-sidebar-visible");
  });
  $(".fm-header-sidebar-action a, .overlay").on("click", function () {
    $(".overlay").removeClass("visible-overlay");
    $(".fm-header-sidebar-area").removeClass("header-sidebar-visible");
  });

  //////////////////////////////////////////////////////
  // movie-slider
  var fmProjectFilmsActive = new Swiper(".fm-movie-slider-active", {
    loop: true,
    spaceBetween: 30,
    slidesPerView: 2,
    centeredSlides: true,
    grabCursor: true,
    navigation: {
      nextEl: ".fm-movie-next",
      prevEl: ".fm-movie-prev",
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    },
    pagination: {
      el: ".fm-movie-pagination",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      480: {
        slidesPerView: 1.4,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 1.6,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 1.8,
      },
    },
  });

  //////////////////////////////////////////////////////
  // portfolio-slider
  var fmProjectVideo2Active = new Swiper(".fm-project-video2-active", {
    direction: "horizontal",
    loop: true,
    speed: 1500,
    spaceBetween: 30,
    slidesPerView: 3,
    centeredSlides: true,
    grabCursor: true,
    mousewheel: true,
    mousewheelControl: true,
    keyboard: true,
    navigation: {
      nextEl: ".fm-film-testimonial-next",
      prevEl: ".fm-film-testimonial-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      480: {
        slidesPerView: 1.5,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 1.5,
      },
      992: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
      1400: {
        slidesPerView: 3,
      },
      1600: {
        slidesPerView: 3,
      },
    },
  });


  //////////////////////////////////////////////////////
  // brand-slider
  var brandSlider = new Swiper(".brand-active", {
    direction: "horizontal",
    loop: true,
    speed: 1000,
    spaceBetween: 30,
    slidesPerView: 3,
    centeredSlides: false,
    grabCursor: true,
    keyboard: true,
    navigation: {
      nextEl: ".fm-brand-next",
      prevEl: ".fm-brand-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      480: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
      1400: {
        slidesPerView: 4,
      },
      1600: {
        slidesPerView: 4,
      },
    },
  });

  //////////////////////////////////////////////////////
  // portfolio-details-active
  var gallerySlider2 = new Swiper(".portfolio-slider-active", {
    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 3000,
    },
    observeParents: true,
    observer: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      1200: {
        slidesPerView: "auto",
      },
      992: {
        slidesPerView: "auto",
      },
      768: {
        slidesPerView: "auto",
        spaceBetween: 30,
      },
      576: {
        slidesPerView: "auto",
        spaceBetween: 30,
      },
      0: {
        slidesPerView: "auto",
      },
    },
  });

  //////////////////////////////////////////////////////
  // Landing slider 01
  var fmLandingTrendingSliderActive = new Swiper(
    ".fm-landing-trending-slider-active",
    {
      loop: true,
      spaceBetween: 30,
      slidesPerView: 4,
      centeredSlides: false,
      navigation: {
        nextEl: ".fm-landing-trending-next",
        prevEl: ".fm-landing-trending-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
    }
  );

  //////////////////////////////////////////////////////
  // Landing  slider 02
  var fmLandingPremiumSliderActive = new Swiper(
    ".fm-landing-premium-slider-active",
    {
      loop: true,
      spaceBetween: 20,
      slidesPerView: 5,
      centeredSlides: false,
      navigation: {
        nextEl: ".fm-landing-premium-next",
        prevEl: ".fm-landing-premium-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1400: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
      },
    }
  );

  //////////////////////////////////////////////////////
  // Landing  slider 03
  var fmLandingGenreSliderActive = new Swiper(
    ".fm-landing-genre-slider-active",
    {
      loop: true,
      spaceBetween: 30,
      slidesPerView: 6,
      centeredSlides: false,
      navigation: {
        nextEl: ".fm-landing-genre-next",
        prevEl: ".fm-landing-genre-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        992: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        1200: {
          slidesPerView: 5,
          spaceBetween: 30,
        },
        1400: {
          slidesPerView: 6,
          spaceBetween: 30,
        },
      },
    }
  );

  //////////////////////////////////////////////////////
  // blog activation
  var swiper = new Swiper(".blog-active", {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    observer: true,
    observeParents: true,
    autoplay: {
      delay: 3000,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: ".blog-slider-button-next",
      prevEl: ".blog-slider-button-prev",
    },

    // Responsive breakpoints
    breakpoints: {
      576: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      991: {
        slidesPerView: 1,
      },
      1200: {
        slidesPerView: 2,
      },
      1400: {
        slidesPerView: 2,
      },
    },
  });

  //////////////////////////////////////////////////////
  // Shop details activation
  var swiper = new Swiper(".related-film-active", {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    observer: true,
    observeParents: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: ".film-slider-button-next",
      prevEl: ".film-slider-button-prev",
    },

    // Responsive breakpoints
    breakpoints: {
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2,
      },
      991: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 3,
      },
      1400: {
        slidesPerView: 3,
      },
      1600: {
        slidesPerView: 4,
      },
    },
  });

  ///////////////////////////////////

  /*--------------------------------------
        Team Active
    ---------------------------------------*/
  $(document).on("mouseover", ".fm-team-item", function () {
    $(this).addClass("active");
    $(".fm-team-item").removeClass("active");
    $(this).addClass("active");
  });

  //////////////////////////////////////////////////////
  // Featured activation
  var swiper = new Swiper(".featured-active", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    centeredSlides: false,
    observeParents: true,
    observer: true,
    autoplay: {
      delay: 300000,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: ".product-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".featured-slider-button-next",
      prevEl: ".featured-slider-button-prev",
    },
    // Responsive breakpoints
    breakpoints: {
      576: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 3,
      },
      1400: {
        slidesPerView: 3,
      },
    },
  });

  ////////////////////////////////////////////////
  // home-5-slide

  // fm-sliderfull-active

  if (jQuery(".fm-sliderfull-active").length > 0) {
    let fmSliderFullactive = ".fm-sliderfull-active";
    let fmSliderFullInit1 = new Swiper(fmSliderFullactive, {
      // Optional parameters
      slidesPerView: 1,
      spaceBetween: 30,
      parallax: true,
      effect: "fade",
      loop: true,
      autoplay: {
        delay: 700000,
        disableOnInteraction: true,
      },
      pagination: {
        el: ".fm-sliderfull-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".fm-sliderfull-next",
        prevEl: ".fm-sliderfull-prev",
      },

      a11y: false,
    });

    function animated_swiper(selector, init) {
      let animated = function animated() {
        $(selector + " [data-animation]").each(function () {
          let anim = $(this).data("animation");
          let delay = $(this).data("delay");
          let duration = $(this).data("duration");

          $(this)
            .removeClass("anim" + anim)
            .addClass(anim + " animated")
            .css({
              webkitAnimationDelay: delay,
              animationDelay: delay,
              webkitAnimationDuration: duration,
              animationDuration: duration,
            })
            .one(
              "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
              function () {
                $(this).removeClass(anim + " animated");
              }
            );
        });
      };
      animated();
      // Make animated when slide change
      init.on("slideChange", function () {
        $(fmSliderFullactive + " [data-animation]").removeClass("animated");
      });
      init.on("slideChange", animated);
    }

    animated_swiper(fmSliderFullactive, fmSliderFullInit1);
  }

  //////////////////////////////////////////////////////
  // Text scroll activation
  let featured__scroll = new Swiper(".text-scroll", {
    allowTouchMove: false,
    loop: true,
    freemode: true,
    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 30,
    speed: 15000,
    autoplay: {
      delay: 1,
      disableOnInteraction: true,
    },
  });

  //////////////////////////////////////////////////////
  // Testimonial activation
  var swiper = new Swiper(".testimonial-active", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    observeParents: true,
    observer: true,
    pagination: {
      el: ".testimonial-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 3000,
      pauseOnMouseEnter: true,
    },
    // Responsive breakpoints
    breakpoints: {
      576: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      991: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 2,
      },
      1400: {
        slidesPerView: 2,
      },
    },
  });

  //////////////////////////////////////////////////////

  //////////////////////////////////////////////////////
  // Testimonial activation 2
  var swiper = new Swiper(".testimonial-active-2", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    observeParents: true,
    observer: true,
    navigation: {
      nextEl: ".fm-slider-next",
      prevEl: ".fm-slider-prev",
    },
    autoplay: {
      delay: 3000,
      pauseOnMouseEnter: true,
    },
    // Responsive breakpoints
    breakpoints: {
      576: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      991: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
      1400: {
        slidesPerView: 3,
      },
    },
  });

  /////////////////////////////////////////////////////

  //////////////////////////////////////////////////////
  // certificate activation
  var swiper = new Swiper(".certificate-active", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    observeParents: true,
    observer: true,
    navigation: {
      nextEl: ".fm-slider-next",
      prevEl: ".fm-slider-prev",
    },
    autoplay: {
      delay: 3000,
      pauseOnMouseEnter: true,
    },
    // Responsive breakpoints
    breakpoints: {
      450: {
        slidesPerView: 2,
      },
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      991: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
      1400: {
        slidesPerView: 4,
      },
    },
  });

  /////////////////////////////////////////////////////

  // Landing slider 04
  var mySwiper1 = new Swiper(".mySwiper1", {
    direction: "vertical",
    slidesPerView: 3,
    spaceBetween: 10,
    loop: true,
    grabCursor: true,
    speed: 1000,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
  });
  var mySwiper2 = new Swiper(".mySwiper2", {
    direction: "vertical",
    slidesPerView: 3,
    spaceBetween: 10,
    loop: true,
    grabCursor: true,
    speed: 1000,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
      reverseDirection: true,
    },
  });
  var mySwiper3 = new Swiper(".mySwiper3", {
    direction: "vertical",
    slidesPerView: 3,
    spaceBetween: 10,
    loop: true,
    grabCursor: true,
    speed: 1000,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
  });
  var mySwiper4 = new Swiper(".mySwiper4", {
    direction: "vertical",
    slidesPerView: 3,
    spaceBetween: 10,
    loop: true,
    grabCursor: true,
    speed: 1000,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
      reverseDirection: true,
    },
  });

  /////////////////////////////////////////////////////
  // Mouse Custom Cursor
  function itCursor() {
    var myCursor = jQuery(".mouseCursor");
    if (myCursor.length) {
      if ($("body")) {
        const e = document.querySelector(".cursor-inner"),
          t = document.querySelector(".cursor-outer");
        let n,
          i = 0,
          o = !1;
        (window.onmousemove = function (s) {
          o ||
            (t.style.transform =
              "translate(" + s.clientX + "px, " + s.clientY + "px)"),
            (e.style.transform =
              "translate(" + s.clientX + "px, " + s.clientY + "px)"),
            (n = s.clientY),
            (i = s.clientX);
        }),
          $("body").on("mouseenter", "button, a, .cursor-pointer", function () {
            e.classList.add("cursor-hover"), t.classList.add("cursor-hover");
          }),
          $("body").on("mouseleave", "button, a, .cursor-pointer", function () {
            ($(this).is("a", "button") &&
              $(this).closest(".cursor-pointer").length) ||
              (e.classList.remove("cursor-hover"),
              t.classList.remove("cursor-hover"));
          }),
          (e.style.visibility = "visible"),
          (t.style.visibility = "visible");
      }
    }
  }
  itCursor();

  $(".slider-drag").on("mouseenter", function () {
    $(".mouseCursor").addClass("cursor-big");
  });
  $(".slider-drag").on("mouseleave", function () {
    $(".mouseCursor").removeClass("cursor-big");
  });
  ////////////////////////
  // menu-slide

  /////////////////////////////////////////////
  // Gsap Animation Start

  // gsap plugin resister
  gsap.registerPlugin(ScrollTrigger, TweenMax, ScrollToPlugin);


	// Config GSAP 
	gsap.config({
		nullTargetWarn: false,
	});

  /////////////////////////////////////////////////////

  /////////////////////////////////////////////////////
  // Home 6 Hero Animation
  let homeStratup = gsap.timeline();

  // Charchater Come long Animation
  let hero6_title = document.querySelector(".hero__six_anim .hero__title-6");
  let hero6_desc = document.querySelector(".hero__six_anim span");

  let hero6_button = document.querySelector(".hero__six_anim a");
  gsap.set(hero6_button, {
    opacity: 0,
    y: 50,
  });

  let split_hero6_title = new SplitText(hero6_title, {
    type: "chars",
  });
  let split_hero6_desc = new SplitText(hero6_desc, {
    type: "chars words",
  });

  homeStratup.from(
    split_hero6_desc.words,
    {
      duration: 1,
      x: 50,
      autoAlpha: 0,
      stagger: 0.05,
    },
    "-=1"
  );

  homeStratup.from(split_hero6_title.chars, {
    duration: 1,
    x: 70,
    autoAlpha: 0,
    stagger: 0.2,
  });

  homeStratup.to(
    hero6_button,
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    },
    "-=1.5"
  );


  /////////////////////////////////////////////////////
  //  Hero Animation home-02
  let homeCreative = gsap.timeline();

  // Charc Come long Animation
  let telling = document.querySelector(".fm-sec-title .telling");
  let story = document.querySelector(".fm-sec-title .story");
  let heroContent = document.querySelector(".fm-hero-content .animate_content");
  let heroBtn = document.querySelector(".fm-hero-content .fm-btn");

  let split_creative = new SplitText(telling, {
    type: "chars",
  });
  let split_solution = new SplitText(story, {
    type: "chars",
  });
  let split_herocontent = new SplitText(heroContent, {
    type: "chars words",
  });

  homeCreative.from(split_creative.chars, {
    duration: 1,
    x: 70,
    autoAlpha: 0,
    stagger: 0.05,
  });
  homeCreative.from(
    split_solution.chars,
    {
      duration: 1,
      x: 70,
      autoAlpha: 0,
      stagger: 0.1,
    },
    "-=1"
  );
  homeCreative.from(
    split_herocontent.words,
    {
      duration: 1,
      x: 60,
      autoAlpha: 0,
      stagger: 0.03,
    },
    "-=1"
  );
  homeCreative.from(
    heroBtn,
    {
      duration: 1,
      x: 60,
      autoAlpha: 0,
      stagger: 0.03,
    },
    "-=1"
  );

  ///////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //  device
  if (device_width > 100) {
    /////////////////////////////////////////////////////
    // All Sec Title Animation
    let splitTitleLines = gsap.utils.toArray(".title-anim");
    splitTitleLines.forEach((splitTextLine) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: splitTextLine,
          start: "top 90%",
          end: "bottom 60%",
          scrub: false,
          markers: false,
          toggleActions: "play none none none",
        },
      });

      const itemSplitted = new SplitText(splitTextLine, {
        type: "words, lines",
      });
      gsap.set(splitTextLine, {
        perspective: 400,
      });
      itemSplitted.split({
        type: "lines",
      });
      tl.from(itemSplitted.lines, {
        duration: 1,
        delay: 0.3,
        opacity: 0,
        rotationX: -80,
        force3D: true,
        transformOrigin: "top center -50",
        stagger: 0.1,
      });
    });

    /////////////////////////////////////////////////////
    //  3-item------fadeUP-----same-time
    gsap.set(".all__item-fade ", {
      y: 50,
      opacity: 0,
    });

    const fadeArray = gsap.utils.toArray(".all__item-fade ");
    fadeArray.forEach((item, i) => {
      let fadeTl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top bottom-=150",
        },
      });
      fadeTl.to(item, {
        y: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 1.5,
        stagger: {
          each: 0.3,
        },
      });
    });

    /////////////////////////////////////////////////////////
    //07. Paragraph Animation
    let textIntoView = $(".p-text");
    gsap.utils.toArray(textIntoView).forEach(function (elem) {
      const innerSplit = new SplitText(elem, {
        type: "lines",
        linesClass: "text-line",
      });
      const outerSplit = new SplitText(elem, {
        type: "lines",
        linesClass: "text-mask",
      });

      const splitTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: elem,
          scrub: false,
          pin: false,
          start: "top 90%",
          end: "bottom 0%",
        },
        onComplete: () => {
          outerSplit.revert(), innerSplit.revert();
        },
      });

      splitTimeline
        .to(innerSplit.lines, {
          duration: 1.1,
          autoAlpha: 1,
          y: 0,
          ease: "Power4.easeOut",
          stagger: 0.2,
        })
        .to(
          elem,
          {
            duration: 0,
            autoAlpha: 1,
          },
          "<"
        );
    });

    //////////////////////////////////////////////////
    //08. Fade In Bottom Animation |  bdFadeBottom
    gsap.set(".bdFadeBottom", {
      y: 30,
      opacity: 0,
    });

    if (device_width < 1023) {
      const fadeArray = gsap.utils.toArray(".bdFadeBottom");
      fadeArray.forEach((item, i) => {
        let fadeTl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top center+=200",
          },
        });
        fadeTl.to(item, {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          duration: 1.5,
        });
      });
    } else {
      gsap.to(".bdFadeBottom", {
        scrollTrigger: {
          trigger: ".bdFadeBottom",
          start: "top center+=300",
          markers: false,
        },
        y: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 1,
        stagger: {
          each: 0.2,
        },
      });
    }
  }

  /////////////////////////////////////////////////////
  // fade-bottom
  gsap.set(".fade_bottom", {
    y: 30,
    opacity: 0,
  });

  if (device_width < 1023) {
    const fadeArray = gsap.utils.toArray(".fade_bottom");
    fadeArray.forEach((item, i) => {
      let fadeTl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top bottom-=100",
        },
      });
      fadeTl.to(item, {
        y: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 1.5,
      });
    });
  } else {
    gsap.to(".fade_bottom", {
      scrollTrigger: {
        trigger: ".fade_bottom",
        start: "top bottom-=100",
        markers: false,
      },
      y: 0,
      opacity: 1,
      ease: "power2.out",
      duration: 1,
      stagger: {
        each: 0.2,
      },
    });
  }

  /////////////////////////////////////////////////////
  // fade-bottom-2
  gsap.set(".fade_bottom_2", {
    y: 30,
    opacity: 0,
  });

  if (device_width < 1023) {
    const fadeArray = gsap.utils.toArray(".fade_bottom_2");
    fadeArray.forEach((item, i) => {
      let fadeTl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top bottom-=100",
        },
      });
      fadeTl.to(item, {
        y: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 1.5,
      });
    });
  } else {
    gsap.to(".fade_bottom_2", {
      scrollTrigger: {
        trigger: ".fade_bottom_2",
        start: "top bottom-=100",
        markers: false,
      },
      y: 0,
      opacity: 1,
      ease: "power2.out",
      duration: 1,
      stagger: {
        each: 0.2,
      },
    });
  }

  /////////////////////////////////////////////////////
  // fade-bottom-3
  gsap.set(".fade_bottom_3", {
    y: 30,
    opacity: 0,
  });

  if (device_width < 1023) {
    const fadeArray = gsap.utils.toArray(".fade_bottom_3");
    fadeArray.forEach((item, i) => {
      let fadeTl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top center+=200",
        },
      });
      fadeTl.to(item, {
        y: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 1.5,
      });
    });
  } else {
    gsap.to(".fade_bottom_3", {
      scrollTrigger: {
        trigger: ".fade_bottom_3",
        start: "top center+=300",
        markers: false,
      },
      y: 0,
      opacity: 1,
      ease: "power2.out",
      duration: 1,
      stagger: {
        each: 0.2,
      },
    });
  }

  /////////////////////////////////////////////////////

  /////////////////////////////////////////////////////
  // fade-bottom-4
  gsap.set(".fade_bottom_4", {
    y: 30,
    opacity: 0,
  });

  if (device_width < 1023) {
    const fadeArray = gsap.utils.toArray(".fade_bottom_4");
    fadeArray.forEach((item, i) => {
      let fadeTl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top center+=200",
        },
      });
      fadeTl.to(item, {
        y: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 1.5,
      });
    });
  } else {
    gsap.to(".fade_bottom_4", {
      scrollTrigger: {
        trigger: ".fade_bottom_4",
        start: "top center+=300",
        markers: false,
      },
      y: 0,
      opacity: 1,
      ease: "power2.out",
      duration: 1,
      stagger: {
        each: 0.2,
      },
    });
  }

  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  // fade-bottom-5
  gsap.set(".fade_bottom_5", {
    y: 30,
    opacity: 0,
  });

  if (device_width < 1023) {
    const fadeArray = gsap.utils.toArray(".fade_bottom_5");
    fadeArray.forEach((item, i) => {
      let fadeTl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top center+=200",
        },
      });
      fadeTl.to(item, {
        y: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 1.5,
      });
    });
  } else {
    gsap.to(".fade_bottom_5", {
      scrollTrigger: {
        trigger: ".fade_bottom_5",
        start: "top center+=300",
        markers: false,
      },
      y: 0,
      opacity: 1,
      ease: "power2.out",
      duration: 1,
      stagger: {
        each: 0.2,
      },
    });
  }

  /////////////////////////////////////////////////////

  /////////////////////////////////////////////////////
  // fade-bottom-6
  gsap.set(".fade_bottom_6", {
    y: 30,
    opacity: 0,
  });

  if (device_width < 1023) {
    const fadeArray = gsap.utils.toArray(".fade_bottom_6");
    fadeArray.forEach((item, i) => {
      let fadeTl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top center+=200",
        },
      });
      fadeTl.to(item, {
        y: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 1.5,
      });
    });
  } else {
    gsap.to(".fade_bottom_6", {
      scrollTrigger: {
        trigger: ".fade_bottom_6",
        start: "top center+=300",
        markers: false,
      },
      y: 0,
      opacity: 1,
      ease: "power2.out",
      duration: 1,
      stagger: {
        each: 0.2,
      },
    });
  }

  /////////////////////////////////////////////////////

  //  fade Animation (fade-on-by-on) smooth
  let fade_animation = gsap.utils.toArray(".fade_animation .fade__anim-item");
  if (device_width < 1023) {
    fade_animation.forEach((item, i) => {
      gsap.set(item, {
        opacity: 0,
        y: 60,
      });
      let featured2Timeline = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top bottom-=150",
        },
      });
      featured2Timeline.to(item, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power4.out",
      });
    });
  } else {
    gsap.set(".fade_animation .fade__anim-item", {
      opacity: 0,
      y: 40,
    });
    gsap.to(".fade_animation .fade__anim-item", {
      scrollTrigger: {
        trigger: ".fade_animation",
        start: "top bottom-=150",
      },
      opacity: 1,
      y: 0,
      duration: 2,
      ease: "power4.out",
      stagger: 0.3,
    });
  }


  if ($(".bd-accordion-fix").length > 0) {
    ScrollTrigger.create({
      trigger: ".bd-accordion-fix",
      start: "top top",
      end: "+=0",
      pin: true,
      pinSpacing: "margin",
    });
  }
 

  // nav-tab fix js
  if ($('.bd-nav-tabs-fix').length > 0) {
    ScrollTrigger.create({
      trigger: ".bd-nav-tabs-fix",
      start: "top top",
      end: "+=0",
      pin: true,
      pinSpacing: "margin"
    })
  }
  
  ////////////////////////////////////////
  // Fade right | together all-item | smooth & fast
  gsap.set(".team__animation .team__item", {
    x: 50,
    opacity: 0,
  });

  if (device_width < 1023) {
    const teamItem = gsap.utils.toArray(".team__animation .team__item");
    teamItem.forEach((teamItem, i) => {
      let blogTl = gsap.timeline({
        scrollTrigger: {
          trigger: teamItem,
          start: "top center+=200",
        },
      });
      blogTl.to(teamItem, {
        x: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 1.5,
      });
    });
  } else {
    gsap.to(".team__animation .team__item", {
      scrollTrigger: {
        trigger: ".team__animation .team__item",
        start: "top center+=300",
        markers: false,
      },
      x: 0,
      opacity: 1,
      ease: "power2.out",
      duration: 2,
      stagger: {
        each: 0.3,
      },
    });
  }

  ///////////////////////////////////
  // fade_up
  gsap.set(".bdFadeUp", {
    y: 30,
    opacity: 0,
  });
  const fadeArray = gsap.utils.toArray(".bdFadeUp");
  fadeArray.forEach((item, i) => {
    let fadeTl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: "top bottom-=150",
      },
    });
    fadeTl.to(item, {
      y: 0,
      opacity: 1,
      ease: "power2.out",
      duration: 1,
    });
  });

  ////////////////////////////////////

  // Fade Left
  gsap.set(".fade__item_left", {
    x: -50,
    opacity: 0,
  });

  const fadeLeftArray = gsap.utils.toArray(".fade__item_left");
  fadeLeftArray.forEach((item, i) => {
    let fadeTl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: "top center+=200",
      },
    });
    fadeTl.to(item, {
      x: 0,
      opacity: 1,
      ease: "power2.out",
      duration: 2,
      delay: 0.5,
      stagger: {
        each: 0.3,
      },
    });
  });

  ///////////////////////////////////
  // Fade left | tow item together | smooth & fast
  gsap.set(".fade__two-item-left", {
    x: -50,
    opacity: 0,
  });
  if (device_width < 1023) {
    const fade__lefta = gsap.utils.toArray(".fade__two-item-left");
    fade__lefta.forEach((item, i) => {
      let fadeTl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top center+=200",
        },
      });
      fadeTl.to(item, {
        x: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 1.5,
      });
    });
  } else {
    gsap.to(".fade__two-item-left", {
      scrollTrigger: {
        trigger: ".fade__two-item-left",
        start: "top center+=300",
        markers: false,
      },
      x: 0,
      opacity: 1,
      ease: "power2.out",
      duration: 1,
      stagger: {
        each: 0.5,
      },
    });
  }
  ///////////////////////////////////////
  // Fade Right
  gsap.set(".fade__item_right", {
    x: 50,
    opacity: 0,
  });

  const fadeRightArray = gsap.utils.toArray(".fade__item_right");
  fadeRightArray.forEach((item, i) => {
    let fadeTl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: "top bottom-=100",
      },
    });
    fadeTl.to(item, {
      x: 0,
      opacity: 1,
      ease: "power2.out",
      duration: 2,
      delay: 0.5,
      stagger: {
        each: 0.3,
      },
    });
  });

  /////////////////////////////////////////////////////
  // pricing-fade fade-left | smooth
  let animation__pricing = gsap.utils.toArray(
    ".animation__pricing .service__item-2"
  );
  gsap.set(animation__pricing, {
    opacity: 0,
    x: -30,
  });

  if (animation__pricing) {
    if (device_width < 1023) {
      animation__pricing.forEach((item, i) => {
        gsap.to(item, {
          scrollTrigger: {
            trigger: item,
            start: "top center+=200",
            markers: false,
          },
          opacity: 1,
          x: 0,
          ease: "power2.out",
          duration: 2,
          stagger: {
            each: 0.4,
          },
        });
      });
    } else {
      gsap.to(".animation__pricing .service__item-2", {
        scrollTrigger: {
          trigger: ".animation__pricing",
          start: "top center+=200",
          markers: false,
        },
        opacity: 1,
        x: 0,
        ease: "power2.out",
        duration: 2,
        stagger: {
          each: 0.4,
        },
      });
    }
  }

  // Tilt Img JS
  let tilt = document.querySelectorAll(".img-tilt");
  if (tilt) {
    VanillaTilt.init(document.querySelectorAll(".img-tilt"), {
      max: 3,
      speed: 3000,
    });
  }

  /////////////////////////////////////////////////////
  // blog  Animation | 3-item fade-left all together
  let service__items_3 = gsap.utils.toArray(".blog__animation-wrapper");
  let service__items_heading = gsap.utils.toArray(
    ".blog__animation-wrapper .fm-blog-thumb"
  );
  let service__items_content = gsap.utils.toArray(
    ".blog__animation-wrapper .blog__content"
  );

  service__items_3.forEach((service_item, i) => {
    gsap.set([service__items_heading[i], service__items_content[i]], {
      x: -30,
      opacity: 0,
    });

    let service3_timeline = gsap.timeline({
      scrollTrigger: {
        trigger: service_item,
        start: "top center+=200",
        markers: false,
      },
    });

    service3_timeline.to(service__items_heading[i], {
      x: 0,
      opacity: 1,
      ease: "power2.out",
      duration: 1.5,
      stagger: {
        each: 0.2,
      },
    });
    service3_timeline.to(
      service__items_content[i],
      {
        x: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 1.5,
        stagger: {
          each: 0.2,
        },
      },
      "-=1"
    );
  });

  /////////////////////////////////////////////////////
  // Button Move Animation parallax-animation
  const all_btns = gsap.utils.toArray(".btn_wrapper");
  if (all_btns.length > 0) {
    var all_btn = gsap.utils.toArray(".btn_wrapper");
  } else {
    var all_btn = gsap.utils.toArray("#btn_wrapper");
  }
  const all_btn_cirlce = gsap.utils.toArray(".btn__item-move");
  all_btn.forEach((btn, i) => {
    $(btn).mousemove(function (e) {
      callParallax(e);
    });

    function callParallax(e) {
      parallaxIt(e, all_btn_cirlce[i], 50);
    }

    function parallaxIt(e, target, movement) {
      var $this = $(btn);
      var relX = e.pageX - $this.offset().left;
      var relY = e.pageY - $this.offset().top;

      gsap.to(target, 0.5, {
        x: ((relX - $this.width() / 2) / $this.width()) * movement,
        y: ((relY - $this.height() / 2) / $this.height()) * movement,
        ease: Power2.easeOut,
      });
    }
    $(btn).mouseleave(function (e) {
      gsap.to(all_btn_cirlce[i], 0.5, {
        x: 0,
        y: 0,
        ease: Power2.easeOut,
      });
    });
  });

  //////////////////////////////////////////////////
  // All Buttons Bounce
  let arr1 = gsap.utils.toArray("#btn_wrapper");
  let arr2 = gsap.utils.toArray(".btn_wrapper");
  const all_buttons = arr1.concat(arr2);

  all_buttons.forEach((btn) => {
    if (!btn.classList.contains("")) {
      gsap.from(btn, {
        scrollTrigger: {
          trigger: btn,
          start: "top center+=150",
          markers: false,
        },
        opacity: 0,
        y: -70,
        ease: "bounce",
        duration: 1.5,
      });
    }
  });

  /////////////////////////////////////////////////////
  ///////////////////////////////////
  // Fade left | tow item together | smooth & fast
  gsap.set(".fade__two-item-left2", {
    x: -50,
    opacity: 0,
  });
  if (device_width < 1023) {
    const fade__lefta = gsap.utils.toArray(".fade__two-item-left2");
    fade__lefta.forEach((item, i) => {
      let fadeTl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top bottom-=50",
        },
      });
      fadeTl.to(item, {
        x: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 0.8,
      });
    });
  } else {
    gsap.to(".fade__two-item-left2", {
      scrollTrigger: {
        trigger: ".fade__two-item-left2",
        start: "top bottom-=50",
        markers: false,
      },
      x: 0,
      opacity: 1,
      ease: "power2.out",
      duration: 0.8,
      stagger: {
        each: 0.2,
      },
    });
  }
  /////////////////////////////////////////////////////

  /////////////////////////////////////////////
  // Scroll Top
  let scroll_top = document.getElementById("scroll_top");
  if (scroll_top) {
    window.onscroll = function () {
      if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
      ) {
        scroll_top.style.display = "block";
      } else {
        scroll_top.style.display = "none";
      }
    };

    scroll_top.addEventListener("click", function () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });
  }

  /////////////////////////////////////////////////////
})(jQuery);
