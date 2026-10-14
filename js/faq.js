/**
 * Proofix Technologies - FAQ Page jQuery Script
 * Handles Interactive Accordion Slide Toggle
 */

$(document).ready(function () {
  // Accordion Toggle
  $('.faq-question').on('click', function () {
    const $item = $(this).closest('.faq-item');
    const $answer = $item.find('.faq-answer');
    const isActive = $item.hasClass('active');

    if (isActive) {
      $answer.slideUp(250);
      $item.removeClass('active');
    } else {
      // Close other open accordions in the same list
      $item.siblings('.faq-item.active').removeClass('active').find('.faq-answer').slideUp(250);
      $answer.slideDown(250);
      $item.addClass('active');
    }
  });

  // Open the first question by default
  $('.faq-item:first').addClass('active').find('.faq-answer').show();
});
