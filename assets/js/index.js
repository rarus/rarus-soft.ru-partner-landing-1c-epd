document.addEventListener("DOMContentLoaded", () => {
	const anchorLinks = Array.from(document.querySelectorAll(".js-anchor"));

    if (anchorLinks.length) {
        anchorLinks.forEach(item => {
            item.addEventListener("click", (event) => {
                event.preventDefault();
                const href = event.target.getAttribute("href");
                const block = document.querySelector(href);
                if (block) {
                    const topPosition = block.getBoundingClientRect().top + window.pageYOffset - 90;
                    window.scrollTo({
                        top: topPosition,
                        behavior: "smooth"
                    });
                }
            });
        });
    }
})

const showError = (form, field) => {
    const errorMessages = {
        name: "Укажите ваше имя",
        company: "Укажите название компании",
        phone: "Укажите корректный номер телефона",
        email: "Укажите корректный e-mail",
        agreement: "Для продолжения регистрации необходимо подтвердить отметку об ознакомлении."
    };

    const fieldInput = form.querySelector(`.js-${field}-input`);
    if (fieldInput) {
        // Добавить класс ошибки у поля формы
        fieldInput.classList.add("input--error");

        // Вывести сообщение об ошибке
        const errorDiv = fieldInput.closest(".js-block").querySelector(".js-error");
        if (errorDiv) {
            errorDiv.textContent = errorMessages[field];
            errorDiv.style.display = "block";
        }
    }
};

const removeError = (form, field) => {
    const fieldInput = form.querySelector(`.js-${field}-input`);
    if (fieldInput) {
        fieldInput.classList.remove("input--error");

        // Удалить сообщение об ошибке
        const errorDiv = fieldInput.closest(".js-block").querySelector(".js-error");
        if (errorDiv) {
            errorDiv.style.display = "none";
            errorDiv.textContent = "";
        }
    }
};

const clearErrors = (form) => {
    // Удалить классы ошибок у всех полей формы
    const errorInputs = form.querySelectorAll(".js-input");
    errorInputs.forEach(input => {
        if (input.classList.contains("input--error")) {
            input.classList.remove("input--error");
        }
    });

    // Скрыть все сообщения об ошибках
    const errorMessages = form.querySelectorAll(".js-error");
    errorMessages.forEach(message => {
        message.style.display = "none";
        message.textContent = "";
    });
};

const submitForm = (event) => {
    event.preventDefault();

    const form = event.target;
    const nameInput = form.querySelector(".js-name-input");
    const companyInput = form.querySelector(".js-company-input");
    const phoneInput = form.querySelector(".js-phone-input");
    const emailInput = form.querySelector(".js-email-input");
    const agreement = form.querySelector(".js-agreement-input");

    // Сначала очистить все предыдущие ошибки
    clearErrors(form);

    let isValid = true;

    // Валидация имени
    if (!nameInput.value.trim()) {
        showError(form,"name");
        isValid = false;
    } else {
        removeError(form, "name");
    }

    // Валидация компании
    if (!companyInput.value.trim()) {
        showError(form,"company");
        isValid = false;
    } else {
        removeError(form, "company");
    }

    // Валидация телефона
    if (!phoneInput.value.trim()) {
        showError(form,"phone");
        isValid = false;
    } else {
        removeError(form, "phone");
    }

    // Валидация email
    if (!emailInput.value.trim()) {
        showError(form,"email");
        isValid = false;
    } else {
        removeError(form, "email");
    }

    // Валидация чекбокса согласия с обработкой ПД
    if (!agreement.checked) {
        showError(form,"agreement");
        isValid = false;
    } else {
        removeError(form, "agreement");
    }

    if (isValid) {
        form.submit();
        // Если валидация пройдена, — сбросить форму
        form.reset();
        // Очистить классы ошибок после успешной отправки
        clearErrors(form);
    }
};