import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '../utils/regex.ts';
interface User {
  email: string;
  password: string;
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
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const emailDuplicateCheck = (email: string): boolean => {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    return !users.some((user) => user.email === email);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(
      password,
      confirmPassword,
    );

    if (isEmailValid || isPasswordValid || isConfirmPasswordValid) {
      setEmailError(isEmailValid);
      setPasswordError(isPasswordValid);
      setConfirmPasswordError(isConfirmPasswordValid);
      return;
    }

    if (!emailDuplicateCheck(email)) {
      setEmailError('이미 사용 중인 이메일입니다.');
      return;
    }

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    users.push({ email, password });

    localStorage.setItem('users', JSON.stringify(users));
    alert('회원가입에 성공하였습니다.');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    window.location.href = '/signin';
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
