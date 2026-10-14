/**
 * Proofix Technologies - Academic Blogs jQuery Script
 * Handles Search, Category Filters, and Article Reading Modal
 */

$(document).ready(function () {
  // 1. Category Filter
  $('.blog-pill').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active');
    const category = $(this).attr('data-category');

    if (category === 'all') {
      $('.blog-card').fadeIn(250);
    } else {
      $('.blog-card').each(function () {
        if ($(this).hasClass(`cat-${category}`)) {
          $(this).fadeIn(250);
        } else {
          $(this).fadeOut(150);
        }
      });
    }
  });

  // 2. Real-Time Search Filter
  $('#blogSearchInput').on('keyup', function () {
    const query = $(this).val().toLowerCase().trim();

    $('.blog-card').each(function () {
      const text = $(this).text().toLowerCase();
      if (text.indexOf(query) !== -1) {
        $(this).fadeIn(200);
      } else {
        $(this).fadeOut(150);
      }
    });
  });

  // 3. Modal Read More Handler
  $('.read-article-btn').on('click', function (e) {
    e.preventDefault();
    const $card = $(this).closest('.blog-card');
    const title = $card.find('.blog-title').text();
    const category = $card.find('.blog-badge').text();
    const contentHtml = $card.find('.full-article-data').html();

    $('#modalArticleTitle').text(title);
    $('#modalArticleCategory').text(category);
    $('#modalArticleBody').html(contentHtml);

    $('#articleModal').fadeIn(250);
    $('body').css('overflow', 'hidden');
  });

  // Close modal
  $('#modalCloseBtn, #articleModal').on('click', function (e) {
    if (e.target === this || $(this).attr('id') === 'modalCloseBtn') {
      $('#articleModal').fadeOut(200);
      $('body').css('overflow', 'auto');
    }
  });

  // Prevent closing when clicking inside modal content
  $('.modal-content-box').on('click', function (e) {
    e.stopPropagation();
  });
});
