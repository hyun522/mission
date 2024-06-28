import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import supabase from '@/apis/supabaseApi';
import signImg from '../../assets/signImg.png';
import signImgIcon from '../../assets/sIgnImgIcon.png';
import checkSquare from '../../assets/checkSquare.png';
import { IoEyeSharp } from 'react-icons/io5';
import { FaEyeSlash } from 'react-icons/fa';
import { validateEmail, validateCheckbox } from '@/utils/validate';
import { validatePassword } from '@/utils/validatePassword';
import styles from './signup.module.scss';

const cx = classNames.bind(styles);

function Index() {
  const [isShow, setIsShow] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    checkbox: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    email: '',
    checkbox: '',
  });

  const [isValid, setIsValid] = useState({
    length: false,
    characterTypes: false,
  });

  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));

    //즉각적으로 코드의 수정 사항을 반영하겠다. 변동이있으면 변동값을 넣고 그렇지 않으면 과거의 값을 넣겠다.
    const email = name === 'email' ? newValue : formData.email;
    const password = name === 'password' ? newValue : formData.password;
    const checkbox = name === 'checkbox' ? newValue : formData.checkbox;

    setIsValid({
      ...validatePassword(password),
    });

    setErrorMessage((prevErrorMessage) => ({
      ...prevErrorMessage,
      email: validateEmail(email),
      checkbox: validateCheckbox(checkbox),
    }));

    setHasUserInteracted(true);
  };

  const toggleShowPassword = () => {
    setIsShow(!isShow);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, checkbox } = formData;

    setErrorMessage({
      email: validateEmail(email),
      checkbox: validateCheckbox(checkbox),
    });

    if (
      !validatePassword(password).length &&
      !validatePassword(password).false
    ) {
      setHasUserInteracted(true);
    }

    if (
      validateEmail(email) ||
      validateCheckbox(checkbox) ||
      !isValid.length ||
      !isValid.characterTypes
    ) {
      return;
    }

    try {
      let { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
    } catch (error) {
      setErrorMessage({
        email: '회원가입 중 오류가 발생했습니다.',
        checkbox: '',
      });
    }
  };

  useEffect(() => {
    if (hasUserInteracted) {
      setIsValid({
        ...validatePassword(formData.password),
      });
    }
  }, [formData.password, hasUserInteracted]);
  //비밀번호가 변경될때에도 유효성 검사를 실행 시키겠다.

  return (
    <div className={cx('form-container')}>
      <div className={cx('img-group')}>
        <img src={signImg} className={cx('signImg')} />
        <img src={signImgIcon} className={cx('signImgIcon')} />
      </div>
      <div className={cx('input-group')}>
        <form onSubmit={handleSubmit}>
          <p className={cx('form-title')}>Create New Account</p>
          <label htmlFor='email' className={cx('label-common', 'email-label')}>
            Email
          </label>
          <input
            type='text'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className={cx('input-common')}
          />
          {errorMessage.email && (
            <p className={cx('errormessage')} style={{ color: 'red' }}>
              {errorMessage.email}
            </p>
          )}
          <label htmlFor='password' className={cx('label-common')}>
            Password
          </label>
          <div className={cx('password-input-wrapper')}>
            <input
              type={isShow ? 'text' : 'password'}
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              className={cx('input-common', 'password-input')}
            />
            <span onClick={toggleShowPassword} className={cx('toggleIcon')}>
              {isShow ? (
                <FaEyeSlash color=' #d0d0d0' />
              ) : (
                <IoEyeSharp color=' #d0d0d0' />
              )}
            </span>
          </div>
          <div className={cx('errormessage')}>
            {hasUserInteracted && (
              <>
                <p style={{ color: isValid.length ? 'green' : 'red' }}>
                  {isValid.length ? '✔' : '✘'} 8자리 이상 20자리 이하
                </p>
                <p style={{ color: isValid.characterTypes ? 'green' : 'red' }}>
                  {isValid.characterTypes ? '✔' : '✘'} 소문자, 숫자, 특수문자
                  포함
                </p>
              </>
            )}
          </div>
          <label htmlFor='checkbox' className={cx('custom-checkbox')}>
            <input
              type='checkbox'
              id='checkbox'
              name='checkbox'
              checked={formData.checkbox}
              onChange={handleChange}
            />
            <span className={cx('custom-checkbox-box')}>
              {formData.checkbox && <img src={checkSquare} />}
            </span>
            <p className={cx('custom-checkbox-text')}>
              I agree with the <span>Terms of services</span> and
              <span> Privacy Policy</span>
            </p>
          </label>
          {errorMessage.checkbox && (
            <p className={cx('errormessage')} style={{ color: 'red' }}>
              {errorMessage.checkbox}
            </p>
          )}
          <button className={cx('button')} type='submit'>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Index;
