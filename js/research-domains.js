/**
 * Proofix Technologies - Research Domains jQuery Script
 * Handles Sticky Quick Navigation and Active Domain Highlighting
 */

$(document).ready(function () {
  // Sticky bar quick jump smooth scroll
  $('.quick-nav-btn').on('click', function (e) {
    e.preventDefault();
    const targetId = $(this).attr('href');
    const $target = $(targetId);
    
    if ($target.length) {
      $('html, body').animate({
        scrollTop: $target.offset().top - 140
      }, 450);
      $(this).addClass('active').siblings().removeClass('active');
    }
  });

  // Track active domain on scroll
  $(window).on('scroll', function () {
    const scrollPos = $(window).scrollTop() + 160;
    
    $('.domain-block').each(function () {
      const top = $(this).offset().top;
      const height = $(this).outerHeight();
      const id = $(this).attr('id');
      
      if (scrollPos >= top && scrollPos < top + height) {
        $(`.quick-nav-btn[href="#${id}"]`).addClass('active').siblings().removeClass('active');
      }
    });
  });

  // Check URL hash on page load
  if (window.location.hash) {
    const $target = $(window.location.hash);
    if ($target.length) {
      $('html, body').animate({
        scrollTop: $target.offset().top - 140
      }, 500);
      $(`.quick-nav-btn[href="${window.location.hash}"]`).addClass('active').siblings().removeClass('active');
    }
  }
});
