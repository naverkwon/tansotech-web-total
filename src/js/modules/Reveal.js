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
