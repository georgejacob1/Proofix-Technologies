/**
 * Proofix Technologies - About Us jQuery Script
 * Handles Milestone Timeline Reveal and Team Card Hover Animations
 */

$(document).ready(function () {
  // Reveal Timeline items smoothly as they scroll into viewport
  function checkTimelineReveal() {
    $('.timeline-item').each(function () {
      const itemTop = $(this).offset().top;
      const windowBottom = $(window).scrollTop() + $(window).height() - 60;
      if (windowBottom > itemTop) {
        $(this).find('.timeline-content').css({
          'opacity': '1',
          'transform': 'translateX(0)'
        });
      }
    });
  }

  // Set initial styles for animation
  $('.timeline-item .timeline-content').css({
    'opacity': '0.9',
    'transition': 'all 0.4s ease'
  });

  $(window).on('scroll', checkTimelineReveal);
  checkTimelineReveal();
});
