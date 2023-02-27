const inputSlider = document.querySelector('[data-lengthSlider]')
const lengthDisplay = document.querySelector('[data-lengthNumber]')
const passwordDisplay = document.querySelector('[data-passwordDisplay]')
const copyBtn = document.querySelector('[data-copy]')
const copyMsg = document.querySelector('[data-copyMsg]')
const uppercaseCheck = document.querySelector('#uppercase')
const lowercaseCheck = document.querySelector('#lowercase')
const numbersCheck = document.querySelector('#numbers')
const symbolsCheck = document.querySelector('#symbols')
const indicator = document.querySelector('[data-indicator]')
const generateBtn = document.querySelector('.generateButton')
const allCheckBox = document.querySelectorAll('input[type=checkbox]')
const symbols = "!@#$%&*?^{}[]()|\/~,;:.<>";

let password = "";
let passwordLength = 6;
let checkCount = 0;
handleSlinder()
setIndicator('#ccc')
function handleSlinder() {
    inputSlider.value = passwordLength
    lengthDisplay.innerText = passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength - min)*100/(max-min)) + "% 100%";
}

function setIndicator(color) {
    indicator.style.background = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max-min) + min);
}

function generateRandomNumber() {
    return getRndInteger(0, 9);
}

function generateLowerCase() {
    return String.fromCharCode(getRndInteger(97, 123));
}

function generateUpperCase() {
    return String.fromCharCode(getRndInteger(65, 91));
}

function generateSymbol() {
    return symbols.charAt(getRndInteger(0, symbols.length-1));
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasSymbol = false;
    let hasNumber = false;
    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(symbolsCheck.checked) hasSymbol = true;
    if(numbersCheck.checked) hasNumber = true;

    if(hasUpper && hasLower && (hasSymbol || hasNumber) && passwordLength >=8) {
        setIndicator("#0f0")
    } else if((hasUpper || hasLower) && (hasNumber || hasSymbol) && passwordLength >=6) {
        setIndicator("#ff0")
    } else {
        setIndicator("#f00")
    }
}

async function copyContent() {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "copied";
    copyMsg.classList.add("active")
    setTimeout(() => copyMsg.classList.remove("active"), 3000);
}

inputSlider.addEventListener('input', (element) => {
    passwordLength = element.target.value;
    handleSlinder();
})

copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value) {
        copyContent();
    }
})

allCheckBox.forEach((each) => each.addEventListener('click', () => {
    checkCount = 0
    allCheckBox.forEach((each) => {
        if(each.checked) {
            checkCount++;
        }
    });
}))

function shuffle(array) {
    for(let i = array.length - 1; i >= 0; i--) {
        const k = Math.round(Math.random() * i)
        const temp = array[i];
        array[i] = array[k];
        array[k] = temp;
    }
    let str = "";
    array.forEach((each) => str += each)
    return str;
}


generateBtn.addEventListener('click', () => {

    if(checkCount <= 0) return;

    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlinder();
    }

    password = "";

    while(password.length < passwordLength) {
        if(uppercaseCheck.checked && password.length < passwordLength) {
            password += generateUpperCase();
        }
        if(lowercaseCheck.checked && password.length < passwordLength) {
            password += generateLowerCase();
        }
        if(symbolsCheck.checked && password.length < passwordLength) {
            password += generateSymbol();
        }
        if(numbersCheck.checked && password.length < passwordLength) {
            password += generateRandomNumber();
        }
    }
    password = shuffle(Array.from(password))
    passwordDisplay.value = password;
    calcStrength();
})