import '../css/base.css';
import '../css/layout.css';
import '../css/components.css';

import { initReveal } from './modules/Reveal';
import { ModalManager } from './modules/Modal';
import { loadComponent } from './modules/ComponentLoader';

document.addEventListener('DOMContentLoaded', async () => {
    // Shared UI Components (Header, Footer, Modals) 비동기 로드
    const modalContainer = document.createElement('div');
    modalContainer.id = 'modal-container';
    modalContainer.style.display = 'none';
    document.body.appendChild(modalContainer);

    await Promise.all([
        loadComponent('.site-header', '/partials/header.html'),
        loadComponent('footer', '/partials/footer.html'),
        loadComponent('#modal-container', '/partials/modals.html')
    ]);

    // 스크롤 등장 애니메이션 초기화
    initReveal();

    // 모달 시스템 초기화
    new ModalManager();
});
