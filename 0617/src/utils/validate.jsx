export const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === '') {
    return '이메일을 입력하세요.';
  } else if (!emailPattern.test(email)) {
    return '유효한 이메일 주소를 입력해주세요.';
  }
  return '';
};

export const validateCheckbox = (checkbox) => {
  if (!checkbox) {
    return '체크박스를 클릭하세요';
  } else {
    return '';
  }
};
