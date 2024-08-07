import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Link, useParams } from 'react-router-dom';
import supabase from '@/apis/supabaseApi';
import ReviewForm from '@/components/Landing/ReviewForm';
import ReviewList from '@/components/Landing/ReviewList';
import classNames from 'classnames/bind';
import styles from './detail.module.scss';

const cx = classNames.bind(styles);

function index() {
  const { productId } = useParams();
  const { user } = useAuth();
  const textareaRef = useRef(null);

  const [productDetail, setProductDetail] = useState(null);
  const [newReview, setNewReview] = useState('');
  const [reviewList, setReviewList] = useState([]);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadImg, setUploading] = useState(false);

  useEffect(() => {
    fetchProductDetail();
    fetchReviews();
  }, [productId]);

  const fetchProductDetail = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();
    if (error) {
      return;
    } else {
      setProductDetail(data);
    }
  };

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_id', productId);

    if (error) {
      return;
    } else {
      setReviewList(data);
    }
  };

  const handleInput = (event) => {
    const { value } = event.target;
    if (value.length <= 3000) {
      setNewReview(value);
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
      // setMessage('');

      let imageUrl = null;

      if (newReview.trim() === '') {
        alert('내용을 입력해주세요.');
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
            review_text: newReview,
            review_img: imageUrl,
          },
        ])
        .select();

      if (error) {
        return;
      } else {
        setReviewList([...reviewList, ...data]);
        setNewReview('');
      }
    } catch (error) {
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
          <ReviewList reviewList={reviewList} />
          <div className={cx('reviewFormSection')}>
            {user ? (
              <ReviewForm
                user={user}
                newReview={newReview}
                handleInput={handleInput}
                handleUploadAndSubmit={handleUploadAndSubmit}
                textareaRef={textareaRef}
                previewUrl={previewUrl}
                handleCancelSelection={handleCancelSelection}
                handleFileChange={handleFileChange}
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
