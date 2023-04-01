import './styles/main.scss';
import axios from 'axios';

const URL = 'https://jsonplaceholder.typicode.com/posts';

const labelMap = {
    firstname: document.querySelector('#label_firstname'),
    lastname: document.querySelector('#label_lastname'),
    date: document.querySelector('#label_date'),
    email: document.querySelector('#label_email'),
    password: document.querySelector('#label_password'),
    checkPassword: document.querySelector('#label_checkPassword'),
}

const inputMap = {
    firstname: document.querySelector('#firstname'),
    lastname: document.querySelector('#lastname'),
    date: document.querySelector('#date'),
    email: document.querySelector('#email'),
    password: document.querySelector('#password'),
    checkPassword: document.querySelector('#checkPassword'),
}

const postData = async () => {
    try {
        const data = await axios.post(URL, {
            name: 'Nik',
            fam: 'Petr'
        });
        console.log(data.data);
    } catch (error) {
        console.log(error);
    }
}


const handleError = (name, error) => {
    labelMap[name].classList.add('error');
    inputMap[name].classList.add('input__error');
    inputMap[name].classList.remove('input__success');

    labelMap[name].innerHTML = error;
}

const handleSuccess = (name) => {
    inputMap[name].classList.add('input__success');
    labelMap[name].classList.remove('error');
}


const btn = document.querySelector('#submit');

const handleFullname = (value, name) => {
    const errorMinLength = 'You need to enter more than 1 symbol.';
    const errorMaxLength = 'You do not need to enter more than 25 symbol.';

    if (value.length < 2) {
        handleError(name, errorMinLength);
    } else if (value.length > 26) {
        handleError(name, errorMaxLength);
    } else {
        handleSuccess(name);
    }

    checkDisable()
}

const handleDate = (value, name) => {
    const errorMessage =  'Incorrect information.';

    if (value > new Date().toISOString().slice(0, 10)) {
        handleError(name, errorMessage);
    } else {
        handleSuccess(name);
    }

    checkDisable()
}

const handleEmail = (value, name) => {
    const errorMessage = 'You forgot something)';

    if (!(/(.+)@(.+){2,}\.(.+){2,}/.test(value))) {
        handleError(name, errorMessage);
    } else {
        handleSuccess(name);
    }

    checkDisable()
}

let currentPassword = '';
let checkPassword = '';

const handlePassword = (value, name) => {
    const errorMinLength = 'You need to enter more than 8 symbol.';
    const errorUpper = 'You must have at least 1 uppercase symbol.';
    const errorNumber = 'You must have at least 1 number.';
    const errorSymbol = 'You must have at least 1 special symbol.';

    if (value.length < 8) {
        handleError(name, errorMinLength);
    } else if (!(/[A-Z]/.test(value))) {
        handleError(name, errorUpper);
    } else if(!(/\d/.test(value))) {
        handleError(name, errorNumber);
    } else if (!(/[`!@#$%]/.test(value))) {
        handleError(name, errorSymbol);
    } else {
        handleSuccess(name);
    }

    currentPassword = value;
    checkDisable()
}

const handleCheckPassword = (value, name) => {
    const errorMessage = 'Passwords do not match.'

    if (currentPassword !== value) {
        handleError(name, errorMessage);
    } else {
        handleSuccess(name);
    }

    checkPassword = value;
    checkDisable()
}


const checkDisable = () => {
    const result = Object.values(inputMap).every((it) => it.className.includes('success'));
    if (result) {
        btn.classList.remove('disable');
    } else {
        btn.classList.add('disable');
    }
}

const handleSubmit = (e) => {
    e.preventDefault();
    postData();
}

inputMap.firstname.oninput = (e) => handleFullname(e.target.value, 'firstname');
inputMap.lastname.oninput = (e) => handleFullname(e.target.value, 'lastname');
inputMap.date.oninput = (e) => handleDate(e.target.value, 'date');
inputMap.email.oninput = (e) => handleEmail(e.target.value, 'email');
inputMap.password.oninput = (e) => handlePassword(e.target.value, 'password');
inputMap.checkPassword.oninput = (e) => handleCheckPassword(e.target.value, 'checkPassword');

btn.onclick = (e) => handleSubmit(e);