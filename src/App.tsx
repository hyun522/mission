import { NavLink } from 'react-router-dom';
import ToDoList from './components/ToDoList';
import styled from 'styled-components';

const NavGnb = styled.ul`
  display: flex;
`;
const LoginLi = styled.li`
  margin-right: 10px;
`;

function getLinkStyle({ isActive }: { isActive: boolean }) {
  console.log(isActive);
  return {
    textDecoration: isActive ? 'underline' : '',
    color: '#000',
  };
}

export default function App() {
  return (
    <>
      <NavGnb>
        <LoginLi>
          <NavLink to='/signin' style={getLinkStyle}>
            로그인
          </NavLink>
        </LoginLi>
        <li>
          <NavLink to='/signup' style={getLinkStyle}>
            회원가입
          </NavLink>
        </li>
      </NavGnb>
      <ToDoList />
    </>
  );
}
