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
document.addEventListener("DOMContentLoaded", function() {
    const categoriesCol = document.querySelector(".categories-col");
    
    // Если блок с классом categories-col не найден, прекращаем выполнение
    if (!categoriesCol) return;

    const allLink = categoriesCol.querySelector(".categories-col__all-link");
    const listItems = categoriesCol.querySelectorAll(".categories-col__list li");

    // Если элементов списка нет, прекращаем выполнение
    if (listItems.length === 0 || !allLink) return;

    // Функция для обновления видимости элементов и ссылки
    function updateListItems() {
        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        const itemsToShow = isMobile ? 4 : 9;

        // Показываем или скрываем `allLink` в зависимости от количества элементов
        if (listItems.length <= itemsToShow) {
            allLink.classList.add("hidden");
        } else {
            allLink.classList.remove("hidden");
        }

        // Скрываем или показываем элементы
        listItems.forEach((item, index) => {
            if (index >= itemsToShow) {
                item.classList.add("hidden");
            } else {
                item.classList.remove("hidden");
            }
        });
    }

    // Изначально скрываем элементы и обновляем ссылку по ширине экрана
    updateListItems();

    // Слушаем изменение ширины экрана и обновляем отображение
    window.addEventListener("resize", updateListItems);

    allLink.addEventListener("click", function() {
        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        const itemsToShow = isMobile ? 4 : 9;

        // Переключаем класс hidden у элементов, начиная с itemsToShow
        listItems.forEach((item, index) => {
            if (index >= itemsToShow) {
                item.classList.toggle("hidden");
            }
        });

        // Меняем текст ссылки и переключаем класс open
        if (allLink.textContent === "Показать все рубрики") {
            allLink.textContent = "Скрыть все рубрики";
            allLink.classList.add("open");
        } else {
            allLink.textContent = "Показать все рубрики";
            allLink.classList.remove("open");
        }
    });
});

/*- select -*/
const selects = document.querySelectorAll('.select');

// Функция для закрытия всех open/ show классов
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
document.addEventListener("DOMContentLoaded", function() {
    const widget = document.querySelector(".info-widget");
    
    // Проверяем, существует ли блок .info-widget
    if (!widget) {
        return; // Прекращаем выполнение, если его нет
    }

    const paragraphs = widget.querySelectorAll("p");
    const toggleLink = widget.querySelector(".info-widget__all-link");

    // Проверяем, существует ли toggleLink и хотя бы один параграф
    if (!toggleLink || paragraphs.length === 0) {
        return; // Прекращаем выполнение, если их нет
    }

    // Если параграфов один, скрываем ссылку
    if (paragraphs.length <= 1) {
        toggleLink.classList.add("hidden");
        return; // Прекращаем выполнение, так как дальнейшие действия не нужны
    }

    // По умолчанию отображаем только первый параграф, остальные скрываем
    paragraphs.forEach((p, index) => {
        if (index > 0) {
            p.classList.add("hidden");
        }
    });

    // Переключаем текст и видимость параграфов при клике на ссылку
    toggleLink.addEventListener("click", function() {
        const isHidden = paragraphs[1].classList.contains("hidden");

        if (isHidden) {
            paragraphs.forEach(p => p.classList.remove("hidden"));
            toggleLink.textContent = "Скрыть всё";
        } else {
            paragraphs.forEach((p, index) => {
                if (index > 0) {
                    p.classList.add("hidden");
                }
            });
            toggleLink.textContent = "Читать все";
        }
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

/*- reviews-list -*/
document.addEventListener("DOMContentLoaded", function () {
    const reviewsList = document.getElementById("reviews-list");
    if (!reviewsList) return; // Если блок с id "reviews-list" не найден, выходим из функции
    
    const items = reviewsList.querySelectorAll(".reviews-list__item");
    const toggleLink = reviewsList.querySelector(".reviews-list__all-link");
    const hiddenClass = "hidden";
    const itemsToShow = 2;
    
    // Функция для обновления текста ссылки и видимости toggleLink
    function updateLinkText() {
        const hiddenItemsCount = reviewsList.querySelectorAll(`.reviews-list__item.${hiddenClass}`).length;
        toggleLink.textContent = hiddenItemsCount > 0 
            ? `Показать ещё ${hiddenItemsCount}` 
            : `Скрыть ${items.length - itemsToShow}`;

        // Проверка на видимость toggleLink в зависимости от количества элементов
        const visibleItemsCount = items.length - hiddenItemsCount;
        if (items.length > itemsToShow) {
            toggleLink.classList.remove(hiddenClass); // Показываем ссылку, если больше itemsToShow элементов
        } else if (visibleItemsCount <= itemsToShow) {
            toggleLink.classList.add(hiddenClass); // Скрываем ссылку, если видимых элементов <= itemsToShow
        }
    }
    
    // Изначально скрываем все элементы, кроме первых двух
    items.forEach((item, index) => {
        if (index >= itemsToShow) {
            item.classList.add(hiddenClass);
        }
    });

    // Устанавливаем начальный текст ссылки и видимость toggleLink
    updateLinkText();
    
    // Переключение состояния по клику
    toggleLink.addEventListener("click", function () {
        const isHidden = items[itemsToShow].classList.contains(hiddenClass);
        
        if (isHidden) {
            items.forEach(item => item.classList.remove(hiddenClass));
        } else {
            items.forEach((item, index) => {
                if (index >= itemsToShow) {
                    item.classList.add(hiddenClass);
                }
            });
        }
        
        // Обновляем текст ссылки и видимость toggleLink после изменения видимости элементов
        updateLinkText();
    });
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
    const publications = document.getElementById("news-list");
    if (!publications) return; // Если блок с id "publications" не найден, выходим из функции

    const items = publications.querySelectorAll(".news-list__item");
    const toggleLink = publications.querySelector(".news-list__all-link");
    const hiddenClass = "hidden";
    const itemsToShow = 5;

    // Функция для обновления текста ссылки и видимости toggleLink
    function updateLinkText() {
        const hiddenItemsCount = publications.querySelectorAll(`.news-list__item.${hiddenClass}`).length;
        toggleLink.textContent = hiddenItemsCount > 0
            ? `Показать еще ${hiddenItemsCount}`
            : `Скрыть ${items.length - itemsToShow}`;

        // Проверяем, должно ли toggleLink быть скрытым или видимым
        const visibleItemsCount = items.length - hiddenItemsCount;
        if (items.length > itemsToShow) {
            toggleLink.classList.remove(hiddenClass); // Показываем ссылку, если есть больше itemsToShow элементов
        } else if (visibleItemsCount <= itemsToShow) {
            toggleLink.classList.add(hiddenClass); // Скрываем ссылку, если видимых элементов <= itemsToShow
        }
    }

    // Изначально скрываем все элементы кроме первых itemsToShow
    items.forEach((item, index) => {
        if (index >= itemsToShow) {
            item.classList.add(hiddenClass);
        }
    });

    // Устанавливаем начальный текст ссылки и видимость toggleLink
    updateLinkText();

    // Переключение состояния по клику
    toggleLink.addEventListener("click", function () {
        const isHidden = items[itemsToShow].classList.contains(hiddenClass);

        if (isHidden) {
            // Показываем все элементы
            items.forEach(item => item.classList.remove(hiddenClass));
        } else {
            // Скрываем все элементы, начиная с itemsToShow
            items.forEach((item, index) => {
                if (index >= itemsToShow) {
                    item.classList.add(hiddenClass);
                }
            });
        }

        // Обновляем текст ссылки и видимость toggleLink после изменения видимости элементов
        updateLinkText();
    });
});

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




