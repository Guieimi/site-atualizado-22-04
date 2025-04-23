const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirmation = document.getElementById("password-confirmation");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    checkForm();
});

email.addEventListener("blur", () => checkInput(email, "O email é obrigatório."));
username.addEventListener("blur", () => checkInput(username, "Preencha um username!"));
password.addEventListener("blur", checkInputPassword);
passwordConfirmation.addEventListener("blur", checkInputPasswordConfirmation);

function checkInput(input, errorMessage) {
    const value = input.value;
    if (value === "") {
        errorInput(input, errorMessage);
    } else {
        clearError(input);
    }
}

function checkInputPassword() {
    const passwordValue = password.value;
    if (passwordValue === "") {
        errorInput(password, "A senha é obrigatória.");
    } else if (passwordValue.length < 8) {
        errorInput(password, "A senha precisa ter no mínimo 8 caracteres.");
    } else {
        clearError(password);
    }
}

function checkInputPasswordConfirmation() {
    const passwordValue = password.value;
    const confirmationPasswordValue = passwordConfirmation.value;
    if (confirmationPasswordValue === "") {
        errorInput(passwordConfirmation, "A confirmação de senha é obrigatória.");
    } else if (confirmationPasswordValue !== passwordValue) {
        errorInput(passwordConfirmation, "As senhas não são iguais.");
    } else {
        clearError(passwordConfirmation);
    }
}

function checkForm() {
    checkInput(username, "Preencha um username!");
    checkInput(email, "O email é obrigatório.");
    checkInputPassword();
    checkInputPasswordConfirmation();

    const formItems = form.querySelectorAll(".form-content");
    const isValid = [...formItems].every(item => item.classList.contains("form-content"));
    if (isValid) {
        alert("CADASTRADO COM SUCESSO!");
    }
}

function errorInput(input, message) {
    const formItem = input.parentElement;
    const textMessage = formItem.querySelector("a");
    textMessage.innerText = message;
    formItem.className = "form-content error";
}

function clearError(input) {
    const formItem = input.parentElement;
    formItem.className = "form-content";
}
