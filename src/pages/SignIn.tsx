import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  validateEmailAndGetMessage,
  validatePasswordAndGetMessage,
} from '../utils/regex.ts';
import { useNavigate } from 'react-router-dom';
interface LoginUser {
  email: string | undefined;
  password: string | undefined;
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
  const navigate = useNavigate();

  const [inputs, setInputs] = useState<LoginUser>({
    email: undefined,
    password: undefined,
  });

  const [errors, setErrors] = useState({
    emailError: '',
    passwordError: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const { email, password } = inputs;
  const { emailError, passwordError } = errors;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  useEffect(() => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      emailError: validateEmailAndGetMessage(email),
      passwordError: validatePasswordAndGetMessage(password),
    }));
  }, [email, password]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const users: LoginUser[] = JSON.parse(
      localStorage.getItem('users') || '[]',
    );
    const user = users.find((user) => user.email === email);

    if (!user) {
      setErrors({
        emailError: '',
        passwordError: '존재하지 않는 회원입니다.',
      });
      return;
    }

    if (user.password !== password) {
      setErrors({
        emailError: '',
        passwordError: '이메일 또는 비밀번호가 일치하지 않습니다.',
      });
      return;
    }

    setInputs({
      email: '',
      password: '',
    });
    setIsLoggedIn(true);
    localStorage.setItem('currentUser', email ?? '');
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
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
            name='email'
            value={email}
            onChange={handleChange}
          />
          {emailError && <ErrorMessage> {emailError}</ErrorMessage>}
          <PassWordInput
            placeholder='비밀번호'
            type='password'
            name='password'
            value={password}
            onChange={handleChange}
          />
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
          <LoginButton type='submit'>로그인하기</LoginButton>
        </form>
      </SignInBox>
    </Bg>
  );
};

export default SignIn;
