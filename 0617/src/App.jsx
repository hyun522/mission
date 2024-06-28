import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Todolist from '@/page/todolist/index';
import SignIn from '@/page/signin';
import SignUp from '@/page/signup';
import Layout from './components/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Todolist />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
