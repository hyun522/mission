import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// 스타일드 컴포넌트 정의
const Bg = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUpBox = styled.div`
  width: 30vw;
`;

const SignUpTitle = styled.p`
  line-height: 30px;
  font-size: 20px;
  margin-bottom: 30px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  border-radius: 50px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.div`
  font-size: 12px;
  color: #e22424;
  margin: -15px 0 15px 10px;
`;

const PasswordValidate = styled.p`
  font-size: 12px;
  margin-left: 5px;
  color: #666;
`;

const Button = styled.button`
  background-color: #ddd;
  width: 100%;
  color: #fff;
  padding: 15px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  margin-top: 20px;
`;

const GoLogin = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  font-size: 14px;
  color: #777;
`;

const LinkText = styled(Link)`
  font-size: 14px;
  color: #444;
  margin-left: 5px;
  text-decoration: underline;
`;

interface User {
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  //리액트 함수 컴포넌트 라는 말

  const [email, setEmail] = useState<string>('');
  //이메일
  const [password, setPassword] = useState<string>('');
  //비밀번호
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  //비밀번호확인
  const [emailError, setEmailError] = useState<string>('');
  //이메일 에러
  const [passwordError, setPasswordError] = useState<string>('');
  //비밀번호 에러
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  //비밀번호 체크 에러

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    //onchange라서
    setEmail(e.target.value);
    //입력한 값을 넣어주겠다.
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const validateEmail = (email: string): boolean => {
    //사용자가 입력한 값을 받아온다.
    if (!email) {
      setEmailError('이메일을 입력해주세요.');
      return false;
    } else if (!emailRegex.test(email)) {
      //test메서드 boolean값을 반환한다.
      setEmailError('유효한 이메일을 입력해주세요.');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validatePassword = (password: string): boolean => {
    if (!password) {
      setPasswordError('비밀번호를 입력해주세요.');
      return false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        '비밀번호는 8자 이상의 영소문자, 숫자, 특수문자를 포함해야 합니다.',
      );
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const validateConfirmPassword = (
    password: string,
    confirmPassword: string,
  ): boolean => {
    if (!confirmPassword) {
      setConfirmPasswordError('비밀번호 확인을 입력해주세요.');
      return false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
      return false;
    } else {
      setConfirmPasswordError('');
      return true;
    }
  };

  const emailDuplicateCheck = (email: string): boolean => {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    //users 항목이 localstorage에 없다면 빈배열을 가져오겠다. 빈배열을 가져오는 이유는 함수가 항상 배열을 다루도록 보장
    // console.log(users);  // [{},{}]
    return !users.some((user) => user.email === email);
    // some메소드는 적어도 하나의 배열 멤버가 주어진 함수에 의해 정의된 테스트를 만족하는지 확인 boolean값을 반환한다.
    // 조건에 부합하는 email이 있다면 false 를 반환해라
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //폼 제출의 기본 동작인 새로고침을 막는다.
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(
      password,
      confirmPassword,
    );
    //2.위 변수 세개 모두 사용자가 입력한 값으로 유효성 검사를 실사한다.

    if (!isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
      return;
    }
    // 3.이메일, 비밀번호, 비밀번호 확인 값 중 하나라도 유효하지 않은 경우 (isEmailValid, isPasswordValid, isConfirmPasswordValid 중 하나라도 false인 경우),
    // return문을 실행하여 handleSubmit 함수의 실행을 종료

    if (!emailDuplicateCheck(email)) {
      //만약에 메일이 중복된다면 false를 반환 한다 그걸 한번더 뒤엎어서 true를 반환한다.
      setEmailError('이미 사용 중인 이메일입니다.');
      return;
    }

    //위의 유효성 검사와 email중복체크 마무리후 localstorage에 저장
    // 처음에 로컬 스토리지에 'users' 키가 없다면, getItem은 null을 반환합니다. 이 경우 빈 배열을 사용하게 됩니다.

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('회원가입에 성공하였습니다.');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <Bg>
      <SignUpBox>
        <SignUpTitle>
          회원가입을 하고 모든 서비스를 무료로 이용하세요.
        </SignUpTitle>
        <form onSubmit={handleSubmit}>
          <Input
            type='text'
            placeholder='이메일'
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
          <Input
            type='password'
            placeholder='비밀번호'
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
          <Input
            type='password'
            placeholder='비밀번호확인'
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {confirmPasswordError && (
            <ErrorMessage>{confirmPasswordError}</ErrorMessage>
          )}
          <PasswordValidate>
            ⚠︎ 비밀번호는 영어 소문자, 숫자, 특수문자 포함 8-20자
          </PasswordValidate>
          <Button type='submit'>회원가입</Button>
        </form>
        <GoLogin>
          <p>이미 회원이신가요?</p>
          <LinkText to='/signin'>로그인하기</LinkText>
        </GoLogin>
      </SignUpBox>
    </Bg>
  );
};

export default SignUp;
