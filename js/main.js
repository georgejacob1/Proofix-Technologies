/**
 * Proofix Technologies - Site script (jQuery)
 * Header, mobile drawer, back-to-top, FAQ accordion,
 * detail-page switching and contact form.
 */
$(function () {
  'use strict';

  var $win = $(window);
  var $header = $('.site-header');
  var $nav = $('#nav');
  var $toggle = $('#menuToggle');
  var $toTop = $('#backToTop');

  // Sticky header shadow + back-to-top visibility
  function onScroll() {
    var y = $win.scrollTop();
    $header.toggleClass('scrolled', y > 8);
    $toTop.toggleClass('visible', y > 500);
  }
  $win.on('scroll', onScroll);
  onScroll();
  $toTop.on('click', function () { $('html, body').animate({ scrollTop: 0 }, 400); });

  // Mobile drawer (slides in from the right, with a dimmed overlay)
  var $overlay = $('<div class="nav-overlay"></div>').appendTo($header);
  function setDrawer(open) {
    $nav.toggleClass('open', open);
    $overlay.toggleClass('show', open);
    $toggle.attr('aria-expanded', open).find('img').attr('src', open ? 'assets/images/icon/xmark.svg' : 'assets/images/icon/bars.svg');
    $('body').css('overflow', open ? 'hidden' : '');
  }
  $toggle.on('click', function () { setDrawer(!$nav.hasClass('open')); });
  $overlay.add('#navClose').on('click', function () { setDrawer(false); });
  $nav.find('a').on('click', function () { setDrawer(false); });
  $win.on('resize', function () { if ($win.width() > 1050) setDrawer(false); });
  $('.has-menu > .nav-link').on('click', function () {
    if ($win.width() <= 1050) $(this).parent().toggleClass('open');
  });

  // FAQ accordion
  $('.faq-q').on('click', function () {
    var $item = $(this).closest('.faq-item');
    var $answer = $item.find('.faq-a');
    var open = $item.toggleClass('open').hasClass('open');
    $(this).attr('aria-expanded', open);
    $answer.css('max-height', open ? $answer[0].scrollHeight : 0);
  });

  // Detail pages (service-detail / blog-detail): show the panel named in the query string
  var $panels = $('.detail-panel');
  if ($panels.length) {
    var params = new URLSearchParams(window.location.search);
    var id = params.get('s') || params.get('b');
    var $cur = $panels.filter(function () { return $(this).data('id') === id; }).first();
    if (!$cur.length) $cur = $panels.first();
    $panels.not($cur).prop('hidden', true);
    $cur.prop('hidden', false);
    document.title = $cur.data('title') + ' | Proofix Technologies';
  }

  // Contact form
  var $form = $('#contactLeadForm');
  if ($form.length) {
    var qs = new URLSearchParams(window.location.search);
    if (qs.get('service')) $('#inquiryService').val(qs.get('service'));
    if (qs.get('domain')) $('#inquiryDomain').val(qs.get('domain'));

    $form.on('submit', function (e) {
      e.preventDefault();
      var bad = false;
      $('#fullName, #emailAddr, #phoneNum, #inquiryDomain, #researchStage').each(function () {
        var empty = !$.trim($(this).val());
        $(this).toggleClass('invalid', empty);
        bad = bad || empty;
      });
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($.trim($('#emailAddr').val()))) {
        $('#emailAddr').addClass('invalid');
        bad = true;
      }
      $('#formError').toggle(bad);
      if (bad) return;

      var name = $.trim($('#fullName').val());
      var waText = encodeURIComponent(
        'Hello Proofix Technologies,\n\nName: ' + name +
        '\nEmail: ' + $.trim($('#emailAddr').val()) + '\nPhone: ' + $.trim($('#phoneNum').val()) +
        '\nDomain: ' + $('#inquiryDomain').val() + '\nStage: ' + $('#researchStage').val() +
        '\nService: ' + $('#inquiryService option:selected').text() + '\nMessage: ' + $.trim($('#inquiryMessage').val())
      );
      var $box = $('#formSuccessBox').empty();
      $('<img>', { 'class': 'icon big', src: 'assets/images/icon/circle-check.svg', alt: '' }).appendTo($box);
      $('<h3>').text('Thank you, ' + name + '!').appendTo($box);
      $('<p>').text('Your requirement has been noted. To reach our consultant fastest, send it on WhatsApp — we will schedule a consultation with a subject matter expert from your domain.').appendTo($box);
      $('<a>', { 'class': 'btn btn-whatsapp', target: '_blank', rel: 'noopener', href: 'https://wa.me/919187559443?text=' + waText })
        .html('<img class="icon" src="assets/images/icon/whatsapp.svg" alt=""> Continue on WhatsApp').appendTo($box);
      $form.hide();
      $box.fadeIn(250);
      $('html, body').animate({ scrollTop: $box.offset().top - 160 }, 400);
    });
  }
});
