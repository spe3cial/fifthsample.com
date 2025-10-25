// === АНИМАЦИЯ ФОНА (Canvas) ===
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
let w, h, stars;

function resizeCanvas() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  stars = Array.from({ length: 120 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2,
    s: Math.random() * 0.5 + 0.2,
  }));
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function drawStars() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#00ffff";
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
    star.y += star.s;
    if (star.y > h) star.y = 0;
  });
  requestAnimationFrame(drawStars);
}
drawStars();


// === АНИМАЦИЯ ЗАГОЛОВКА ===
const title = document.getElementById("animatedTitle");
if (title) {
  const text = title.textContent;
  title.textContent = "";
  let i = 0;
  function animateText() {
    if (i < text.length) {
      title.textContent += text[i];
      i++;
      setTimeout(animateText, 80);
    }
  }
  animateText();
}


// === КНОПКА СКРОЛЛА ВВЕРХ ===
const scrollBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 400 ? "block" : "none";
});
scrollBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));


// === МЕНЮ ===
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});


// === ПЕРЕКЛЮЧЕНИЕ ТЕМЫ ===
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
});


// === АНИМАЦИЯ КАРТОЧЕК ПРИ НАВЕДЕНИИ ===
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.transform = `rotateY(${(x / rect.width - 0.5) * 10}deg)
                            rotateX(${-(y / rect.height - 0.5) * 10}deg) scale(1.05)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
  });
});


// === МОДАЛКА "О ПРОЕКТЕ" ===
const openInfo = document.getElementById("openInfo");
const aboutModal = document.getElementById("aboutModal");
const closeAbout = document.getElementById("closeAbout");

openInfo.addEventListener("click", () => {
  aboutModal.style.display = "flex";
  setTimeout(() => aboutModal.classList.add("active"), 10);
  document.body.style.overflow = "hidden";
});

closeAbout.addEventListener("click", () => {
  aboutModal.classList.remove("active");
  setTimeout(() => (aboutModal.style.display = "none"), 300);
  document.body.style.overflow = "";
});

aboutModal.addEventListener("click", e => {
  if (e.target === aboutModal) {
    aboutModal.classList.remove("active");
    setTimeout(() => (aboutModal.style.display = "none"), 300);
    document.body.style.overflow = "";
  }
});


// === МОДАЛКА "ФАКТ О ТУРНИРЕ" ===
const factsModal = document.getElementById("factsModal");
const openFacts = document.getElementById("tournamentInfo");
const closeFacts = document.getElementById("closeFacts");

openFacts.addEventListener("click", () => {
  factsModal.style.display = "flex";
  setTimeout(() => factsModal.classList.add("active"), 10);
  document.body.style.overflow = "hidden";
});

closeFacts.addEventListener("click", () => {
  factsModal.classList.remove("active");
  setTimeout(() => (factsModal.style.display = "none"), 300);
  document.body.style.overflow = "";
});

factsModal.addEventListener("click", e => {
  if (e.target === factsModal) {
    factsModal.classList.remove("active");
    setTimeout(() => (factsModal.style.display = "none"), 300);
    document.body.style.overflow = "";
  }
});


// === АНИМАЦИЯ ЛОГОТИПА ===
const logo = document.getElementById("logo");
logo.addEventListener("mouseenter", () => {
  logo.style.transition = "transform 0.5s ease";
  logo.style.transform = "scale(1.2) rotate(5deg)";
});
logo.addEventListener("mouseleave", () => {
  logo.style.transform = "scale(1) rotate(0deg)";
});


// === ПЛАВНОЕ ПОЯВЛЕНИЕ ЭЛЕМЕНТОВ ПРИ ПРОКРУТКЕ ===
const fadeElems = document.querySelectorAll(".fade");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});
fadeElems.forEach(el => observer.observe(el));
// === УЛУЧШЕННАЯ ВАЛИДАЦИЯ GMAIL ===
const subscribeBtn = document.getElementById("subscribeBtn");
const subscribeInput = document.getElementById("subscribeInput");

// Факты о Gmail для уведомлений
const gmailFacts = [
    "Gmail был запущен 1 апреля 2004 года!",
    "Gmail предлагает 15 ГБ бесплатного хранилища!",
    "Gmail поддерживает более 100 языков!",
    "Gmail имеет встроенного чат-бота Google Assistant!"
];

if (subscribeBtn && subscribeInput) {
    subscribeBtn.addEventListener("click", validateGmail);
    subscribeInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") validateGmail();
    });
    
    // Добавляем индикатор валидности
    subscribeInput.addEventListener("blur", checkGmailValidity);
    subscribeInput.addEventListener("input", checkGmailValidity);
}

function validateGmail() {
    const email = subscribeInput.value.trim();
    
    if (!email) {
        showToast("✉️ Пожалуйста, введите Gmail адрес", true);
        shakeElement(subscribeInput);
        return;
    }
    
    // Расширенная проверка Gmail
    const gmailRegex = /^[a-zA-Z0-9][a-zA-Z0-9._%+-]{0,63}@gmail\.com$/;
    
    if (!gmailRegex.test(email)) {
        showToast("❌ Разрешены только адреса @gmail.com", true);
        shakeElement(subscribeInput);
        subscribeInput.focus();
        return;
    }
    
    // Дополнительная проверка длины имени пользователя
    const username = email.split('@')[0];
    if (username.length < 6 || username.length > 30) {
        showToast("❌ Имя пользователя Gmail должно быть от 6 до 30 символов", true);
        shakeElement(subscribeInput);
        subscribeInput.focus();
        return;
    }
    
    // Успешная подписка
    const randomFact = gmailFacts[Math.floor(Math.random() * gmailFacts.length)];
    showToast(`✅ Подписка оформлена! ${randomFact}`);
    
    // Анимация успеха
    subscribeInput.style.borderColor = "#00ff88";
    subscribeInput.style.boxShadow = "0 0 20px rgba(0, 255, 136, 0.3)";
    
    // Сброс через 2 секунды
    setTimeout(() => {
        subscribeInput.value = "";
        subscribeInput.style.borderColor = "";
        subscribeInput.style.boxShadow = "";
    }, 2000);
    
    // Отправка данных (заглушка)
    console.log("Gmail подписка успешна:", email);
}

function checkGmailValidity() {
    const email = subscribeInput.value.trim();
    const gmailRegex = /^[a-zA-Z0-9][a-zA-Z0-9._%+-]{0,63}@gmail\.com$/;
    
    if (!email) {
        subscribeInput.style.borderColor = "";
        return;
    }
    
    if (gmailRegex.test(email)) {
        subscribeInput.style.borderColor = "#00ff88";
        subscribeInput.style.boxShadow = "0 0 10px rgba(0, 255, 136, 0.2)";
    } else {
        subscribeInput.style.borderColor = "#ff6b6b";
        subscribeInput.style.boxShadow = "0 0 10px rgba(255, 107, 107, 0.2)";
    }
}

// === АНИМАЦИЯ ВСТРЯХИВАНИЯ ПРИ ОШИБКЕ ===
function shakeElement(element) {
    element.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

// === ФУНКЦИЯ УВЕДОМЛЕНИЙ ===
function showToast(message, isError = false) {
    const existingToasts = document.querySelectorAll('.gmail-toast');
    existingToasts.forEach(toast => toast.remove());
    
    const toast = document.createElement('div');
    toast.className = 'gmail-toast';
    toast.innerHTML = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        background: ${isError ? 
            'linear-gradient(135deg, #ff6b6b, #c44569)' : 
            'linear-gradient(135deg, #00b894, #00cec9)'};
        box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
        transform: translateX(400px);
        transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        border-left: 4px solid ${isError ? '#ff4757' : '#00b894'};
        max-width: 350px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (toast.parentNode) toast.remove();
        }, 400);
    }, 4000);
}

// Добавьте этот CSS для анимации встряхивания:
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-8px); }
        75% { transform: translateX(8px); }
    }
    
    .gmail-toast {
        font-family: inherit;
    }
    
    #subscribeInput::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }
    
    #subscribeInput:valid {
        border-color: #00ff88 !important;
    }
`;
document.head.appendChild(style);

// === ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ ===
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("subscribeInput");
    if (input) {
        input.placeholder = "yourname@gmail.com";
        input.setAttribute("title", "Только Gmail адреса разрешены");
    }
});