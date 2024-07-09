import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '@/apis/supabaseApi';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
import Comment from '@/components/Comment/index';

const cx = classNames.bind(styles);
//데이터가 6개 불러져 오는 에러 잡아야 한다.

function index() {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  console.log(productDetail);

  useEffect(() => {
    fetchProductDetail();
  }, [id]);

  const fetchProductDetail = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      console.error('Error fetching tasks:', error);
    } else {
      setProductDetail(data);
    }
  };

  return (
    <>
      {productDetail ? (
        <section key={productDetail.id} className={cx('container')}>
          <article className={cx('imgContent')}>
            <img src={productDetail.image} />
          </article>
          <article className={cx('textContent')}>
            <h2>{productDetail.title}</h2>
            <p className={cx('subtitle')}>{productDetail.subtitle}</p>
            <p className={cx('price')}>{productDetail.price}</p>
            <div className={cx('buttonWrapper')}>
              <button>장바구니 담기</button>
            </div>
          </article>
        </section>
      ) : (
        <p>Loading</p>
      )}
      <Comment />
    </>
  );
}

export default index;
