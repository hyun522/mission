import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.scss';
import classNames from 'classnames/bind';
import supabase from '@/apis/supabaseApi';

const cx = classNames.bind(styles);

const index = () => {
  const [user, setUser] = useState(null);

  //컴포넌트가 마운트될떄 실행
  //사용자 인증 상태 변화를 감지 사용자의 상태를 업데이트
  useEffect(() => {
    const {
      data: { authListener },
      //반환하는 객체에서 data 속성의 authListener를 추출합니다.
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session ? session.user : null);
    });
    // return () => authListener.unsubscribe();
    // 컴포넌트가 언마운트될 때 실행 되는데 존재하지 않느다..
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header>
      <nav>
        <ul className={cx('header-lists')}>
          {user ? (
            <>
              <li>{user.email}님</li>
              <li onClick={handleLogout}>Log Out</li>
            </>
          ) : (
            <>
              <li>
                <Link to='/signin'>Sign In</Link>
              </li>
              <li>
                <Link to='/signup'>Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
export default index;
