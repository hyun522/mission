const today = new Date();
const week = ['일', '월', '화', '수', '목', '금', '토'];

export const formattdDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

export const formattdDay = `${week[today.getDay()]}요일`;
