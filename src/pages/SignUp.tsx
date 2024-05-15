import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Inputs {
  email: string;
  password: string;
  checkPassword: string;
}

const Bg = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUpBox = styled.div`
  width: 30dvw;
`;

const SignUpTitle = styled.p`
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

const CheckPassWordInput = styled(PassWordInput)``;

const ErrorMessage = styled.div`
  font-size: 12px;
  color: #e22424;
  margin: 5px 0 0 5px;
`;

const ErrorMessageCheckPassword = styled(ErrorMessage)`
  margin: 5px 0 15px 5px;
`;

const GoLogin = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  font-size: 14px;
  color: #777;
`;

const NextButton = styled.button`
  background-color: #ddd;
  width: 100%;
  color: #fff;
  padding: 15px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
`;
const PasswordValidate = styled.p`
  font-size: 12px;
  margin: 15px 0 30px 5px;
  color: #666;
`;

const LinkText = styled(Link)`
  font-size: 14px;
  color: #444;
  margin-left: 5px;
  text-decoration: underline;
`;

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    localStorage.setItem('key', JSON.stringify(data));
  };

  return (
    <Bg>
      <SignUpBox>
        <SignUpTitle>
          회원가입을 하고 모든 서비스를 무료로 이용하세요.
        </SignUpTitle>
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

          <CheckPassWordInput
            placeholder='비밀번호 확인'
            type='password'
            {...register('checkPassword', {
              required: true,
              validate: (value: string) => {
                if (watch('password') !== value) {
                  return 'not match';
                }
              },
            })}
          />
          {errors.checkPassword && (
            <ErrorMessageCheckPassword>
              비밀번호가 일치하지 않습니다.
            </ErrorMessageCheckPassword>
          )}
          <PasswordValidate>
            ⚠︎ 비밀번호는 영어 소문자, 숫자, 특수문자 포함 8-20자
          </PasswordValidate>

          <NextButton disabled={isSubmitting}>다음</NextButton>
        </form>
        <GoLogin>
          <p>이미회원이신가요?</p>
          <LinkText to='/signin'>로그인하기</LinkText>
        </GoLogin>
      </SignUpBox>
    </Bg>
  );
}
