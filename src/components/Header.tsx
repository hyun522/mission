import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavGnb = styled.ul`
  display: flex;
`;
const LoginLi = styled.li`
  margin-right: 10px;
`;

export default function Header() {
  const [userEmail, setUserEmail] = useState<string>('');

  const handleLogOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    setUserEmail('');
  };

  useEffect(() => {
    const email = localStorage.getItem('currentUser');
    if (email) {
      setUserEmail(email);
    }
  }, [userEmail]);

  return (
    <NavGnb>
      {userEmail ? (
        <>
          <LoginLi>
            <NavLink to='/signin'>{userEmail}</NavLink>
          </LoginLi>
          <li>
            <NavLink to='/signup' onClick={handleLogOut}>
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
}
