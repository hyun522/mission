// /ul만들기
// /api 만들어주기
// /main api 랑 연결
// 이미지도 삽입할 수 있도록 작업
// 로그인 전 지금 로그인하고 댓글에 참여해보세요!

import classNames from 'classnames/bind';
import styles from './comment.module.scss';

const cx = classNames.bind(styles);

function index() {
  return (
    <>
      <div className={cx('commentSection')}>
        <p className={cx('commentCount')}>💬 댓글 0</p>
        <section className={cx('commentList')}>
          <ul className={cx('userInfo')}>
            <li>이미지, 유저네임, 날짜, 댓글이 보여짐</li>
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
            <p className={cx('charCount')}> 1/3000</p>
          </div>
          <textarea
            className={cx('commentInput')}
            placeholder='댓글을 남겨보세요'
          />
          <button className={cx('submitButton')}>등록</button>
        </article>
      </div>
    </>
  );
}

export default index;
