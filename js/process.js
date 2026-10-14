/**
 * Proofix Technologies - Our Process jQuery Script
 * Handles Interactive Phase Navigation & Highlighting
 */

$(document).ready(function () {
  $('.flow-card-mini').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active');
    const target = $(this).attr('data-target');
    const $targetEl = $(target);

    if ($targetEl.length) {
      $('html, body').animate({
        scrollTop: $targetEl.offset().top - 90
      }, 450);

      $targetEl.css('border-color', 'var(--accent-gold)');
      setTimeout(() => {
        $targetEl.css('border-color', 'var(--border-color)');
      }, 1800);
    }
  });
});
