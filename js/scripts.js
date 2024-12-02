/*- search-panel -*/
document.addEventListener('DOMContentLoaded', function() {
    const searchIcon = document.querySelector('.search-panel__icon');
    const searchDropdown = document.querySelector('.search-panel__dropdown');
    const searchOverlay = document.querySelector('.search-panel__overlay');  // Находим элемент overlay

    // Функция для переключения классов
    function togglePanel() {
        searchIcon.classList.toggle('open');
        searchDropdown.classList.toggle('show');
    }

    // Функция для удаления классов
    function closePanel() {
        searchIcon.classList.remove('open');
        searchDropdown.classList.remove('show');
    }

    // Обработчик клика на search-panel__icon
    searchIcon.addEventListener('click', function(event) {
        event.stopPropagation();  // Останавливаем всплытие события, чтобы не вызвать закрытие при клике на саму панель
        togglePanel();
    });

    // Обработчик клика на свободную область (document)
    document.addEventListener('click', function(event) {
        // Если клик не по панели, закрываем панель
        if (!searchIcon.contains(event.target) && !searchDropdown.contains(event.target)) {
            closePanel();
        }
    });

    // Обработчик клика на search-panel__overlay
    searchOverlay.addEventListener('click', function() {
        closePanel();  // Закрываем панель при клике на overlay
    });
});

/*- language -*/
document.addEventListener('DOMContentLoaded', function() {
    const languageText = document.querySelector('.language__text');
    const languageDropdown = document.querySelector('.language__dropdown');

    // Функция для переключения классов
    function togglePanel() {
        languageText.classList.toggle('open');
        languageDropdown.classList.toggle('show');
    }

    // Функция для удаления классов
    function closePanel() {
        languageText.classList.remove('open');
        languageDropdown.classList.remove('show');
    }

    // Обработчик клика на user-panel__col
    languageText.addEventListener('click', function(event) {
        event.stopPropagation();  // Останавливаем всплытие события, чтобы не вызвать закрытие при клике на саму панель
        togglePanel();
    });

    // Обработчик клика на свободную область (document)
    document.addEventListener('click', function(event) {
        // Если клик не по панели, закрываем панель
        if (!languageText.contains(event.target) && !languageDropdown.contains(event.target)) {
            closePanel();
        }
    });
});

/*- tabs -*/
document.querySelectorAll('.tabs__nav li').forEach(button => {
  button.addEventListener('click', () => {
    const tabNumber = button.getAttribute('data-tab');

    // Проверяем наличие атрибута data-tab
    if (!tabNumber) return;

    // Убираем активный класс у всех кнопок в обеих навигациях
    document.querySelectorAll('.tabs__nav li').forEach(btn => btn.classList.remove('active'));

    // Убираем активный класс у всех контентов
    document.querySelectorAll('.tabs__item').forEach(content => {
      content.classList.remove('active');
    });

    // Добавляем активный класс для выбранных элементов в обеих навигациях
    document.querySelectorAll(`.tabs__nav li[data-tab="${tabNumber}"]`).forEach(btn => btn.classList.add('active'));

    // Активируем соответствующий контент
    document.getElementById(`tab-${tabNumber}`).classList.add('active');
  });
});

/*- products-slider -*/

// Функция для получения текущего размера rem
function getRemSize() {
    return parseFloat(getComputedStyle(document.documentElement).fontSize);
}

let swiperInstances = [];

function initializeSwipers() {
    // Если уже есть экземпляры Swiper, уничтожаем их перед созданием новых
    if (swiperInstances.length > 0) {
        swiperInstances.forEach(instance => instance.destroy(true, true));
        swiperInstances = [];
    }

    const remSize = getRemSize();

    const swiperConfigs = [
        { container: '#products-slider-1', nextButton: '#products-slider-1 .swiper-button-next', prevButton: '#products-slider-1 .swiper-button-prev', sliderPagination: '#products-slider-1 .swiper-pagination' },
        { container: '#products-slider-2', nextButton: '#products-slider-2 .swiper-button-next', prevButton: '#products-slider-2 .swiper-button-prev', sliderPagination: '#products-slider-2 .swiper-pagination' },
        { container: '#products-slider-3', nextButton: '#products-slider-3 .swiper-button-next', prevButton: '#products-slider-3 .swiper-button-prev', sliderPagination: '#products-slider-3 .swiper-pagination' },
        { container: '#company-slider', nextButton: '#company-slider .swiper-button-next', prevButton: '#company-slider .swiper-button-prev', sliderPagination: '#company-slider .swiper-pagination' },
    ];

    swiperConfigs.forEach(config => {
        const swiperInstance = new Swiper(config.container, {
            autoplay: false,
            autoHeight: false,
            loop: false,
            slidesPerView: 5,
            slidesPerGroup: 5,
            spaceBetween: false,
            breakpoints: {
            0: {
                slidesPerView: 2,
                spaceBetween: false,
                slidesPerGroup: 2,
                },
            460: {
                slidesPerView: 2,
                spaceBetween: false,
                slidesPerGroup: 2,
                },
            768: {
                slidesPerView: 5,
                spaceBetween: false,
                },
            1079: {
                slidesPerView: 5,
                spaceBetween: false,
                },
            },
        pagination: {
            el: config.sliderPagination,
            clickable: true,
            },
        navigation: {
            nextEl: config.nextButton,
            prevEl: config.prevButton,
            },
        });
        swiperInstances.push(swiperInstance);
    });
}

// Дебаунс для оптимизации вызова при изменении размера окна
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(initializeSwipers, 300);
});

// Инициализируем слайдеры при загрузке
initializeSwipers();

/*- events-slider -*/
var swiper = new Swiper(".events-slider", {
    autoHeight: true,
	slidesPerView: 1,
	spaceBetween: 30,
	pagination: {
		el: ".events-pagination",
		clickable: true,
	},
});

/*- to-top -*/
window.addEventListener('scroll', () => {
    const toTopButton = document.querySelector('.to-top');
    if (window.scrollY > 100) {
        toTopButton.classList.add('show');
    } else {
        toTopButton.classList.remove('show');
    }
});

// Обработчик для кнопки "вверх"
document.querySelector('.to-top').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/*- search-result-tabs -*/
document.addEventListener("DOMContentLoaded", function () {
    const navItems = document.querySelectorAll(".search-result-tabs__nav ul li");
    const contentItems = document.querySelectorAll(".search-result-tabs__content .search-result-tabs__item");

    function updateDisabledState() {
        contentItems.forEach((item, index) => {
            if (!item.textContent.trim()) {
                item.classList.add("disabled");
                navItems[index].classList.add("disabled");
            } else {
                item.classList.remove("disabled");
                navItems[index].classList.remove("disabled");
            }
        });
    }

    // Обновляем состояние при загрузке страницы
    updateDisabledState();

    navItems.forEach((navItem, index) => {
        navItem.addEventListener("click", function () {
            if (navItem.classList.contains("disabled")) return;

            // Удаление активного класса с текущих активных элементов
            document.querySelectorAll(".search-result-tabs__nav .active, .search-result-tabs__content .active").forEach(el => el.classList.remove("active"));

            // Добавление активного класса к выбранным элементам
            navItem.classList.add("active");
            contentItems[index].classList.add("active");
        });
    });
});

/*- widget-tabs -*/
document.querySelectorAll('.widget-tabs').forEach(widget => {
    const tabs = widget.querySelectorAll('.widget-tabs__nav ul li');
    const contents = widget.querySelectorAll('.widget-tabs__content .widget-tabs__item');

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            // Удаляем класс active со всех табов и контента в этом виджете
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(content => content.classList.remove('active'));

            // Добавляем класс active к текущему табу и соответствующему контенту
            tab.classList.add('active');
            contents[index].classList.add('active');
        });
    });
});

/*- vertical-scroll -*/
var swiper = new Swiper(".vertical-scroll", {
    direction: "vertical",
    slidesPerView: "auto",
    freeMode: true,
    scrollbar: {
        el: ".swiper-scrollbar",
    },
    mousewheel: true,
});

/*- categories-col -*/
document.addEventListener("DOMContentLoaded", function () {
    const categoriesCol = document.querySelector(".categories-col");

    if (!categoriesCol) return;

    const allLink = categoriesCol.querySelector(".categories-col__all-link");
    const hideLink = categoriesCol.querySelector(".categories-col__hide-link");
    const listItems = categoriesCol.querySelectorAll(".categories-col__list li");

    if (listItems.length === 0 || !allLink || !hideLink) return;

    // Функция для определения количества видимых элементов в зависимости от разрешения
    function getItemsToShow() {
        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        return isMobile ? 4 : 9;
    }

    // Функция для обновления отображения списка и ссылок
    function updateListItems(showAll = false) {
        const itemsToShow = getItemsToShow();

        // Обновляем видимость элементов списка
        listItems.forEach((item, index) => {
            if (index >= itemsToShow) {
                item.classList.toggle("hidden", !showAll);
            } else {
                item.classList.remove("hidden");
            }
        });

        // Управляем видимостью ссылок
        if (listItems.length <= itemsToShow) {
            allLink.classList.add("hidden");
            hideLink.classList.remove("open");
            allLink.classList.remove("close");
        } else if (!showAll) {
            allLink.classList.remove("hidden", "close");
            hideLink.classList.remove("open");
        }
    }

    // Клик по "Показать все рубрики"
    allLink.addEventListener("click", function () {
        allLink.classList.add("close");
        hideLink.classList.add("open");

        updateListItems(true); // Показываем все элементы
    });

    // Клик по "Скрыть все рубрики"
    hideLink.addEventListener("click", function () {
        hideLink.classList.remove("open");
        allLink.classList.remove("close");

        updateListItems(false); // Скрываем лишние элементы
    });

    // Слушаем изменение ширины экрана
    window.addEventListener("resize", () => {
        updateListItems(false); // Возвращаем список к изначальному состоянию
    });

    // Изначальное состояние
    updateListItems(false);
});

/*- select -*/
const selects = document.querySelectorAll('.select');
const inputs = document.querySelectorAll('.select-hidden-form input'); // Получаем все input

// Функция для закрытия всех open/show классов
function closeAllSelects(exceptSelect) {
    selects.forEach(select => {
        if (select !== exceptSelect) {
            const selectText = select.querySelector('.select__text');
            const selectDropdown = select.querySelector('.select__dropdown');
            select.classList.remove('open'); // Удаляем класс open у select
            selectText.classList.remove('open');
            selectDropdown.classList.remove('show');
        }
    });
}

// Функция для переноса данных из select__text в input
function syncSelectWithInput() {
    selects.forEach((select, index) => {
        const input = inputs[index]; // Соответствующий input
        const selectText = select.querySelector('.select__text');

        // Перенос текста в input
        if (input && selectText) {
            input.value = selectText.textContent;
        }
    });
}

// Обрабатываем каждый select
selects.forEach(select => {
    const selectText = select.querySelector('.select__text');
    const selectDropdown = select.querySelector('.select__dropdown');
    const listItems = select.querySelectorAll('.select__dropdown li');

    // Функция для переключения классов на .select и .select__dropdown
    selectText.addEventListener('click', (event) => {
        event.stopPropagation(); // Останавливаем всплытие, чтобы клик по select не закрывал его

        // Если меню открыто, закрываем его, если нет — открываем
        const isOpen = select.classList.contains('open');
        closeAllSelects(select); // Закрываем все другие select
        if (!isOpen) {
            select.classList.add('open'); // Добавляем класс open к select
            selectText.classList.add('open');
            selectDropdown.classList.add('show');
        } else {
            select.classList.remove('open'); // Удаляем класс open у select
            selectText.classList.remove('open');
            selectDropdown.classList.remove('show');
        }
    });

    // Функция для обновления текста и класса active на <li>
    listItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.stopPropagation(); // Останавливаем всплытие, чтобы клик по <li> не закрывал select

            // Убираем класс active со всех элементов <li>
            listItems.forEach(li => li.classList.remove('active'));

            // Добавляем класс active к текущему выбранному элементу
            item.classList.add('active');

            // Обновляем текст в .select__text
            selectText.textContent = item.textContent;

            // Перенос данных в input
            syncSelectWithInput();

            // Закрываем выпадающее меню
            select.classList.remove('open'); // Удаляем класс open у select
            selectText.classList.remove('open');
            selectDropdown.classList.remove('show');
        });
    });

    // Закрытие меню при клике на любую область страницы, кроме текущего select
    document.addEventListener('click', (event) => {
        if (!select.contains(event.target)) {
            select.classList.remove('open'); // Удаляем класс open у select
            selectText.classList.remove('open');
            selectDropdown.classList.remove('show');
        }
    });
});

// Инициализируем начальные значения input
syncSelectWithInput();

/*- phone-panel -*/
document.addEventListener("DOMContentLoaded", function() {
    // Функция для инициализации скрытия и маскировки в блоке phone-panel
    function initializePhonePanel(panel) {
        const showLink = panel.querySelector(".phone-panel__show-link");
        const phoneNumbers = panel.querySelectorAll(".phone-panel__number");

        // Скрываем все номера, кроме первого, и маскируем последние 4 цифры
        phoneNumbers.forEach((number, index) => {
            if (index > 0) {
                number.classList.add("hidden");
            }
            // Сохраняем полный номер в data-атрибут
            number.dataset.fullNumber = number.textContent;
            // Маскируем последние 4 цифры на "xx xx"
            number.textContent = number.textContent.slice(0, -5) + "xx xx";
        });

        // Функция для показа полных номеров
        function showPhoneNumbers() {
            phoneNumbers.forEach((number, index) => {
                number.classList.remove("hidden");
                // Восстанавливаем полный номер
                number.textContent = number.dataset.fullNumber;
                // Добавляем запятую, если это не последний номер
                if (index < phoneNumbers.length - 1) {
                    number.innerHTML += ",";
                }
            });
            showLink.classList.add("hidden"); // Скрываем ссылку "Показать номер"
        }

        // Обработчик клика на ссылку "Показать номер"
        showLink.addEventListener("click", showPhoneNumbers);
    }

    // Инициализируем все блоки phone-panel на странице
    document.querySelectorAll(".phone-panel").forEach(initializePhonePanel);
});

/*- info-widget -*/
document.addEventListener("DOMContentLoaded", function () {
    const widget = document.querySelector(".info-widget");

    // Проверяем наличие виджета
    if (!widget) return;

    const paragraphs = widget.querySelectorAll("p");
    const allLink = widget.querySelector(".info-widget__all-link");
    const hideLink = widget.querySelector(".info-widget__hide-link");

    // Проверяем наличие элементов
    if (!allLink || !hideLink || paragraphs.length === 0) return;

    // Скрываем ссылку "Читать все", если параграфов <= 1
    if (paragraphs.length <= 1) {
        allLink.classList.add("hidden");
        return;
    }

    // Изначально отображаем только первый параграф
    paragraphs.forEach((p, index) => {
        if (index > 0) p.classList.add("hidden");
    });

    // Клик по "Читать все"
    allLink.addEventListener("click", function () {
        allLink.classList.add("close");
        hideLink.classList.add("open");

        // Показываем все параграфы
        paragraphs.forEach((p) => p.classList.remove("hidden"));
    });

    // Клик по "Скрыть всё"
    hideLink.addEventListener("click", function () {
        hideLink.classList.remove("open");
        allLink.classList.remove("close");

        // Скрываем все параграфы, кроме первого
        paragraphs.forEach((p, index) => {
            if (index > 0) p.classList.add("hidden");
        });
    });
});

/*- mail-panel -*/
document.addEventListener('DOMContentLoaded', function () {
    const showLink = document.querySelector('.mail-panel__show-link');
    const mailLink = document.querySelector('.mail-panel__link');

    if (showLink && mailLink) {
        showLink.addEventListener('click', function () {
            showLink.classList.add('hidden');
            mailLink.classList.add('show');
        });
    }
});

/*- write-review -*/
document.addEventListener("DOMContentLoaded", function() {
    const writeReviewLink = document.querySelector(".write-review__link");
    const writeReviewDropdown = document.querySelector(".write-review__dropdown");

    if (writeReviewLink && writeReviewDropdown) {
        writeReviewLink.addEventListener("click", function() {
            writeReviewLink.classList.toggle("open");
            writeReviewDropdown.classList.toggle("show");
        });
    }
});

/*- social-panel -*/
document.addEventListener("DOMContentLoaded", () => {
    const icon = document.querySelector(".social-panel__icon");
    const dropdown = document.querySelector(".social-panel__dropdown");

    // Проверяем, что оба элемента существуют на странице
    if (icon && dropdown) {
        // Функция для переключения класса show
        function toggleDropdown(event) {
            event.stopPropagation(); // Останавливаем всплытие события, чтобы клик на иконке не закрывал меню
            dropdown.classList.toggle("show");
        }

        // Функция для закрытия dropdown при клике вне панели
        function closeDropdown(event) {
            if (!dropdown.contains(event.target) && !icon.contains(event.target)) {
                dropdown.classList.remove("show");
            }
        }

        // Добавляем обработчики событий
        icon.addEventListener("click", toggleDropdown);
        document.addEventListener("click", closeDropdown);
    }
});

/*- publications -*/
document.addEventListener("DOMContentLoaded", function () {
    const blocks = [
        document.getElementById("news-list"),
    ];

    const itemsToShow = 5;
    const hiddenClass = "hidden";

    blocks.forEach((block) => {
        if (!block) return;

        const items = block.querySelectorAll(".news-list__item");
        const allLink = block.querySelector(".news-list__all-link");
        const hideLink = block.querySelector(".news-list__hide-link");

        if (!allLink || !hideLink || items.length === 0) return;

        // Функция для обновления текстов ссылок и их видимости
        function updateLinkText() {
            const hiddenItemsCount = block.querySelectorAll(
                `.news-list__item.${hiddenClass}`
            ).length;

            // Обновляем текст ссылок
            allLink.textContent = `Показать еще ${hiddenItemsCount}`;
            hideLink.textContent = `Скрыть еще ${items.length - itemsToShow}`;

            // Управляем видимостью hideLink
            if (hiddenItemsCount > 0) {
                hideLink.classList.remove(hiddenClass); // Показываем hideLink
            } else {
                hideLink.classList.add(hiddenClass); // Скрываем hideLink
            }

            // Управляем видимостью allLink
            if (items.length <= itemsToShow) {
                allLink.classList.add(hiddenClass); // Скрываем allLink, если элементов меньше или равно itemsToShow
            } else {
                allLink.classList.remove(hiddenClass); // Показываем allLink
            }
        }

        // Изначально скрываем элементы кроме первых itemsToShow
        items.forEach((item, index) => {
            if (index >= itemsToShow) item.classList.add(hiddenClass);
        });

        // Инициализируем начальное состояние
        updateLinkText();

        // Обработка клика на "Показать еще"
        allLink.addEventListener("click", function () {
            items.forEach((item) => item.classList.remove(hiddenClass));
            allLink.classList.add("close");
            hideLink.classList.add("open");
            updateLinkText();
        });

        // Обработка клика на "Скрыть еще"
        hideLink.addEventListener("click", function () {
            items.forEach((item, index) => {
                if (index >= itemsToShow) item.classList.add(hiddenClass);
            });
            allLink.classList.remove("close");
            hideLink.classList.remove("open");
            updateLinkText();
        });
    });
});

/*- photo-gallery -*/
document.addEventListener("DOMContentLoaded", function () {
    const publications = document.getElementById("gallery-list");
    if (!publications) return; // Если блок с id "gallery-list" не найден, выходим из функции

    const items = publications.querySelectorAll(".photo-gallery__item");
    const allLink = publications.querySelector(".photo-gallery__all-link");
    const hideLink = publications.querySelector(".photo-gallery__hide-link");

    const hiddenClass = "hidden";
    const itemsToShow = 4; // Показываем только первые 4 элемента

    if (!allLink || !hideLink || items.length === 0) return;

    // Функция для обновления текста ссылок
    function updateLinkText() {
        const hiddenItemsCount = publications.querySelectorAll(`.photo-gallery__item.${hiddenClass}`).length;
        const visibleItemsCount = items.length - hiddenItemsCount;

        // Обновляем текст ссылки "Показать еще X"
        allLink.textContent = `Показать еще ${hiddenItemsCount}`;

        // Обновляем текст ссылки "Скрыть еще X"
        hideLink.textContent = `Скрыть еще ${visibleItemsCount - itemsToShow}`;

        // Управляем видимостью allLink
        if (hiddenItemsCount === 0) {
            allLink.classList.add(hiddenClass); // Скрываем allLink, если больше нет скрытых элементов
        } else {
            allLink.classList.remove(hiddenClass); // Показываем allLink
        }

        // hideLink всегда видим
        hideLink.classList.remove(hiddenClass);
    }

    // Изначально скрываем все элементы, кроме первых itemsToShow
    items.forEach((item, index) => {
        if (index >= itemsToShow) item.classList.add(hiddenClass);
    });

    // Устанавливаем начальное состояние видимости ссылок
    updateLinkText();

    // Переключение состояния по клику на "Показать еще"
    allLink.addEventListener("click", function () {
        items.forEach((item) => item.classList.remove(hiddenClass)); // Показываем все элементы
        allLink.classList.add("close");
        hideLink.classList.add("open");
        updateLinkText();
    });

    // Переключение состояния по клику на "Скрыть еще"
    hideLink.addEventListener("click", function () {
        items.forEach((item, index) => {
            if (index >= itemsToShow) item.classList.add(hiddenClass); // Скрываем элементы, начиная с itemsToShow
        });
        allLink.classList.remove("close");
        hideLink.classList.remove("open");
        updateLinkText();
    });

    // Слушаем изменение ширины экрана для адаптивного поведения
    window.addEventListener("resize", updateLinkText);
});

/*- info-block -*/
document.addEventListener("DOMContentLoaded", function() {
    const infoBlock = document.getElementById("info-block");

    // Проверяем, существует ли блок "info-block" на странице
    if (!infoBlock) return;

    const paragraphs = infoBlock.querySelectorAll("p");
    const allLink = infoBlock.querySelector(".info-block__all-link");

    // Показываем только 3 первых параграфа, остальные скрываем
    if (paragraphs.length > 3) {
        paragraphs.forEach((p, index) => {
            if (index >= 3) {
                p.classList.add("hidden");
            }
        });
    } else if (allLink) {
        allLink.classList.add("hidden");
    }

    // Обработчик клика на ссылку "Читать все"
    allLink?.addEventListener("click", function() {
        const isExpanded = allLink.textContent === "Скрыть";
        
        // Меняем текст ссылки
        allLink.textContent = isExpanded ? "Читать все" : "Скрыть";
        
        // Переключаем видимость параграфов
        paragraphs.forEach((p, index) => {
            if (index >= 3) {
                p.classList.toggle("hidden", isExpanded);
            }
        });
    });
});

/*- scroll -*/
const classes = [
    '.gl-modal__scroll',
    '.gl-select__scroll',
    '.gl-select-checkbox__scroll'
];

const elements = document.querySelectorAll(classes.join(','));

if (elements.length > 0) {
    elements.forEach(el => SimpleScrollbar.initEl(el));
}

/*- gl-modal -*/
document.addEventListener('click', (event) => {
    // Открытие модального окна при наличии атрибута data-target
    const targetSelector = event.target.dataset.target;
    if (targetSelector) {
        const modal = document.querySelector(targetSelector);

        if (modal) {
            modal.classList.add('show'); // Добавляем класс 'show'
            document.body.classList.add('scroll-none'); // Отключаем скролл на body
        }
    }

    // Закрытие модального окна
    if (
        event.target.matches('.gl-modal__close-btn') || // Клик по кнопке закрытия
        event.target.matches('.gl-modal__overlay')     // Клик по оверлею
    ) {
        const modal = event.target.closest('.gl-modal'); // Находим родительское модальное окно

        if (modal) {
            modal.classList.remove('show'); // Удаляем класс 'show'
        }

        // Проверяем, если больше нет активных модальных окон
        if (!document.querySelector('.gl-modal.show')) {
            document.body.classList.remove('scroll-none'); // Включаем скролл на body
        }
    }
});

/*- gallery-modal -*/
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.photo-gallery__item');
    const modal = document.querySelector('.gallery-modal');
    const modalOverlay = document.querySelector('.gallery-modal__overlay');
    const body = document.body;

    // Проверяем, есть ли элементы на странице, прежде чем вешать обработчики
    if (galleryItems.length > 0 && modal && modalOverlay) {
        // Открытие модального окна
        galleryItems.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault(); // предотвращаем переход по ссылке
                modal.classList.add('show');
                body.classList.add('scroll-none');
            });
        });

        // Закрытие модального окна
        modalOverlay.addEventListener('click', () => {
            modal.classList.remove('show');
            body.classList.remove('scroll-none');
        });
    }
});

/*- gallery-slider -*/
var swiper = new Swiper(".gallery-slider__small .swiper", {
    loop: true,
    spaceBetween: false,
    slidesPerView: 8,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
    0: {
        slidesPerView: 3,
        spaceBetween: false,
        },
    460: {
        slidesPerView: 3,
        spaceBetween: false,
        },
    767: {
        slidesPerView: 5,
        spaceBetween: false,
        },
    1079: {
        slidesPerView: 8,
        spaceBetween: false,
        },
    },
    navigation: {
        nextEl: ".gallery-slider__small .swiper-button-next",
        prevEl: ".gallery-slider__small .swiper-button-prev",
    },
});

var swiper2 = new Swiper(".gallery-slider__big", {
    loop: true,
    spaceBetween: 10,
    thumbs: {
        swiper: swiper,
    },
    pagination: {
        el: ".swiper-pagination",
        type: "fraction",
    },
});

/*- gallery-slider -*/
var swiper = new Swiper(".product-slider__small", {
    loop: false,
    spaceBetween: false,
    slidesPerView: 5,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
    0: {
        slidesPerView: 3,
        spaceBetween: false,
        },
    460: {
        slidesPerView: 3,
        spaceBetween: false,
        },
    767: {
        slidesPerView: 5,
        spaceBetween: false,
        },
    1079: {
        slidesPerView: 5,
        spaceBetween: false,
        },
    },
});

var swiper2 = new Swiper(".product-slider__big", {
    loop: false,
    spaceBetween: 10,
    thumbs: {
        swiper: swiper,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        type: "fraction",
    },
});

/*- product-modal -*/
document.addEventListener('DOMContentLoaded', () => {
    // Обработчик для элементов с атрибутом data-modal
    document.querySelectorAll('[data-modal]').forEach(element => {
        element.addEventListener('click', () => {
            const modalId = element.dataset.modal; // Получаем ID модального окна
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('show'); // Добавляем класс show
                document.body.classList.add('scroll-none'); // Блокируем прокрутку
            }
        });
    });

    // Обработчик для кнопок закрытия модальных окон
    document.querySelectorAll('.product-modal__close-button').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const modal = closeBtn.closest('.product-modal'); // Находим родительский модальный блок
            if (modal) {
                modal.classList.remove('show'); // Убираем класс show
                document.body.classList.remove('scroll-none'); // Убираем блокировку скролла
            }
        });
    });
});

/*- mail, website -*/
const fieldIds = ["mail", "website", "link"];

// Функция для установки фильтра
function setupInputFilter(fieldId) {
    const inputField = document.getElementById(fieldId);

    if (inputField) {
        inputField.addEventListener("input", function (event) {
            const value = event.target.value;

            // Удаляем символы кириллицы
            const filteredValue = value.replace(/[а-яА-ЯёЁ]/g, "");

            // Если строка изменилась, обновляем значение поля
            if (value !== filteredValue) {
                event.target.value = filteredValue;

                // Опционально: показываем предупреждение
                event.target.style.borderColor = "red";
                event.target.setCustomValidity("Кириллица запрещена");
            } else {
                event.target.style.borderColor = "";
                event.target.setCustomValidity("");
            }
        });
    }
}

// Применяем функцию для всех ID
fieldIds.forEach(setupInputFilter);

/*- name -*/
const nameInput = document.getElementById('name');

if (nameInput) {
    // Добавляем обработчик события ввода
    nameInput.addEventListener('input', (event) => {
        const value = event.target.value;

        // Оставляем только буквы (удаляем все лишние символы)
        const lettersOnly = value.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, '');
        
        // Если введённое значение изменилось, обновляем поле
        if (value !== lettersOnly) {
            event.target.value = lettersOnly;
            nameInput.style.borderColor = "red"; // Красная рамка
        } else {
            nameInput.style.borderColor = ""; // Сбрасываем стиль
        }
    });
}

/*- search-form -*/
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('search-form'); // Проверяем наличие формы
    if (!form) return; // Если форма отсутствует, выходим из функции

    const input = document.getElementById('search-input'); // Проверяем наличие input
    const button = document.getElementById('search-button'); // Проверяем наличие button

    if (!input || !button) return; // Если хотя бы одного элемента нет, выходим из функции

    input.addEventListener('input', () => {
        if (input.value.trim() === '') {
            button.disabled = true;
        } else {
            button.disabled = false;
        }
    });
});

/*- password-input -*/
const passwordInput = document.getElementById('password');
const repeatPasswordInput = document.getElementById('repeat-password');

// Проверяем, что элементы существуют на странице
if (passwordInput && repeatPasswordInput) {
    // Функция для проверки совпадения паролей
    function validatePasswords() {
        if (passwordInput.value !== repeatPasswordInput.value) {
            // Если пароли не совпадают, меняем цвет бордера на красный
            passwordInput.style.borderColor = 'red';
            repeatPasswordInput.style.borderColor = 'red';
        } else {
            // Если совпадают, возвращаем цвет бордера к стандартному
            passwordInput.style.borderColor = '';
            repeatPasswordInput.style.borderColor = '';
        }
    }

    // Добавляем слушатели событий на оба поля ввода
    passwordInput.addEventListener('input', validatePasswords);
    repeatPasswordInput.addEventListener('input', validatePasswords);
}

/*- input-file -*/
document.addEventListener('DOMContentLoaded', () => {
    const docFileContainer = document.getElementById('doc-file'); // Контейнер

    if (docFileContainer) {
        const fileInput = docFileContainer.querySelector('.input-file__field');
        const fileText = docFileContainer.querySelector('.input-file__text');
        const errorText = docFileContainer.querySelector('.input-file__error-text');

        if (fileInput && fileText && errorText) {
            const allowedExtensions = ['docx', 'xlsx'];

            fileInput.addEventListener('change', () => {
                if (fileInput.files.length > 0) {
                    const fileName = fileInput.files[0].name;
                    const fileExtension = fileName.split('.').pop().toLowerCase();

                    if (allowedExtensions.includes(fileExtension)) {
                        // Показываем имя файла, скрываем ошибку
                        fileText.textContent = fileName;
                        fileText.classList.remove('hidden');
                        errorText.classList.remove('show');
                    } else {
                        // Показываем ошибку, скрываем текст выбора файла
                        fileText.classList.add('hidden');
                        errorText.classList.add('show');
                    }
                } else {
                    // Сбрасываем к стандартному виду
                    fileText.textContent = 'Выбрать файл';
                    fileText.classList.remove('hidden');
                    errorText.classList.remove('show');
                }
            });
        }
    }
});

/*- image-file -*/
document.addEventListener('DOMContentLoaded', () => {
    const imageFileContainer = document.getElementById('image-file'); // Контейнер

    if (imageFileContainer) {
        const fileInput = imageFileContainer.querySelector('.input-file__field');
        const fileText = imageFileContainer.querySelector('.input-file__text');
        const errorText = imageFileContainer.querySelector('.input-file__error-text');

        if (fileInput && fileText && errorText) {
            const allowedExtensions = ['jpg', 'png', 'webp'];

            fileInput.addEventListener('change', () => {
                if (fileInput.files.length > 0) {
                    const fileName = fileInput.files[0].name;
                    const fileExtension = fileName.split('.').pop().toLowerCase();

                    if (allowedExtensions.includes(fileExtension)) {
                        // Показываем имя файла, скрываем ошибку
                        fileText.textContent = fileName;
                        fileText.classList.remove('hidden');
                        errorText.classList.remove('show');
                    } else {
                        // Показываем ошибку, скрываем текст выбора файла
                        fileText.classList.add('hidden');
                        errorText.classList.add('show');
                    }
                } else {
                    // Сбрасываем к стандартному виду
                    fileText.textContent = 'Выбрать файл';
                    fileText.classList.remove('hidden');
                    errorText.classList.remove('show');
                }
            });
        }
    }
});

/*- gl-select -*/
document.addEventListener("DOMContentLoaded", () => {
    // Находим все элементы с классом .gl-select
    const glSelects = document.querySelectorAll(".gl-select");

    if (glSelects.length === 0) return; // Если блоков нет, ничего не делаем

    glSelects.forEach((glSelect) => {
        const selectField = glSelect.querySelector(".gl-select__field");
        const dropdown = glSelect.querySelector(".gl-select__dropdown");
        const input = selectField.querySelector("input[type='text']");
        const searchContainer = dropdown.querySelector(".gl-select__search");
        const searchInput = searchContainer ? searchContainer.querySelector("input[type='text']") : null;
        const scrollContainer = dropdown.querySelector(".gl-select__scroll");
        const items = scrollContainer.querySelectorAll("li");
        const glSelectBlock = document.querySelector('.gl-select-checkbox__field'); // Другой интерактивный блок на странице

        if (!selectField || !dropdown || !input || !scrollContainer) return; // Если структуры нет, пропускаем

        // Функция для открытия/закрытия dropdown
        const toggleDropdown = (event) => {
            event.stopPropagation(); // Предотвращаем всплытие события
            glSelects.forEach((item) => {
                if (item !== glSelect) {
                    item.classList.remove("open");
                    item.querySelector(".gl-select__dropdown").classList.remove("show");
                }
            });

            glSelect.classList.toggle("open");
            dropdown.classList.toggle("show");
        };

        // Закрытие при клике вне
        const closeDropdown = () => {
            glSelect.classList.remove("open");
            dropdown.classList.remove("show");
        };

        // Обработчик клика на поле
        selectField.addEventListener("click", toggleDropdown);

        // Закрытие при клике на свободное пространство
        document.addEventListener("click", (event) => {
            if (!glSelect.contains(event.target)) {
                closeDropdown();
            }
        });

        // Закрываем выпадающий список, если был клик на блок с классом gl-select
        if (glSelectBlock) {
            glSelectBlock.addEventListener('click', () => {
                closeDropdown();
            });
        }

        // Сброс списка к исходному состоянию
        const resetList = () => {
            if (searchInput) searchInput.value = ""; // Очищаем поле поиска, если оно есть
            items.forEach((item) => {
                item.style.display = ""; // Показываем все элементы
            });
        };

        // Выбор текста из списка
        scrollContainer.addEventListener("click", (event) => {
            const li = event.target.closest("li");
            const span = li ? li.querySelector("span") : null;

            if (li && span) {
                // Удаляем класс active у всех элементов
                items.forEach((item) => item.classList.remove("active"));

                // Добавляем класс active к выбранному элементу
                li.classList.add("active");

                // Переносим текст в input
                input.value = span.textContent;
                input.setAttribute("readonly", true); // Делаем input readonly
                resetList(); // Сбрасываем фильтрацию
                closeDropdown(); // Закрываем выпадающий список
            }
        });

        // Фильтрация списка, если блок поиска присутствует
        if (searchInput) {
            searchInput.addEventListener("input", () => {
                const filter = searchInput.value.toLowerCase(); // Приводим текст к нижнему регистру
                items.forEach((item) => {
                    const span = item.querySelector("span");
                    if (span) {
                        const text = span.textContent.toLowerCase();
                        if (text.includes(filter)) {
                            item.style.display = ""; // Показываем, если подходит
                        } else {
                            item.style.display = "none"; // Скрываем, если не подходит
                        }
                    }
                });
            });
        }
    });
});

/*- gl-select-checkbox -*/
document.addEventListener('DOMContentLoaded', () => {
    const selectField = document.querySelector('.gl-select-checkbox__field'); // Поле ввода
    const selectCheckbox = document.querySelector('.gl-select-checkbox'); // Главный контейнер
    const dropdown = document.querySelector('.gl-select-checkbox__dropdown'); // Выпадающий список
    const searchInput = document.querySelector('.gl-select-checkbox__search input'); // Поле поиска
    const checkboxItems = document.querySelectorAll('.gl-select-checkbox__scroll li'); // Элементы списка
    const checkboxes = document.querySelectorAll('.gl-select-checkbox__scroll input[type="checkbox"]'); // Все чекбоксы
    const selectedValuesInput = document.querySelector('.gl-select-checkbox__field input'); // Поле для выбранных значений
    const applyButton = document.querySelector('.gl-select-checkbox__btns-panel .btn:not(.btn_color-gray-transparent)'); // Кнопка "Применить"
    const resetButton = document.querySelector('.gl-select-checkbox__btns-panel .btn_color-gray-transparent'); // Кнопка "Сбросить"
    const glSelectBlock = document.querySelector('.gl-select__field'); // Другой интерактивный блок на странице

    if (!selectCheckbox) {
        //console.warn('Компонент .gl-select-checkbox не найден на странице.');
        return; // Останавливаем выполнение кода, если элемента нет
    }

    // Функция для переключения видимости выпадающего списка
    const toggleDropdown = (event) => {
        event.stopPropagation();
        if (selectCheckbox && dropdown) {
            selectCheckbox.classList.toggle('open');
            dropdown.classList.toggle('show');
        }
    };

    // Функция для сброса результатов поиска
    const resetSearch = () => {
        if (!searchInput || !checkboxItems) return;
        searchInput.value = ''; // Очистка поля поиска
        checkboxItems.forEach((item) => {
            item.style.display = ''; // Отображаем все элементы
        });
    };

    // Функция для закрытия выпадающего списка
    const closeDropdown = () => {
        if (selectCheckbox && dropdown) {
            selectCheckbox.classList.remove('open');
            dropdown.classList.remove('show');
        }
        resetSearch(); // Сбрасываем результаты поиска при закрытии
    };

    // Обрабатываем клик на поле ввода
    if (selectField) {
        selectField.addEventListener('click', toggleDropdown);
    }

    // Закрываем выпадающий список при клике за его пределами
    document.addEventListener('click', (event) => {
        if (selectCheckbox && !selectCheckbox.contains(event.target)) {
            closeDropdown();
        }
    });

    // Закрываем выпадающий список, если был клик на блок с классом gl-select
    if (glSelectBlock) {
        glSelectBlock.addEventListener('click', () => {
            closeDropdown();
        });
    }

    // Обрабатываем клики на checkbox внутри списка
    if (checkboxItems) {
        checkboxItems.forEach((item) => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.addEventListener('click', (event) => {
                    event.stopPropagation();
                    item.classList.toggle('active');
                });
            }
        });
    }

    // Фильтрация элементов списка при вводе текста в поле поиска
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const searchValue = searchInput.value.toLowerCase();
            checkboxItems.forEach((item) => {
                const label = item.querySelector('label')?.textContent.toLowerCase() || '';
                item.style.display = label.includes(searchValue) ? '' : 'none';
            });
        });
    }

    // Функция для обновления значения в поле ввода
    const updateSelectedValues = () => {
        if (!checkboxes || !selectedValuesInput) return;
        const selectedValues = Array.from(checkboxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.nextElementSibling.textContent.trim());
        selectedValuesInput.value = selectedValues.length
            ? selectedValues.join(', ')
            : 'Выберите из списка';
    };

    // Обрабатываем кнопку "Применить"
    if (applyButton) {
        applyButton.addEventListener('click', () => {
            updateSelectedValues();
            closeDropdown();
        });
    }

    // Обрабатываем кнопку "Сбросить"
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            if (!checkboxes || !checkboxItems) return;
            checkboxes.forEach((checkbox) => (checkbox.checked = false));
            checkboxItems.forEach((item) => item.classList.remove('active'));
            if (selectedValuesInput) {
                selectedValuesInput.value = 'Выберите из списка';
            }
            resetSearch();
        });
    }
});

/*- phone-fields -*/
document.addEventListener('DOMContentLoaded', () => {
    const phoneFieldsList = document.querySelector('.phone-fields-list');
    const phoneFieldsInList = phoneFieldsList?.querySelectorAll('.phone-fields-list__item');
    const btn = phoneFieldsList?.querySelector('.btn');

    let currentIndex = 0; // Индекс текущего активного поля в списке

    // Функция проверки полного номера телефона
    const isPhoneValid = (phone) => phone.length === 17; // +998 XX XXX XX XX (17 символов)

    // Универсальная функция для маски ввода телефона
    const formatPhoneInput = (phoneInput) => {
        phoneInput.addEventListener('input', () => {
            let value = phoneInput.value.replace(/\D/g, ''); // Удаляем все нецифровые символы

            // Убеждаемся, что префикс "+998" всегда есть
            if (!value.startsWith('998')) {
                value = '998' + value;
            }

            // Ограничиваем длину до 12 символов (998 XX XXX XX XX)
            value = value.slice(0, 12);

            // Форматируем в маску +998 XX XXX XX XX
            const formattedValue = `+${value.slice(0, 3)} ${value.slice(3, 5)} ${value.slice(5, 8)} ${value.slice(8, 10)} ${value.slice(10, 12)}`;
            phoneInput.value = formattedValue.trim();
        });

        phoneInput.addEventListener('keydown', (event) => {
            // Если нажата клавиша Backspace
            if (event.key === 'Backspace') {
                const cursorPosition = phoneInput.selectionStart;
                const value = phoneInput.value;

                // Убедимся, что пользователь не может удалить "+998 "
                if (cursorPosition <= 5) {
                    event.preventDefault();
                    return;
                }

                // Если курсор перед символами форматирования (пробел)
                const prevChar = value[cursorPosition - 1];
                if (/\s/.test(prevChar)) {
                    event.preventDefault();

                    // Удаляем символ форматирования и перемещаем курсор
                    const newValue = value.slice(0, cursorPosition - 1) + value.slice(cursorPosition);
                    phoneInput.value = newValue;

                    // Устанавливаем новый курсор
                    phoneInput.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
                }
            }
        });

        phoneInput.addEventListener('focus', () => {
            if (!phoneInput.value || phoneInput.value === '+998') {
                phoneInput.value = '+998 ';
            }
        });

        phoneInput.addEventListener('blur', () => {
            if (phoneInput.value === '+998 ') {
                phoneInput.value = ''; // Очищаем поле, если пользователь не ввел данные
            }
        });
    };

    // Маска для всех элементов с классом phone-field
    const phoneInputs = document.querySelectorAll('.phone-field');
    phoneInputs.forEach((phoneInput) => {
        formatPhoneInput(phoneInput);
    });

    // Логика работы с phone-fields-list
    if (phoneFieldsList) {
        const updateButtonState = (input) => {
            if (isPhoneValid(input.value)) {
                btn.classList.remove('btn_no-active');
            } else {
                btn.classList.add('btn_no-active');
            }
        };

        phoneFieldsInList.forEach((item, index) => {
            const input = item.querySelector('.phone-field');
            input.addEventListener('input', () => {
                if (index === currentIndex) {
                    updateButtonState(input);
                }
            });
        });

        btn.addEventListener('click', () => {
            if (btn.classList.contains('btn_no-active')) return;

            if (currentIndex < phoneFieldsInList.length - 1) {
                const currentItem = phoneFieldsInList[currentIndex];
                const nextItem = phoneFieldsInList[currentIndex + 1];

                // Удаляем класс hidden у следующего элемента
                nextItem.classList.remove('hidden');
                currentIndex++;

                // Деактивируем кнопку до ввода следующего номера
                btn.classList.add('btn_no-active');
            }

            // Если последний элемент раскрыт, скрываем кнопку
            if (currentIndex === phoneFieldsInList.length - 1) {
                btn.classList.add('btn_hidden');
            }
        });
    }
});

/*- editor1 -*/
var editor1 = document.querySelector('#editor1');
var toolbar1 = document.querySelector('#toolbar1');
if (editor1 && toolbar1) {
    var quill1 = new Quill(editor1, {
        theme: 'snow',
        modules: {
            toolbar: toolbar1
        }
    });
}

/*- editor2 -*/
var editor2 = document.querySelector('#editor2');
var toolbar2 = document.querySelector('#toolbar2');
if (editor2 && toolbar2) {
    var quill2 = new Quill(editor2, {
        theme: 'snow',
        modules: {
            toolbar: toolbar2
        }
    });
}

/*- password-form -*/
const passwordForm = document.getElementById("password-form");

if (passwordForm) {
    const currentPasswordInput = passwordForm.querySelector("#current-password");
    const passwordInput = passwordForm.querySelector("#password");
    const repeatPasswordInput = passwordForm.querySelector("#repeat-password");
    const submitButton = passwordForm.querySelector(".btn[type='submit']");

    // Функция проверки заполненности всех полей
    const checkInputs = () => {
        const isCurrentPasswordFilled = currentPasswordInput.value.trim() !== "";
        const isPasswordFilled = passwordInput.value.trim() !== "";
        const isRepeatPasswordFilled = repeatPasswordInput.value.trim() !== "";

        // Удаляем или добавляем атрибут disabled у кнопки
        if (isCurrentPasswordFilled && isPasswordFilled && isRepeatPasswordFilled) {
            submitButton.removeAttribute("disabled");
        } else {
            submitButton.setAttribute("disabled", "disabled");
        }
    };

    // Добавляем обработчики ввода для каждого поля
    [currentPasswordInput, passwordInput, repeatPasswordInput].forEach(input => {
        input.addEventListener("input", checkInputs);
    });
}

/*- mobile-menu -*/
const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const closeBtn = document.querySelector('.mobile-menu__close');
const body = document.body;

// Функция для открытия меню
menuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('show');
    body.classList.add('m-scroll-none');
});

// Функция для закрытия меню
closeBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('show');
    body.classList.remove('m-scroll-none');
});