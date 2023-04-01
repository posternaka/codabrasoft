import './styles/main.scss';
import axios from 'axios';

const URL = 'https://jsonplaceholder.typicode.com/posts';

const btn = document.querySelector('#submit');

const handlerError = (name, error) => {
    settings[name].input.classList.add('input__error');
    settings[name].input.classList.remove('input__success');
    settings[name].label.classList.add('label__error');
    settings[name].label.innerHTML = error;
}

const handlerSuccess = (name) => {
    settings[name].input.classList.add('input__success');
    settings[name].label.classList.remove('label__error');
}

const handlerFullname = (value, name) => {
    const errorMinLength = 'You need to enter more than 1 symbol.';
    const errorMaxLength = 'You do not need to enter more than 25 symbol.';

    if (value.length < 2) {
        handlerError(name, errorMinLength);
    } else if (value.length > 25) {
        handlerError(name, errorMaxLength);
    } else {
        handlerSuccess(name);
    }
}

const handlerDate = (value, name) => {
    const errorMessage =  'Incorrect information.';

    if (value > new Date().toISOString().slice(0, 10)) {
        handlerError(name, errorMessage);
    } else {
        handlerSuccess(name);
    }
}

const handlerEmail = (value, name) => {
    const errorMessage = 'You forgot something)';

    if (!(/(.+)@(.+){2,}\.(.+){2,}/.test(value))) {
        handlerError(name, errorMessage);
    } else {
        handlerSuccess(name);
    }
}

let checkPassword = '';
let currentPassword = '';

const handlerPassword = (value, name) => {
    const errorMinLength = 'You need to enter more than 8 symbol.';
    const errorUpper = 'You must have at least 1 uppercase symbol.';
    const errorNumber = 'You must have at least 1 number.';
    const errorSymbol = 'You must have at least 1 special symbol.';

    if (value.length < 8) {
        handlerError(name, errorMinLength);
    } else if (!(/[A-Z]/.test(value))) {
        handlerError(name, errorUpper);
    } else if(!(/\d/.test(value))) {
        handlerError(name, errorNumber);
    } else if (!(/[`!@#$%]/.test(value))) {
        handlerError(name, errorSymbol);
    } else {
        handlerSuccess(name);
    }

    currentPassword = value;
    handlerCheckPassword(checkPassword, 'checkPassword');
}

const handlerCheckPassword = (value, name) => {
    const errorMessage = 'Passwords do not match.'

    if (currentPassword !== value) {
        handlerError(name, errorMessage);
    } else {
        handlerSuccess(name);
    }

    checkPassword = value;
}

const handlerMap = {
    firstname: handlerFullname,
    lastname: handlerFullname,
    date: handlerDate,
    email: handlerEmail,
    password: handlerPassword,
    checkPassword: handlerCheckPassword,  
}

const settings = [...document.querySelectorAll('input')].reduce((acc, it) => {
    acc[it.id] = {
        label: document.querySelector(`#error_${it.id}`),
        input: document.querySelector(`#${it.id}`),
        handler: handlerMap[it.id],
    }
    return acc;
}, {})


const createUser = async (body) => {
    try {
        const data = await axios.post(URL, body);
        console.log(data.data);
    } catch (error) {
        console.log(error);
    }
}

const postData = async () => {
    const user = Object.entries(settings).reduce((acc, [key, value]) => {
        acc[key] = value.input.value;
        return acc;
    }, {});

    createUser(user);
}

const checkDisabled = () => {
    const result = Object.values(settings).every((it) => it.input.className.includes('success'));
    if (result) {
        btn.classList.remove('disabled');
    } else {
        btn.classList.add('disabled');
    }
}

const handlerSubmit = (e) => {
    e.preventDefault();
    postData();

    Object.keys(settings).forEach((it) => {
        settings[it].input.value = '';
        settings[it].input.classList.remove('input__success');
        settings[it].input.classList.remove('input__error');
    });

    checkDisabled();
}

const createValueInput = (name, setting) => {
    settings[name].input.oninput = (e) => {
        setting(e.target.value, [name]);
        checkDisabled();
    }
}

Object.entries(settings).forEach(([key, value]) => {
    createValueInput(key, value.handler);
})

btn.onclick = (e) => handlerSubmit(e);