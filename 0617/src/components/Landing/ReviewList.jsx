import classNames from 'classnames/bind';
import styles from './reviewList.module.scss';
import { useEffect } from 'react';
import supabase from '@/apis/supabaseApi';

const cx = classNames.bind(styles);

const fetchReviews = async (productId) => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('product_id', productId);

  if (error) {
    return;
  } else {
    console.log(data);
    return data;
  }
};

function ReviewList({ productId, reviewList, setReviewList }) {
  // const [reviewList, setReviewList] = useState([]);
  console.log(productId);
  console.log(reviewList);

  useEffect(() => {
    const loadReviewList = async () => {
      try {
        const data = await fetchReviews(productId);
        console.log(data);
        setReviewList(data);
      } catch (err) {
        return;
      }
    };
    console.log(reviewList);

    loadReviewList();
  }, [productId]);

  return (
    <div className={cx('reviewListSection')}>
      <p className={cx('reviewCount')}>💬 리뷰 {reviewList.length}</p>
      <section className={cx('reviewList')}>
        <ul className={cx('userInfo')}>
          {reviewList.map((el) => (
            <li key={el.id} className={cx('reviewListContainer')}>
              <p className={cx('username')}>{el.username}</p>
              <div className={cx('reviewBody')}>
                <p className={cx('reviewText')}>{el.review_text}</p>
                {el.review_img && (
                  <a
                    href={el.review_img}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={cx('reviewImgBox')}
                  >
                    <img src={el.review_img} className={cx('reviewImg')} />
                  </a>
                )}
                <p className={cx('reviewCreateAt')}>
                  {new Date(el.created_at).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default ReviewList;
