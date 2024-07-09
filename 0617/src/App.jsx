import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SignIn from '@/page/signin';
import SignUp from '@/page/signup';
import Layout from './components/Layout';
import Landing from '@/page/landing/index';
import Detail from '@/page/detail/index';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Layout을 라우트의 최상위 요소로 설정
    children: [
      {
        path: '/',
        element: <Landing />,
      },
      {
        path: '/detail/:id',
        element: <Detail />,
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
