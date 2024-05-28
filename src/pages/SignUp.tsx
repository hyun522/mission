import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import {
  validateEmailAndGetMessage,
  validatePasswordAndGetMessage,
  validateConfirmPasswordAndGetMessage,
} from '../utils/regex.ts';
interface User {
  email: string;
  password: string;
}

interface InputsState {
  email: string;
  password: string;
  confirmPassword: string;
}
interface ErrorsState {
  emailError: string;
  passwordError: string;
  confirmPasswordError: string;
}

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

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<InputsState>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<ErrorsState>({
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
  });

  const { email, password, confirmPassword } = inputs;
  const { emailError, passwordError, confirmPasswordError } = errors;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prevInput) => ({
      ...prevInput,
      //inputs[name] = value; 와 같다.
      [name]: value,
    }));
  };

  const emailDuplicateErrorMessage = (email: string): string => {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    console.log(users);
    return users.some((user) => user.email === email)
      ? '이미 사용 중인 이메일입니다.'
      : '';
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isEmailDuplicateErrorMessage = emailDuplicateErrorMessage(email);
    const isEmailErrorMessage = validateEmailAndGetMessage(email);
    const isPasswordErrorMessage = validatePasswordAndGetMessage(password);
    const isConfirmPasswordErrorMessage = validateConfirmPasswordAndGetMessage(
      password,
      confirmPassword,
    );

    if (
      isEmailDuplicateErrorMessage ||
      isEmailErrorMessage ||
      isPasswordErrorMessage ||
      isConfirmPasswordErrorMessage
    ) {
      setErrors({
        emailError: isEmailDuplicateErrorMessage || isEmailErrorMessage,
        passwordError: isPasswordErrorMessage,
        confirmPasswordError: isConfirmPasswordErrorMessage,
      });
      return;
    }

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    users.push({ email, password });

    localStorage.setItem('users', JSON.stringify(users));
    alert('회원가입에 성공하였습니다.');

    setInputs({
      email: '',
      password: '',
      confirmPassword: '',
    });

    navigate('/signin');
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
            name='email'
            value={email}
            onChange={handleChange}
          />
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
          <Input
            type='password'
            placeholder='비밀번호'
            name='password'
            value={password}
            onChange={handleChange}
          />
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
          <Input
            type='password'
            placeholder='비밀번호확인'
            name='confirmPassword'
            value={confirmPassword}
            onChange={handleChange}
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
