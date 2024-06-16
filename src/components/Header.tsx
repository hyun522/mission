import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string | undefined>('');

  const handleLogOut = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    logout();
    navigate('/signin');
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
          <li onClick={handleLogOut}>로그아웃</li>
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
