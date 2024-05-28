import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  validateEmailAndGetMessage,
  validatePasswordAndGetMessage,
} from '../utils/regex.ts';
interface LoginUser {
  email: string;
  password: string;
}

const Bg = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignInBox = styled.div`
  width: 30dvw;
`;

const SignInTitle = styled.p`
  width: 25dvw;
  line-height: 30px;
  margin: 0 auto;
  font-size: 20px;
  margin-bottom: 30px;
  text-align: center;
`;

const EmailInput = styled.input`
  width: 100%;
  padding: 15px;
  border-radius: 50px;
  border: 1px solid #ddd;
`;

const PassWordInput = styled(EmailInput)`
  margin-top: 20px;
`;

const ErrorMessage = styled.div`
  font-size: 12px;
  color: #e22424;
  margin: 5px 0 0 5px;
`;

const LoginButton = styled.button`
  background-color: #ddd;
  width: 100%;
  color: #fff;
  padding: 15px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  margin-top: 30px;
`;

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isEmailValid = validateEmailAndGetMessage(email);
    let isPasswordValid = validatePasswordAndGetMessage(password);

    if (isEmailValid || isPasswordValid) {
      setEmailError(isEmailValid);
      setPasswordError(isPasswordValid);
      return;
    }

    const users: LoginUser[] = JSON.parse(
      localStorage.getItem('users') || '[]',
    );

    const user = users.find((user) => user.email === email);

    if (user) {
      if (user.password === password) {
        setEmail('');
        setPassword('');
        setIsLoggedIn(true);
        localStorage.setItem('currentUser', email);
      } else {
        setPasswordError('이메일 또는 비밀번호가 일치하지 않습니다.');
      }
    } else {
      setPasswordError('존재하지 않는 회원입니다.');
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = '/';
    }
  }, [isLoggedIn]);

  return (
    <Bg>
      <SignInBox>
        <SignInTitle>로그인하고 여러분의 하루를 남겨보세요.</SignInTitle>
        <form onSubmit={handleSubmit}>
          <EmailInput
            placeholder='이메일'
            type='text'
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <ErrorMessage> {emailError}</ErrorMessage>}
          <PassWordInput
            placeholder='비밀번호'
            type='password'
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
          <LoginButton type='submit'>로그인하기</LoginButton>
        </form>
      </SignInBox>
    </Bg>
  );
};

export default SignIn;
