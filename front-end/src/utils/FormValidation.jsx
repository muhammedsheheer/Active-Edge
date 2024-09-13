//validate login form
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

//validate registerform
export const validateRegisterForm = (input) => {
	const errors = {};

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const phoneRegex = /^(\+?[1-9]{1}[0-9]{1,14})$/;
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

export const validateProductForm = (inputField) => {
	const newError = {};

	if (!inputField.productName)
		newError.productName = "Product name is required*";
	if (!inputField.description)
		newError.description = "Description is required*";
	if (!inputField.category) newError.category = "Category is required*";
	if (!inputField.brand) newError.brand = "Brand is required*";
	if (!inputField.gender) newError.gender = "Gender is required*";

	if (!inputField.regularPrice) {
		newError.regularPrice = "Regular price is required*";
	} else if (inputField.regularPrice < 0) {
		newError.regularPrice = "Regular price cannot be negative";
	}

	if (!inputField.salePrice) {
		newError.salePrice = "Sale price is required*";
	} else if (inputField.salePrice < 0) {
		newError.salePrice = "Sale price cannot be negative";
	}
	console.log(inputField.sizes);

	// Specific size validations
	inputField.sizes.forEach((sizeObj, index) => {
		console.log(sizeObj);

		// Convert size and stock to numbers
		const size = Number(sizeObj?.size);
		const stock = Number(sizeObj?.stock);
		console.log(isNaN(size) < 0, stock);
		// Validate size
		if (isNaN(size) || size <= 0) {
			console.log("Validated............size");

			newError.sizes = newError.sizes || [];
			newError.sizes[index] = {
				...newError.sizes[index],
				size: "Size cannot be negative or invalid",
			};
		}

		// Validate stock
		if (isNaN(stock) || stock <= 0) {
			console.log("Validated............stock");
			newError.sizes = newError.sizes || [];
			newError.sizes[index] = {
				...newError.sizes[index],
				stock: "stock cannot be negative or invalid",
			};
		}
	});

	return newError;
};
