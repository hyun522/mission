import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '@/apis/supabaseApi';
import classNames from 'classnames/bind';
import styles from './landing.module.scss';

const cx = classNames.bind(styles);

const fetchProducts = async (setLists) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: true });
  if (error) {
    return;
  } else {
    setLists(data);
  }
};

function index() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    fetchProducts(setLists);
  }, []);

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
                💬 {product.review_count}
              </p>
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}

export default index;
