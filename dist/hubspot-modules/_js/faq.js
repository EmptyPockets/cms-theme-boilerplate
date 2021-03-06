(function () {

  const faqs = document.querySelectorAll('.faq .full-answer');
  const faqWrapper = document.getElementById('faqWrapper');

  if (faqs.length && faqWrapper) {
    const init = () => {
      /* Close all but the 'always-open' faqs */
      for (const faq of faqs) {
        if (!faq.classList.contains('starts-open')) {
          faq.classList.remove('open');
        }

      }
    }

    const toggleQuestion = (e) => {
      const faq = e.target.closest('.faq');
      if (faq) {
        faq.classList.toggle('open');
        const question = faq.querySelector('.full-answer');
        const height = question.scrollHeight;
        question.classList.toggle('open');
        if (question.classList.contains('open')) {
          question.style.maxHeight = height + 'px';
        } else {
          question.style.maxHeight = 0 + 'px';
        }
      }
    }

    faqWrapper.addEventListener('click', toggleQuestion, false);
    init();
  }
})();
