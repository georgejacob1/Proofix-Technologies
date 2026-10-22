/**
 * Proofix Technologies - Common jQuery Script
 * Handles Header Sticky Behavior, Mobile Drawer, Submenus, and Back-to-Top
 */

$(document).ready(function () {
  const $header = $('.site-header');
  const $backToTop = $('#backToTop');
  const $mobileToggle = $('#mobileToggle');
  const $navMenu = $('#navMenu');

  // 1. Sticky Header & Back to Top Scroll Behavior
  $(window).on('scroll', function () {
    const scrollPos = $(this).scrollTop();
    
    if (scrollPos > 40) {
      $header.addClass('scrolled');
    } else {
      $header.removeClass('scrolled');
    }

    if (scrollPos > 350) {
      $backToTop.addClass('visible');
    } else {
      $backToTop.removeClass('visible');
    }
  });

  // 2. Smooth Scroll to Top
  $backToTop.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 500);
  });

  // 3. Mobile Hamburger Menu Toggle
  $mobileToggle.on('click', function () {
    $navMenu.toggleClass('open');
    const isOpen = $navMenu.hasClass('open');
    $(this).find('i').toggleClass('fa-bars', !isOpen).toggleClass('fa-xmark', isOpen);
  });

  // 4. Mobile Dropdown Submenu Toggle
  $('.nav-item-dropdown > .nav-link').on('click', function (e) {
    if ($(window).width() <= 1024) {
      e.preventDefault();
      const $parent = $(this).closest('.nav-item-dropdown');
      $parent.toggleClass('mobile-open');
      $parent.find('.nav-dropdown').slideToggle(200);
    }
  });

  // 5. Close Mobile Menu on Outside Click
  $(document).on('click', function (e) {
    if ($(window).width() <= 1024) {
      if (!$(e.target).closest('.site-header').length) {
        $navMenu.removeClass('open');
        $mobileToggle.find('i').removeClass('fa-xmark').addClass('fa-bars');
      }
    }
  });

  // 6. Highlight Active Navigation Item
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  $('.nav-link, .dropdown-link').each(function () {
    const href = $(this).attr('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      $(this).addClass('active');
      $(this).closest('.nav-item-dropdown').find('> .nav-link').addClass('active');
    }
  });

  // 7. Smooth Scroll for Anchor Links
  $('a[href^="#"]:not([href="#"])').on('click', function (e) {
    const target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top - 80
      }, 500);
    }
  });

  // 8. Hero Banner Background Slider for Subpages
  const $subpageHeroCarousel = $('.hero-banner-carousel:not(#heroBannerCarousel)');
  if ($subpageHeroCarousel.length && typeof $.fn.owlCarousel === 'function') {
    $subpageHeroCarousel.owlCarousel({
      items: 1,
      loop: true,
      margin: 0,
      autoplay: true,
      autoplayTimeout: 5500,
      autoplayHoverPause: true,
      smartSpeed: 800,
      nav: false,
      dots: false,
      responsive: {
        0: {
          nav: false,
          dots: false
        },
        768: {
          nav: false,
          dots: false
        }
      }
    });
  }
});
