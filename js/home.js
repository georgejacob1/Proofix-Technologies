/**
 * Proofix Technologies - Home Page jQuery Script
 * Handles Interactive Service Quiz Widget, Metric Counters, and Lead Triggers
 */

$(document).ready(function () {
  // 1. Interactive Multi-Step Quiz Widget
  let currentStep = 1;
  const totalSteps = 3;
  const userAnswers = {};

  const questions = [
    {
      step: 1,
      title: "What stage are you at in your academic / PhD journey?",
      options: [
        { text: "Just starting to explore PhD & research topics", service: "Research Proposal & Topic Refinement" },
        { text: "Ready to prepare research proposal / synopsis", service: "Research Proposal & Synopsis Support" },
        { text: "Currently conducting literature review & study design", service: "Literature Review & Methodology Support" },
        { text: "Working with data analysis or technical implementation", service: "Data Analysis & Statistical Support" },
        { text: "Drafting thesis or research paper manuscript", service: "Thesis & Manuscript Publication Support" }
      ]
    },
    {
      step: 2,
      title: "What is your primary research domain?",
      options: [
        { text: "Computer Science & Artificial Intelligence / Machine Learning", domain: "CS / AI" },
        { text: "Engineering & Applied Technology (ECE, EEE, Mechanical, Civil)", domain: "Engineering" },
        { text: "Data Science, Analytics & Big Data", domain: "Data Science" },
        { text: "Management, Economics & Business Research", domain: "Management" },
        { text: "Healthcare, Medical Informatics & Clinical Research", domain: "Healthcare" }
      ]
    },
    {
      step: 3,
      title: "What is your immediate support requirement?",
      options: [
        { text: "Full end-to-end PhD guidance from problem formulation to defense" },
        { text: "Data cleaning, statistical testing, and algorithm coding" },
        { text: "Journal manuscript preparation for SCI / Scopus submission" },
        { text: "Thesis chapter structuring and language editing" },
        { text: "Addressing supervisor or peer reviewer feedback" }
      ]
    }
  ];

  function renderQuestion(stepIdx) {
    const q = questions[stepIdx - 1];
    $('#quizStepDisplay').text(`Question ${q.step} of ${totalSteps}`);
    const pct = Math.round((q.step / totalSteps) * 100);
    $('#quizPctDisplay').text(`${pct}% Complete`);
    $('#quizProgressBar').css('width', `${pct}%`);

    $('#quizQuestionTitle').text(q.title);
    const $optionsList = $('#quizOptionsList');
    $optionsList.empty();

    q.options.forEach((opt, idx) => {
      const $optBtn = $(`
        <div class="quiz-option" data-idx="${idx}" data-meta="${opt.service || opt.domain || opt.text}">
          <span>${opt.text}</span>
          <i class="fa-regular fa-circle"></i>
        </div>
      `);
      $optionsList.append($optBtn);
    });
  }

  // Handle quiz selection
  $('#quizOptionsList').on('click', '.quiz-option', function () {
    $(this).addClass('selected').siblings().removeClass('selected');
    $(this).find('i').removeClass('fa-circle').addClass('fa-circle-check');
    
    const selectedMeta = $(this).attr('data-meta');
    userAnswers[`step_${currentStep}`] = selectedMeta;

    setTimeout(() => {
      if (currentStep < totalSteps) {
        currentStep++;
        renderQuestion(currentStep);
      } else {
        showQuizResult();
      }
    }, 300);
  });

  function showQuizResult() {
    $('#quizQuestionBox').hide();
    const recommended = userAnswers['step_1'] || "Customized Academic Research Support";
    $('#recommendedServiceTitle').text(recommended);
    $('#recommendedServiceDesc').text(
      `Based on your current stage and domain (${userAnswers['step_2'] || 'Interdisciplinary'}), our Subject Matter Experts can help you structure your milestones with guaranteed academic rigor.`
    );
    $('#quizResultBox').fadeIn(350);
  }

  $('#restartQuizBtn').on('click', function () {
    currentStep = 1;
    $('#quizResultBox').hide();
    $('#quizQuestionBox').fadeIn(300);
    renderQuestion(1);
  });

  // Initial render of question 1
  renderQuestion(1);

  // 2. Animated Counter for Statistics
  let countersAnimated = false;
  $(window).on('scroll', function () {
    const $statsSection = $('#impactStats');
    if (!$statsSection.length || countersAnimated) return;

    const topPos = $statsSection.offset().top - window.innerHeight + 100;
    if ($(window).scrollTop() > topPos) {
      countersAnimated = true;
      $('.stat-number').each(function () {
        const $this = $(this);
        const countTo = parseInt($this.attr('data-count'), 10);
        const suffix = $this.attr('data-suffix') || '';

        $({ countNum: 0 }).animate({ countNum: countTo }, {
          duration: 1800,
          easing: 'swing',
          step: function () {
            $this.text(Math.floor(this.countNum) + suffix);
          },
          complete: function () {
            $this.text(this.countNum + suffix);
          }
        });
      });
    }
  });

  // 3. Newsletter Submission Handling
  $('#newsletterForm').on('submit', function (e) {
    e.preventDefault();
    const email = $(this).find('input[type="email"]').val().trim();
    if (email) {
      $(this).html(`
        <div style="background: rgba(16, 185, 129, 0.15); color: #047857; padding: 14px; border-radius: 8px; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 8px;">
          <i class="fa-solid fa-circle-check"></i>
          Thank you! You have been subscribed for academic insights & PhD updates.
        </div>
      `);
    }
  });
});
