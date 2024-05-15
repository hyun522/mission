import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
interface Inputs {
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

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <Bg>
      <SignInBox>
        <SignInTitle>로그인하고 여러분의 하루를 남겨보세요.</SignInTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <EmailInput
            placeholder='이메일'
            {...register('email', {
              required: true,
              pattern: /^[^s@]+@[^s@]+\.[^s@]+$/,
            })}
          />
          {errors.email && (
            <ErrorMessage> 올바른 이메일 주소가 아닙니다. </ErrorMessage>
          )}
          <PassWordInput
            placeholder='비밀번호'
            type='password'
            {...register('password', {
              required: true,
              pattern:
                /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            })}
          />
          {errors.password && (
            <ErrorMessage>
              비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.
            </ErrorMessage>
          )}
          <LoginButton disabled={isSubmitting}>로그인하기</LoginButton>
        </form>
      </SignInBox>
    </Bg>
  );
}
