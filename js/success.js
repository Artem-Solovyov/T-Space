const dialog = document.querySelector(".dialog");
const dialogContainer = document.querySelector(".dialog-container");
const inputField = document.querySelector(".footer-input");

const today = new Date();
const time = `${String(today.getHours()).padStart(2, "0")}:${String(today.getMinutes()).padStart(2, "0")}`;
document.querySelectorAll(".now-time").forEach((el) => (el.innerHTML = time));

// Прокрутка контейнера вниз
const scrollToBottom = () => {
  dialogContainer.scrollTop = dialogContainer.scrollHeight;
};

document.addEventListener("DOMContentLoaded", () => {
  const storedData = localStorage.getItem("formData");

  if (storedData) {
    const data = JSON.parse(storedData);

    console.log("Данные из localStorage:", data);

    dialog.innerHTML += `<div class="message message-bold message-01">
      Дякую! Наш менеджер обов'язково зв'яжеться з вами найближчим часом!<br><br>
      Ваші данні:<br><br>
      Name: ${data.name}<br>
      Tel: ${data.tel}<br>
      Email: ${data.email}<br>
       <div class="message-time">${time}</div>
     </div>`;
    setTimeout(() => {
      document.querySelector(`.message-01`).classList.add("show");
      scrollToBottom();
    }, 1000);
  }
});

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
};
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
