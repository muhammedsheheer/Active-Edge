export const validateLoginForm = (inputLogin) => {
	const newError = {};
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const passwordRegex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

	if (!emailRegex.test(inputLogin.email))
		newError.email = "Invalid email format";
	if (!inputLogin.email) newError.email = "Email is required*";
	if (!inputLogin.password) newError.password = "Password is required*";
	if (!passwordRegex.test(inputLogin.password))
		newError.password = "Incorrect Password";
	return newError;
};

export const validateRegisterForm = (input) => {
	const errors = {};

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const phoneRegex = /^(\+?[1-9]{1}[0-9]{1,14})$/; // Adjust regex for phone number validation
	const passwordRegex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

	if (!input.name) {
		errors.name = "Name is required*";
	}

	if (!input.email) {
		errors.email = "Email is required*";
	} else if (!emailRegex.test(input.email)) {
		errors.email = "Invalid email format";
	}

	if (!input.password) {
		errors.password = "Password is required*";
	} else if (!passwordRegex.test(input.password)) {
		errors.password =
			"Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a digit, and a special character";
	}

	if (!input.cPassword) {
		errors.cPassword = "Confirm password is required*";
	} else if (input.password !== input.cPassword) {
		errors.cPassword = "Passwords do not match";
	}

	if (!input.phone) {
		errors.phone = "Phone number is required*";
	} else if (!phoneRegex.test(input.phone)) {
		errors.phone = "Invalid phone number format";
	}

	return errors;
};
