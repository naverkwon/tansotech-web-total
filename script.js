export const initReveal = () => {
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

    // Fallback
    setTimeout(() => {
        document.querySelectorAll('.reveal:not(.in-view)').forEach(el => el.classList.add('in-view'));
    }, 2000);
};
export class ModalManager {
    constructor() {
        this.modal = null;
        this.lightbox = null;
        this.init();
    }

    init() {
        this.createModal();
        this.createLightbox();
        this.attachListeners();
    }

    createModal() {
        this.modal = document.createElement('div');
        this.modal.className = 'modal-overlay';
        this.modal.innerHTML = `
      <div class="modal-content">
        <button class="modal-close">&times;</button>
        <div class="modal-body"></div>
      </div>
    `;
        document.body.appendChild(this.modal);
    }

    createLightbox() {
        this.lightbox = document.createElement('div');
        this.lightbox.className = 'lightbox-overlay';
        this.lightbox.innerHTML = `<img src="" alt="Enlarged" class="lightbox-img">`;
        document.body.appendChild(this.lightbox);
    }

    attachListeners() {
        const modalClose = this.modal.querySelector('.modal-close');
        const lightbox = this.lightbox;

        modalClose.addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });

        lightbox.addEventListener('click', () => this.closeLightbox());

        document.querySelectorAll('[data-detail-id]').forEach(trigger => {
            trigger.style.cursor = 'pointer';
            trigger.addEventListener('click', () => {
                const detailId = trigger.getAttribute('data-detail-id');
                this.openModal(detailId);
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.lightbox.classList.contains('active')) this.closeLightbox();
                else this.closeModal();
            }
        });
    }

    openModal(detailId) {
        const detailContent = document.getElementById(detailId);
        const modalBody = this.modal.querySelector('.modal-body');
        if (detailContent) {
            modalBody.innerHTML = detailContent.innerHTML;
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Attach zoom logic to images inside modal
            modalBody.querySelectorAll('img').forEach(img => {
                img.classList.add('zoomable');
                img.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.openLightbox(img.src);
                });
            });
        }
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    openLightbox(src) {
        const lightboxImg = this.lightbox.querySelector('.lightbox-img');
        lightboxImg.src = src;
        this.lightbox.classList.add('active');
    }

    closeLightbox() {
        this.lightbox.classList.remove('active');
    }
}
