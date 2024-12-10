const dialogContainer = document.querySelector(".dialog-container");
const dialog = document.querySelector(".dialog");
const inputField = document.querySelector(".footer-input");

const modal = document.getElementById("modal");
const closeModal = document.getElementById("close");
const form = document.getElementById("userForm");

const today = new Date();
const time = `${String(today.getHours()).padStart(2, "0")}:${String(today.getMinutes()).padStart(2, "0")}`;
document.querySelectorAll(".now-time").forEach((el) => (el.innerHTML = time));

// Общая функция для добавления сообщений
let messageCount = 0;
const addMessage = (text, isUser = false) => {
  messageCount++;
  const messageClass = isUser ? "message-user" : "";
  dialog.innerHTML += `<div  class="message message-bold ${messageClass} ${`message-${messageCount}`}">
       ${text}
       <div class="message-time">${time}</div>
     </div>`;

  scrollToBottom();

  setTimeout(() => {
    document.querySelector(`.message-${messageCount}`).classList.add("show");
  }, 100);
  attachButtonListeners();
};

// Прокрутка контейнера вниз
const scrollToBottom = () => {
  dialogContainer.scrollTop = dialogContainer.scrollHeight;
};

// Логика для обработки событий
const handleClick = (id) => {
  switch (id) {
    case "btn1-n":
      addMessage("Дякую за вашу відповідь, чекаємо на ваше повернення!");

      break;
    case "btn1-y":
      addMessage("Чи був у вас досвід пов'язаний із Арбітражем трафіку?");

      addDialogActions([
        { id: "btn2-y", text: "Так" },
        { id: "btn2-n", text: "Ні" },
        { id: "btn2-other", text: "Чув про це" },
      ]);
      break;
    case "btn2-y":
    case "btn2-n":
    case "btn2-other":
      addMessage("Скільки часу ви могли б приділяти на день?");
      addDialogActions([
        { id: "btn3-1", text: "Одна година" },
        { id: "btn3-2", text: "2-3 години" },
        { id: "btn3-3", text: "5 і більше" },
      ]);
      break;
    case "btn3-1":
    case "btn3-2":
    case "btn3-3":
      addMessage(
        "Дякую! Наша компанія дуже зацікавлена ​​вами, для подальшої підтримки зв'язку, будь ласка, заповніть форму."
      );
      setTimeout(() => {
        modal.classList.add("open");
      }, 2000);

      break;
  }
};

// Добавление кнопок действий
let actionCount = 0;
const addDialogActions = (buttons) => {
  actionCount++;
  const actionsHtml = buttons.map((btn) => `<div class="dialog-button " id="${btn.id}">${btn.text}</div>`).join("");
  dialog.innerHTML += `<div class="dialog-actions ${`action-${actionCount}`}">${actionsHtml}</div>`;
  scrollToBottom();
  attachButtonListeners();
  setTimeout(() => {
    document.querySelector(`.action-${actionCount}`).classList.add("show");
  }, 100);
};

// Привязка событий к кнопкам
const attachButtonListeners = () => {
  document.querySelectorAll(".dialog-button").forEach((el) => {
    el.addEventListener("click", (e) => {
      const id = e.target.id;
      const text = e.target.textContent;
      addMessage(text, true);
      setTimeout(() => handleClick(id), 400);
    });
  });
};

// Отправка сообщений при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  const messages = [
    "Запускаємо курс з арбітражу трафіку! Отримайте цінні знання від експертів. Поглиблене вивчення сучасних стратегій.",
    "Приєднуйтесь до нашого нового курсу! Інтерактивні заняття, практичні завдання, сертифікат. Відмінна можливість підвищити кваліфікацію.",
    "Учасники отримають доступ до ексклюзивних матеріалів, консультацій та мережі контактів. Вивчайте нові тенденції арбітражу трафіку.",
    "Хочете дізнатись більше?",
  ];

  const showMessages = () => {
    messages.forEach((message, index) => {
      setTimeout(() => {
        addMessage(message);
        if (index === messages.length - 1) {
          addDialogActions([
            { id: "btn1-y", text: "Так" },
            { id: "btn1-n", text: "Ні" },
          ]);
          document.querySelector(".dialog-date").classList.add("hidden");
        }
      }, index * 1000);
    });
  };

  showMessages();
});

// Отслеживаем поле ввода и добавляем сообщение по нажатию Enter
inputField.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    if (inputField.value.length > 0) {
      event.preventDefault();
      addMessage(inputField.value, true);
      inputField.value = "";
    }
  }
});

// =================FORM=======================
const getFormData = (form) => {
  const formData = new FormData(form);
  const data = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });

  return data;
};

document.addEventListener("DOMContentLoaded", () => {
  const nameField = document.getElementById("name");
  const phoneField = document.getElementById("phone");
  const emailField = document.getElementById("email");

  closeModal.addEventListener("click", () => {
    modal.classList.remove("open");
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Валидация полей формы
    if (nameField.value.length < 4) {
      nameField.parentElement.classList.add("error");
      return;
    } else {
      nameField.parentElement.classList.remove("error");
    }

    const phonePattern = /^\+?[0-9]{10,15}$/;
    if (!phonePattern.test(phoneField.value.trim())) {
      phoneField.parentElement.classList.add("error");
      return;
    } else {
      phoneField.parentElement.classList.remove("error");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailField.value.trim())) {
      emailField.parentElement.classList.add("error");
      return;
    } else {
      emailField.parentElement.classList.remove("error");
    }

    const data = getFormData(form);

    localStorage.setItem("formData", JSON.stringify(data));
    // modal.classList.remove("open");
    window.location.href = "success.html";
  });
});
