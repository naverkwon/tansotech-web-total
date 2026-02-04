const initReveal = () => {
  const revealTargets = document.querySelectorAll(
    "section > *:not(.no-reveal), .card, .timeline-item, .data-table, .milestone-card"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  revealTargets.forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
};

document.addEventListener('DOMContentLoaded', initReveal);
// Fallback: If elements are still hidden after 2 seconds, show them
setTimeout(() => {
  document.querySelectorAll('.reveal:not(.in-view)').forEach(el => el.classList.add('in-view'));
}, 2000);

// Modal Logic
const modal = document.createElement('div');
modal.className = 'modal-overlay';
modal.innerHTML = `
  <div class="modal-content">
    <button class="modal-close">&times;</button>
    <div class="modal-body"></div>
  </div>
`;
document.body.appendChild(modal);

// Lightbox Logic (Image Zoom)
const lightbox = document.createElement('div');
lightbox.className = 'lightbox-overlay';
lightbox.innerHTML = `<img src="" alt="Enlarged" class="lightbox-img">`;
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector('.lightbox-img');
const modalBody = modal.querySelector('.modal-body');
const modalClose = modal.querySelector('.modal-close');

const openLightbox = (src) => {
  lightboxImg.src = src;
  lightbox.classList.add('active');
};

const closeLightbox = () => {
  lightbox.classList.remove('active');
};

lightbox.addEventListener('click', closeLightbox);

document.querySelectorAll('[data-detail-id]').forEach(trigger => {
  trigger.style.cursor = 'pointer';
  trigger.addEventListener('click', () => {
    const detailId = trigger.getAttribute('data-detail-id');
    const detailContent = document.getElementById(detailId);
    if (detailContent) {
      modalBody.innerHTML = detailContent.innerHTML;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Attach zoom logic to images inside modal
      modalBody.querySelectorAll('img').forEach(img => {
        img.classList.add('zoomable');
        img.addEventListener('click', (e) => {
          e.stopPropagation();
          openLightbox(img.src);
        });
      });
    }
  });
});

const closeModal = () => {
  modal.classList.remove('active');
  document.body.style.overflow = '';
};

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (lightbox.classList.contains('active')) closeLightbox();
    else closeModal();
  }
});
