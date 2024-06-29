import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Todolist from '@/page/todolist/index';
import SignIn from '@/page/signin';
import SignUp from '@/page/signup';
import Layout from './components/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Layout을 라우트의 최상위 요소로 설정
    children: [
      {
        path: '/',
        element: <Todolist />,
      },
      {
        path: '/signin',
        element: <SignIn />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
