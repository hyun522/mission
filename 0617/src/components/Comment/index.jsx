import { useEffect, useRef, useState } from 'react';
import supabase from '@/apis/supabaseApi';
import classNames from 'classnames/bind';
import styles from './comment.module.scss';

const cx = classNames.bind(styles);

function index() {
  // const textareaRef = useRef(null);
  // const [newComment, setNewComment] = useState('');
  console.log(newComment);
  // const [commentList, setCommentList] = useState([]);
  console.log(commentList);

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
      setNewComment(value);
      adjustTextareaHeight();
    }
  };

  const handleSubmit = async () => {
    if (newComment.trim() === '') {
      alert('내용을 입력해주세요.');
      return;
    }
    // data: 삽입이 성공적으로 완료되었을 때 반환되는 데이터입니다.
    const { data, error } = await supabase
      .from('comments')
      .insert([{ comment_text: newComment }])
      .select();
    // 데이터를 삽입한 후 해당 삽입된 데이터를 다시 선택하여 반환합니다.
    console.log(data);
    if (error) {
      console.error('Error adding comment', error);
    } else {
      setCommentList([...commentList, ...data]);
      setNewComment('');
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, []);

  // return (
  //   <>
  //     <div className={cx('commentSection')}>
  //       <p className={cx('commentCount')}>💬 댓글 0</p>
  //       <section className={cx('commentList')}>
  //         <ul className={cx('userInfo')}>
  //           {commentList.map((el) => (
  //             <li key={el.id}>
  //               <p>{el.username}</p>
  //               <p>{el.comment_text}</p>
  //               <p>{el.created_at}</p>
  //             </li>
  //           ))}
  //         </ul>
  //       </section>
  //     </div>
  //     <div className={cx('commentSection')}>
  //       <div className={cx('loginPrompt')}>
  //         지금 로그인하고 댓글에 참여해보세요! ＞{' '}
  //       </div>
  //       <article className={cx('commentBox')}>
  //         <div>
  //           <p className={cx('userInfo')}>유저정보</p>
  //           <p className={cx('charCount')}>{`${newComment.length}/3000`}</p>
  //         </div>
  //         <textarea
  //           ref={textareaRef}
  //           className={cx('commentInput')}
  //           placeholder='댓글을 남겨보세요'
  //           value={newComment}
  //           onInput={handleInput}
  //         />
  //         <button onClick={handleSubmit} className={cx('submitButton')}>
  //           등록
  //         </button>
  //       </article>
  //     </div>
  //   </>
  // );
}

export default index;
