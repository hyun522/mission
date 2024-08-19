import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Link, useParams } from 'react-router-dom';
import supabase from '@/apis/supabaseApi';
import ReviewForm from '@/components/Landing/ReviewForm';
import ReviewList from '@/components/Landing/ReviewList';
import classNames from 'classnames/bind';
import styles from './detail.module.scss';

const cx = classNames.bind(styles);

const fetchProductDetail = async (productId) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .single();
  if (error) {
    return;
  } else {
    return data;
  }
};

function index() {
  const { productId } = useParams();
  const { user } = useAuth();

  const [productDetail, setProductDetail] = useState(null);
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    const loadProductDetail = async () => {
      try {
        const data = await fetchProductDetail(productId);
        setProductDetail(data);
      } catch (err) {
        return;
      }
    };

    loadProductDetail();
  }, [productId]);

  return (
    <>
      {productDetail ? (
        <>
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
          <ReviewList
            productId={productId}
            reviewList={reviewList}
            setReviewList={setReviewList}
          />
          <div className={cx('reviewFormSection')}>
            {user ? (
              <ReviewForm
                user={user}
                reviewList={reviewList}
                setReviewList={setReviewList}
                productId={productId}
              />
            ) : (
              <div className={cx('loginPrompt')}>
                <Link to='/signin'>
                  지금 로그인하고 댓글에 참여해보세요! ＞
                </Link>
              </div>
            )}
          </div>
        </>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}

export default index;
