window.selectQuestion = (id, item) => {
  const btn = document.querySelector('#question');
  const txt = item.textContent;

  item.classList = 'active';
  console.log(id, txt);
};

function getVideo() {
  $('.video-modal').each(function () {
    const iframe = $(this).find('iframe')[0];

    $(this).detach().appendTo('body');
    $(this).data('video', iframe);
    console.log('get video');
  });
}

function addVideo(e) {
  const $modal = $(e.target);
  const iframeData = $modal.data('video');
  $modal.find('.video-container').append($(iframeData));
  console.log('add video');
}

function removeVideo(e) {
  const $modal = $(e.target);
  const iframe = $modal.find('iframe')[0];
  const video = $modal.find('video')[0];

  if (iframe.length != 0) {
    iframe.remove();
    console.log('iframe remove');
  } else if (video.length != 0) {
    video.remove();
    console.log('video remove');
  }
}

$(document).on('show.bs.modal', getVideo(), addVideo);
$(document).on('hidden.bs.modal', removeVideo);

function showModal(e) {
  console.log(e);
  console.log('modalul e:');
  const $modal = $(e.target);
  console.log($modal);
}

$(document).on('show.bs.modal', showModal);

if (document.getElementsByClassName('ts-full-screen').length) {
  document.getElementsByClassName('ts-full-screen')[0].style.height = `${window.innerHeight}px`;
}
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// jQuery
function documentReady() {
  $('body').imagesLoaded(() => {
    $('body').addClass('loading-done');
    const $animatedWaves = $('.ts-animated-waves');
    $animatedWaves.css('transform', `translateX( calc( -100% + ${$(window).width() + 5}px )`);
    $animatedWaves.on('transitionend webkitTransitionEnd oTransitionEnd', function () {
      $(this).toggleClass('repeat');
    });
  });

  $('.navbar-nav .nav-link').on('click', () => {
    $('.navbar-collapse').collapse('hide');
  });

  $('.ts-img-into-bg').each(function () {
    $(this).css('background-image', `url(${$(this).find('img').attr('src')})`);
  });

  //  Background

  $('[data-bg-color], [data-bg-image], [data-bg-particles]').each(function () {
    const $this = $(this);

    if ($this.hasClass('ts-separate-bg-element')) {
      $this.append('<div class="ts-background">');

      // Background Color

      if ($('[data-bg-color]')) {
        $this.find('.ts-background').css('background-color', $this.attr('data-bg-color'));
      }

      // Particles

      if ($this.attr('data-bg-particles-line-color') || $this.attr('data-bg-particles-dot-color')) {
        $this.find('.ts-background').append('<div class="ts-background-particles">');
        $('.ts-background-particles').each(function () {
          const lineColor = $this.attr('data-bg-particles-line-color');
          const dotColor = $this.attr('data-bg-particles-dot-color');
          const parallax = $this.attr('data-bg-particles-parallax');
          $(this).particleground({
            density: 15000,
            lineWidth: 0.2,
            lineColor,
            dotColor,
            parallax,
            proximity: 200,
          });
        });
      }

      // Background Image

      if ($this.attr('data-bg-image') !== undefined) {
        $this.find('.ts-background').append('<div class="ts-background-image">');
        $this.find('.ts-background-image')
          .css('background-image', `url(${$this.attr('data-bg-image')})`);
        $this.find('.ts-background-image').css('background-size', $this.attr('data-bg-size'));
        $this.find('.ts-background-image')
          .css('background-position', $this.attr('data-bg-position'));
        $this.find('.ts-background-image').css('opacity', $this.attr('data-bg-image-opacity'));

        $this.find('.ts-background-image').css('background-size', $this.attr('data-bg-size'));
        $this.find('.ts-background-image').css('background-repeat', $this.attr('data-bg-repeat'));
        $this.find('.ts-background-image')
          .css('background-position', $this.attr('data-bg-position'));
        $this.find('.ts-background-image')
          .css('background-blend-mode', $this.attr('data-bg-blend-mode'));
      }

      // Parallax effect

      if ($this.attr('data-bg-parallax') !== undefined) {
        $this.find('.ts-background-image').addClass('ts-parallax-element');
      }
    } else {
      if ($this.attr('data-bg-color') !== undefined) {
        $this.css('background-color', $this.attr('data-bg-color'));
        if ($this.hasClass('btn')) {
          $this.css('border-color', $this.attr('data-bg-color'));
        }
      }

      if ($this.attr('data-bg-image') !== undefined) {
        $this.css('background-image', `url(${$this.attr('data-bg-image')})`);

        $this.css('background-size', $this.attr('data-bg-size'));
        $this.css('background-repeat', $this.attr('data-bg-repeat'));
        $this.css('background-position', $this.attr('data-bg-position'));
        $this.css('background-blend-mode', $this.attr('data-bg-blend-mode'));
      }
    }
  });

  //  Parallax Background Image

  $('[data-bg-parallax=\'scroll\']').each(function () {
    const speed = $(this).attr('data-bg-parallax-speed');
    const $this = $(this);
    let isVisible;
    let backgroundPosition;

    $this.isInViewport((status) => {
      if (status === 'entered') {
        isVisible = 1;
        let position;

        $(window).scroll(() => {
          if (isVisible === 1) {
            position = $(window).scrollTop() - $this.offset().top;
            backgroundPosition = (100 - (Math.abs((-$(window).height()) - position) / ($(window)
              .height() + $this.height())) * 100);
            if ($this.find('.ts-parallax-element').hasClass('ts-background-image')) {
              $this.find('.ts-background-image.ts-parallax-element')
                .css('background-position-y', `${position / speed}px`);
            } else {
              $this.find('.ts-parallax-element')
                .css('transform', `translateY(${position / speed}px)`);
            }
          }
        });
      }
      if (status === 'leaved') {
        isVisible = 0;
      }
    });
  });


  // Dynamic Waves in Hero

  $('.ts-dynamic-wave').each(function () {
    $(this).wavify({
      // height: (1- $(this).attr("data-wave-height")) * $(window).height(),
      height: $(this).attr('data-wave-height'),
      bones: $(this).attr('data-wave-bones'),
      amplitude: 0.1 * $(window).height(),
      color: $(this).attr('data-wave-color'),
      speed: 0.15,
    });
  });

  $('.ts-labels-inside-input input, .ts-labels-inside-input textarea').focusin(function () {
    $(this).parent().find('label').addClass('focused');
  })
    .focusout(function () {
      if ($(this).val().length === 0) {
        $(this).parent().find('label').removeClass('focused');
      }
    });

  $('select').each(function () {
    $(this).wrap('<div class="select-wrapper"></div>');
  });

  // Owl Carousel

  const $owlCarousel = $('.owl-carousel');

  if ($owlCarousel.length) {
    $owlCarousel.each(function () {
      let items = parseInt($(this).attr('data-owl-items'), 10);
      if (!items) {
        items = 1;
      }

      let nav = parseInt($(this).attr('data-owl-nav'), 2);
      if (!nav) {
        nav = 0;
      }

      let dots = parseInt($(this).attr('data-owl-dots'), 2);
      if (!dots) {
        dots = 0;
      }

      let center = parseInt($(this).attr('data-owl-center'), 2);
      if (!center) {
        center = 0;
      }

      let loop = parseInt($(this).attr('data-owl-loop'), 2);
      if (!loop) {
        loop = 0;
      }

      let margin = parseInt($(this).attr('data-owl-margin'), 2);
      if (!margin) {
        margin = 0;
      }

      let autoWidth = parseInt($(this).attr('data-owl-auto-width'), 2);
      if (!autoWidth) {
        autoWidth = 0;
      }

      let navContainer = $(this).attr('data-owl-nav-container');
      if (!navContainer) {
        navContainer = 0;
      }

      let autoplay = parseInt($(this).attr('data-owl-autoplay'), 2);
      if (!autoplay) {
        autoplay = 0;
      }

      let autoplayTimeOut = parseInt($(this).attr('data-owl-autoplay-timeout'), 10);
      if (!autoplayTimeOut) {
        autoplayTimeOut = 5000;
      }

      let autoHeight = parseInt($(this).attr('data-owl-auto-height'), 2);
      if (!autoHeight) {
        autoHeight = 0;
      }

      let fadeOut = $(this).attr('data-owl-fadeout');
      if (!fadeOut) {
        fadeOut = 0;
      } else {
        fadeOut = 'fadeOut';
      }

      if ($('body').hasClass('rtl')) {
        var rtl = true;
      } else {
        rtl = false;
      }

      if (items === 1) {
        $(this).owlCarousel({
          navContainer,
          animateOut: fadeOut,
          autoplayTimeout: autoplayTimeOut,
          autoplay: 1,
          autoHeight,
          center,
          loop,
          margin,
          autoWidth,
          items: 1,
          nav,
          dots,
          rtl,
          navText: [],
        });
      } else {
        $(this).owlCarousel({
          navContainer,
          animateOut: fadeOut,
          autoplayTimeout: autoplayTimeOut,
          autoplay,
          autoHeight,
          center,
          loop,
          margin,
          autoWidth,
          items: 1,
          nav,
          dots,
          rtl,
          navText: [],
          responsive: {
            1199: {
              items,
            },
            992: {
              items: 3,
            },
            768: {
              items: 2,
            },
            0: {
              items: 1,
            },
          },
        });
      }

      if ($(this).find('.owl-item').length === 1) {
        $(this).find('.owl-nav').css({ opacity: 0, 'pointer-events': 'none' });
      }
    });
  }

  $('.ts-count-down').each(function () {
    const date = $(this).attr('data-date');
    $(this).countdown({
      date,
      render(data) {
        const el = $(this.el);
        el.empty()
          .append(`<div>${this.leadingZeros(data.days, 3)} <span>Days</span></div>`)
          .append('<figure class=\'divider\'>:</figure>')
          .append(`<div>${this.leadingZeros(data.hours, 2)} <span>Hours</span></div>`)
          .append('<figure class=\'divider\'>:</figure>')
          .append(`<div>${this.leadingZeros(data.min, 2)} <span>Minutes</span></div>`)
          .append('<figure class=\'divider\'>:</figure>')
          .append(`<div>${this.leadingZeros(data.sec, 2)} <span>Seconds</span></div>`);
      },
    });
  });

  // Magnific Popup

  const $popupImage = $('.popup-popup');

  if ($popupImage.length > 0) {
    $popupImage.magnificPopup({
      type: 'image',
      fixedContentPos: false,
      gallery: { enabled: true },
      removalDelay: 300,
      mainClass: 'mfp-fade',
      callbacks: {
        // This prevents pushing the entire page to the right after opening Magnific popup image
        open() {
          $('.page-wrapper, .navbar-nav').css('margin-right', getScrollBarWidth());
        },
        close() {
          $('.page-wrapper, .navbar-nav').css('margin-right', 0);
        },
      },
    });
  }

  const $videoPopup = $('.video-popup');

  if ($videoPopup.length > 0) {
    $videoPopup.magnificPopup({
      type: 'iframe',
      removalDelay: 300,
      mainClass: 'mfp-fade',
      overflowY: 'hidden',
      iframe: {
        markup: '<div class="mfp-iframe-scaler">'
            + '<div class="mfp-close"></div>'
            + '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'
            + '</div>',
        patterns: {
          youtube: {
            index: 'youtube.com/',
            id: 'v=',
            src: '//www.youtube.com/embed/%id%?autoplay=1',
          },
          vimeo: {
            index: 'vimeo.com/',
            id: '/',
            src: '//player.vimeo.com/video/%id%?autoplay=1',
          },
          gmaps: {
            index: '//maps.google.',
            src: '%id%&output=embed',
          },
        },
        srcAction: 'iframe_src',
      },
    });
  }

  $('.ts-form-email [type=\'submit\']').each(function () {
    const text = $(this).text();
    $(this)
      .html('')
      .append(`<span>${text}</span>`)
      .prepend('<div class=\'status\'><i class=\'fas fa-circle-notch fa-spin spinner\'></i></div>');
  });

  $('.ts-form-email .btn[type=\'submit\']').on('click', function (e) {
    const $button = $(this);
    const $form = $(this).closest('form');
    const pathToPhp = $(this).closest('form').attr('data-php-path');
    $form.validate({
      submitHandler() {
        $button.addClass('processing');
        $.post(pathToPhp, $form.serialize(), (response) => {
          $button.addClass('done').find('.status').append(response).prop('disabled', true);
        });
        return false;
      },
    });
  });

  $('form:not(.ts-form-email)').each(function () {
    $(this).validate();
  });

  $('[data-animate]').scrolla({
    mobile: true,
  });

  // On RESIZE actions

  let resizeId;

  $(window).on('resize', () => {
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 250);
  });

  // On SCROLL actions

  $(window).on('scroll', () => {
    if ($(window).scrollTop() > $(window).height()) {
      $('.navbar').addClass('in');
    } else {
      $('.navbar').removeClass('in');
    }
  });
}

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Do after resize

function doneResizing() {
  heroHeight();
  $('.owl-carousel').trigger('next.owl.carousel');
}

// Set Hero height

function heroHeight() {
  $('.ts-full-screen').height($(window).height());
}

// Smooth Scroll

$('.ts-scroll').on('click', function (event) {
  if (
    location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')
        && location.hostname === this.hostname
  ) {
    let target = $(this.hash);
    target = target.length ? target : $(`[name=${this.hash.slice(1)}]`);
    if (target.length) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top,
      }, 1000, () => {
        const $target = $(target);
        $target.focus();
        if ($target.is(':focus')) {
          return false;
        }
        $target.attr('tabindex', '-1');
        $target.focus();
      });
    }
  }
});


// Return scrollbar width

function getScrollBarWidth() {
  const $outer = $('<div>').css({ visibility: 'hidden', width: 100, overflow: 'scroll' }).appendTo('body');
  const widthWithScroll = $('<div>').css({ width: '100%' }).appendTo($outer).outerWidth();
  $outer.remove();
  return 100 - widthWithScroll;
}

function simpleMap(latitude, longitude, markerImage, mapStyle, mapElement, markerDrag) {
  if (!markerDrag) {
    markerDrag = false;
  }
  const mapCenter = new google.maps.LatLng(latitude, longitude);
  const mapOptions = {
    zoom: 13,
    center: mapCenter,
    disableDefaultUI: true,
    scrollwheel: false,
    styles: mapStyle,
  };
  const element = document.getElementById(mapElement);
  const map = new google.maps.Map(element, mapOptions);
  const marker = new google.maps.Marker({
    position: new google.maps.LatLng(latitude, longitude),
    map,
    icon: markerImage,
    draggable: markerDrag,
  });
}
