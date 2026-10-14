/**
 * Proofix Technologies - Services Page jQuery Script
 * Handles Category Filter Tabs, Quick Scrolling to Service Blocks, and Lead Trigger
 */

$(document).ready(function () {
  // Category Pill Filter
  $('.filter-pill').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active');
    const category = $(this).attr('data-category');

    if (category === 'all') {
      $('.service-detail-block').fadeIn(300);
    } else {
      $('.service-detail-block').each(function () {
        if ($(this).hasClass(`cat-${category}`)) {
          $(this).fadeIn(300);
        } else {
          $(this).fadeOut(200);
        }
      });
    }
  });

  // Highlight block on direct hash navigation
  if (window.location.hash) {
    const $targetBlock = $(window.location.hash);
    if ($targetBlock.length) {
      $('html, body').animate({
        scrollTop: $targetBlock.offset().top - 90
      }, 500);
      $targetBlock.css('border-color', 'var(--accent-gold)');
      setTimeout(() => {
        $targetBlock.css('border-color', 'var(--border-color)');
      }, 2000);
    }
  }
});
