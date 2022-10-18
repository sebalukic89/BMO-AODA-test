const open_btn = document.querySelector('.open-btn');
const close_btn = document.querySelector('.close-btn');
const nav = document.querySelectorAll('.nav');
const form = document.getElementById('form');
const username = document.getElementById('username');
const number = document.getElementById('number');
const email = document.getElementById('email');
const openModal = document.getElementById('open');
const closeModal = document.getElementById('close');
const modal = document.getElementById('modal');

// Show input error message
const showError = (input, message) => {
	const formControl = input.parentElement;

	formControl.className = 'form-control error';
	const small = formControl.querySelector('small');
	small.innerText = message;
};

// Show success outline
const showSuccess = (input) => {
	const formControl = input.parentElement;

	formControl.className = 'form-control success';
};

// Check email is valid
const checkEmail = (input) => {
	const re =
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	if (re.test(input.value.trim())) {
		showSuccess(input);
	} else {
		showError(input, 'Email is not valid.');
	}
};

// Check required fields
const checkRequired = (inputArr) => {
	inputArr.forEach(function (input) {
		if (input.value.trim() === '') {
			showError(input, `The ${input.id} is required`);
		} else {
			showSuccess(input);
		}
	});
};

// Check input length
const checkLength = (input, min, max) => {
	if (input.value.length < min) {
		showError(input, `${getFieldName(input)} must be ${min} characters long.`);
	} else if (input.value.length > max) {
		showError(
			input,
			`${getFieldName(input)} must be less than ${max} characters long.`
		);
	} else {
		showSuccess(input);
	}
};

// Get fieldname
const getFieldName = (input) => {
	return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

// Event listeners
open_btn.addEventListener('click', () => {
	nav.forEach((nav_el) => nav_el.classList.add('visible'));
});

close_btn.addEventListener('click', () => {
	nav.forEach((nav_el) => nav_el.classList.remove('visible'));
});

openModal.addEventListener('click', () => modal.classList.add('show-modal'));

closeModal.addEventListener('click', () =>
	modal.classList.remove('show-modal')
);

window.addEventListener('click', (e) => {
	e.target == modal ? modal.classList.remove('show-modal') : false;
});

form.addEventListener('submit', (e) => {
	e.preventDefault();
	checkRequired([username, number, email]);
	checkLength(username, 3, 15);
	checkLength(number, 1, 3);
	checkEmail(email);
});

// add all the elements inside modal which you want to make focusable
const focusableElements = 'button, [tabindex]:not([tabindex="0"])';

const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
const focusableContent = modal.querySelectorAll(focusableElements);
const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

document.addEventListener('keydown', function (e) {
	let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

	if (!isTabPressed) {
		return;
	}

	if (e.shiftKey) {
		// if shift key pressed for shift + tab combination
		if (document.activeElement === firstFocusableElement) {
			lastFocusableElement.focus(); // add focus for the last focusable element
			e.preventDefault();
		}
	} else {
		// if tab key is pressed
		if (document.activeElement === lastFocusableElement) {
			// if focused has reached to last focusable element then focus first focusable element after pressing tab
			firstFocusableElement.focus(); // add focus for the first focusable element
			e.preventDefault();
		}
	}
});

firstFocusableElement.focus();
