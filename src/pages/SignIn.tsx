import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  //유저가 입력한 값을 담아오겠다.
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    console.log(password);
  };

  const validateEmail = (email: string): boolean => {
    if (!email) {
      //값이 있으면 true => false
      //값이 없으면 false => true
      setEmailError('이메일을 입력해주세요.');
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('유효한 이메일을 입력해주세요.');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validatePassword = (password: string): boolean => {
    //password '' false  텍스트가 있으면 true
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isEmailValid = validateEmail(email);
    let isPasswordValid = validatePassword(password);

    //유효성검사에 통과하지 못하면 제출을 중지하겠다.
    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    const users: LoginUser[] = JSON.parse(
      localStorage.getItem('users') || '[]',
    );

    const user = users.find((user) => user.email === email);

    //배열에서 조건에 해당하는 첫번째 요소를 반환.
    if (user) {
      if (user.password === password) {
        setEmail('');
        setPassword('');
        setIsLoggedIn(true);
      } else {
        setPasswordError('이메일 또는 비밀번호가 일치하지 않습니다.');
      }
    } else {
      setPasswordError('존재하지 않는 회원입니다.');
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = '/main';
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
