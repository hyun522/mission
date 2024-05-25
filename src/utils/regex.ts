export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const validateEmail = (email: string): string => {
  if (!email) {
    return '이메일을 입력해주세요.';
  } else if (!emailRegex.test(email)) {
    return '유효한 이메일을 입력해주세요.';
  } else {
    return '';
  }
};

export const validatePassword = (password: string): string => {
  if (!password) {
    return '비밀번호를 입력해주세요.';
  } else if (!passwordRegex.test(password)) {
    return '비밀번호는 8자 이상의 영소문자, 숫자, 특수문자를 포함해야 합니다.';
  } else {
    return '';
  }
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string,
): string => {
  if (!confirmPassword) {
    return '비밀번호 확인을 입력해주세요.';
  } else if (password !== confirmPassword) {
    return '비밀번호가 일치하지 않습니다.';
  } else {
    return '';
  }
};
