/**
 * Proofix Technologies - Contact Page jQuery Script
 * Handles Form Validation, Auto-population from URL parameters, and WhatsApp Bridge
 */

$(document).ready(function () {
  // 1. Auto-select service or domain if query parameter is present
  const urlParams = new URLSearchParams(window.location.search);
  const serviceParam = urlParams.get('service');
  const domainParam = urlParams.get('domain');

  if (serviceParam) {
    $('#inquiryService').val(serviceParam);
  }
  if (domainParam) {
    $('#inquiryDomain').val(domainParam);
  }

  // 2. Contact Form Submission
  $('#contactLeadForm').on('submit', function (e) {
    e.preventDefault();

    const name = $('#fullName').val().trim();
    const email = $('#emailAddr').val().trim();
    const phone = $('#phoneNum').val().trim();
    const domain = $('#inquiryDomain').val();
    const stage = $('#researchStage').val();
    const message = $('#inquiryMessage').val().trim();

    if (!name || !email || !phone) {
      alert("Please complete all required fields (Name, Email, Phone).");
      return;
    }

    // Prepare WhatsApp fallback link with user's inputted details
    const waText = encodeURIComponent(
      `Hello Proofix Technologies,\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nDomain: ${domain}\nStage: ${stage}\nMessage: ${message}`
    );
    const waUrl = `https://wa.me/919187559443?text=${waText}`;

    // Display confirmation & success banner
    $('#contactLeadForm').slideUp(300);
    $('#formSuccessBox')
      .html(`
        <i class="fa-solid fa-circle-check"></i>
        <h4 style="font-size: 1.35rem; margin-bottom: 8px;">Thank You, ${name}!</h4>
        <p style="margin-bottom: 18px;">
          Your research inquiry has been registered. An academic consultant from our <strong>${domain || 'respective'}</strong> domain team will review your requirement and reach out within 24 hours.
        </p>
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <a href="${waUrl}" target="_blank" class="btn btn-primary" style="background: #25D366; color: #fff; padding: 10px 22px;">
            <i class="fa-brands fa-whatsapp"></i> Continue Immediately on WhatsApp
          </a>
        </div>
      `)
      .slideDown(350);

    $('html, body').animate({
      scrollTop: $('#formSuccessBox').offset().top - 120
    }, 400);
  });
});
