import Todolist from './page/todolist/index';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

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
