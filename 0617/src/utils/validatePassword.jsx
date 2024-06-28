export const validatePassword = (password) => {
  const length = password.length >= 8 && password.length <= 20;
  const characterTypes =
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^a-zA-Z0-9]/.test(password);

  return { length, characterTypes };
};
