export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const validateEmailAndGetMessage = (
  email: string | undefined,
): string => {
  if (email === undefined) {
    return ''; //true
  } else if (!email) {
    return '이메일을 입력해주세요.';
  } else if (!emailRegex.test(email)) {
    return '유효한 이메일을 입력해주세요.'; //true
  } else {
    return '';
  }
};

export const validatePasswordAndGetMessage = (
  password: string | undefined,
): string => {
  if (password === undefined) {
    return '';
  } else if (!password) {
    return '비밀번호를 입력해주세요.';
  } else if (!passwordRegex.test(password)) {
    return '비밀번호는 8자 이상의 영소문자, 숫자, 특수문자를 포함해야 합니다.';
  } else {
    return '';
  }
};

export const validateConfirmPasswordAndGetMessage = (
  password: string | undefined,
  confirmPassword: string | undefined,
): string => {
  if (confirmPassword === undefined) {
    return '';
  } else if (!confirmPassword) {
    return '비밀번호 확인을 입력해주세요.';
  } else if (password !== confirmPassword) {
    return '비밀번호가 일치하지 않습니다.';
  } else {
    return '';
  }
};
