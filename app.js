// CHARACTERS
const lettersLower = 'abcdefghijklmnopqrstuvwxyz';
const lettersUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '~!@#$%^&*()_-+={[}]|:;<,>.?/';

// UI ELEMENTS
const passwordForm = document.querySelector('#passwordForm').addEventListener('submit', getFormData);
const passwordText = document.querySelector('.passwordText');
const copyBtn = document.querySelector('#copyBtn');

copyBtn.addEventListener('click', copyPassword);

function getFormData(e) {
    const length = document.querySelector('input[type="radio"]:checked').value;

    let characters = '';

    const options = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'));
    if (options.length !== 0) {
        options.forEach((option) => {
            if (option.value === 'lowercase') {
                characters += lettersLower;
            }

            if (option.value === 'uppercase') {
                characters += lettersUpper;
            }

            if (option.value === 'numbers') {
                characters += numbers;
            }

            if (option.value === 'symbols') {
                characters += symbols;
            }
        });

        generatePassword(length, characters);
    } else {
        showAlert('warning', 'Please select character options.');
    }

    e.preventDefault();
}

function generatePassword(length, characters) {
    let password = '';

    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    showPassword(password);
}

function showPassword(password) {
    copyBtn.classList.remove('disabled');
    passwordText.classList.add('highlight');
    passwordText.value = password;

    setTimeout(() => {
        passwordText.classList.remove('highlight');
    }, 2000);
}

function copyPassword() {
    passwordText.select();
    passwordText.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(passwordText.value);

    showAlert('success', 'Password copied!');
}

function showAlert(alertType, alertMessage) {
    const passwordContainer = document.querySelector('.password-container');
    // const passwordForm = document.querySelector('#passwordForm');
    const alert = document.createElement('div');

    if (alertType === 'warning') {
        alert.className = 'alert alert-warning';
    } else {
        alert.className = 'alert alert-success';
    }

    alert.innerText = alertMessage;

    // passwordContainer.appendChild(alert);
    passwordContainer.after(alert);

    setTimeout(() => {
        alert.remove();
    }, 3000);
}
