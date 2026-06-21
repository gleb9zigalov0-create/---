// ============================
// profile.js — Отображение профиля
// ============================

document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, есть ли уже гражданин
    if (window.citizenship && window.citizenship.isCitizen) {
        updateProfile();
    }

    // Подписываемся на изменение гражданства (если visa.js обновит)
    // Можно вызывать вручную после получения визы
});

// ============================
// Функция обновления профиля
// ============================
function updateProfile() {
    const profileInfo = document.getElementById('profileInfo');
    const profileStats = document.getElementById('profileStats');
    const pNick = document.getElementById('pNick');
    const pClass = document.getElementById('pClass');
    const pHours = document.getElementById('pHours');
    const pStatus = document.getElementById('pStatus');

    // Если профиль ещё не загружен — выходим
    if (!profileInfo) return;

    // Если гражданин есть
    if (window.citizenship && window.citizenship.isCitizen) {
        const data = window.citizenship;

        // Скрываем заглушку, показываем статистику
        profileInfo.innerHTML = '<p style="color:#2ecc71; font-weight:600;">✅ Гражданство подтверждено!</p>';
        profileStats.style.display = 'grid';

        // Заполняем данные
        if (pNick) {
            const valueDiv = pNick.querySelector('.value');
            if (valueDiv) valueDiv.textContent = data.nickname || '—';
        }

        if (pClass) {
            const valueDiv = pClass.querySelector('.value');
            if (valueDiv) valueDiv.textContent = data.class || '—';
        }

        if (pHours) {
            const valueDiv = pHours.querySelector('.value');
            if (valueDiv) valueDiv.textContent = data.hours + ' ч.';
        }

        if (pStatus) {
            const valueDiv = pStatus.querySelector('.value');
            if (valueDiv) {
                valueDiv.textContent = data.status || 'Гражданин';
                valueDiv.style.color = '#d4af37';
            }
        }

        // Обновляем статусы везде
        updateAllStatuses();

        // Разблокируем арену
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

    } else {
        // Если гражданина нет
        profileInfo.innerHTML = `
            <p style="color:#7a8a9a;">Гражданство не оформлено.</p>
            <p style="color:#7a8a9a;">Перейди во вкладку «Получить гражданство».</p>
        `;
        profileStats.style.display = 'none';
    }
}

// ============================
// Функция для добавления достижений (дополнительно)
// ============================
function addAchievement(title, description) {
    const achievementsDiv = document.getElementById('achievements');
    if (!achievementsDiv) return;

    const card = document.createElement('div');
    card.className = 'card';
    card.style.marginTop = '10px';
    card.innerHTML = `
        <div class="card-title"><span class="icon">🏅</span> ${title}</div>
        <p style="color:#5a6a7a;">${description}</p>
    `;
    achievementsDiv.appendChild(card);
}

// ============================
// Автоматический вызов при загрузке
// ============================
document.addEventListener('DOMContentLoaded', function() {
    // Если профиль уже обновлён, ничего не делаем
    // Но если citizen обновился позже — можно вызвать повторно
    // Например, после получения визы в visa.js вызывается updateProfile()
});
