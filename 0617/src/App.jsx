import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Todolist from '@/page/todolist/index';
import SignIn from '@/page/signin';
import SignUp from '@/page/signup';

const router = createBrowserRouter([
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
