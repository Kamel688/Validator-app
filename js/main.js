const form = document.querySelector(".form");
const img = document.querySelector(".form__img-box");
const registerText = document.querySelector(".form__login-text-register-span");
const registerForm = document.querySelector(".form__register");

const username = document.querySelector(".form__register-input-username");
const email = document.querySelector(".form__register-input-email");
const password = document.querySelector(".form__register-input-password");
const repeatPassword = document.querySelector(".form__register-input-repeat-password");
const clearBtn = document.querySelector(".form__btn-clear");
const registerBtn = document.querySelector(".form__btn-register");
const imgBtn = document.querySelector('.form__img-btn');
const successBtn = document.querySelector('.success__bottom-btn');

const inputs = [username, email, password, repeatPassword];
const errorMsgs = document.querySelectorAll(".form__register-error");
const successBox = document.querySelector('.success');
const shadow = document.querySelector('.shadow');

const upperCase = /^(?=.*[A-Z]).*$/;
const lowerCase = /^(?=.*[a-z])/;
const oneDigit = /^(?=.*[0-9])/;
const specialSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;

const counterError = 0;


class Password{
    checkUpperCase = (input) => {
        if(!upperCase.test(input.value)){
            showError(input, `${input.placeholder} musi zawierać conajmniej jeden duży znak`);
        }
    }
    checkLowerCase = (input) => {
        if(!lowerCase.test(input.value)){
            showError(input, `${input.placeholder} musi zawierać conajmniej jeden mały znak`);
        }
    }

    checkOneDigit = (input) => {
        if(!oneDigit.test(input.value)){
            showError(input, `${input.placeholder} musi zawierać conajmniej jedną liczbę`);
        }
    }

    checkSpecialSymbol = (input) => {
        if(!specialSymbol.test(input.value)){
            showError(input, `${input.placeholder} musi zawierać conajmniej jeden znak specjalny`);
        }
    }

    checkPasswords = (password, repeatPassword) => {
        if (password.value !== repeatPassword.value) {
            showError(repeatPassword, `Hasła do siebie nie pasują`);
        }
    };
}


const changeImgPosition = () => {
	registerForm.classList.toggle("form__active");
	const formWidth = form.clientWidth;
    if(registerForm.classList.contains("form__active")){
        img.style.right = `${formWidth / 2}px`;
        imgBtn.textContent = "Zaloguj się";
    }else{
        img.style.right = `0`;
        imgBtn.textContent = "Zarejestruj się";
        clearInputs();
    }
};

const clearInputs = () => {
	inputs.forEach((input) => {
		input.value = "";
	});
    clearError();
};

const clearError = () => {
	errorMsgs.forEach((errorMsg) => {
		errorMsg.classList.remove('form__register-show-error');
	});
};

const showError = (input, msg) => {
	const errorMsg = input.parentElement.nextElementSibling.querySelector(
		".form__register-error"
	);
	errorMsg.textContent = msg;
    errorMsg.classList.add('form__register-show-error');
};

const checkLength = (input, min, max) => {
	if (input.value.length < min) {
		showError(
			input,
			`${input.placeholder} musi posiadać więcej niz ${min} znaków`
		)
	}else if(input.value.length > max) {
        showError(
			input,
			`${input.placeholder} musi posiadać mniej niz ${max} znaków`
		)
    }
};

const checkEmptyInput = (inputs) => {
	inputs.forEach((input) => {
		if (input.value === "") {
			showError(input, `${input.placeholder} musi zawierać tekst`);
		}else {
            clearError();
        }
	});
};


const checkEmail = (input) => {
	const validateEmail =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!validateEmail.test(input.value)){
        showError(input, `${email.placeholder} jest nieprawidłowy`);
    }
};

const checkErrors = () => {
    let errorCounter = 0;
    const errors = document.querySelectorAll('.form__register-error');
    errors.forEach(errorMsg => {
        if(errorMsg.classList.contains('form__register-show-error')){
            errorCounter++;
        }
    })
    if(errorCounter === 0){
        successBox.classList.add('success-show');
        shadow.classList.add('shadow-show');
    }
}

const acceptRegister = () => {
    successBox.classList.remove('success-show');
    shadow.classList.remove('shadow-show');
    clearInputs();
}



const handleRegister = () => {
    checkEmptyInput(inputs);
    checkLength(username, 3, 12);
	checkLength(password, 10,15);
	checkLength(repeatPassword, 10,15);
    checkEmail(email);
    
    const pass = new Password();
    pass.checkPasswords(password, repeatPassword);
    pass.checkUpperCase(password);
    pass.checkLowerCase(password);
    pass.checkOneDigit(password);
    pass.checkSpecialSymbol(password);
    checkErrors();
    
};

[registerText, imgBtn].forEach(btn => {
    btn.addEventListener('click', changeImgPosition);
})
clearBtn.addEventListener("click", clearInputs);
registerBtn.addEventListener("click", handleRegister);
successBtn.addEventListener('click', acceptRegister);