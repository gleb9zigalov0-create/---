// ============================
// main.js — Главная логика МГЕ-СР
// ============================

// ============================
// 1. ИНИЦИАЛИЗАЦИЯ
// ============================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚩 Добро пожаловать в МГЕ-СР!');
    console.log('🇲🇬 Всё для фрага, всё ради фрага!');

    // Проверяем статус гражданства
    if (window.citizenship && window.citizenship.isCitizen) {
        console.log('✅ Гражданин: ' + window.citizenship.nickname);
        // Обновляем профиль (если функция доступна)
        if (typeof updateProfile === 'function') {
            updateProfile();
        }
        // Обновляем статусы
        if (typeof updateAllStatuses === 'function') {
            updateAllStatuses();
        }
    } else {
        console.log('👤 Гость. Оформи гражданство, браток!');
    }

    // ============================
    // 2. АРЕНА
    // ============================
    const arenaBtn = document.getElementById('arenaBtn');
    if (arenaBtn) {
        arenaBtn.addEventListener('click', function() {
            if (window.citizenship && window.citizenship.isCitizen) {
                // Если гражданин
                const hours = window.citizenship.hours || 0;
                const nickname = window.citizenship.nickname || 'браток';

                // Генерация рандомного результата (для мема)
                const frags = Math.floor(Math.random() * 20) + 10;
                const deaths = Math.floor(Math.random() * 10) + 5;
                const result = frags > deaths ? 'ПОБЕДА' : 'ПОРАЖЕНИЕ';
                const emoji = frags > deaths ? '🏆' : '💀';

                alert(
                    `⚔️ ДУЭЛЬ НА АРЕНЕ!\n\n` +
                    `${emoji} ${nickname} vs Случайный браток\n` +
                    `📊 Счёт: ${frags} : ${deaths}\n` +
                    `🎯 Результат: ${result}\n\n` +
                    `${frags > deaths ? '🔥 Ты красавчик! Паровозик гордится.' : '😤 Проиграл? Ливни, браток. Паровозик ждёт.'}`
                );

                // Добавляем фраг в статистику (просто для прикола)
                const fragsCount = document.getElementById('fragsCount');
                if (fragsCount) {
                    const current = parseInt(fragsCount.textContent.replace(/\s/g, ''));
                    if (!isNaN(current)) {
                        fragsCount.textContent = (current + frags).toLocaleString();
                    }
                }

            } else {
                alert('🔒 Доступ только для граждан МГЕ-СР!\nПолучи гражданство во вкладке "🛂 Получить гражданство"');
            }
        });
    }

    // ============================
    // 3. ОБРАЩЕНИЕ К ГЕНСЕКУ
    // ============================
    const appealForm = document.getElementById('appealForm');
    const appealResult = document.getElementById('appealResult');

    if (appealForm) {
        appealForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const subject = document.getElementById('appealSubject');
            const text = document.getElementById('appealText');

            if (!subject.value.trim() || !text.value.trim()) {
                alert('❌ Заполни все поля, браток!');
                return;
            }

            // Проверка на мемные ключевые слова
            const msg = text.value.toLowerCase();
            if (msg.includes('фурри') || msg.includes('фембой')) {
                alert('🚫 Генсек не принимает обращения от фурри и фембоев! Ты мужик или нет?');
                return;
            }

            if (msg.includes('паровозик')) {
                alert('🚂 Генсек одобряет твою преданность паровозику!');
            }

            // Отправка (имитация)
            appealResult.style.display = 'block';
            appealForm.querySelector('button').disabled = true;
            appealForm.querySelector('button').textContent = '📨 ОТПРАВЛЕНО';

            setTimeout(() => {
                appealResult.innerHTML = `
                    ✅ <strong>ОБРАЩЕНИЕ ПРИНЯТО!</strong><br />
                    Генсек прочитал: «${subject.value}»<br />
                    <span style="font-size:0.9rem; color:#3a6a3a;">Ответ: "Иди тренируй MGE, браток!"</span>
                `;
            }, 1500);
        });
    }

    // ============================
    // 4. МЕМНЫЕ ПАСХАЛКИ
    // ============================

    // 4.1 Клик по заголовку МГЕ-СР
    const title = document.querySelector('.header-title');
    if (title) {
        title.addEventListener('dblclick', function() {
            alert('🇲🇬 МГЕ-СР — страна настоящих братков!\nВсё для фрага, всё ради фрага!');
        });
    }

    // 4.2 Клик по флагу
    const flag = document.querySelector('.header-logo');
    if (flag) {
        flag.addEventListener('dblclick', function() {
            const messages = [
                '🚩 Флаг МГЕ-СР — символ мужества и фрагов!',
                '🔥 Тысячи братков сражаются под этим флагом!',
                '⚔️ Паровозик одобряет твой патриотизм!',
                '🇲🇬 МГЕ-СР — великая держава!'
            ];
            const randomMsg = messages[Math.floor(Math.random() * messages.length)];
            alert(randomMsg);
        });
    }

    // 4.3 Консольное приветствие (для разработчиков)
    console.log('%c🇲🇬 МГЕ-СР — Всё для фрага, всё ради фрага!', 'font-size:20px; font-weight:bold; color:#d4af37;');
    console.log('%c🚀 Добро пожаловать, браток!', 'font-size:14px; color:#cc0000;');

    // ============================
    // 5. СТАТИСТИКА (анимированная)
    // ============================
    const citizensCount = document.getElementById('citizensCount');
    if (citizensCount) {
        // Прибавляем случайное число каждые 30 секунд (симуляция роста)
        setInterval(() => {
            const current = parseInt(citizensCount.textContent.replace(/\s/g, ''));
            if (!isNaN(current)) {
                const add = Math.floor(Math.random() * 5) + 1;
                citizensCount.textContent = (current + add).toLocaleString();
            }
        }, 30000);
    }

    // ============================
    // 6. КНОПКА "ВЫЙТИ ИЗ АККАУНТА" (дополнительно)
    // ============================
    // Можно добавить в шапку, если нужно
    console.log('✅ МГЕ-СР загружен!');
});
