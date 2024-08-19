import classNames from 'classnames/bind';
import styles from './reviewForm.module.scss';
import { MdOutlineCameraAlt } from 'react-icons/md';
import { FaTimes } from 'react-icons/fa';
import Spinner from '@/components/common/Spinner/index';
import { useRef, useState } from 'react';
import supabase from '@/apis/supabaseApi';

const cx = classNames.bind(styles);

function ReviewForm({ user, productId, reviewList, setReviewList }) {
  const textareaRef = useRef(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadImg, setUploading] = useState(false);

  const handleInput = (event) => {
    const { value } = event.target;
    if (value.length <= 3000) {
      adjustTextareaHeight();
    }
  };

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

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleUploadAndSubmit = async () => {
    try {
      setUploading(true);
      let imageUrl = null;
      if (textareaRef.current.value === '') {
        alert('내용을 입력해주세요.');
        setUploading(false);
        return;
      }

      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `public/${fileName}`;

        let { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadError) {
          throw uploadError;
        }

        const publicUrl = supabase.storage
          .from('images')
          .getPublicUrl(filePath);

        imageUrl = publicUrl.data.publicUrl;
        setPreviewUrl(null);
        setFile(null);
      }

      const { data, error } = await supabase
        .from('reviews')
        .insert([
          {
            product_id: productId,
            username: user.email,
            review_text: textareaRef.current.value.trim(),
            review_img: imageUrl,
          },
        ])
        .select();
      if (error) {
        return;
      } else {
        setReviewList([...reviewList, ...data]);
        textareaRef.current.value = '';
      }
    } catch (error) {
      console.log(error);
      alert('Error uploading image and submitting review!');
    } finally {
      setUploading(false);
    }
  };

  const handleCancelSelection = () => {
    setPreviewUrl(null);
    setFile(null);
  };

  return (
    <article className={cx('reviewBox')}>
      <div className={cx('reviewHeader')}>
        <p className={cx('userInfo')}>{user.email}</p>
        <p className={cx('charCount')}>
          {textareaRef.current
            ? `${textareaRef.current.value.length}/3000`
            : '0/3000'}
        </p>
      </div>
      <textarea
        ref={textareaRef}
        className={cx('reviewInput')}
        placeholder='댓글을 남겨보세요'
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
            disabled={uploadImg}
          />
        </div>
        <button onClick={handleUploadAndSubmit} className={cx('submitButton')}>
          {uploadImg ? <Spinner /> : '등록'}
        </button>
      </div>
    </article>
  );
}

export default ReviewForm;
