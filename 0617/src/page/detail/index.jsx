import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '@/apis/supabaseApi';
import classNames from 'classnames/bind';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

//@TODO
//1. 댓글 UI 만들기 ✅
//2. main과 댓글겟수 연동 되도록
//3. 로그인시 접근할수 있도록

function index() {
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [commentList, setCommentList] = useState([]);
  const textareaRef = useRef(null);

  useEffect(() => {
    fetchProductDetail();
    fetchComments();
  }, [productId]);

  const fetchProductDetail = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();
    if (error) {
      console.error('Error fetching tasks:', error);
    } else {
      setProductDetail(data);
    }
  };

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('product_id', productId);

    if (error) {
      console.error('Error fetching comments:', error);
    } else {
      setCommentList(data);
    }
  };

  const handleInput = (event) => {
    const { value } = event.target;
    console.log({ value });
    if (value.length <= 3000) {
      setNewComment(value);
      adjustTextareaHeight();
    }
  };

  const adjustTextareaHeightㅗ = () => {
    if (textareaRef.current) {
      const minHeight = 50;
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      if (scrollHeight >= minHeight) {
        textareaRef.current.style.height = `${scrollHeight + 4}px`;
      }
    }
  };

  const handleSubmit = async () => {
    if (newComment.trim() === '') {
      alert('내용을 입력해주세요.');
      return;
    }
    const { data, error } = await supabase
      .from('comments')
      .insert([{ product_id: productId, comment_text: newComment }])
      .select();

    if (error) {
      return;
    } else {
      setCommentList([...commentList, ...data]);
      setNewComment('');
    }
  };

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
          <div className={cx('commentSection')}>
            <p className={cx('commentCount')}>💬 댓글 {commentList.length}</p>
            <section className={cx('commentList')}>
              <ul className={cx('userInfo')}>
                {commentList.map((el) => (
                  <li key={el.id}>
                    {/* <p className={cx('username')}>{el.username}</p> */}
                    <p className={cx('username')}>jhj1004v</p>
                    <p className={cx('commentText')}>{el.comment_text}</p>
                    <p className={cx('commentCreateAt')}>
                      {new Date(el.created_at).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <div className={cx('commentSection')}>
            <div className={cx('loginPrompt')}>
              지금 로그인하고 댓글에 참여해보세요! ＞{' '}
            </div>
            <article className={cx('commentBox')}>
              <div>
                <p className={cx('userInfo')}>유저정보</p>
                <p className={cx('charCount')}>{`${newComment.length}/3000`}</p>
              </div>
              <textarea
                ref={textareaRef}
                className={cx('commentInput')}
                placeholder='댓글을 남겨보세요'
                value={newComment}
                onInput={handleInput}
              />
              <button onClick={handleSubmit} className={cx('submitButton')}>
                등록
              </button>
            </article>
          </div>
        </>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}

export default index;
