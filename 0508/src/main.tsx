import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import App from './App.tsx';
import SignIn from './pages/SignIn.tsx';
import SignUp from './pages/SignUp.tsx';
import Products from './pages/Products.tsx';
import Detail from './pages/Detail.tsx';
import { CartProvider } from './contexts/CartContext.tsx';
import Cart from './pages/Cart.tsx';

// import { createClient } from '@supabase/supabase-js';
// const supabaseUrl = 'https://qqghxjixcyspqgtbzcpt.supabase.co';
// const supabaseKey =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxZ2h4aml4Y3lzcHFndGJ6Y3B0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc4NTI2NTYsImV4cCI6MjAzMzQyODY1Nn0.ahTNdiwIK_dAj4kb0A7lafaaq3OwYHBWGS6GNQ0yiCU';
// export const supabase = createClient(supabaseUrl, supabaseKey);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<Products />} />
            <Route path='products'>
              <Route path=':id' element={<Detail />} />
            </Route>
            <Route path='cart' element={<Cart />} />
            <Route path='signin' element={<SignIn />} />
            <Route path='signup' element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>,
);
