const revealTargets = document.querySelectorAll(
  "section > *, .card, .timeline-item, .data-table"
);

revealTargets.forEach((el) => el.classList.add("reveal"));

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
    threshold: 0,
    rootMargin: '0px'
  }
);

revealTargets.forEach((el) => observer.observe(el));

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

const modalBody = modal.querySelector('.modal-body');
const modalClose = modal.querySelector('.modal-close');

document.querySelectorAll('.card[data-detail-id]').forEach(card => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', () => {
    const detailId = card.getAttribute('data-detail-id');
    const detailContent = document.getElementById(detailId);
    if (detailContent) {
      modalBody.innerHTML = detailContent.innerHTML;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
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
  if (e.key === 'Escape') closeModal();
});
