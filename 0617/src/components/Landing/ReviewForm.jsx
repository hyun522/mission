import classNames from 'classnames/bind';
import styles from './reviewForm.module.scss';
import { MdOutlineCameraAlt } from 'react-icons/md';
import { FaTimes } from 'react-icons/fa';

const cx = classNames.bind(styles);

function ReviewForm({
  user,
  newReview,
  handleInput,
  handleUploadAndSubmit,
  textareaRef,
  previewUrl,
  handleFileChange,
  handleCancelSelection,
}) {
  return (
    <article className={cx('reviewBox')}>
      <div className={cx('reviewHeader')}>
        <p className={cx('userInfo')}>{user.email}</p>
        <p className={cx('charCount')}>{`${newReview.length}/3000`}</p>
      </div>
      <textarea
        ref={textareaRef}
        className={cx('reviewInput')}
        placeholder='댓글을 남겨보세요'
        value={newReview}
        onInput={handleInput}
      />
      {previewUrl && (
        <div className={cx('prevImgContainer')}>
          <img src={previewUrl} alt='Preview' className={cx('prevImg')} />
          <button onClick={handleCancelSelection} className={cx('uploadBTN')}>
            <FaTimes size={12} />
          </button>
        </div>
      )}
      <div className={cx('uploadSection')}>
        <div>
          <label htmlFor='fileInput' className={cx('fileLabel')}>
            <MdOutlineCameraAlt size={20} />
          </label>
          <input
            type='file'
            id='fileInput'
            onChange={handleFileChange}
            className={cx('fileInput')}
          />
        </div>
        <button onClick={handleUploadAndSubmit} className={cx('submitButton')}>
          등록
        </button>
      </div>
    </article>
  );
}

export default ReviewForm;
