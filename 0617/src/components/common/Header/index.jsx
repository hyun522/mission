import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import supabase from '@/apis/supabaseApi';
import classNames from 'classnames/bind';
import styles from './header.module.scss';

const cx = classNames.bind(styles);

const index = () => {
  const { user } = useAuth();

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
              <li className={cx('noCursor')}>{user.email}님</li>
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
