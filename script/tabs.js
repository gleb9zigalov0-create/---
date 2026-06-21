// ============================
// tabs.js — Переключение вкладок
// ============================

document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    // Функция переключения
    function switchTab(tabId) {
        // Скрываем все содержимое
        contents.forEach(content => {
            content.classList.remove('active');
        });

        // Убираем активный класс у всех кнопок
        tabs.forEach(btn => {
            btn.classList.remove('active');
        });

        // Показываем нужный контент
        const targetContent = document.getElementById('tab-' + tabId);
        if (targetContent) {
            targetContent.classList.add('active');
        }

        // Активируем кнопку
        const targetBtn = document.querySelector('[data-tab="' + tabId + '"]');
        if (targetBtn) {
            targetBtn.classList.add('active');
        }

        // Сохраняем вкладку в localStorage, чтобы при обновлении страницы она оставалась
        try {
            localStorage.setItem('mge_tab', tabId);
        } catch (e) {
            // Игнорируем ошибки localStorage
        }
    }

    // Обработчики кликов по кнопкам
    tabs.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            if (tabId) {
                switchTab(tabId);
            }
        });
    });

    // === Восстановление последней открытой вкладки ===
    let savedTab = null;
    try {
        savedTab = localStorage.getItem('mge_tab');
    } catch (e) {
        // Игнорируем
    }

    // Если сохраненная вкладка существует и это не 'home' (чтобы не переключать с home, если она была)
    if (savedTab && savedTab !== 'home') {
        // Проверяем, есть ли такая вкладка
        const btnExists = document.querySelector('[data-tab="' + savedTab + '"]');
        if (btnExists) {
            switchTab(savedTab);
        }
    }

    // === ДОПОЛНИТЕЛЬНО: переключение по ссылкам (для совместимости) ===
    // Если в URL есть #tab-название
    if (window.location.hash) {
        const hash = window.location.hash.replace('#', '');
        if (hash.startsWith('tab-')) {
            const tabId = hash.replace('tab-', '');
            const btnExists = document.querySelector('[data-tab="' + tabId + '"]');
            if (btnExists) {
                switchTab(tabId);
            }
        }
    }

    // === ДОПОЛНИТЕЛЬНО: обработка нажатия на ссылки с data-tab-link ===
    document.querySelectorAll('[data-tab-link]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab-link');
            if (tabId) {
                switchTab(tabId);
            }
        });
    });
});
