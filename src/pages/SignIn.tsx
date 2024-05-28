import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  validateEmailAndGetMessage,
  validatePasswordAndGetMessage,
} from '../utils/regex.ts';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isEmailErrorMessage = validateEmailAndGetMessage(email);
    let isPasswordErrorMessage = validatePasswordAndGetMessage(password);

    if (isEmailErrorMessage || isPasswordErrorMessage) {
      setErrors({
        emailError: isEmailErrorMessage,
        passwordError: isPasswordErrorMessage,
      });
      //에러메세지가 있으면 에레메시지를 넣고 폼제출을 중단(=return)
      return;
    }

    const users: LoginUser[] = JSON.parse(
      localStorage.getItem('users') || '[]',
    );
    //email과 일치하는 email 속성을 가진 첫 번째 사용자 객체를 찾는 것 요소를 반환 없을 경우 undefined를 반환합니다.
    const user = users.find((user) => user.email === email);

    if (user) {
      if (user.password === password) {
        setInputs({
          email: '',
          password: '',
        });
        setIsLoggedIn(true);
        localStorage.setItem('currentUser', email);
      } else {
        setErrors({
          emailError: '',
          passwordError: '이메일 또는 비밀번호가 일치하지 않습니다.',
        });
      }
    } else {
      setErrors({
        emailError: '',
        passwordError: '존재하지 않는 회원입니다.',
      });
    }
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
