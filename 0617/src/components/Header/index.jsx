import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.scss';
import classNames from 'classnames/bind';
import supabase from '@/apis/supabaseApi';

const cx = classNames.bind(styles);

const index = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session ? session.user : null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header>
      <nav>
        <Link to='/' className={cx('logo')}>
          HyunKurly
        </Link>
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
