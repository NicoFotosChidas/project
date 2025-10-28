// Espera que DOM cargue
document.addEventListener("DOMContentLoaded", () => {
    const navButtons = document.querySelectorAll("nav button");
    const sections = document.querySelectorAll("main section");

    // Cambiar secciones al hacer click en nav buttons
    navButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remover active de todos los botones
            navButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            // Mostrar solo la sección relacionada
            const target = button.getAttribute("data-section");
            sections.forEach(sec => {
                if (sec.id === target) {
                    sec.classList.add("active");
                } else {
                    sec.classList.remove("active");
                }
            });
        });
    });

    // Login formulario
    const loginForm = document.getElementById("login-form");
    const loginMsg = document.getElementById("login-msg");
    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        // Simulación de login
        const email = loginForm["login-email"].value.trim();
        const password = loginForm["login-password"].value.trim();

        if(email === "" || password === "") {
            loginMsg.textContent = "Por favor completa todos los campos.";
            loginMsg.style.color = "red";
            return;
        }

        // Aquí iría lógica real de autenticación...
        loginMsg.style.color = "green";
        loginMsg.textContent = `¡Bienvenido de nuevo, ${email}!`;
        loginForm.reset();

        // Mostrar sección registro emociones tras login
        activateSection("emotions");
        activateNavButton("emotions");
    });

    // Registro formulario
    const registerForm = document.getElementById("register-form");
    const registerMsg = document.getElementById("register-msg");
    registerForm.addEventListener("submit", e => {
        e.preventDefault();

        const name = registerForm["reg-name"].value.trim();
        const email = registerForm["reg-email"].value.trim();
        const password = registerForm["reg-password"].value.trim();

        if(name === "" || email === "" || password === "") {
            registerMsg.textContent = "Por favor completa todos los campos.";
            registerMsg.style.color = "red";
            return;
        }

        // Aquí iría lógica real de registro...
        registerMsg.style.color = "green";
        registerMsg.textContent = `Cuenta creada exitosamente. ¡Bienvenido, ${name}!`;
        registerForm.reset();

        // Mostrar sección registro emociones tras registro
        activateSection("emotions");
        activateNavButton("emotions");
    });

    // Registro emociones formulario
    const emotionForm = document.getElementById("emotion-form");
    const emotionMsg = document.getElementById("emotion-msg");
    const emotionList = document.getElementById("emotion-list");
    const emotionHistoryCard = document.getElementById("emotion-history");

    // Usaremos localStorage para guardar datos simulando base
    const STORAGE_KEY = "yana_emotions";

    // Cargar historial al inicio
    loadEmotionHistory();

    emotionForm.addEventListener("submit", e => {
        e.preventDefault();

        const mood = emotionForm["mood-select"].value;
        const notes = emotionForm["mood-notes"].value.trim();
        if (!mood) {
            emotionMsg.style.color = "red";
            emotionMsg.textContent = "Por favor selecciona un estado de ánimo.";
            return;
