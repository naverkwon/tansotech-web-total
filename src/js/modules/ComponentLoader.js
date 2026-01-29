export const loadComponent = async (selector, url) => {
    const target = document.querySelector(selector);
    if (!target) return;

    try {
        const response = await fetch(url);
        const html = await response.text();
        target.innerHTML = html;

        // Highlight active link
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        target.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath) {
                link.classList.add('active');
            }
        });
    } catch (error) {
        console.error(`Failed to load component: ${url}`, error);
    }
};
