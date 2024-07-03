export const getEmailValidationMessage = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === '') {
    return '이메일을 입력하세요.';
  } else if (!emailPattern.test(email)) {
    return '유효한 이메일 주소를 입력해주세요.';
  }
  return '';
};

export const getCheckboxValidationMessage = (checkbox) => {
  if (!checkbox) {
    return '체크박스를 클릭하세요';
  } else {
    return '';
  }
};

export const isPasswordValid = (password) => {
  const length = password.length >= 8 && password.length <= 20;
  const characterTypes =
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^a-zA-Z0-9]/.test(password);

  return { length, characterTypes };
};

export const getPasswordValidationMessage = (password) => {
  if (password === '') {
    return '비밀번호를 입력하세요.';
  }
};
