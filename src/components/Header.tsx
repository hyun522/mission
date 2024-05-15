import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavGnb = styled.ul`
  display: flex;
`;
const LoginLi = styled.li`
  margin-right: 10px;
`;

export default function Header() {
  const localStorageData = localStorage.getItem('key');
  const storageData = localStorageData ? JSON.parse(localStorageData) : null;

  const handleLogOut = () => {
    localStorage.removeItem('key');
  };

  return (
    <NavGnb>
      {storageData !== null ? (
        <>
          <LoginLi>
            <NavLink to='/signin'>{storageData.email}</NavLink>
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
