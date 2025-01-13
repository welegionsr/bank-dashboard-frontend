export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const validatePassword = (password) => password.length >= 6;
export const validateName = (name) => name.trim() !== '';
export const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);
export const validateBalance = (balance) => !isNaN(balance) && balance > 0;