import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import App from './App.tsx';
import SignIn from './pages/SignIn.tsx';
import SignUp from './pages/SignUp.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <GlobalStyle />
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='signin' element={<SignIn />} />
      <Route path='signup' element={<SignUp />} />
    </Routes>
  </BrowserRouter>,
);
