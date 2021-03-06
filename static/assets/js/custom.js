function removeLoading() {
  $('body').addClass('no-transition-loading-screen');
  $('body').removeClass('loading-done');
}

function addLoading() {
  setTimeout(() => {
    $('body').removeClass('no-transition-loading-screen');
    $('body').addClass('loading-done');
  }, 1000);
}

function heroHeight() {
  $('.ts-full-screen').height($(window).width() > 768 ? $(window).height() : 'unset');
}

function doneResizing() {
  heroHeight();
}

function documentReady() {
  doneResizing();

  $('.ts-scroll').on('click', function (event) {
    if (
      this && this.pathname && location && location.pathname && location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')
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

  setTimeout(() => {
    $('body').addClass('loading-done');
    const $animatedWaves = $('.ts-animated-waves');
    $animatedWaves.css('transform', `translateX( calc( -100% + ${$(window).width() + 5}px )`);
    $animatedWaves.on('transitionend webkitTransitionEnd oTransitionEnd', function () {
      $(this).toggleClass('repeat');
    });
  }, 200);

  $(document).on('click', () => {
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

  // On RESIZE actions

  let resizeId;

  $(window).on('resize', () => {
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 250);
  });

  // On SCROLL actions

  $(window).on('scroll', () => {
    if ($(window).scrollTop() > 100) {
      $('.navbar').addClass('in');
    } else {
      $('.navbar').removeClass('in');
    }
  });
}

export {
  documentReady,
  addLoading,
  removeLoading,
};
