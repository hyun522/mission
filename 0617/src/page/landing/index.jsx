import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './landing.module.scss';
import supabase from '@/apis/supabaseApi';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function index() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true });
    if (error) {
      console.error('Error fetching tasks:', error);
    } else {
      setLists(data);
    }
  };

  //초기렌더링 시점에 빈배열로 형성되는것 해결 위함
  if (!lists) {
    return <p>Loading</p>;
  }

  return (
    <main>
      <aside className={cx('total')}>총 {lists.length}건 </aside>
      <section className={cx('productsContent')}>
        {lists.map((product) => (
          <article className={cx('product')} key={product.id}>
            <Link to={`/detail/${product.id}`}>
              <img className={cx('productImg')} src={product.image} />
              <div className={cx('cart')}>담기</div>
              <h3 className={cx('productTitle')}>{product.title}</h3>
              <p className={cx('productPrice')}>{product.price}</p>
              <p className={cx('productTotalComments')}>
                💬 {product.comments}
              </p>
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}

export default index;
