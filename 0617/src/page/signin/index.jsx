import React, { useState } from 'react';
import classNames from 'classnames/bind';
import supabase from '@/apis/supabaseApi';
import signImg from '../../assets/signImg.png';
import signImgIcon from '../../assets/sIgnImgIcon.png';
import { IoEyeSharp } from 'react-icons/io5';
import { FaEyeSlash } from 'react-icons/fa';
import {
  getEmailValidationMessage,
  getPasswordValidationMessage,
} from '@/utils/validate';
import styles from './signin.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Index() {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrorMessage((prevErrorMessage) => {
      const newFormData = { ...formData, [name]: value };
      return {
        ...prevErrorMessage,
        email: getEmailValidationMessage(newFormData.email),
        password: getPasswordValidationMessage(newFormData.password),
      };
    });
  };

  const toggleShowPassword = () => {
    setIsShow(!isShow);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    setErrorMessage({
      email: getEmailValidationMessage(email),
      password: getPasswordValidationMessage(password),
    });

    if (
      getEmailValidationMessage(email) ||
      getPasswordValidationMessage(password)
    ) {
      return;
    }

    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    let errorMessage = '';

    if (error) {
      errorMessage =
        '이메일 또는 비밀번호가 올바르지 않습니다. 다시 확인해주세요.';

      setErrorMessage({
        email: '',
        password: errorMessage,
      });
      return;
    }

    navigate('/');
  };

  return (
    <div className={cx('form-container')}>
      <div className={cx('img-group')}>
        <img src={signImg} className={cx('signImg')} />
        <img src={signImgIcon} className={cx('signImgIcon')} />
      </div>
      <div className={cx('input-group')}>
        <form onSubmit={handleSubmit}>
          <p className={cx('form-title')}>Log In</p>
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
          {errorMessage.password && (
            <p className={cx('errormessage')} style={{ color: 'red' }}>
              {errorMessage.password}
            </p>
          )}
          <button className={cx('button')} type='submit'>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
export default Index;
