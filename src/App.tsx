import Header from './components/Header';
import { Outlet } from 'react-router-dom';
// import { supabase } from './main';
// import { useEffect } from 'react';

export default function App() {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     //*치면 모든 칼럼이라는 뜻
  //     let { data: test, error } = await supabase.from('test').select('*');
  //     console.log(test);
  //   };
  //   fetchData();
  // }, []);
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
