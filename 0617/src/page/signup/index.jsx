import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import supabase from '@/apis/supabaseApi';
import signImg from '../../assets/signImg.png';
import signImgIcon from '../../assets/sIgnImgIcon.png';
import checkSquare from '../../assets/checkSquare.png';
import { IoEyeSharp } from 'react-icons/io5';
import { FaEyeSlash } from 'react-icons/fa';
import {
  getEmailValidationMessage,
  getCheckboxValidationMessage,
  isPasswordValid,
} from '@/utils/validate';
import styles from './signup.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Index() {
  const navigate = useNavigate();
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

    if (name === 'password') {
      setIsValid({
        ...isPasswordValid(password),
      });
    }

    setErrorMessage((prevErrorMessage) => {
      const newFormData = { ...formData, [name]: value };
      return {
        ...prevErrorMessage,
        email: getEmailValidationMessage(newFormData.email),
        checkbox: getCheckboxValidationMessage(newFormData.checkbox),
      };
    });

    setHasUserInteracted(true);
  };

  const toggleShowPassword = () => {
    setIsShow(!isShow);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, checkbox } = formData;

    setErrorMessage({
      email: getEmailValidationMessage(email),
      checkbox: getCheckboxValidationMessage(checkbox),
    });

    if (!isPasswordValid(password).length && !isPasswordValid(password).false) {
      setHasUserInteracted(true);
    }

    if (
      getEmailValidationMessage(email) ||
      getCheckboxValidationMessage(checkbox) ||
      !isValid.length ||
      !isValid.characterTypes
    ) {
      return;
    }

    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (!(data.user?.identities?.length > 0)) {
      setErrorMessage((prevData) => ({
        ...prevData,
        email: '이미등록된 사용자입니다.',
      }));
      return;
    }

    navigate('/');
  };

  useEffect(() => {
    if (hasUserInteracted) {
      setIsValid({
        ...isPasswordValid(formData.password),
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
