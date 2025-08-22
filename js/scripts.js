/*- search-panel -*/
document.addEventListener('DOMContentLoaded', function() {
    const searchIcon = document.querySelector('.search-panel__icon');
    const searchDropdown = document.querySelector('.search-panel__dropdown');
    const searchOverlay = document.querySelector('.search-panel__overlay');  // Находим элемент overlay

    function togglePanel() {
        searchIcon.classList.toggle('open');
        searchDropdown.classList.toggle('show');
    }

    function closePanel() {
        searchIcon.classList.remove('open');
        searchDropdown.classList.remove('show');
    }

    searchIcon.addEventListener('click', function(event) {
        event.stopPropagation();  // Останавливаем всплытие события, чтобы не вызвать закрытие при клике на саму панель
        togglePanel();
    });

    document.addEventListener('click', function(event) {
        if (!searchIcon.contains(event.target) && !searchDropdown.contains(event.target)) {
            closePanel();
        }
    });

    searchOverlay.addEventListener('click', function() {
        closePanel();
    });
});

/*- language -*/
document.addEventListener('DOMContentLoaded', function() {
    const languageText = document.querySelector('.language__text');
    const languageDropdown = document.querySelector('.language__dropdown');
	
    function togglePanel() {
        languageText.classList.toggle('open');
        languageDropdown.classList.toggle('show');
    }

    function closePanel() {
        languageText.classList.remove('open');
        languageDropdown.classList.remove('show');
    }

    languageText.addEventListener('click', function(event) {
        event.stopPropagation();  // Останавливаем всплытие события, чтобы не вызвать закрытие при клике на саму панель
        togglePanel();
    });

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

    if (!tabNumber) return;

    document.querySelectorAll('.tabs__nav li').forEach(btn => btn.classList.remove('active'));

    document.querySelectorAll('.tabs__item').forEach(content => {
      content.classList.remove('active');
    });

    document.querySelectorAll(`.tabs__nav li[data-tab="${tabNumber}"]`).forEach(btn => btn.classList.add('active'));

    document.getElementById(`tab-${tabNumber}`).classList.add('active');
  });
});

/*- products-slider -*/
function getRemSize() {
    return parseFloat(getComputedStyle(document.documentElement).fontSize);
}

let swiperInstances = [];

function initializeSwipers() {
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

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(initializeSwipers, 300);
});

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

    updateDisabledState();

    navItems.forEach((navItem, index) => {
        navItem.addEventListener("click", function () {
            if (navItem.classList.contains("disabled")) return;

            document.querySelectorAll(".search-result-tabs__nav .active, .search-result-tabs__content .active").forEach(el => el.classList.remove("active"));

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
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(content => content.classList.remove('active'));

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

    function getItemsToShow() {
        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        return isMobile ? 4 : 9;
    }

    function updateListItems(showAll = false) {
        const itemsToShow = getItemsToShow();

        listItems.forEach((item, index) => {
            if (index >= itemsToShow) {
                item.classList.toggle("hidden", !showAll);
            } else {
                item.classList.remove("hidden");
            }
        });

        if (listItems.length <= itemsToShow) {
            allLink.classList.add("hidden");
            hideLink.classList.remove("open");
            allLink.classList.remove("close");
        } else if (!showAll) {
            allLink.classList.remove("hidden", "close");
            hideLink.classList.remove("open");
        }
    }

    allLink.addEventListener("click", function () {
        allLink.classList.add("close");
        hideLink.classList.add("open");

        updateListItems(true);
    });

    hideLink.addEventListener("click", function () {
        hideLink.classList.remove("open");
        allLink.classList.remove("close");

        updateListItems(false);
    });

    window.addEventListener("resize", () => {
        updateListItems(false); 
    });

    updateListItems(false);
});

/*- select -*/
const selects = document.querySelectorAll('.select');
const inputs = document.querySelectorAll('.select-hidden-form input');

function closeAllSelects(exceptSelect) {
    selects.forEach(select => {
        if (select !== exceptSelect) {
            const selectText = select.querySelector('.select__text');
            const selectDropdown = select.querySelector('.select__dropdown');
            select.classList.remove('open');
            selectText.classList.remove('open');
            selectDropdown.classList.remove('show');
        }
    });
}

function syncSelectWithInput() {
    selects.forEach((select, index) => {
        const input = inputs[index];
        const selectText = select.querySelector('.select__text');

        if (input && selectText) {
            input.value = selectText.textContent;
        }
    });
}

selects.forEach(select => {
    const selectText = select.querySelector('.select__text');
    const selectDropdown = select.querySelector('.select__dropdown');
    const listItems = select.querySelectorAll('.select__dropdown li');

    selectText.addEventListener('click', (event) => {
        event.stopPropagation();

        const isOpen = select.classList.contains('open');
        closeAllSelects(select);
        if (!isOpen) {
            select.classList.add('open');
            selectText.classList.add('open');
            selectDropdown.classList.add('show');
        } else {
            select.classList.remove('open');
            selectText.classList.remove('open');
            selectDropdown.classList.remove('show');
        }
    });

    listItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.stopPropagation();

            listItems.forEach(li => li.classList.remove('active'));

            item.classList.add('active');

            selectText.textContent = item.textContent;

            syncSelectWithInput();

            select.classList.remove('open');
            selectText.classList.remove('open');
            selectDropdown.classList.remove('show');
        });
    });

    document.addEventListener('click', (event) => {
        if (!select.contains(event.target)) {
            select.classList.remove('open');
            selectText.classList.remove('open');
            selectDropdown.classList.remove('show');
        }
    });
});

syncSelectWithInput();

/*- phone-panel -*/
document.addEventListener("DOMContentLoaded", function() {
    function initializePhonePanel(panel) {
        const showLink = panel.querySelector(".phone-panel__show-link");
        const phoneNumbers = panel.querySelectorAll(".phone-panel__number");

        phoneNumbers.forEach((number, index) => {
            if (index > 0) {
                number.classList.add("hidden");
            }
            number.dataset.fullNumber = number.textContent;
            number.textContent = number.textContent.slice(0, -5) + "xx xx";
        });

        function showPhoneNumbers() {
            phoneNumbers.forEach((number, index) => {
                number.classList.remove("hidden");
                number.textContent = number.dataset.fullNumber;
                if (index < phoneNumbers.length - 1) {
                    number.innerHTML += ",";
                }
            });
            showLink.classList.add("hidden");
        }

        showLink.addEventListener("click", showPhoneNumbers);
    }

    document.querySelectorAll(".phone-panel").forEach(initializePhonePanel);
});

/*- info-widget -*/
document.addEventListener("DOMContentLoaded", function () {
    const widget = document.querySelector(".info-widget");

    if (!widget) return;

    const paragraphs = widget.querySelectorAll("p");
    const allLink = widget.querySelector(".info-widget__all-link");
    const hideLink = widget.querySelector(".info-widget__hide-link");

    if (!allLink || !hideLink || paragraphs.length === 0) return;

    if (paragraphs.length <= 1) {
        allLink.classList.add("hidden");
        return;
    }

    paragraphs.forEach((p, index) => {
        if (index > 0) p.classList.add("hidden");
    });

    allLink.addEventListener("click", function () {
        allLink.classList.add("close");
        hideLink.classList.add("open");
        paragraphs.forEach((p) => p.classList.remove("hidden"));
    });

    hideLink.addEventListener("click", function () {
        hideLink.classList.remove("open");
        allLink.classList.remove("close");
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

    if (icon && dropdown) {
        // Функция для переключения класса show
        function toggleDropdown(event) {
            event.stopPropagation();
            dropdown.classList.toggle("show");
        }

        function closeDropdown(event) {
            if (!dropdown.contains(event.target) && !icon.contains(event.target)) {
                dropdown.classList.remove("show");
            }
        }

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

        function updateLinkText() {
            const hiddenItemsCount = block.querySelectorAll(
                `.news-list__item.${hiddenClass}`
            ).length;

            allLink.textContent = `Показать еще ${hiddenItemsCount}`;
            hideLink.textContent = `Скрыть еще ${items.length - itemsToShow}`;

            if (hiddenItemsCount > 0) {
                hideLink.classList.remove(hiddenClass);
            } else {
                hideLink.classList.add(hiddenClass);
            }

            if (items.length <= itemsToShow) {
                allLink.classList.add(hiddenClass);
            } else {
                allLink.classList.remove(hiddenClass);
            }
        }

        items.forEach((item, index) => {
            if (index >= itemsToShow) item.classList.add(hiddenClass);
        });

        updateLinkText();

        allLink.addEventListener("click", function () {
            items.forEach((item) => item.classList.remove(hiddenClass));
            allLink.classList.add("close");
            hideLink.classList.add("open");
            updateLinkText();
        });

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
    if (!publications) return;

    const items = publications.querySelectorAll(".photo-gallery__item");
    const allLink = publications.querySelector(".photo-gallery__all-link");
    const hideLink = publications.querySelector(".photo-gallery__hide-link");

    const hiddenClass = "hidden";
    const itemsToShow = 4;

    if (!allLink || !hideLink || items.length === 0) return;
	
    function updateLinkText() {
        const hiddenItemsCount = publications.querySelectorAll(`.photo-gallery__item.${hiddenClass}`).length;
        const visibleItemsCount = items.length - hiddenItemsCount;

        allLink.textContent = `Показать еще ${hiddenItemsCount}`;

        hideLink.textContent = `Скрыть еще ${visibleItemsCount - itemsToShow}`;

        if (hiddenItemsCount === 0) {
            allLink.classList.add(hiddenClass);
        } else {
            allLink.classList.remove(hiddenClass);
        }

        hideLink.classList.remove(hiddenClass);
    }

    items.forEach((item, index) => {
        if (index >= itemsToShow) item.classList.add(hiddenClass);
    });

    updateLinkText();

    allLink.addEventListener("click", function () {
        items.forEach((item) => item.classList.remove(hiddenClass));
        allLink.classList.add("close");
        hideLink.classList.add("open");
        updateLinkText();
    });

    hideLink.addEventListener("click", function () {
        items.forEach((item, index) => {
            if (index >= itemsToShow) item.classList.add(hiddenClass);
        });
        allLink.classList.remove("close");
        hideLink.classList.remove("open");
        updateLinkText();
    });

    window.addEventListener("resize", updateLinkText);
});

/*- info-block -*/
document.addEventListener("DOMContentLoaded", function() {
    const infoBlock = document.getElementById("info-block");

    if (!infoBlock) return;

    const paragraphs = infoBlock.querySelectorAll("p");
    const allLink = infoBlock.querySelector(".info-block__all-link");

    if (paragraphs.length > 3) {
        paragraphs.forEach((p, index) => {
            if (index >= 3) {
                p.classList.add("hidden");
            }
        });
    } else if (allLink) {
        allLink.classList.add("hidden");
    }

    allLink?.addEventListener("click", function() {
        const isExpanded = allLink.textContent === "Скрыть";
        
        allLink.textContent = isExpanded ? "Читать все" : "Скрыть";
        
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
    const targetSelector = event.target.dataset.target;
    if (targetSelector) {
        const modal = document.querySelector(targetSelector);

        if (modal) {
            modal.classList.add('show');
            document.body.classList.add('scroll-none');
        }
    }

    if (
        event.target.matches('.gl-modal__close-btn') ||
        event.target.matches('.gl-modal__overlay')
    ) {
        const modal = event.target.closest('.gl-modal');

        if (modal) {
            modal.classList.remove('show');
        }

        if (!document.querySelector('.gl-modal.show')) {
            document.body.classList.remove('scroll-none'); 
        }
    }
});

/*- gallery-modal -*/
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.photo-gallery__item');
    const modal = document.querySelector('.gallery-modal');
    const modalOverlay = document.querySelector('.gallery-modal__overlay');
    const body = document.body;

    if (galleryItems.length > 0 && modal && modalOverlay) {
        galleryItems.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault();
                modal.classList.add('show');
                body.classList.add('scroll-none');
            });
        });

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
    document.querySelectorAll('[data-modal]').forEach(element => {
        element.addEventListener('click', () => {
            const modalId = element.dataset.modal;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('show');
                document.body.classList.add('scroll-none');
            }
        });
    });

    document.querySelectorAll('.product-modal__close-button').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const modal = closeBtn.closest('.product-modal');
            if (modal) {
                modal.classList.remove('show');
                document.body.classList.remove('scroll-none');
            }
        });
    });
});

/*- mail, website -*/
const fieldIds = ["mail", "website", "link"];

function setupInputFilter(fieldId) {
    const inputField = document.getElementById(fieldId);

    if (inputField) {
        inputField.addEventListener("input", function (event) {
            const value = event.target.value;

            const filteredValue = value.replace(/[а-яА-ЯёЁ]/g, "");

            if (value !== filteredValue) {
                event.target.value = filteredValue;
                event.target.style.borderColor = "red";
                event.target.setCustomValidity("Кириллица запрещена");
            } else {
                event.target.style.borderColor = "";
                event.target.setCustomValidity("");
            }
        });
    }
}

fieldIds.forEach(setupInputFilter);

/*- name -*/
const nameInput = document.getElementById('name');

if (nameInput) {
    nameInput.addEventListener('input', (event) => {
        const value = event.target.value;
        const lettersOnly = value.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, '');
        
        if (value !== lettersOnly) {
            event.target.value = lettersOnly;
            nameInput.style.borderColor = "red";
        } else {
            nameInput.style.borderColor = "";
        }
    });
}

/*- search-form -*/
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('search-form');
    if (!form) return;

    const input = document.getElementById('search-input');
    const button = document.getElementById('search-button');

    if (!input || !button) return;

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

if (passwordInput && repeatPasswordInput) {
    function validatePasswords() {
        if (passwordInput.value !== repeatPasswordInput.value) {
            passwordInput.style.borderColor = 'red';
            repeatPasswordInput.style.borderColor = 'red';
        } else {
            passwordInput.style.borderColor = '';
            repeatPasswordInput.style.borderColor = '';
        }
    }

    passwordInput.addEventListener('input', validatePasswords);
    repeatPasswordInput.addEventListener('input', validatePasswords);
}

/*- input-file -*/
document.addEventListener('DOMContentLoaded', () => {
    const docFileContainer = document.getElementById('doc-file');

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
                        fileText.textContent = fileName;
                        fileText.classList.remove('hidden');
                        errorText.classList.remove('show');
                    } else {
                        fileText.classList.add('hidden');
                        errorText.classList.add('show');
                    }
                } else {
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
    const imageFileContainer = document.getElementById('image-file');

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
                        fileText.textContent = fileName;
                        fileText.classList.remove('hidden');
                        errorText.classList.remove('show');
                    } else {
                        fileText.classList.add('hidden');
                        errorText.classList.add('show');
                    }
                } else {
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
    const glSelects = document.querySelectorAll(".gl-select");

    if (glSelects.length === 0) return;

    glSelects.forEach((glSelect) => {
        const selectField = glSelect.querySelector(".gl-select__field");
        const dropdown = glSelect.querySelector(".gl-select__dropdown");
        const input = selectField.querySelector("input[type='text']");
        const searchContainer = dropdown.querySelector(".gl-select__search");
        const searchInput = searchContainer ? searchContainer.querySelector("input[type='text']") : null;
        const scrollContainer = dropdown.querySelector(".gl-select__scroll");
        const items = scrollContainer.querySelectorAll("li");
        const glSelectBlock = document.querySelector('.gl-select-checkbox__field');

        if (!selectField || !dropdown || !input || !scrollContainer) return;

        const toggleDropdown = (event) => {
            event.stopPropagation();
            glSelects.forEach((item) => {
                if (item !== glSelect) {
                    item.classList.remove("open");
                    item.querySelector(".gl-select__dropdown").classList.remove("show");
                }
            });

            glSelect.classList.toggle("open");
            dropdown.classList.toggle("show");
        };

        const closeDropdown = () => {
            glSelect.classList.remove("open");
            dropdown.classList.remove("show");
        };

        selectField.addEventListener("click", toggleDropdown);

        document.addEventListener("click", (event) => {
            if (!glSelect.contains(event.target)) {
                closeDropdown();
            }
        });

        if (glSelectBlock) {
            glSelectBlock.addEventListener('click', () => {
                closeDropdown();
            });
        }

        const resetList = () => {
            if (searchInput) searchInput.value = "";
            items.forEach((item) => {
                item.style.display = "";
            });
        };

        scrollContainer.addEventListener("click", (event) => {
            const li = event.target.closest("li");
            const span = li ? li.querySelector("span") : null;

            if (li && span) {
                items.forEach((item) => item.classList.remove("active"));

                li.classList.add("active");

                input.value = span.textContent;
                input.setAttribute("readonly", true);
                resetList();
                closeDropdown();
            }
        });

        if (searchInput) {
            searchInput.addEventListener("input", () => {
                const filter = searchInput.value.toLowerCase();
                items.forEach((item) => {
                    const span = item.querySelector("span");
                    if (span) {
                        const text = span.textContent.toLowerCase();
                        if (text.includes(filter)) {
                            item.style.display = "";
                        } else {
                            item.style.display = "none";
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
        return;
    }

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
        searchInput.value = '';
        checkboxItems.forEach((item) => {
            item.style.display = '';
        });
    };

    const closeDropdown = () => {
        if (selectCheckbox && dropdown) {
            selectCheckbox.classList.remove('open');
            dropdown.classList.remove('show');
        }
        resetSearch();
    };

    if (selectField) {
        selectField.addEventListener('click', toggleDropdown);
    }

    document.addEventListener('click', (event) => {
        if (selectCheckbox && !selectCheckbox.contains(event.target)) {
            closeDropdown();
        }
    });

    if (glSelectBlock) {
        glSelectBlock.addEventListener('click', () => {
            closeDropdown();
        });
    }

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

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const searchValue = searchInput.value.toLowerCase();
            checkboxItems.forEach((item) => {
                const label = item.querySelector('label')?.textContent.toLowerCase() || '';
                item.style.display = label.includes(searchValue) ? '' : 'none';
            });
        });
    }

    const updateSelectedValues = () => {
        if (!checkboxes || !selectedValuesInput) return;
        const selectedValues = Array.from(checkboxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.nextElementSibling.textContent.trim());
        selectedValuesInput.value = selectedValues.length
            ? selectedValues.join(', ')
            : 'Выберите из списка';
    };

    if (applyButton) {
        applyButton.addEventListener('click', () => {
            updateSelectedValues();
            closeDropdown();
        });
    }

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

    let currentIndex = 0;

    const isPhoneValid = (phone) => phone.length === 17; // +998 XX XXX XX XX (17 символов)

    const formatPhoneInput = (phoneInput) => {
        phoneInput.addEventListener('input', () => {
            let value = phoneInput.value.replace(/\D/g, '');

            if (!value.startsWith('998')) {
                value = '998' + value;
            }

            value = value.slice(0, 12);

            const formattedValue = `+${value.slice(0, 3)} ${value.slice(3, 5)} ${value.slice(5, 8)} ${value.slice(8, 10)} ${value.slice(10, 12)}`;
            phoneInput.value = formattedValue.trim();
        });

        phoneInput.addEventListener('keydown', (event) => {
            if (event.key === 'Backspace') {
                const cursorPosition = phoneInput.selectionStart;
                const value = phoneInput.value;

                if (cursorPosition <= 5) {
                    event.preventDefault();
                    return;
                }

                const prevChar = value[cursorPosition - 1];
                if (/\s/.test(prevChar)) {
                    event.preventDefault();

                    const newValue = value.slice(0, cursorPosition - 1) + value.slice(cursorPosition);
                    phoneInput.value = newValue;

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
                phoneInput.value = '';
            }
        });
    };

    const phoneInputs = document.querySelectorAll('.phone-field');
    phoneInputs.forEach((phoneInput) => {
        formatPhoneInput(phoneInput);
    });

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

                nextItem.classList.remove('hidden');
                currentIndex++;

                btn.classList.add('btn_no-active');
            }

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

    const checkInputs = () => {
        const isCurrentPasswordFilled = currentPasswordInput.value.trim() !== "";
        const isPasswordFilled = passwordInput.value.trim() !== "";
        const isRepeatPasswordFilled = repeatPasswordInput.value.trim() !== "";

        if (isCurrentPasswordFilled && isPasswordFilled && isRepeatPasswordFilled) {
            submitButton.removeAttribute("disabled");
        } else {
            submitButton.setAttribute("disabled", "disabled");
        }
    };

    [currentPasswordInput, passwordInput, repeatPasswordInput].forEach(input => {
        input.addEventListener("input", checkInputs);
    });
}

/*- mobile-menu -*/
const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const closeBtn = document.querySelector('.mobile-menu__close');
const body = document.body;

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('show');
    body.classList.add('m-scroll-none');
});

closeBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('show');
    body.classList.remove('m-scroll-none');

});
