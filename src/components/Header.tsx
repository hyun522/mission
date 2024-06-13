import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useUserContext } from '../contexts/UserContext';

const NavGnb = styled.ul`
  display: flex;
`;
const LoginLi = styled.li`
  margin-right: 10px;
`;

const Header: React.FC = () => {
  const { user, logout } = useUserContext();
  const [userEmail, setUserEmail] = useState<string | undefined>('');

  const handleLogOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    logout();
  };

  useEffect(() => {
    if (user) {
      setUserEmail(user.email);
    }
  }, [user]);

  return (
    <NavGnb>
      {user ? (
        <>
          <LoginLi>{userEmail}</LoginLi>
          <li>
            <NavLink to='/signin' onClick={handleLogOut}>
              로그아웃
            </NavLink>
          </li>
        </>
      ) : (
        <>
          <LoginLi>
            <NavLink to='/signin'>로그인</NavLink>
          </LoginLi>
          <li>
            <NavLink to='/signup'>회원가입</NavLink>
          </li>
        </>
      )}
    </NavGnb>
  );
};

export default Header;
