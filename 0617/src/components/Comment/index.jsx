import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './comment.module.scss';

const cx = classNames.bind(styles);

function index() {
  const textareaRef = useRef(null);
  const [text, setText] = useState('');

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      const minHeight = 50;
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      if (scrollHeight >= minHeight) {
        textareaRef.current.style.height = `${scrollHeight + 4}px`;
      }
    }
  };

  const handleInput = (event) => {
    const { value } = event.target;
    if (value.length <= 3000) {
      setText(value);
      adjustTextareaHeight();
    }
  };

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
            <p className={cx('charCount')}>{`${text.length}/3000`}</p>
          </div>
          <textarea
            ref={textareaRef}
            className={cx('commentInput')}
            placeholder='댓글을 남겨보세요'
            value={text}
            onInput={handleInput}
          />
          <button className={cx('submitButton')}>등록</button>
        </article>
      </div>
    </>
  );
}

export default index;
