document.addEventListener('DOMContentLoaded', () => {
    const solarInput = document.getElementById('solarInput');
    const resultValue = document.getElementById('resultValue');
    const powerGen = document.getElementById('powerGen');
    const storageCap = document.getElementById('storageCap');

    const mainTitle = document.getElementById('mainTitle');
    const inputLabel = document.getElementById('inputLabel');
    const resultLabel = document.getElementById('resultLabel');
    const powerLabel = document.getElementById('powerLabel');
    const storageLabel = document.getElementById('storageLabel');
    const ratioText = document.getElementById('ratioText');
    const supportText = document.getElementById('supportText');

    const langSwitcher = document.getElementById('langSwitcher');
    const langToggle = document.getElementById('langToggle');
    const langMenu = document.getElementById('langMenu');
    const langOptions = Array.from(document.querySelectorAll('.lang-option'));

    const languageNames = {
        ru: 'Русский',
        en: 'English',
        uk: 'Українська',
        kk: 'Қазақша',
        cs: 'Čeština',
        nl: 'Nederlands',
        sv: 'Svenska',
        de: 'Deutsch',
        pl: 'Polski',
        fr: 'Français',
        zh: '中文',
        ja: '日本語'
    };

    const RATIO = 0.84;
    const SOLAR_POWER = 60;
    const ACCUMULATOR_CAPACITY = 5;

    let currentLang = localStorage.getItem('app-lang') || 'ru';

    function getLocaleByLanguage(lang) {
        const localeMap = {
            ru: 'ru-RU',
            en: 'en-US',
            uk: 'uk-UA',
            kk: 'kk-KZ',
            cs: 'cs-CZ',
            nl: 'nl-NL',
            sv: 'sv-SE',
            de: 'de-DE',
            pl: 'pl-PL',
            fr: 'fr-FR',
            zh: 'zh-CN',
            ja: 'ja-JP'
        };

        return localeMap[lang] || 'en-US';
    }

    function getTranslation(lang) {
        const translations = window.APP_TRANSLATIONS || {};
        return translations[lang] || translations.ru || null;
    }

    function applyLanguage(lang) {
        const translation = getTranslation(lang);
        if (!translation) {
            return;
        }

        currentLang = lang;
        document.documentElement.lang = lang;
        document.title = translation.pageTitle;

        mainTitle.innerHTML = translation.mainTitle.replace('\n', '<br>');
        inputLabel.textContent = translation.inputLabel;
        solarInput.placeholder = translation.inputPlaceholder;
        resultLabel.textContent = translation.resultLabel;
        powerLabel.textContent = translation.powerLabel;
        storageLabel.textContent = translation.storageLabel;
        ratioText.textContent = translation.ratioText;
        supportText.textContent = `${translation.supportText} `;

        langToggle.textContent = languageNames[lang] || languageNames.ru;
        langOptions.forEach((option) => {
            option.classList.toggle('is-active', option.dataset.lang === lang);
        });
        localStorage.setItem('app-lang', lang);
        calculate();
    }

    function calculate() {
        const translation = getTranslation(currentLang) || getTranslation('ru');
        const units = translation?.units || { mw: 'MW', mj: 'MJ' };
        const locale = getLocaleByLanguage(currentLang);

        const panels = parseInt(solarInput.value, 10) || 0;
        const accumulators = Math.ceil(panels * RATIO);
        const totalPower = (panels * SOLAR_POWER) / 1000;
        const totalStorage = accumulators * ACCUMULATOR_CAPACITY;

        resultValue.textContent = accumulators.toLocaleString(locale);
        powerGen.textContent = `${totalPower.toFixed(2)} ${units.mw}`;
        storageCap.textContent = `${totalStorage.toLocaleString(locale)} ${units.mj}`;
    }

    function toggleLanguageMenu() {
        const isOpen = !langMenu.hasAttribute('hidden');

        if (isOpen) {
            langMenu.setAttribute('hidden', '');
            langToggle.setAttribute('aria-expanded', 'false');
            return;
        }

        langMenu.removeAttribute('hidden');
        langToggle.setAttribute('aria-expanded', 'true');
    }

    function closeLanguageMenu() {
        langMenu.setAttribute('hidden', '');
        langToggle.setAttribute('aria-expanded', 'false');
    }

    langToggle.addEventListener('click', toggleLanguageMenu);

    document.addEventListener('click', (event) => {
        if (!langSwitcher.contains(event.target) && !langMenu.hasAttribute('hidden')) {
            closeLanguageMenu();
        }
    });

    langOptions.forEach((option) => {
        option.addEventListener('click', () => {
            applyLanguage(option.dataset.lang);
            closeLanguageMenu();
        });
    });

    solarInput.addEventListener('input', calculate);
    applyLanguage(getTranslation(currentLang) ? currentLang : 'ru');
});
