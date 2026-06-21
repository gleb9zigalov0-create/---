// ============================
// visa.js — Оформление гражданства МГЕ-СР
// ============================

// Состояние гражданства (глобальное, используется и в profile.js)
window.citizenship = window.citizenship || {
    isCitizen: false,
    nickname: '',
    class: '',
    hours: 0,
    status: 'Гость'
};

// Ждём загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    const visaForm = document.getElementById('visaForm');
    const visaResult = document.getElementById('visaResult');
    const vNick = document.getElementById('vNick');
    const vClass = document.getElementById('vClass');
    const vHours = document.getElementById('vHours');
    const vPassword = document.getElementById('vPassword');

    if (!visaForm) return; // Если формы нет — выходим

    // Обработка отправки формы
    visaForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Собираем данные
        const nickname = vNick.value.trim();
        const playerClass = vClass.value;
        const hours = parseInt(vHours.value.trim());
        const password = vPassword.value.trim();

        // === ВАЛИДАЦИЯ ===
        if (!nickname) {
            alert('❌ Введи свой ник в TF2, браток!');
            return;
        }

        if (!hours || hours < 10) {
            alert('⚠️ Надо хотя бы 10 часов в MGE, чтобы стать гражданином!');
            return;
        }

        if (password.toLowerCase() !== 'паровозик') {
            alert('❌ Неправильный пароль! Напиши «паровозик»');
            return;
        }

        // === ВСЁ ОК — ПРИНИМАЕМ ГРАЖДАНСТВО ===
        // Записываем данные в глобальное состояние
        window.citizenship.isCitizen = true;
        window.citizenship.nickname = nickname;
        window.citizenship.class = playerClass;
        window.citizenship.hours = hours;
        window.citizenship.status = 'Гражданин МГЕ-СР';

        // Показываем результат
        visaResult.style.display = 'block';
        visaForm.style.display = 'none';

        // Обновляем везде, где отображается статус
        updateAllStatuses();

        // Разблокируем арену (если есть)
        const arenaBtn = document.getElementById('arenaBtn');
        const arenaMsg = document.getElementById('arenaMsg');
        if (arenaBtn) {
            arenaBtn.disabled = false;
            arenaBtn.textContent = '⚔️ ВЫЙТИ НА АРЕНУ';
            arenaBtn.style.background = '#cc0000';
            arenaBtn.style.color = '#ffffff';
            arenaBtn.style.cursor = 'pointer';
        }
        if (arenaMsg) {
            arenaMsg.textContent = '✅ Гражданин, арена открыта! Покажи, на что способен.';
            arenaMsg.style.color = '#2ecc71';
        }

        // Обновляем профиль (если функция существует)
        if (typeof updateProfile === 'function') {
            updateProfile();
        }

        // Поздравление
        console.log('🎉 Добро пожаловать в МГЕ-СР, ' + nickname + '!');
    });

    // === ДОПОЛНИТЕЛЬНО: кнопка на главной «Получить гражданство» ===
    const goToVisaBtn = document.getElementById('goToVisaBtn');
    if (goToVisaBtn) {
        goToVisaBtn.addEventListener('click', function() {
            // Переключаем вкладку на визу
            const visaTab = document.querySelector('[data-tab="visa"]');
            if (visaTab) {
                visaTab.click();
            }
        });
    }
});

// ============================
// Обновление статусов на всех страницах
// ============================
function updateAllStatuses() {
    const statusText = document.getElementById('statusText');
    const homeStatus = document.getElementById('homeStatus');
    const userNameDisplay = document.getElementById('userNameDisplay');

    if (window.citizenship.isCitizen) {
        if (statusText) statusText.textContent = 'Гражданин';
        if (homeStatus) homeStatus.textContent = 'Гражданин МГЕ-СР';
        if (userNameDisplay) userNameDisplay.textContent = window.citizenship.nickname;
    } else {
        if (statusText) statusText.textContent = 'Гость';
        if (homeStatus) homeStatus.textContent = 'Гость';
        if (userNameDisplay) userNameDisplay.textContent = 'Не авторизован';
    }
}

// Вызываем при загрузке, чтобы подхватить уже существующий статус
document.addEventListener('DOMContentLoaded', function() {
    updateAllStatuses();
});
