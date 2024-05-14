import styled from 'styled-components';

const Bg = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignInBox = styled.div`
  width: 30dvw;
  text-align: center;
`;

const SignInTitle = styled.p`
  width: 25dvw;
  line-height: 30px;
  margin: 0 auto;
  font-size: 20px;
  margin-bottom: 30px;
`;

const EmailInput = styled.input`
  width: 100%;
  padding: 15px;
  border-radius: 50px;
  border: 1px solid #ddd;
`;

const PassWordInput = styled(EmailInput)`
  margin: 20px 0 30px 0;
`;

const LoginButton = styled.button`
  background-color: #ddd;
  width: 100%;
  color: #fff;
  padding: 15px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
`;

export default function SignIn() {
  return (
    <Bg>
      <SignInBox>
        <SignInTitle>로그인하고 여러분의 하루를 남겨보세요.</SignInTitle>
        <form>
          <EmailInput placeholder='이메일' />
          <PassWordInput placeholder='비밀번호' />
          <LoginButton>로그인하기</LoginButton>
        </form>
      </SignInBox>
    </Bg>
  );
}
